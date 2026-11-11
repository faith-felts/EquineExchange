export async function fetchBreedSummary(breed, signal) {
  const title = encodeURIComponent(breed.trim().replaceAll(' ', '_'))
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`, { signal })
  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error(`Breed information is unavailable (HTTP ${response.status}).`)
  }
  const data = await response.json()
  return {
    title: data.title,
    extract: data.extract,
    thumbnail: data.thumbnail?.source,
    pageUrl: data.content_urls?.desktop?.page,
  }
}
