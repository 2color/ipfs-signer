import { SignedMessagePayload } from '@/utils/ipfs';
import React from 'react';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import Tooltip from '@/components/tooltip';

type MessageProps = SignedMessagePayload & {
  isMessageVerified?: boolean;
};
export const SignedMessage = ({ address, signature, message, isMessageVerified }: MessageProps) => {
  let signatureIcon;
  let tooltip = '';

  if (isMessageVerified === true) {
    signatureIcon = <CheckCircleIcon className="h-8 w-8 text-green-600" />;
    tooltip = 'The signature has been verified and is valid!';
  }
  if (isMessageVerified === false) {
    signatureIcon = <XCircleIcon className="h-8 w-8 text-red-600" />;
    tooltip = 'Invalid signature! The authenticity of the message cannot be verified';
  }

  return (
    <div className="bg-indigo-200 p-4 rounded-md">
      <h3 className="max-w-xl mb-2 text-xl font-bold ">Signed Message:</h3>

      <div className="mb-2">
        <span className="font-bold">Ethereum Address:</span> {address}
      </div>
      <div>
        <span className="font-bold">Message:</span> {message}
      </div>
      <div>
        <span>
          <Tooltip text={tooltip}>
            <span className="font-bold flex items-center">Signature: {signatureIcon}</span>
          </Tooltip>
        </span>{' '}
        <code className="break-words">{signature}</code>
      </div>
    </div>
  );
};
