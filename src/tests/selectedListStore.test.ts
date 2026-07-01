import { beforeEach, describe, expect, it } from "vitest";
import { useSelectedListStore } from "@/store/selectedListStore";
import type { UserProfileSummary } from "@/types";

const makeProfile = (overrides: Partial<UserProfileSummary> = {}): UserProfileSummary => ({
  user_id: "u1",
  username: "testuser",
  fullname: "Test User",
  followers: 5000,
  picture: "",
  is_verified: false,
  engagement_rate: 0.02,
  ...overrides,
});

beforeEach(() => {
  useSelectedListStore.getState().clear();
});

describe("addProfile", () => {
  it("adds a profile to the list", () => {
    const profile = makeProfile();
    useSelectedListStore.getState().addProfile(profile, "instagram");
    expect(useSelectedListStore.getState().profiles).toHaveLength(1);
  });

  it("stores the correct platform alongside the profile", () => {
    const profile = makeProfile();
    useSelectedListStore.getState().addProfile(profile, "youtube");
    expect(useSelectedListStore.getState().profiles[0].platform).toBe("youtube");
  });

  it("records an addedAt timestamp", () => {
    const before = Date.now();
    useSelectedListStore.getState().addProfile(makeProfile(), "instagram");
    const after = Date.now();
    const { addedAt } = useSelectedListStore.getState().profiles[0];
    expect(addedAt).toBeGreaterThanOrEqual(before);
    expect(addedAt).toBeLessThanOrEqual(after);
  });

  it("prevents duplicate profiles by user_id", () => {
    const profile = makeProfile({ user_id: "same" });
    useSelectedListStore.getState().addProfile(profile, "instagram");
    useSelectedListStore.getState().addProfile(profile, "instagram");
    expect(useSelectedListStore.getState().profiles).toHaveLength(1);
  });

  it("allows two different profiles", () => {
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "a" }), "instagram");
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "b" }), "tiktok");
    expect(useSelectedListStore.getState().profiles).toHaveLength(2);
  });
});

describe("removeProfile", () => {
  it("removes a profile by user_id", () => {
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "x" }), "instagram");
    useSelectedListStore.getState().removeProfile("x");
    expect(useSelectedListStore.getState().profiles).toHaveLength(0);
  });

  it("only removes the matching profile, leaving others intact", () => {
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "keep" }), "instagram");
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "remove" }), "instagram");
    useSelectedListStore.getState().removeProfile("remove");
    const { profiles } = useSelectedListStore.getState();
    expect(profiles).toHaveLength(1);
    expect(profiles[0].user_id).toBe("keep");
  });

  it("does nothing when user_id does not exist", () => {
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "exists" }), "instagram");
    useSelectedListStore.getState().removeProfile("ghost");
    expect(useSelectedListStore.getState().profiles).toHaveLength(1);
  });
});

describe("isSelected", () => {
  it("returns false when list is empty", () => {
    expect(useSelectedListStore.getState().isSelected("anyone")).toBe(false);
  });

  it("returns true after a profile is added", () => {
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "here" }), "tiktok");
    expect(useSelectedListStore.getState().isSelected("here")).toBe(true);
  });

  it("returns false after a profile is removed", () => {
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "gone" }), "tiktok");
    useSelectedListStore.getState().removeProfile("gone");
    expect(useSelectedListStore.getState().isSelected("gone")).toBe(false);
  });

  it("returns false for a user_id not in the list", () => {
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "real" }), "instagram");
    expect(useSelectedListStore.getState().isSelected("other")).toBe(false);
  });
});

describe("clear", () => {
  it("empties the list", () => {
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "1" }), "instagram");
    useSelectedListStore.getState().addProfile(makeProfile({ user_id: "2" }), "youtube");
    useSelectedListStore.getState().clear();
    expect(useSelectedListStore.getState().profiles).toHaveLength(0);
  });
});
