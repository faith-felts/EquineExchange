import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="container not-found"><p className="eyebrow">Wrong trail</p><h1>We can’t find that page.</h1><p>The page may have moved, or the horse listing may no longer be here.</p><Link className="button button-dark" to="/">Back to the beginning <span>↗</span></Link></section>
}
