import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Story } from '~/components/Story'
import { trpc } from '~/utils/trpc'
import { SortBy } from '~/validation.schemas'

export default function Home() {
  const router = useRouter()
  const [sortBy, setSortBy] = useState<SortBy>(
    typeof window === 'undefined'
      ? 'top'
      : (new URL(window.location.href).searchParams.get('sortBy') as SortBy) || 'top'
  )
  const topStories = trpc.topStories.useQuery({ sortBy })

  useEffect(() => {
    if (typeof window === 'undefined' || router.query.sortBy === sortBy) {
      return
    }

    const url = new URL(window.location.href)

    url.searchParams.set('sortBy', sortBy)

    router.replace(url)
  }, [router, sortBy])

  return (
    <div className="container mx-auto">
      <header className="px-2 py-1 flex items-center justify-between bg-[rgb(255,102,0)]">
        <Link href="/">
          <a className="font-bold">Hacker news</a>
        </Link>

        <div className="text-xs inline-flex gap-1">
          <span>Sort by</span>
          <select
            name="scoreSortBy"
            id="scoreSortBy"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value as SortBy)
            }}
          >
            <option value="top">Top</option>
            <option value="new">New</option>
          </select>
        </div>
      </header>

      <main className="bg-[rgb(246,246,239)] pb-1">
        {topStories.isError ? (
          <div className="text-center text-red-500">{topStories.error.message}</div>
        ) : topStories.isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          topStories.data?.map((story, index) => (
            <Story key={story.id} story={story} rank={index + 1} />
          ))
        )}
      </main>
    </div>
  )
}
