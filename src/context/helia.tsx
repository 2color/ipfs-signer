import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

import { Helia, createHeliaHTTP } from '@helia/http'

// 👇 The context type will be avilable "anywhere" in the app
interface HeliaContextInterface {
  helia?: Helia
}
export const heliaContext = createContext<HeliaContextInterface>({})

interface WrapperProps {
  children?: ReactNode
}

export function HeliaProvider({ children }: WrapperProps) {
  const [helia, setHelia] = useState<Helia>()

  useEffect(() => {
    const init = async () => {
      if (helia) return

      try {
        const helia = await createHeliaHTTP()

        setHelia(helia)

        // @ts-ignore
        window.helia = helia
      } catch (e) {
        console.error('failed to start Helia', e)
      }
    }

    init()
  }, [setHelia, helia])

  return <heliaContext.Provider value={{ helia }}>{children}</heliaContext.Provider>
}

export function useHeliaContext() {
  return useContext(heliaContext)
}
