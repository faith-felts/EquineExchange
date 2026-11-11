import { useMemo, useState } from 'react'
import HorseCard from '../components/HorseCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { useAuctions } from '../context/AuctionContext.jsx'

export default function Auctions() {
  const { horses } = useAuctions()
  const [search, setSearch] = useState('')
  const [breed, setBreed] = useState('All breeds')
  const [discipline, setDiscipline] = useState('All disciplines')
  const [sort, setSort] = useState('Featured')
  const breeds = useMemo(() => ['All breeds', ...new Set(horses.map((horse) => horse.breed))], [horses])
  const disciplines = useMemo(() => ['All disciplines', ...new Set(horses.map((horse) => horse.discipline))], [horses])
  const visibleHorses = useMemo(() => {
    const query = search.trim().toLowerCase()
    const results = horses.filter((horse) => {
      const matchesSearch = !query || [horse.name, horse.breed, horse.location, horse.discipline].some((value) => value.toLowerCase().includes(query))
      return matchesSearch && (breed === 'All breeds' || horse.breed === breed) && (discipline === 'All disciplines' || horse.discipline === discipline)
    })
    if (sort === 'Bid: low to high') results.sort((a, b) => a.currentBid - b.currentBid)
    if (sort === 'Bid: high to low') results.sort((a, b) => b.currentBid - a.currentBid)
    return results
  }, [horses, search, breed, discipline, sort])

  return (
    <section className="container page-section">
      <div className="page-banner"><div><p className="eyebrow">The marketplace</p><h1>Find your horse.</h1><p>Browse thoughtful listings from horse people across the country.</p></div><span className="banner-ornament" aria-hidden="true">✳</span></div>
      <SectionHeading eyebrow="Open auctions" title={`${visibleHorses.length} ${visibleHorses.length === 1 ? 'horse' : 'horses'} to meet`} description="Take your time. The right connection is worth finding." />
      <div className="filter-bar">
        <label className="search-field"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search horses, breeds, locations…" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search horses" /></label>
        <label className="select-field"><span className="sr-only">Filter by breed</span><select value={breed} onChange={(event) => setBreed(event.target.value)}>{breeds.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="select-field"><span className="sr-only">Filter by discipline</span><select value={discipline} onChange={(event) => setDiscipline(event.target.value)}>{disciplines.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="select-field"><span className="sr-only">Sort listings</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Bid: low to high</option><option>Bid: high to low</option></select></label>
      </div>
      {visibleHorses.length
        ? <div className="horse-grid">{visibleHorses.map((horse) => <HorseCard key={horse.id} horse={horse} />)}</div>
        : <div className="empty-state"><span>⌕</span><h2>No horses found just yet.</h2><p>Try a different search or clear one of your filters.</p><button className="button button-outline" onClick={() => { setSearch(''); setBreed('All breeds'); setDiscipline('All disciplines') }}>Clear filters</button></div>}
    </section>
  )
}
