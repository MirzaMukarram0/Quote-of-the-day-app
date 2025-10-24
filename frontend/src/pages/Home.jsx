import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QuoteCard from '../components/QuoteCard'
import { motion } from 'framer-motion'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001'

export default function Home(){
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [favourited, setFavourited] = useState(false)

  async function fetchQuote(){
    try{
      setLoading(true)
      const res = await axios.get(`${API_BASE}/quotes/random`)
      setQuote(res.data.quote || res.data)
    }catch(err){
      console.error(err)
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchQuote() }, [])

  async function toggleFavourite(){
    const token = localStorage.getItem('qotd_token')
    if(!token){
      alert('Please login to save favourites')
      return
    }
    try{
      const headers = { Authorization: `Bearer ${token}` }
      if(!favourited){
        await axios.post(`${API_BASE}/favourites/add/${quote._id}`, {}, { headers })
        setFavourited(true)
      } else {
        await axios.delete(`${API_BASE}/favourites/remove/${quote._id}`, { headers })
        setFavourited(false)
      }
    }catch(err){
      console.error(err)
      alert('An error occurred while updating favourites')
    }
  }

  return (
    <section className="home container">
      <motion.div className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="hero-title">Daily words to lift your day</h1>
        <p className="hero-sub">Discover, save and share thoughtful quotes.</p>

        <div className="actions">
          <button className="btn btn-lg" onClick={fetchQuote} disabled={loading}>{loading ? 'Loading...' : 'New Quote'}</button>
        </div>

        <div className="quote-area">
          {quote ? (
            <QuoteCard quote={quote} onFavourite={toggleFavourite} isFav={favourited} />
          ) : (
            <div className="empty">No quote available</div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
