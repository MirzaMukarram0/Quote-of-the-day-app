import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(){
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('qotd_user') || 'null')

  function logout(){
    localStorage.removeItem('qotd_token')
    localStorage.removeItem('qotd_user')
    navigate('/')
    window.location.reload()
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand" onClick={() => navigate('/') }>
          <div className="logo">Q</div>
          <div className="title">
            <div className="name">Quote of the Day</div>
            <div className="tag">Inspiration daily</div>
          </div>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favourites" className="nav-link">Favourites</Link>
          {user ? (
            <>
              <span className="nav-user">{user.name}</span>
              <button className="btn btn-ghost" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/signup" className="btn btn-outline">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
