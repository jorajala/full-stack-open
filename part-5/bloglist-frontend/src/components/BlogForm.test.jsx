import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import BlogForm from "./BlogForm.jsx";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("<BlogForm >", () => {
  test("right input is sent to addBlog handler", async () => {
    let createBlog = vi.fn();
    let user = userEvent.setup();

    let container = render(<BlogForm createBlog={createBlog} />).container;
    let addButton = screen.getByText("add");

    let titleInput = container.querySelector("#addblog-title");
    let authorInput = container.querySelector("#addblog-author");
    let urlInput = container.querySelector("#addblog-url");

    let titleText = "Test title";
    let authorText = "Auhorisaattori";
    let urlText = "nope.avi";

    await user.type(titleInput, titleText);
    await user.type(authorInput, authorText);
    await user.type(urlInput, urlText);
    await user.click(addButton);

    expect(createBlog.mock.lastCall).toStrictEqual([
      {
        title: "Test title",
        author: "Auhorisaattori",
        url: "nope.avi",
      },
    ]);
  });
});
