import create from "zustand";

//! Functions
const fetchTodos = async (set) => {
  if (useTodoStore.getState().todos.length === 0) {
    set((state) => ({
      ...state,
      loading: true,
    }));
    try {
      const res = await fetch("http://localhost:3001/todos");
      const data = await res.json();
      localStorage.setItem("todos", JSON.stringify(data));
      set((state) => ({
        ...state,
        loading: false,
        todos: data,
        error: "",
      }));
    } catch (err) {
      set((state) => ({
        ...state,
        loading: false,
        todos: [],
        error: err.message,
      }));
    }
  }
};
const createTodo = (set) => (newTodo) =>
  set((state) => {
    const updatedTodos = [...state.todos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return { todos: updatedTodos };
  });
const deleteTodo = (set) => (id) =>
  set((state) => {
    const updatedTodos = state.todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return { todos: updatedTodos };
  });
const toggleTodo = (set) => (id) =>
  set((state) => {
    const updatedTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return { todos: updatedTodos };
  });

//! zustand
const useTodoStore = create((set) => ({
  loading: false,
  error: "",
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  fetchTodos: () => fetchTodos(set),
  createTodo: createTodo(set),
  deleteTodo: deleteTodo(set),
  toggleTodo: toggleTodo(set),
}));

export default useTodoStore;
