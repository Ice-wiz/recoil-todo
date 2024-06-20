// Import statements using ES6 syntax
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoDetail } from './TodoDetail';

export const List = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/todos', {
                    headers: {
                        Authorization: "Bearer hello"
                    }
                });

                const todoWithIds = response.data.todos.map((todo) => {
                    return { ...todo, id: uuidv4() }
                });
                
                setTodos(todoWithIds);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTodos();
    }, []);

    const handleEdit = async (updatedTodo) => {
        try {
            setTodos((todos) => todos.map(todo => todo.id === updatedTodo.id ? response.data : todo));
        } catch (error) {
            console.log(error);
        }
    };
  
    const handleDelete = async (todoId) => {
        try {
            setTodos((todos) => todos.filter(todo => todo.id !== todoId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='mt-10 space-y-4'>
            {todos.map((todo) => (
                <div key={todo.id} className='flex flex-col items-center w-full p-4'>
                    <TodoDetail todo={todo} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            ))}
        </div>
    );
};
