import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { AddressIcon } from './addressicon'
import Spinner from './spinner'

const NavPaths = [
  ['/', 'Sign'],
  ['/fetch', 'Fetch & Verify'],
  ['/verify', 'Local Verify (CAR)'],
]

export default function Header() {
  const { open, close } = useWeb3Modal()
  const currentPath = usePathname()

  const { address, isConnecting, isDisconnected } = useAccount()

  const handleConnectWallet = useCallback(() => {
    open({ view: 'Account' })
  }, [open])

  // const handleCloseWallet = useCallback(() => {
  //   close()
  // }, [close])

  return (
    <header className="bg-indigo-500 text-white p-4">
      <div className="container mx-auto flex justify-around items-center">
        <div className="flex items-center space-x-3">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/ipfs-white-logo.svg"
            alt="IPFS logo"
            height={35}
            width={35}
          />
          <h1 className="hidden md:block text-xl font-semibold">Off-chain signing with IPFS</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {NavPaths.map(([path, anchor]) => (
              <li key={path}>
                <Link
                  href={path}
                  className={`block px-4 py-2 hover:bg-indigo-600   ${
                    currentPath === path ? `border-b-4 border-white` : ''
                  }`}
                >
                  {anchor}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* {address && <AddressIcon address={address} />} */}
        <w3m-button />

        {/* {isDisconnected && (
          <button
            onClick={handleConnectWallet}
            className="bg-white text-indigo-500 px-6 py-2 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Connect Wallet
          </button>
        )} */}
        {isConnecting && <Spinner />}
      </div>
    </header>
  )
}
