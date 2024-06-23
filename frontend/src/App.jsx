// App.jsx
import React, { useEffect } from 'react';
import './App.css';
import { List } from './components/List';
import { AddTodo } from './components/AddTodo';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { isAuthenticatedState, todoListState } from './store/atom/TodoListState';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
    const setTodoList = useSetRecoilState(todoListState);
    const todoList = useRecoilValue(todoListState);

    useEffect(() => {
        // Check session storage for authentication status
        const storedAuthState = sessionStorage.getItem('isAuthenticated');
        if (storedAuthState === 'true') {
            setIsAuthenticated(true);
        }
    }, [setIsAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            const sessionTodos = sessionStorage.getItem('todoList');
            if (sessionTodos && JSON.parse(sessionTodos).length > 0) {
                setTodoList(JSON.parse(sessionTodos));
            } else {
                const fetchTodos = async () => {
                    try {
                        const response = await axios.get('http://localhost:3000/todos', {
                            headers: {
                                Authorization: "Bearer hello",
                            },
                        });
                        const todoWithIds = response.data.todos.map((todo) => ({ ...todo, id: uuidv4() }));
                        setTodoList(todoWithIds);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchTodos();
            }
        } else {
            setTodoList([]);
        }
    }, [isAuthenticated, setTodoList]);

    useEffect(() => {
        // Update session storage whenever the todo list changes
        if (isAuthenticated) {
            sessionStorage.setItem('todoList', JSON.stringify(todoList));
        }
    }, [todoList, isAuthenticated]);

    const handleLogin = () => {
        setIsAuthenticated(true);
        sessionStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('todoList');
        setTodoList([]);
    };

    return (
        <div className="App">
            <div className="flex text-4xl font-bold justify-center">Todo App</div>
            {isAuthenticated ? (
                <>
                    <button
                        onClick={handleLogout}
                        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                    <div className="grid grid-cols-2 divide-x-2 divide-slate-200">
                        <div className="min-h-screen overflow-y-scroll">
                            <List />
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <AddTodo />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center p-4">
                    <button
                        onClick={handleLogin}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
