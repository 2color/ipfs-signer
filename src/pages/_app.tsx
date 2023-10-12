import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import WagmiProvider from '@/providers/web3modal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiProvider>
  )
}
