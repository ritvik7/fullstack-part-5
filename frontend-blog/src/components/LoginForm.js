import React, { useState } from 'react'

const LoginForm = ({loginUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    loginUser({username, password})
  }

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        username <input value={username} onChange={({target}) => setUsername(target.value)}/> <br/>
        password <input value={password}  onChange={({target}) => setPassword(target.value)} type='password'/> <br/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
