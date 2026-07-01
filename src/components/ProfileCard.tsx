import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Platform, UserProfileSummary } from "@/types";
import { formatFollowers } from "@/utils/formatters";
import { VerifiedBadge } from "./VerifiedBadge";
import { AddToListButton } from "./AddToListButton";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

function ProfileCardComponent({ profile, platform }: ProfileCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <motion.img
          src={profile.picture}
          alt={`${profile.fullname} avatar`}
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.15 }}
          className="h-12 w-12 shrink-0 rounded-full border border-[var(--border)] object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center text-sm font-semibold text-[var(--text-h)]">
            <span className="truncate">@{profile.username}</span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="truncate text-sm text-[var(--text)]">{profile.fullname}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-h)]">
          {formatFollowers(profile.followers)}{" "}
          <span className="font-normal text-[var(--text)]">followers</span>
        </span>
        <AddToListButton profile={profile} platform={platform} />
      </div>
    </motion.div>
  );
}

export const ProfileCard = memo(ProfileCardComponent);
