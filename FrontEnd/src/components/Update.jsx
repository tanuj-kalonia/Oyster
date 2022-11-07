import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Update = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    // const [completed, setCompleted] = useState(false)


    const registerHandler = (e) => {
        e.preventDefault()
        // console.log(name, username, password);
    }
    return (

        <div className='main container'>
            <div className="loginSection container">
                <h1>Update Task</h1>
                <form className='container'>
                    <input
                        type="text"
                        placeholder="New Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="New Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required

                    />

                    <button
                        type="submit"
                        onClick={registerHandler}
                    >
                        Update
                    </button>
                    <Link to={"/user"} ><button>Cancel</button></Link>


                </form>
            </div>
        </div>
    )
}

export default Update;