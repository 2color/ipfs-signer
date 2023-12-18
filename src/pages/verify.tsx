import { useHeliaContext } from '@/context/helia'
import { getSignedMessage, getSignedMessageFromCar, SignedMessagePayload } from '@/utils/ipfs'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { verifyMessage } from 'viem'
import { SignedMessage } from '@/components/signed-message'

export default function Verify() {
  const [error, setError] = useState('')
  const [cid, setCid] = useState('bafkreiga2b4guve3zijoxrcodstllif5u5t4dniujga7ak2yxjxqm5tnwa')
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [message, setMessage] = useState<SignedMessagePayload | undefined>()
  const [isMessageVerified, setIsMessageVerified] = useState<boolean | undefined>()

  const { helia, fs } = useHeliaContext()

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      // debugger
      // Access the selected file from the event
      const file = event.target.files?.[0]

      if (helia && fs && file) {
        const message = await getSignedMessageFromCar(helia, fs, file)

        // Verify the signature
        const verified = await verifyMessage({
          address: message.address,
          message: message.message,
          signature: message.signature,
        })
        console.log('woot', verified)
        setIsMessageVerified(verified)
        setMessage(message)
      }
      setSelectedFile(file)
    },
    [fs, helia],
  )

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-6 bg-white rounded-md shadow-md md:w-1/2 w-full">
        <h2 className="max-w-2xl mb-4 text-xl font-bold text-gray-700">Fetch & Verify</h2>
        {error && <p className="p-2 bg-red-400 rounded-sm text-white">Error: {error}</p>}

        {!message && (
          <input
            id="content-id"
            type="file"
            accept=".car"
            onChange={handleFileChange}
            className="w-full mt-2 p-3 border rounded-md resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="CAR"
          />
        )}

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
