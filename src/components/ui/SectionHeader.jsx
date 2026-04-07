export default function SectionHeader({ label, heading, highlight, dark = false }) {
  return (
    <div className="text-center mb-16">
      <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
        {label}
      </p>
      <h2
        className="font-heading font-bold text-3xl md:text-5xl tracking-tight"
        style={{ color: dark ? '#F5F3EE' : '#111111' }}
      >
        {heading}{' '}
        {highlight && (
          <span className="font-drama italic" style={{ color: '#E63B2E' }}>
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
}
