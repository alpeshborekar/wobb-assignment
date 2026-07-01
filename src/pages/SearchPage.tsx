import { useMemo, useState, useTransition } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { ProfileCardSkeleton } from "@/components/ProfileCardSkeleton";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const handlePlatformChange = (next: Platform) => {
    startTransition(() => {
      setPlatform(next);
      setSearchQuery("");
    });
  };

  return (
    <Layout
      title="Find Influencers"
      subtitle="Browse top creators across social platforms"
    >
      <div className="flex flex-col gap-6">
        <PlatformFilter
          selected={platform}
          onChange={handlePlatformChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <p className="text-sm text-[var(--text)]" role="status">
          Showing {filtered.length} of {allProfiles.length} on{" "}
          <span className="capitalize">{platform}</span>
        </p>

        {isPending ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProfileCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ProfileList profiles={filtered} platform={platform} />
        )}
      </div>
    </Layout>
  );
}
