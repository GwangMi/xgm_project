export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/70" />
      <svg
        viewBox="0 0 24 24"
        className="size-3 rotate-45 fill-accent"
        aria-hidden
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/70" />
    </div>
  );
}
