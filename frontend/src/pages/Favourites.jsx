import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QuoteCard from '../components/QuoteCard'

const QUOTE_API = import.meta.env.VITE_QUOTE_API || 'http://localhost:5000'

export default function Favourites(){
  const [favs, setFavs] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchFavs(){
    const token = localStorage.getItem('qotd_token')
    if(!token){ alert('Please login to view favourites'); return }
    try{
      setLoading(true)
      const res = await axios.get(`${QUOTE_API}/favourites`, { headers: { Authorization: `Bearer ${token}` } })
      setFavs(res.data.favourites.map(f=>f.quote))
    }catch(err){
      console.error(err)
      alert('Failed to load favourites')
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchFavs() }, [])

  return (
    <section className="container favourites">
      <h2>Your favourites</h2>
      {loading && <div>Loading...</div>}
      {!loading && favs.length === 0 && <div className="empty">No favourites yet</div>}
      <div className="grid">
        {favs.map(q => (
          <QuoteCard key={q._id} quote={q} />
        ))}
      </div>
    </section>
  )
}
