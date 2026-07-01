import { clsx } from "clsx";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx("animate-skeleton rounded-md bg-gray-200", className)}
      aria-hidden="true"
    />
  );
}
