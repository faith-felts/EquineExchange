import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchBreedSummary } from './wikipedia.js'

afterEach(() => vi.unstubAllGlobals())

describe('fetchBreedSummary', () => {
  it('uses the Morgan horse article instead of the Morgan disambiguation page', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        title: 'Morgan horse',
        extract: 'The Morgan horse is one of the earliest horse breeds developed in the United States.',
        content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Morgan_horse' } },
      }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const result = await fetchBreedSummary('Morgan')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://en.wikipedia.org/api/rest_v1/page/summary/Morgan_horse',
      { signal: undefined },
    )
    expect(result.title).toBe('Morgan horse')
    expect(result.extract).toContain('earliest horse breeds')
    expect(result.pageUrl).toBe('https://en.wikipedia.org/wiki/Morgan_horse')
  })
})
