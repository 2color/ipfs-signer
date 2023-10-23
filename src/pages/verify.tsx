import Header from '@/components/header'
import React, { useState } from 'react'

function TextareaWithButton() {
  const [signedMessage, setSignedMessage] = useState('')
  const [cid, setCid] = useState('')

  const handleVerify = () => {
    // Handle the verification logic here
    console.log('Verifying...:')
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Signature</h2>

        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          CID
        </label>
        <input
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          className="w-full mt-2 p-3 border rounded-md resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="bafy..."
        />
        <label
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
        ></textarea>
        <button
          onClick={handleVerify}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Verify
        </button>
      </div>
    </div>
  )
}

export default TextareaWithButton
