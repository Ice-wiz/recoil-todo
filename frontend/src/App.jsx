// App.jsx
import React from 'react';
import './App.css';
import { List } from './components/List';

function App() {
    return (
        <div className="App">
            <div className='grid grid-cols-2 divide-x-2 divide-slate-200'>
                <div className='min h-screen overflow-y-scroll'>
                    <div className='flex text-4xl font-bold justify-center'>Todo List </div>
                    <List />
                </div>
                <div className='flex'>
                    
                </div>
            </div>
        </div>
    );
}

export default App;
