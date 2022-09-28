import { initTRPC } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import { itemIdSchema, itemSchema, Story, userSchema } from '~/validation.schemas'

const t = initTRPC.create()

const baseUrl = new URL('https://hacker-news.firebaseio.com/v0')

/**
 * Hacker news router for these endpoints:
 *
 * Top stories: https://hacker-news.firebaseio.com/v0/topstories.json
 * Story item: https://hacker-news.firebaseio.com/v0/item/${id}.json
 * User: https://hacker-news.firebaseio.com/v0/user/${id}.json
 * API documentation: https://github.com/HackerNews/API
 */
const appRouter = t.router({
  topStories: t.procedure.query(async () => {
    const storyIds = z
      .array(itemIdSchema)
      .parse(await fetch(`${baseUrl}/topstories.json`).then((res) => res.json()))

    const stories: Story[] = await Promise.all([
      ...storyIds.slice(0, 10).map(async (id) => {
        const story = await caller.story({ id })
        const user = await caller.user({ id: story.by })

        story.user = user

        return story
      }),
    ])

    return stories.sort((a, b) => {
      return b.score - a.score
    })
  }),
  story: t.procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (request) => {
      const { id } = request.input

      const story = await fetch(`${baseUrl}/item/${id}.json`).then((res) => res.json())

      return itemSchema.parse(story)
    }),
  user: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (request) => {
      const { id } = request.input

      const user = await fetch(`${baseUrl}/user/${id}.json`).then((res) => res.json())

      return userSchema.parse(user)
    }),
})

const caller = appRouter.createCaller({})

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
})
