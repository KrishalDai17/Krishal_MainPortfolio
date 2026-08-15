export default function HUDFrame({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`hud-frame text-signal ${className}`}>
      {label && (
        <span className="absolute -top-3 left-3 bg-ink px-2 font-mono text-[9px] tracking-widest2 text-signal">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
