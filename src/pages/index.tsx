import Header from '@/components/header'
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useAccount, useSignMessage } from 'wagmi'

function TextareaWithButton() {
  const [signedMessage, setSignedMessage] = useState('')
  const [message, setMessage] = useState('')
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data, isError, isLoading, isSuccess, signMessageAsync } =
    useSignMessage()

  const handleSign = useCallback(async () => {
    // Handle the signing logic here
    try {
      const signedMessage = await signMessageAsync({ message })
      setSignedMessage(signedMessage)
    } catch (e) {
      console.log(e)
    }
  }, [signMessageAsync, message])

  useEffect(() => {
    if (signedMessage.length > 0) {
    }
  }, [signedMessage])

  const hasSigned = signedMessage.length > 0

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-700">
          Message to sign
        </h2>
        {!hasSigned && (
          <SigningForm
            handleSign={handleSign}
            message={message}
            setMessage={setMessage}
          />
        )}
        {hasSigned && (
          <CreateCIDForm message={message} signature={signedMessage} />
        )}
      </div>
    </div>
  )
}

export default TextareaWithButton

function CreateCIDForm({
  message,
  signature,
}: {
  message: string
  signature: string
}) {
  return (
    <>
      <textarea
        value={message}
        disabled={true}
        className="w-full h-32 p-3 border rounded-md resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      ></textarea>
      <h2 className="mb-2 text-l font-bold text-gray-700">Signature</h2>
      <pre className="prose max-w-md whitespace-pre-wrap break-all">
        {signature}
      </pre>
      <button className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
        createCID
      </button>
    </>
  )
}

function SigningForm({
  handleSign,
  message,
  setMessage,
}: {
  handleSign: () => Promise<void>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
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

// type HandleSignType = () => Promise<void>
