// List.jsx
import React from 'react';
import { TodoDetail } from './TodoDetail';

export const List = ({ todos, onEdit, onDelete }) => {

    return (
        <div className="mt-10 space-y-4">
            {todos.map((todo) => (
                <div key={todo.id} className="flex flex-col items-center w-full p-4">
                    <TodoDetail
                        todo={todo}
                        onEdit={onEdit}
                        onDelete={() => onDelete(todo.id)}
                    />
                </div>
            ))}
        </div>
    );
};
