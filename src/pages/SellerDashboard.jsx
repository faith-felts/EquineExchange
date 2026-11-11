import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuctions } from '../context/AuctionContext.jsx'

const emptyForm = { name: '', breed: '', age: '', location: '', discipline: '', description: '', startingBid: '', image: '', imageAlt: '', endsAt: '' }

export default function SellerDashboard() {
  const { horses, addHorse } = useAuctions()
  const [form, setForm] = useState(emptyForm)
  const [notice, setNotice] = useState('')
  const [createdHorse, setCreatedHorse] = useState(null)
  const myListings = horses.filter((horse) => horse.seller === 'Your stable')

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function submitListing(event) {
    event.preventDefault()
    const horse = addHorse({
      ...form,
      age: Number(form.age),
      image: form.image || 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85',
      imageAlt: form.imageAlt || `${form.name}, listed horse`,
    })
    setCreatedHorse(horse)
    setNotice(`${horse.name} is now listed in the marketplace.`)
    setForm(emptyForm)
  }

  return (
    <section className="container page-section seller-page">
      <div className="page-banner seller-banner"><div><p className="eyebrow">Seller studio</p><h1>Your horse, their next chapter.</h1><p>Create a thoughtful listing and introduce your horse to the right people.</p></div><span className="banner-ornament" aria-hidden="true">✳</span></div>
      <div className="seller-dashboard">
        <div className="seller-listings"><div className="dashboard-heading"><div><p className="eyebrow">Your stable</p><h2>Your listings <span>{myListings.length}</span></h2></div><span className="demo-tag">DEMO MODE</span></div>
          {myListings.length ? <div className="seller-listing-list">{myListings.map((horse) => <article className="seller-listing" key={horse.id}><img src={horse.image} alt={horse.imageAlt} /><div><p className="eyebrow">{horse.breed} · {horse.age} years</p><h3><Link to={`/horses/${horse.id}`}>{horse.name}</Link></h3><span>{horse.bids.length} bids · ${horse.currentBid.toLocaleString()}</span></div><span className="listing-live">● Live</span></article>)}</div> : <div className="seller-empty"><span>✳</span><h3>A fresh start.</h3><p>Your listings will live here. Create one when you’re ready.</p></div>}
        </div>
        <div className="listing-form-card"><p className="eyebrow">A good introduction matters</p><h2>Create a listing</h2><p className="form-intro">Share the details that help a future partner picture life with your horse.</p>
          <form className="listing-form" onSubmit={submitListing}>
            <label>Horse’s name<input name="name" value={form.name} onChange={updateField} required placeholder="e.g. Clover" /></label>
            <div className="form-row"><label>Breed<input name="breed" value={form.breed} onChange={updateField} required placeholder="e.g. Morgan" /></label><label>Age<input name="age" type="number" min="1" max="40" value={form.age} onChange={updateField} required placeholder="Years" /></label></div>
            <div className="form-row"><label>Location<input name="location" value={form.location} onChange={updateField} required placeholder="Town, State" /></label><label>Discipline<input name="discipline" value={form.discipline} onChange={updateField} required placeholder="e.g. Trail" /></label></div>
            <label>Starting bid (USD)<input name="startingBid" type="number" min="1" value={form.startingBid} onChange={updateField} required placeholder="5000" /></label>
            <label>Tell us about your horse<textarea name="description" value={form.description} onChange={updateField} required rows="4" placeholder="What makes this horse special?" /></label>
            <label>Photo URL <span className="optional">(optional)</span><input name="image" type="url" value={form.image} onChange={updateField} placeholder="https://…" /></label>
            <label>Auction end date <span className="optional">(optional)</span><input name="endsAt" type="date" value={form.endsAt} onChange={updateField} /></label>
            <button type="submit" className="button button-dark form-submit">Publish listing <span>↗</span></button>
            <p className="form-notice" role="status">{notice}{createdHorse && <> <Link to={`/horses/${createdHorse.id}`}>View listing →</Link></>}</p>
          </form>
          <p className="demo-notice">Demo marketplace: listings are saved in memory for this session. No account or payment is required.</p>
        </div>
      </div>
    </section>
  )
}
