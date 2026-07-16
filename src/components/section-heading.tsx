import { Ornament } from "@/components/ornament";

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <span className="font-display text-sm font-medium tracking-[0.2em] text-accent uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <Ornament className="mt-4 justify-start" />
    </div>
  );
}
