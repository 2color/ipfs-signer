import { useHeliaContext } from '@/context/helia'
import { getSignedMessage, SignedMessagePayload } from '@/utils/ipfs'
import React, { useCallback, useState } from 'react'
import { verifyMessage } from 'viem'
import { SignedMessage } from '@/components/signed-message'

export default function FetchVerify() {
  const [error, setError] = useState('')
  const [cid, setCid] = useState('bafkreiga2b4guve3zijoxrcodstllif5u5t4dniujga7ak2yxjxqm5tnwa')
  // const [cid, setCid] = useState('bafybeielypanmhd7v2w6ijwwsrxgnpstrh6ksf5lskggke6nyrnxl4turq') // uniswap token list
  const [message, setMessage] = useState<SignedMessagePayload | undefined>()
  const [isMessageVerified, setIsMessageVerified] = useState<boolean | undefined>()

  const { helia, fs } = useHeliaContext()

  const handleFetchCid = useCallback(async () => {
    if (!fs) {
      setError('UnixFS not initialised')
      return
    }
    try {
      const message = await getSignedMessage(fs, cid)
      setMessage(message)

      // Verify the signature
      const verified = await verifyMessage({
        address: message.address,
        message: message.message,
        signature: message.signature,
      })
      setIsMessageVerified(verified)
    } catch (e: any) {
      setError(e)
    }
  }, [cid, fs])

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-6 bg-white rounded-md shadow-md md:w-1/2 w-full">
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
          className="my-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Fetch CID
        </button>
        {message && (
          <SignedMessage
            address={message.address}
            signature={message.signature}
            message={message.message}
            isMessageVerified={isMessageVerified}
          />
        )}
      </div>
    </div>
  )
}
