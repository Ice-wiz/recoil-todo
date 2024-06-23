// List.jsx
import React from 'react';
import { TodoDetail } from './TodoDetail';
import { useRecoilValue } from 'recoil';
import { todoListState } from '../store/atom/TodoListState';

export const List = () => {
    const todos = useRecoilValue(todoListState);

    return (
        <div className="mt-10 space-y-4">
            {todos.map((todo) => (
                <div key={todo.id} className="flex flex-col items-center w-full p-4">
                    <TodoDetail todo={todo} />
                </div>
            ))}
        </div>
    );
};
