export function PosterLabel({
  text,
  align = "left",
}: {
  text: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`relative inline-block ${align === "right" ? "self-end" : ""}`}
    >
      <span
        aria-hidden
        className="font-display absolute inset-0 translate-x-2 translate-y-2 text-4xl text-coral sm:text-6xl"
      >
        {text}
      </span>
      <span className="font-display relative text-4xl text-ink sm:text-6xl">
        {text}
      </span>
    </div>
  );
}
