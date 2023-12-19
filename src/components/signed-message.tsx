import { SignedMessagePayload } from '@/utils/ipfs'
import React from 'react'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import Tooltip from '@/components/tooltip'

type MessageProps = SignedMessagePayload & {
  isMessageVerified?: boolean
  cid: string
}
export const SignedMessage = ({ address, signature, message, isMessageVerified, cid }: MessageProps) => {
  let signatureIcon
  let tooltip = ''

  if (isMessageVerified === true) {
    signatureIcon = <CheckCircleIcon className="h-8 w-8 text-green-600" />
    tooltip = 'The signature has been verified and is valid!'
  }
  if (isMessageVerified === false) {
    signatureIcon = <XCircleIcon className="h-8 w-8 text-red-600" />
    tooltip = 'Invalid signature! The authenticity of the message cannot be verified'
  }

  return (
    <div className="flex flex-col bg-indigo-200 p-4 rounded-md">
      <h3 className="max-w-xl  text-xl font-bold self-center ">Signed Message</h3>
      <div className="self-center mb-2">
        <span className="text-bold">
          {/* {cid.slice(0, 4)}...{cid.slice(-4)} */}
          (cid: <code>{cid}</code>)
        </span>
      </div>
      <div>
        <span className="font-bold">Message:</span> <span className="text-teal-600">{message}</span>
      </div>
      <div className="">
        <span className="font-bold">Ethereum Address:</span> {address}
      </div>
      <div>
        <span>
          {isMessageVerified === undefined ? (
            <span className="font-bold flex items-center">Signature: {signatureIcon}</span>
          ) : (
            <Tooltip text={tooltip}>
              <span className="font-bold flex items-center">Signature: {signatureIcon}</span>
            </Tooltip>
          )}
        </span>{' '}
        <code className="break-words">{signature}</code>
      </div>
    </div>
  )
}
