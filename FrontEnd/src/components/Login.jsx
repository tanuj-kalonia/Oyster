import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (e) => {
        e.preventDefault()
        console.log(`clicked`);
    }
    return (

        <div className='main container'>
            <div className="loginSection container">
                <h1>Login</h1>
                <form action="" className='container'>
                    <input
                        type="text"
                        placeholder="Enter Your mail"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" onClick={loginHandler}> Login</button>
                    <p className='login-register'>First time here, click <Link to={"/register"} >here </Link>to register</p>

                </form>
            </div>
        </div>
    )
}

export default Login