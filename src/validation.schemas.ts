import { z } from 'zod'

export const itemIdSchema = z.number().int().positive()

// https://github.com/HackerNews/API#users
export const userSchema = z.object({
  about: z.string().optional(),
  created: itemIdSchema,
  id: z.string(),
  karma: itemIdSchema,
  submitted: z.array(itemIdSchema).optional(),
})

// https://github.com/HackerNews/API#items
export const itemSchema = z.object({
  id: itemIdSchema,
  delete: z.boolean().optional(),
  type: z.enum(['job', 'story', 'comment', 'poll', 'pollopt']),
  by: z.string(),
  time: itemIdSchema,
  text: z.string().optional(),
  dead: z.boolean().optional(),
  parent: itemIdSchema.optional(),
  poll: itemIdSchema.optional(),
  kids: z.array(itemIdSchema).optional(),
  url: z.string().url().optional(),
  score: z.number().int(),
  title: z.string(),
  parts: z.array(itemIdSchema).optional(),

  /**
   * We need to get the user for each story to read their karma.
   * This is not part of the API, but we can add it here, and
   * transform the story in the topStories query.
   */
  user: userSchema.optional(),
})

export type Story = z.infer<typeof itemSchema>
