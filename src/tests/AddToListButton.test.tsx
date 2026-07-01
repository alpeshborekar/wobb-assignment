import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToListButton } from "@/components/AddToListButton";
import { useSelectedListStore } from "@/store/selectedListStore";
import type { UserProfileSummary } from "@/types";

const profile: UserProfileSummary = {
  user_id: "btn-test",
  username: "testuser",
  fullname: "Test User",
  followers: 1000,
  picture: "",
  is_verified: false,
  engagement_rate: 0.01,
};

beforeEach(() => {
  useSelectedListStore.getState().clear();
});

describe("AddToListButton", () => {
  it("renders 'Add to List' when profile is not selected", () => {
    render(<AddToListButton profile={profile} platform="instagram" />);
    expect(screen.getByRole("button")).toHaveTextContent("Add to List");
  });

  it("adds profile to store on click", async () => {
    render(<AddToListButton profile={profile} platform="instagram" />);
    await userEvent.click(screen.getByRole("button"));
    expect(useSelectedListStore.getState().isSelected(profile.user_id)).toBe(true);
  });

  it("shows 'Added' state after adding", async () => {
    render(<AddToListButton profile={profile} platform="instagram" />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("removes profile from store on second click", async () => {
    render(<AddToListButton profile={profile} platform="instagram" />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("button"));
    expect(useSelectedListStore.getState().isSelected(profile.user_id)).toBe(false);
  });

  it("has correct aria-label when not selected", () => {
    render(<AddToListButton profile={profile} platform="instagram" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Add @testuser to selected list"
    );
  });

  it("has correct aria-label when selected", async () => {
    render(<AddToListButton profile={profile} platform="instagram" />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Remove @testuser from selected list"
    );
  });
});
