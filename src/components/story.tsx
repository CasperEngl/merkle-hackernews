import { formatTime } from '~/utils/format-time'
import type { Story as StoryType } from '~/validation.schemas'

type StoryProps = {
  story: StoryType
  rank: number
}

export const Story = ({ story, rank }: StoryProps) => {
  const StoryTitleWrapper = story.url ? 'a' : 'div'

  const linkProps = story.url
    ? { href: story.url, rel: 'noopener noreferrer', target: '_blank' }
    : {}

  return (
    <article key={story.id} className="flex p-2 gap-2 text-sm">
      <div className="text-gray-400 flex items-baseline gap-1">
        <span>{rank}.</span>
        <svg fill="currentColor" className="w-2.5 h-2.5" viewBox="0 0 10 10">
          <polygon points="5 1.5, 10 10, 0 10" />
        </svg>
      </div>

      <div className="flex-1">
        <StoryTitleWrapper className="flex gap-1 items-center" {...linkProps}>
          <span>{story.title}</span>

          {story.url ? (
            <span className="text-xs text-gray-500">({new URL(story.url).hostname})</span>
          ) : undefined}
        </StoryTitleWrapper>

        <div className="text-xs text-gray-500">
          {story.score} points by{' '}
          <span title={`Total karma: ${story.user?.karma.toString()}`}>{story.by}</span>{' '}
          {formatTime(story.time)} ago
        </div>
      </div>
    </article>
  )
}
