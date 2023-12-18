import Header from '@/components/header'
import { SignedMessage } from '@/components/signed-message'
import { useHeliaContext } from '@/context/helia'
import { createCarBlob, createCidForSignedMessage, downloadCarFile } from '@/utils/ipfs'
import { CID } from 'multiformats/cid'
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

export default function SignPage() {
  const [signature, setSignature] = useState<`0x${string}` | undefined>()
  const [message, setMessage] = useState('')
  const [cid, setCid] = useState<CID>()
  const [error, setError] = useState('')
  const { address } = useAccount()
  const { fs, helia } = useHeliaContext()
  const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage()

  const handleSign = useCallback(async () => {
    if (!address) {
      setError('Connect wallet first')
      return
    }
    if (!fs) {
      setError('UnixFS is not instantiated')
      return
    }

    setError('')

    // Handle the signing logic here
    try {
      const signature = await signMessageAsync({ message })
      setSignature(signature)
      const cid = await createCidForSignedMessage(fs, { message, signature, address })
      setCid(cid)
    } catch (e) {
      console.log(e)
      setError(e as string)
    }
  }, [address, fs, signMessageAsync, message])

  const handleDownloadCar = useCallback(async () => {
    if (!helia) {
      setError('UnixFS not initialised')
      return
    }
    if (!cid) {
      setError('no cid')
      return
    }
    const blob = await createCarBlob(helia, cid)
    downloadCarFile(blob)
  }, [helia, cid])

  const hasSigned = signature && signature.length > 0

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-6 bg-white rounded-md shadow-md md:w-1/2 w-full">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Message to sign</h2>
        {error && <p className="p-2 bg-red-400 rounded-sm text-white">Error: {error}</p>}
        {!hasSigned && <SigningForm handleSign={handleSign} message={message} setMessage={setMessage} />}
        {hasSigned && address && cid && (
          <DownloadCar
            message={message}
            address={address}
            signature={signature}
            cid={cid}
            handleDownloadCar={handleDownloadCar}
          />
        )}
        {/* {hasSigned && cid && (
        )} */}
      </div>
    </div>
  )
}

function DownloadCar({
  message,
  signature,
  address,
  cid,
  handleDownloadCar,
}: {
  message: string
  signature: `0x${string}`
  address: `0x${string}`
  cid: CID
  handleDownloadCar: () => Promise<void>
}) {
  return (
    <div>
      <SignedMessage message={message} signature={signature} address={address} />
      <div>
        <span className="font-bold">CID: </span>
        <span className="whitespace-nowrap">{cid.toV1().toString()}</span>
      </div>

      <button
        onClick={handleDownloadCar}
        className="mt-4 px-6 py-2 max-w-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
      >
        Download CAR
      </button>
    </div>
  )
}

function SigningForm({
  handleSign,
  message,
  setMessage,
  address,
}: {
  handleSign: () => Promise<void>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  address?: string
}) {
  return (
    <>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-32 p-3 border rounded-md resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        placeholder="Type the message that you want to sign here..."
      ></textarea>
      <button
        onClick={() => handleSign()}
        className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
      >
        Sign
      </button>
    </>
  )
}
