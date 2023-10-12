import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useWeb3Modal } from '@web3modal/wagmi/react'

export default function Header() {
  const { open } = useWeb3Modal()

  const handleConnectWallet = useCallback(() => {
    open()
  }, [])

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
          <h1 className="text-xl font-semibold">Off-chain signing with IPFS</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-indigo-600  border-b-4 border-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/sign"
                // activeClassName="border-b-4 border-white"
                className="block px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                Sign messages
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                // activeClassName="border-b-4 border-white"
                className="block px-4 py-2 hover:bg-indigo-600 rounded-md"
              >
                Verify
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleConnectWallet}
          className="bg-white text-indigo-500 px-6 py-2 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          Connect Wallet
        </button>
      </div>
    </header>
    // <header className="bg-indigo-500 text-white p-4">
    //   <div className="container mx-auto flex justify-between items-center">
    //     <div className="flex items-center space-x-4">
    //       <h1 className="text-2xl font-semibold"></h1>
    //       <nav>
    //         <ul className="flex space-x-4">
    //           <li>
    //             <Link
    //               href="/"
    //               className="hover:underline border-b-2 border-orange-400"
    //             >
    //               Home
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               href="/about"
    //               className="hover:underline"
    //             >
    //               About
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               href="/contact"
    //               className="hover:underline"
    //             >
    //               Contact
    //             </Link>
    //           </li>
    //         </ul>
    //       </nav>
    //     </div>

    //     <button
    //       onClick={handleConnectWallet}
    //       className="bg-white text-indigo-500 px-6 py-2 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
    //     >
    //       Connect Wallet
    //     </button>
    //   </div>
    // </header>
  )
}
