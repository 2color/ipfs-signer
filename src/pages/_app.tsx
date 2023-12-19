import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import Web3Modal from '@/context/web3modal'
import { HeliaProvider } from '@/context/helia'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Modal>
      <HeliaProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HeliaProvider>
    </Web3Modal>
  )
}
