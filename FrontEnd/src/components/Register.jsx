import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const registerHandler = (e) => {
        e.preventDefault()
        // console.log(name, username, password);
    }
    return (

        <div className='main container'>
            <div className="loginSection container">
                <h1>Register</h1>
                <form className='container'>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter Your mail"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required

                    />
                    <input
                        id='password'
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        required
                    />

                    <button
                        type="submit"
                        onClick={registerHandler}
                    >
                        Register
                    </button>

                    <p className='login-register'>Already a user, click <Link to={"/login"} >here </Link>to login</p>
                </form>
            </div>
        </div>
    )
}

export default Register