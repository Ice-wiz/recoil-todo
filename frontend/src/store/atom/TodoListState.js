// recoilState.js
import { atom, selector } from 'recoil';

// Atom for the authentication state
export const isAuthenticatedState = atom({
    key: 'isAuthenticatedState',
    default: true, // Start as logged out
});


// Atom for the todos state
export const todoListState = atom({
    key: 'todoListState',
    default: [],
});

// Selector for adding a new todo
export const addTodoSelector = selector({
    key: 'addTodoSelector',
    get: ({ get }) => {
        // This is a dummy get to comply with Recoil's requirement.
        return get(todoListState);
    },
    set: ({ get, set }, newTodo) => {
        const todos = get(todoListState);
        set(todoListState, [newTodo, ...todos]);
    },
});

// Selector for editing a todo
export const editTodoSelector = selector({
    key: 'editTodoSelector',
    get: ({ get }) => {
        // This is a dummy get to comply with Recoil's requirement.
        return get(todoListState);
    },
    set: ({ get, set }, updatedTodo) => {
        const todos = get(todoListState);
        const updatedTodos = todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));
        set(todoListState, updatedTodos);
    },
});

// Selector for deleting a todo
export const deleteTodoSelector = selector({
    key: 'deleteTodoSelector',
    get: ({ get }) => {
        // This is a dummy get to comply with Recoil's requirement.
        return get(todoListState);
    },
    set: ({ get, set }, todoId) => {
        const todos = get(todoListState);
        const updatedTodos = todos.filter(todo => todo.id !== todoId);
        set(todoListState, updatedTodos);
    },
});
