// https://github.com/joe-bell/cva
import { cva } from 'cva'
import type { VariantProps } from 'cva'

/**
 * CVA allows you to define a component's variants in a single place, and then
 * use them in your JSX. This is a great way to keep your component variants
 * consistent across your codebase.
 *
 * Explanation of what CVA is at its core: https://github.com/joe-bell/cva#other-use-cases
 *
 * "Although primarily designed for handling class names, at its core,
 * cva is really just a fancy way of managing a string..."
 */
const statusMessage = cva(['py-3 text-center'], {
  variants: {
    type: {
      neutral: ['text-gray-500'],
      error: ['text-red-500'],
    },
  },
  defaultVariants: {
    type: 'neutral',
  },
})

type StatusMessageProps = VariantProps<typeof statusMessage> & {
  children: React.ReactNode
}

export const StatusMessage = ({ type }: StatusMessageProps) => {
  return <div className={statusMessage({ type })}>Loading...</div>
}
