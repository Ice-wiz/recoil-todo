// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { List } from './components/List';
import { AddTodo } from './components/AddTodo';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/todos', {
                    headers: {
                        Authorization: "Bearer hello",
                    },
                });
                const todoWithIds = response.data.todos.map((todo) => ({ ...todo, id: uuidv4() }));
                setTodos(todoWithIds);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodos();
    }, []);

    const handleAddTodo = (newTodo) => {
        setTodos((prevTodos) => [newTodo,...prevTodos]);
    };

    const handleEdit = async (updatedTodo) => {
        console.log(`Edit todo with id: ${updatedTodo.id}`);
        try {
            // await axios.put(`http://localhost:3000/todos/${updatedTodo.id}`, updatedTodo, {
            //     headers: {
            //         Authorization: "Bearer hello",
            //     },
            // });
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (todoId) => {
        console.log(`Delete todo with id: ${todoId}`);
        try {
            // await axios.delete(`http://localhost:3000/todos/${todoId}`, {
            //     headers: {
            //         Authorization: "Bearer hello",
            //     },
            // });
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex text-4xl font-bold justify-center"></div>
            <div className="App">
                <div className="grid grid-cols-2 divide-x-2 divide-slate-200">
                    <div className="min-h-screen overflow-y-scroll">
                        <List todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                    <div className="flex flex-col item-center p-4">
                        <AddTodo onAdd={handleAddTodo} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
