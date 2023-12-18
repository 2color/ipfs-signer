import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import WagmiProvider from '@/providers/web3modal'
import { HeliaProvider } from '@/context/helia'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <HeliaProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HeliaProvider>
    </WagmiProvider>
  )
}
