export function SectionHeading({
  eyebrow,
  title,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className="mb-10 sm:mb-14">
      <span
        className={`text-sm font-bold tracking-[0.25em] uppercase ${
          isDark ? "text-teal" : "text-coral"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-display mt-2 flex items-center gap-3 text-3xl sm:text-4xl ${
          isDark ? "text-paper" : "text-ink"
        }`}
      >
        <span
          className={`inline-block size-3 shrink-0 ${
            isDark ? "bg-teal" : "bg-coral"
          }`}
          aria-hidden
        />
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-16 ${isDark ? "bg-teal" : "bg-ink"}`}
        aria-hidden
      />
    </div>
  );
}
