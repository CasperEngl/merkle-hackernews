import Link from 'next/link'
import { Story } from '~/components/Story'
import { trpc } from '~/utils/trpc'

export default function Home() {
  const topStories = trpc.topStories.useQuery()

  return (
    <div className="container mx-auto">
      <header className="px-2 py-1 bg-[rgb(255,102,0)]">
        <Link href="/">
          <a className="font-bold">Hacker news</a>
        </Link>
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
