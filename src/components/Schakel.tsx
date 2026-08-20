/**
 * Schakel — de kettingschakel uit het logo als subtiel merkelement.
 * Alleen gebruiken op de afgesproken vaste plekken (projecthoofdstukken,
 * footer); kleur via currentColor.
 */
export default function Schakel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 28"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="3.5"
        y="3.5"
        width="37"
        height="21"
        rx="10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
    </svg>
  );
}
