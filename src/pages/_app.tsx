import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppType } from 'next/app'
import '~/styles/globals.css'
import { trpc } from '~/utils/trpc'

const HackernewsApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />

      {process.env.NODE_ENV === 'development' && typeof window !== 'undefined' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </>
  )
}

export default trpc.withTRPC(HackernewsApp)
