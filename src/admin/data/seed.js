/**
 * Initial demo data for the mock provider.
 *
 * This mirrors the Phase 1b Supabase schema (profiles / board_columns / tasks /
 * task_assignees) so swapping the data layer later is a drop-in change.
 *
 * NOTE: `password` exists only in the mock layer for demo sign-in. Real auth
 * (Supabase) never stores plaintext passwords client-side.
 */

// The nine pipeline stages from OnBoard_features.xlsx, in order.
export const DEFAULT_COLUMNS = [
  { name: 'Opportunity', hint: 'Leads & follow-ups' },
  { name: 'Survey', hint: 'Measurements & site details' },
  { name: 'Quote', hint: 'Pricing sent for approval' },
  { name: 'Design', hint: 'Mockups & proofs' },
  { name: 'Pending Approval', hint: 'Awaiting client sign-off' },
  { name: 'Production', hint: 'In fabrication' },
  { name: 'Install / Delivery', hint: 'Install or ship' },
  { name: 'Close-out', hint: 'Wrap up the sale' },
  { name: 'Permits', hint: 'Jobs needing permits' },
];

// Stable ids so seeded tasks/columns can reference each other.
const ADMIN = 'u-admin';
const EMP1 = 'u-harkamal';
const EMP2 = 'u-mani';

export function buildSeed() {
  const columns = DEFAULT_COLUMNS.map((c, i) => ({
    id: `col-${i + 1}`,
    name: c.name,
    hint: c.hint,
    position: i,
    isDefault: true,
  }));

  const colId = (name) => columns.find((c) => c.name === name).id;

  const users = [
    { id: ADMIN, name: 'Nishant', email: 'admin@onboardprints.ca', role: 'admin', password: 'admin123', active: true, color: '#E63B2E' },
    { id: EMP1, name: 'Harkamal', email: 'harkamal@onboardprints.ca', role: 'employee', password: 'employee123', active: true, color: '#2563EB' },
    { id: EMP2, name: 'Mani', email: 'mani@onboardprints.ca', role: 'employee', password: 'employee123', active: true, color: '#16A34A' },
  ];

  const now = new Date().toISOString();
  const rawTasks = [
    { title: 'Maple Dental — exterior channel letters', column: 'Opportunity', priority: 'high', customerName: 'Maple Dental', assignees: [EMP1], description: 'Inbound lead from website quote form. Follow up re: storefront sign.' },
    { title: 'New lead — follow up Friday', column: 'Opportunity', priority: 'medium', customerName: 'Prairie Realty', assignees: [], description: 'Unassigned lead — only admin can see this until assigned.' },
    { title: 'Bridgewater Café — on-site measurements', column: 'Survey', priority: 'medium', customerName: 'Bridgewater Café', assignees: [EMP2], description: 'Measure storefront fascia + power location for channel letters.' },
    { title: 'Prairie Plumbing — full vehicle wrap quote', column: 'Quote', priority: 'high', customerName: 'Prairie Plumbing', assignees: [EMP1, EMP2], description: '3 vans. Send quote for approval.' },
    { title: 'RE/MAX — yard sign mockups (qty 25)', column: 'Design', priority: 'medium', customerName: 'RE/MAX Professionals', assignees: [EMP2], description: 'Design proofs for agent yard signs.' },
    { title: 'Window graphics — awaiting client sign-off', column: 'Pending Approval', priority: 'low', customerName: 'North End Bakery', assignees: [EMP1], description: 'Proof sent. Waiting on client approval before production.' },
    { title: '3× pull-up banners — trade show', column: 'Production', priority: 'high', customerName: 'Manitoba Expo', assignees: [EMP2], description: 'In production. Due before the weekend show.' },
    { title: 'Pembina Hwy — pylon sign install', column: 'Install / Delivery', priority: 'high', customerName: 'Pembina Auto', assignees: [EMP1], description: 'Bucket truck booked. Confirm permit on file.' },
    { title: 'Downtown mural — permit application', column: 'Permits', priority: 'medium', customerName: 'Exchange District BIZ', assignees: [EMP2], description: 'Submit permit package to City of Winnipeg.' },
  ];

  // Position tasks sequentially within each column.
  const posByCol = {};
  const tasks = rawTasks.map((t, i) => {
    const columnId = colId(t.column);
    posByCol[columnId] = posByCol[columnId] ?? 0;
    return {
      id: `task-${i + 1}`,
      title: t.title,
      description: t.description,
      columnId,
      position: posByCol[columnId]++,
      customerName: t.customerName,
      priority: t.priority,
      dueDate: null,
      assigneeIds: t.assignees,
      createdBy: ADMIN,
      createdAt: now,
      updatedAt: now,
    };
  });

  return { users, columns, tasks };
}
