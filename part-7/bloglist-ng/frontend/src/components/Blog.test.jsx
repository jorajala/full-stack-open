import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Blog from "./Blog.jsx";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("<Blog >", () => {
  let container;
  let mockAddLike = vi.fn();

  beforeEach(() => {
    let mockRemoveBlog = vi.fn();
    let mockUser = {
      username: "",
      name: "Mock User",
    };
    let blog = {
      title: "testi",
      author: "testaaja",
      url: "testurl",
      likes: 0,
      user: mockUser,
    };

    container = render(
      <Blog
        blog={blog}
        addLike={mockAddLike}
        removeBlog={mockRemoveBlog}
        loggedUser={mockUser}
      />,
    ).container;
  });

  test("renders content", () => {
    let element = screen.getByText("testi testaaja");
    expect(element).toBeDefined();
  });

  test("show details when button pressed", async () => {
    let user = userEvent.setup();
    let button = screen.getByText("details");
    await user.click(button);
    let details = container.querySelector(".blog-details");

    expect(details).toHaveTextContent("Mock User");
    expect(details).toHaveTextContent("ikes:");
    expect(details).toHaveTextContent("testurl");
  });

  test("two button presses result in two addLike events", async () => {
    let user = userEvent.setup();
    let detailsButton = screen.getByText("details");
    await user.click(detailsButton);

    let likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockAddLike.mock.calls).toHaveLength(2);
  });
});
