import { AnimatePresence, motion } from "framer-motion";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { EmptyState } from "./ui/EmptyState";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

const containerVariants = {
  animate: { transition: { staggerChildren: 0.035 } },
};

export function ProfileList({ profiles, platform }: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <EmptyState
        title="No profiles found"
        description="Try a different search term or switch platforms to see more creators."
      />
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence>
        {profiles.map((profile) => (
          <ProfileCard key={profile.user_id} profile={profile} platform={platform} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
