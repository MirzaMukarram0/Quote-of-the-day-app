import React from 'react'
import { motion } from 'framer-motion'

export default function QuoteCard({ quote, onFavourite, isFav }){
  if(!quote) return null

  return (
    <motion.article
      className="quote-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5 }}
    >
      <blockquote>
        <p className="quote-text">“{quote.text}”</p>
        <footer className="quote-author">— {quote.author}</footer>
      </blockquote>

      <div className="quote-meta">
        <div className="quote-tags">{(quote.tags || []).slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}</div>
        <div className="quote-actions">
          <button className={`btn ${isFav? 'btn-primary' : 'btn-outline'}`} onClick={onFavourite}>
            {isFav ? 'Favorited' : 'Add to favourites'}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
