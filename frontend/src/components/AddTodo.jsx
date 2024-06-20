import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export const AddTodo = ({onAdd}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState("");

    const handleAddTodo = (e) => {
        e.preventDefault();

        const newTodo = {
            title,
            description,
            id: uuidv4()
        }

        onAdd(newTodo)
        setTitle('');
        setDescription('');

        console.log(newTodo);
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
            <form onSubmit={handleAddTodo} className="space-y-4">
                <div>
                    <label className="block mb-1 font-bold">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded w-full h-32"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
};