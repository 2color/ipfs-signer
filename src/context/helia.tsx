import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

import type { Helia } from 'helia'
import { startHttpHelia } from '@/utils/ipfs'
import { UnixFS, unixfs } from '@helia/unixfs'

// 👇 The context type will be avilable "anywhere" in the app
interface HeliaContextInterface {
  helia?: Helia
  fs?: UnixFS
}
export const heliaContext = createContext<HeliaContextInterface>({})

interface WrapperProps {
  children?: ReactNode
}

export function HeliaProvider({ children }: WrapperProps) {
  const [helia, setHelia] = useState<Helia>()
  const [fs, setFs] = useState<UnixFS>()

  useEffect(() => {
    const init = async () => {
      if (helia) return

      try {
        const helia = await startHttpHelia()
        const fs = unixfs(helia)

        setHelia(helia)
        setFs(fs)

        // @ts-ignore
        window.helia = helia
      } catch (e) {
        console.error('failed to start Helia', e)
      }
    }

    init()
  }, [setHelia, setFs, helia])

  return <heliaContext.Provider value={{ helia, fs }}>{children}</heliaContext.Provider>
}

export function useHeliaContext() {
  return useContext(heliaContext)
}
