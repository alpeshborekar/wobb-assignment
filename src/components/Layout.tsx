import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useSelectedListStore } from "@/store/selectedListStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  const location = useLocation();
  const selectedCount = useSelectedListStore((state) => state.profiles.length);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-base font-semibold text-[var(--text-h)] no-underline"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
              W
            </span>
            Influencer Search
          </Link>

          <nav className="flex items-center gap-1" aria-label="Primary">
            <Link
              to="/"
              className={clsx(
                "rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors",
                location.pathname === "/"
                  ? "text-[var(--accent)]"
                  : "text-[var(--text)] hover:text-[var(--text-h)]"
              )}
            >
              Discover
            </Link>
            <Link
              to="/list"
              className={clsx(
                "relative rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors",
                location.pathname === "/list"
                  ? "text-[var(--accent)]"
                  : "text-[var(--text)] hover:text-[var(--text-h)]"
              )}
            >
              Selected List
              <AnimatePresence>
                {selectedCount > 0 && (
                  <motion.span
                    key={selectedCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-xs font-semibold text-white"
                  >
                    {selectedCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {title && (
          <div className="mb-6 text-left">
            <h1 className="text-2xl font-semibold text-[var(--text-h)] sm:text-3xl">
              {title}
            </h1>
            {subtitle && <p className="mt-1.5 text-sm text-[var(--text)]">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
