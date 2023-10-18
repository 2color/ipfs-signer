import Header from '@/components/header'
import React, { useCallback, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

function TextareaWithButton() {
  const [text, setText] = useState('')
  const [signedMessage, setSignedMessage] = useState('')
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data, isError, isLoading, isSuccess, signMessageAsync } =
    useSignMessage()

  const handleSign = useCallback(async () => {
    // Handle the signing logic here
    try {
      const signedMessage = await signMessageAsync({ message: text })
      console.log(signedMessage)
      setSignedMessage(signedMessage)
    } catch (e) {
      console.log(e)
    }
  }, [signMessageAsync, text, setSignedMessage])

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Your Input</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-56 p-3 border rounded-md resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="Type the message that you want to sign here..."
        ></textarea>
        <button
          onClick={handleSign}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Sign
        </button>
      </div>
    </div>
  )
}

export default TextareaWithButton
