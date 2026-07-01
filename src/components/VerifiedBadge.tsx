interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <svg
      className="ml-1 inline-block h-3.5 w-3.5 text-[var(--accent)]"
      viewBox="0 0 20 20"
      fill="currentColor"
      role="img"
      aria-label="Verified account"
    >
      <path
        fillRule="evenodd"
        d="M10 1.5l2.39 1.2 2.62-.46 1.18 2.35 2.35 1.18-.46 2.62 1.2 2.39-1.2 2.39.46 2.62-2.35 1.18-1.18 2.35-2.62-.46L10 18.5l-2.39-1.2-2.62.46-1.18-2.35-2.35-1.18.46-2.62L.7 10l1.2-2.39-.46-2.62 2.35-1.18L5 1.46l2.62.46L10 1.5zm-1.2 11.7l5.1-5.1-1.06-1.06-4.04 4.04-1.94-1.94-1.06 1.06 3 3z"
        clipRule="evenodd"
      />
    </svg>
  );
}
