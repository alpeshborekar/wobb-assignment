import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { AddToListButton } from "@/components/AddToListButton";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-[var(--border)] bg-white p-3"
    >
      <div className="text-xs text-[var(--text)]">{label}</div>
      <div className="mt-1 text-base font-semibold text-[var(--text-h)]">{value}</div>
    </motion.div>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const [state, setState] = useState<{
    loaded: boolean;
    profileData: ProfileDetailResponse | null;
  }>({ loaded: false, profileData: null });
  const { loaded, profileData } = state;

  useEffect(() => {
    if (!username) return;

    let cancelled = false;
    loadProfileByUsername(username).then((data) => {
      if (cancelled) return;
      setState({ loaded: true, profileData: data });
    });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <EmptyState title="Invalid profile" description="No username was provided." />
        <Link to="/" className="mt-4 inline-block text-sm text-[var(--accent)]">
          ← Back to search
        </Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex max-w-2xl flex-col gap-6 rounded-2xl border border-[var(--border)] bg-white p-6 sm:flex-row">
          <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Skeleton className="h-14 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <EmptyState
          title="Profile not found"
          description={`We couldn't load profile details for @${username}.`}
        />
        <Link to="/" className="mt-4 inline-block text-sm text-[var(--accent)]">
          ← Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <Layout title={user.fullname}>
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] no-underline"
      >
        ← Back to search
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex max-w-2xl flex-col gap-6 rounded-2xl border border-[var(--border)] bg-white p-6 text-left sm:flex-row"
      >
        <img
          src={user.picture}
          alt={`${user.fullname} avatar`}
          className="h-24 w-24 shrink-0 rounded-full border border-[var(--border)] object-cover"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-[var(--text-h)]">
              @{user.username}
              <VerifiedBadge verified={user.is_verified} />
            </h2>
            <span className="rounded-full bg-[var(--accent-bg)] px-2.5 py-0.5 text-xs font-medium capitalize text-[var(--accent)]">
              {platform}
            </span>
          </div>
          <p className="text-[var(--text)]">{user.fullname}</p>

          {user.description && (
            <p className="mt-3 text-sm text-[var(--text)]">{user.description}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard label="Followers" value={formatFollowers(user.followers)} />
            <StatCard
              label="Engagement Rate"
              value={formatEngagementRate(user.engagement_rate)}
            />
            {user.posts_count !== undefined && (
              <StatCard label="Posts" value={user.posts_count.toLocaleString()} />
            )}
            {user.avg_likes !== undefined && (
              <StatCard label="Avg Likes" value={formatFollowers(user.avg_likes)} />
            )}
            {user.avg_comments !== undefined && (
              <StatCard label="Avg Comments" value={formatFollowers(user.avg_comments)} />
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <StatCard label="Avg Views" value={formatFollowers(user.avg_views)} />
            )}
            {user.engagements !== undefined && (
              <StatCard label="Engagements" value={formatFollowers(user.engagements)} />
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--accent)]"
              >
                View on platform →
              </a>
            )}
            <AddToListButton profile={user} platform={platform} size="md" />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
