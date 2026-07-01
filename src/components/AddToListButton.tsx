import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import type { Platform, UserProfileSummary } from "@/types";
import { useSelectedListStore } from "@/store/selectedListStore";

interface AddToListButtonProps {
  profile: UserProfileSummary;
  platform: Platform;
  size?: "sm" | "md";
  className?: string;
}

export function AddToListButton({
  profile,
  platform,
  size = "sm",
  className,
}: AddToListButtonProps) {
  const isSelected = useSelectedListStore((state) =>
    state.isSelected(profile.user_id)
  );
  const addProfile = useSelectedListStore((state) => state.addProfile);
  const removeProfile = useSelectedListStore((state) => state.removeProfile);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isSelected) {
      removeProfile(profile.user_id);
      toast.success(`Removed @${profile.username} from your list`);
    } else {
      addProfile(profile, platform);
      toast.success(`Added @${profile.username} to your list`);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.03 }}
      aria-pressed={isSelected}
      aria-label={
        isSelected
          ? `Remove @${profile.username} from selected list`
          : `Add @${profile.username} to selected list`
      }
      className={clsx(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm",
        isSelected
          ? "bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)]"
          : "bg-[var(--text-h)] text-white hover:bg-[var(--accent)]",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSelected ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            Added
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            Add to List
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
