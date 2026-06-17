/** Colored initials avatar. Used in the topbar, task cards, and team page. */
export function Avatar({ name = '?', color = '#E63B2E', size = 32, title }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  return (
    <span
      title={title || name}
      className="inline-flex items-center justify-center rounded-full font-heading font-semibold text-white select-none ring-2 ring-background"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: Math.max(10, Math.round(size * 0.38)),
      }}
      aria-hidden="true"
    >
      {initials || '?'}
    </span>
  );
}
