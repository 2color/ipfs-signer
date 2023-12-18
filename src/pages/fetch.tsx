import Header from '@/components/header'
import { useHeliaContext } from '@/context/helia'
import { getUnixFsJson } from '@/utils/ipfs'
import { CID } from 'multiformats'
import React, { useCallback, useState } from 'react'
import { use } from 'wagmi'

export default function Verify() {
  const [error, setError] = useState('')
  const [cid, setCid] = useState('bafkreigtfng5txmzlyxnwga2ixhx6xrpl5d4i7c6ubhahqxrqdm4m2fkla')
  // const [cid, setCid] = useState('bafybeielypanmhd7v2w6ijwwsrxgnpstrh6ksf5lskggke6nyrnxl4turq') // uniswap token list
  const [cidContent, setCidContent] = useState('')
  const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage()
  const { helia, fs } = useHeliaContext()

  const handleVerify = useCallback(async () => {
  }, [])
  const handleFetchCid = useCallback(async () => {
    if (!fs) {
      setError('UnixFS not initialised')
      return
    }

    try {
      const json = await getUnixFsJson(fs, cid)

      setCidContent(json)
    } catch (e: any) {
      setError(e)
    }
  }, [cid, fs])

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-6 bg-white rounded-md shadow-md w-1/3">
        <h2 className="max-w-2xl mb-4 text-xl font-bold text-gray-700">Fetch & Verify</h2>
        {error && <p className="p-2 bg-red-400 rounded-sm text-white">Error: {error}</p>}
        <label htmlFor="content-id" className="block text-sm font-medium leading-6 text-gray-900">
          CID
        </label>
        <input
          value={cid}
          id="content-id"
          type="text"
          onChange={(e) => setCid(e.target.value)}
          className="w-full mt-2 p-3 border rounded-md resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="bafy..."
        />
        <button
          onClick={handleFetchCid}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Fetch CID
        </button>
        {cidContent && (
          <>
            <pre className="mb-2 prose max-w-md whitespace-pre-wrap break-all">{JSON.stringify(cidContent, null, '\t')}</pre>
            <button
              onClick={handleVerify}
              className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
            >
              Verify Signature
            </button>
          </>
        )}
        {/* <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Signed message
        </label>
        <textarea
          value={signedMessage}
          onChange={(e) => setSignedMessage(e.target.value)}
          className="w-full h-56 p-3 border rounded-md resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="Paste the sign message here..."
        ></textarea> */}
        {/* <button
          onClick={handleVerify}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Verify
        </button> */}
      </div>
    </div>
  )
}
