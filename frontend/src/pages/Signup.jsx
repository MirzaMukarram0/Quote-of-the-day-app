import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AUTH_API = import.meta.env.VITE_AUTH_API || 'http://localhost:4000'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try{
      const res = await axios.post(`${AUTH_API}/auth/signup`, { name, email, password })
      const { token, user } = res.data
      localStorage.setItem('qotd_token', token)
      localStorage.setItem('qotd_user', JSON.stringify(user))
      navigate('/')
      window.location.reload()
    }catch(err){
      console.error(err)
      alert(err.response?.data?.message || 'Signup failed')
    }finally{ setLoading(false) }
  }

  return (
    <section className="auth container">
      <div className="card auth-card">
        <h2>Create account</h2>
        <form onSubmit={submit}>
          <label>Name
            <input value={name} onChange={e=>setName(e.target.value)} required />
          </label>
          <label>Email
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>
          <label>Password
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
          </label>
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
        </form>
      </div>
    </section>
  )
}
