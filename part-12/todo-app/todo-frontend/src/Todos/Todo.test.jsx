import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import Todo from "./Todo.jsx";

test("renders content", () => {
  const todo = {
    text: "test content",
    done: true,
  };

  let mockHandler = vi.fn();

  render(
    <Todo todo={todo} completeTodo={mockHandler} deleteTodo={mockHandler} />
  );

  let element = screen.getByText("test content");
  expect(element).toBeDefined();
  element = screen.getByText("This todo is done");
  expect(element).toBeDefined();
});
