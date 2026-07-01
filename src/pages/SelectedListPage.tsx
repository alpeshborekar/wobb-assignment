import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/ui/EmptyState";
import { AddToListButton } from "@/components/AddToListButton";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useSelectedListStore } from "@/store/selectedListStore";
import { formatFollowers } from "@/utils/formatters";

export function SelectedListPage() {
  const profiles = useSelectedListStore((state) => state.profiles);

  return (
    <Layout
      title="Selected List"
      subtitle={
        profiles.length > 0
          ? `${profiles.length} creator${profiles.length === 1 ? "" : "s"} saved`
          : undefined
      }
    >
      {profiles.length === 0 ? (
        <EmptyState
          title="Your list is empty"
          description="Add creators from the discover page to build your shortlist. They'll be saved here even after a refresh."
          action={
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-[var(--text-h)] px-4 py-2.5 text-sm font-medium text-white no-underline hover:bg-[var(--accent)]"
            >
              Discover creators
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {[...profiles]
              .sort((a, b) => b.addedAt - a.addedAt)
              .map((profile) => (
                <motion.div
                  key={profile.user_id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 24, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4"
                >
                  <Link
                    to={`/profile/${profile.username}?platform=${profile.platform}`}
                    className="flex min-w-0 flex-1 items-center gap-3 no-underline"
                  >
                    <img
                      src={profile.picture}
                      alt={`${profile.fullname} avatar`}
                      className="h-11 w-11 shrink-0 rounded-full border border-[var(--border)] object-cover"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center text-sm font-semibold text-[var(--text-h)]">
                        <span className="truncate">@{profile.username}</span>
                        <VerifiedBadge verified={profile.is_verified} />
                      </div>
                      <div className="truncate text-xs text-[var(--text)]">
                        {profile.fullname} · {formatFollowers(profile.followers)} followers ·{" "}
                        <span className="capitalize">{profile.platform}</span>
                      </div>
                    </div>
                  </Link>
                  <AddToListButton profile={profile} platform={profile.platform} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}
    </Layout>
  );
}
