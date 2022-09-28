import { z } from 'zod'

export const storyIdSchema = z.number().int().positive()

export const storyIdsSchema = z.array(storyIdSchema)

export const userSchema = z.object({
  about: z.string().optional(),
  created: z.number().int().positive(),
  id: z.string(),
  karma: z.number().int().positive(),
  submitted: z.array(storyIdSchema).optional(),
})

export const storySchema = z.object({
  by: z.string(),
  user: userSchema.optional(),
  descendants: z.number().int(),
  id: storyIdSchema,
  kids: z.array(storyIdSchema).optional(),
  score: z.number().int(),
  time: z.number().int().positive(),
  title: z.string(),
  type: z.enum(['story']),
  url: z.string().url().optional(),
})

export const storiesSchema = z.array(storySchema)

export const sortBySchema = z.enum(['top', 'new'])

export type Story = z.infer<typeof storySchema>
export type SortBy = z.infer<typeof sortBySchema>
