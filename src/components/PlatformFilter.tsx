import { clsx } from "clsx";
import { motion } from "framer-motion";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex gap-1 rounded-xl border border-[var(--border)] bg-white p-1 w-fit"
        role="tablist"
        aria-label="Filter by platform"
      >
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={selected === p}
            onClick={() => onChange(p)}
            className={clsx(
              "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer z-0",
              selected === p
                ? "text-white"
                : "text-[var(--text)] hover:text-[var(--text-h)]"
            )}
          >
            {selected === p && (
              <motion.span
                layoutId="platform-pill"
                className="absolute inset-0 rounded-lg bg-[var(--text-h)] z-[-1]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-72">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
          />
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or name"
          aria-label="Search influencers"
          className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-9 pr-3 text-sm text-[var(--text-h)] placeholder:text-gray-400 focus:border-[var(--accent)]"
        />
      </div>
    </div>
  );
}
