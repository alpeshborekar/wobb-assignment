import { describe, expect, it } from "vitest";
import { filterProfiles, getPlatformLabel } from "@/utils/dataHelpers";
import type { UserProfileSummary } from "@/types";

const makeProfile = (overrides: Partial<UserProfileSummary>): UserProfileSummary => ({
  user_id: "1",
  username: "testuser",
  fullname: "Test User",
  followers: 10000,
  picture: "",
  is_verified: false,
  engagement_rate: 0.03,
  ...overrides,
});

const profiles: UserProfileSummary[] = [
  makeProfile({ user_id: "1", username: "cristiano", fullname: "Cristiano Ronaldo" }),
  makeProfile({ user_id: "2", username: "mrbeast", fullname: "MrBeast" }),
  makeProfile({ user_id: "3", username: "khaby.lame", fullname: "Khabane Lame" }),
];

describe("filterProfiles", () => {
  it("returns all profiles when query is empty", () => {
    expect(filterProfiles(profiles, "")).toHaveLength(3);
  });

  it("returns all profiles when query is only whitespace", () => {
    expect(filterProfiles(profiles, "   ")).toHaveLength(3);
  });

  it("matches by username — exact", () => {
    const result = filterProfiles(profiles, "mrbeast");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("mrbeast");
  });

  it("matches by username — case insensitive (the original bug)", () => {
    const result = filterProfiles(profiles, "MrBeast");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("mrbeast");
  });

  it("matches by fullname — case insensitive", () => {
    const result = filterProfiles(profiles, "cristiano ronaldo");
    expect(result).toHaveLength(1);
    expect(result[0].user_id).toBe("1");
  });

  it("matches by partial username", () => {
    const result = filterProfiles(profiles, "khaby");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("khaby.lame");
  });

  it("matches by partial fullname", () => {
    const result = filterProfiles(profiles, "beast");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("mrbeast");
  });

  it("returns empty array when nothing matches", () => {
    expect(filterProfiles(profiles, "zzznomatch")).toHaveLength(0);
  });

  it("returns multiple matches when query fits more than one profile", () => {
    const result = filterProfiles(profiles, "a");
    expect(result.length).toBeGreaterThan(1);
  });
});

describe("getPlatformLabel", () => {
  it("returns Instagram for instagram", () => {
    expect(getPlatformLabel("instagram")).toBe("Instagram");
  });

  it("returns YouTube for youtube", () => {
    expect(getPlatformLabel("youtube")).toBe("YouTube");
  });

  it("returns TikTok for tiktok", () => {
    expect(getPlatformLabel("tiktok")).toBe("TikTok");
  });
});
