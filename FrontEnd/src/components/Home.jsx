import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Task = () => {

    const deleteTask = (id) => {
        console.log(id)
    }

    return (
        <div className="task">
            <h3>Task Title</h3>
            <p>Task description : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta ipsum inventore esse porro voluptatibus quidem omnis cumque, odio minima non!</p>
            <Link to={"/update"}>
                <button className='update-btn'>Update</button>
            </Link>
            <button className='update-btn' onClick={() => deleteTask(3)}>Delete</button>

        </div>
    )
}

const Home = () => {
    const name = "Tanuj"
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addHandler = (e) => {
        e.preventDefault()
    }
    const task = [1, 2, 3]
    return (
        <div className='home container'>
            <div className="welcome">
                <h1>Welcome {name}</h1>
                <h4>This is your task list, where you can add, delete and update the tasks</h4>

                <div className="input">
                    <input
                        type="text"
                        value={title}
                        setTtle={(e) => setTitle(e.target.value)}
                        placeholder="Title of the task"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description of the task"
                    />
                    <button onClick={addHandler}>Add Task</button>
                </div>
            </div>

            <div className="allTasks container">
                <h1>All Tasks</h1>

                <div className="taskArray container">
                    {task.map((task) => (
                        <Task key={task} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home