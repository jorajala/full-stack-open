import Todo from "./Todo.jsx";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <div>
      {todos.map((t) => {
        return (
          <Todo
            key={t.id}
            todo={t}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
