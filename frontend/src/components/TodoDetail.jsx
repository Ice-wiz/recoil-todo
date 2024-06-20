import React, { useRef, useState, useEffect } from 'react';
import { TodoActions } from './TodoActions';

export const TodoDetail = ({ todo }) => {

    const descriptionRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Function to toggle between expanded and collapsed state
    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Function to truncate the description to a specified number of words
    const truncateDescription = (description, maxWords) => {
        const words = description.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return description;
    };

    // Effect to check for overflow after the component mounts or when description changes
    useEffect(() => {
        const checkOverflow = () => {
            if (descriptionRef.current) {
                // Save the current truncated text to restore later
                const originalText = descriptionRef.current.innerText;
                // Temporarily set full text to measure overflow
                descriptionRef.current.innerText = todo.description;
                // Check if content overflows
                const isOverflow = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
                // Update state based on overflow check
                setIsOverflowing(isOverflow);
                // Restore original text
                descriptionRef.current.innerText = originalText;
            }
        };

        // Initial check for overflow
        checkOverflow();

    }, [todo.description]);



    


    return (
        <div className="flex flex-col justify-around h-64 w-96 p-4 bg-gray-50 border border-slate-100 rounded-md shadow-md">
            <div className="text-xl font-bold">
                {todo.title}
            </div>

            <div
                ref={descriptionRef}
                className={`overflow-auto max-h-32 ${isExpanded || isOverflowing ? 'text-sm' : 'text-base'}`}
            >
                {/* Show truncated or full description based on isExpanded */}
                {isExpanded ? todo.description : truncateDescription(todo.description, 20)}
            </div>
            <div className='flex justify-between'>
                <div>
                    {/* Conditionally render the "Read more" or "Read less" button */}
                    {isOverflowing && (
                        <button
                            onClick={toggleExpand}
                            className="text-blue-500 mt-2 underline"
                        >
                            {isExpanded ? 'Read less' : 'Read more'}
                        </button>
                    )}
                </div>
                <TodoActions onEdit={handleEditClick} 
                
                ></TodoActions>
            </div>

        </div>
    );
};
