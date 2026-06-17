-- move_task(task, target column, target index)
-- Atomically moves a task to a column at a given index and renumbers the
-- affected columns to contiguous 0..n-1 positions.
--
-- SECURITY DEFINER: a drag reorders sibling tasks too, and an employee has no
-- RLS write access to siblings. So the function bypasses RLS but enforces the
-- real rule itself — caller must be an admin or assigned to the moved task.

create or replace function move_task(p_task uuid, p_to_column uuid, p_to_index bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_from_column uuid;
  v_ids uuid[];
  v_idx int;
  v_len int;
begin
  select column_id into v_from_column from tasks where id = p_task;
  if v_from_column is null then
    raise exception 'Task not found';
  end if;

  if not (is_admin() or is_assigned(p_task)) then
    raise exception 'Not allowed to move this task';
  end if;

  -- Move into the target column first.
  update tasks set column_id = p_to_column where id = p_task;

  -- Ordered sibling ids in the target column (excluding the moved task).
  select coalesce(array_agg(id order by position), '{}') into v_ids
  from tasks
  where column_id = p_to_column and id <> p_task;

  v_len := coalesce(array_length(v_ids, 1), 0);
  v_idx := greatest(0, least(p_to_index, v_len))::int;  -- clamp into [0, v_len]

  -- Insert the moved task at v_idx (arrays are 1-based).
  v_ids := v_ids[1:v_idx] || p_task || v_ids[v_idx + 1 : v_len];

  -- Write contiguous positions for the target column.
  update tasks t
    set position = ord.rn - 1
  from (
    select id, ordinality as rn
    from unnest(v_ids) with ordinality as u(id, ordinality)
  ) ord
  where t.id = ord.id;

  -- Close the gap left in the source column.
  if v_from_column is distinct from p_to_column then
    update tasks t
      set position = ord.rn - 1
    from (
      select id, row_number() over (order by position) as rn
      from tasks
      where column_id = v_from_column
    ) ord
    where t.id = ord.id;
  end if;
end;
$$;

revoke all on function move_task(uuid, uuid, bigint) from public;
grant execute on function move_task(uuid, uuid, bigint) to authenticated;
