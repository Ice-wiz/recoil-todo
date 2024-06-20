import React, { useRef, useState, useEffect } from 'react';
import { TodoActions } from './TodoActions';

export const TodoDetail = ({ todo, onEdit, onDelete }) => {
    const descriptionRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const truncateDescription = (description, maxWords) => {
        const words = description.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return description;
    };

    useEffect(() => {
        const checkOverflow = () => {
            if (descriptionRef.current) {
                const originalText = descriptionRef.current.innerText;
                descriptionRef.current.innerText = todo.description;
                const isOverflow = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
                setIsOverflowing(isOverflow);
                descriptionRef.current.innerText = originalText;
            }
        };

        checkOverflow();
    }, [todo.description]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const updatedTodo = {
            ...todo,
            title: editTitle,
            description: editDescription
        };
        onEdit(updatedTodo);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
    };

    return (
        <div className="flex flex-col justify-around h-64 w-96 p-4 bg-gray-50 border border-slate-100 rounded-md shadow-md">
            {isEditing ? (
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="border p-2 rounded h-32"
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={handleSaveClick}
                            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="text-xl font-bold">
                        {todo.title}
                    </div>
                    <div
                        ref={descriptionRef}
                        className={`overflow-auto max-h-32 ${isExpanded || isOverflowing ? 'text-sm' : 'text-base'}`}
                    >
                        {isExpanded ? todo.description : truncateDescription(todo.description, 20)}
                    </div>
                    <div className="flex justify-between mt-2">
                        {isOverflowing && (
                            <button
                                onClick={toggleExpand}
                                className="text-blue-500 mt-2 underline"
                            >
                                {isExpanded ? 'Read less' : 'Read more'}
                            </button>
                        )}
                        <TodoActions onEdit={handleEditClick} onDelete={onDelete} />
                    </div>
                </>
            )}
        </div>
    );
};
