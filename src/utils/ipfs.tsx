import { UnixFS } from '@helia/unixfs'
import { dagJson } from '@helia/dag-json'
import { createHelia, Helia } from 'helia'
import { trustlessGateway } from 'helia/block-brokers'
import { CID } from 'multiformats/cid'
import { car } from '@helia/car'
import { CarWriter, CarReader } from '@ipld/car'
import toIt from 'browser-readablestream-to-it'

export async function startHttpHelia() {
  const helia = await createHelia({
    blockBrokers: [
      trustlessGateway({
        gateways: ['https://dweb.link', 'https://cf-ipfs.com'],
      }),
    ],
    libp2p: {
      start: false,
      connectionManager: {
        minConnections: 0,
      },
      services: {},
      peerDiscovery: [],
    },
  })
  await helia.libp2p.stop()

  return helia
}

export async function getUnixFsJson(fs: UnixFS, cid: CID): Promise<any> {
  const decoder = new TextDecoder()

  let unparsedJson = ''
  for await (const chunk of fs.cat(cid)) {
    unparsedJson += decoder.decode(chunk, {
      stream: true,
    })
  }
  const parsedJSON = JSON.parse(unparsedJson)

  return parsedJSON
}

export async function getJson(helia: Helia, cid: CID): Promise<any> {
  const j = dagJson(helia)

  const json = await j.get(cid)

  return json
}

export async function getSignedMessage(helia: Helia, cid: CID | string): Promise<SignedMessagePayload> {
  if (typeof cid === 'string') {
    cid = CID.parse(cid)
  }

  const json = await getJson(helia, cid)

  if (json?.message && json?.signature && json?.address) {
    return json as SignedMessagePayload
  }

  throw new Error('CID is missing the message, signature and address fields')
}

export async function getSignedMessageFromCar(helia: Helia, file: File): Promise<SignedMessageCID> {
  const stream = await file.stream()

  const reader = await CarReader.fromIterable(toIt(stream))
  const roots = await reader.getRoots()
  await car(helia).import(reader)

  if (roots.length > 1) {
    throw new Error('Only supports 1 root CID')
  }

  const rootCid = roots[0]

  const signedMessage = await getSignedMessage(helia, rootCid)
  return {
    ...signedMessage,
    cid: rootCid,
  }

  // throw new Error('CID is missing the message, signature and address fields')
}

export interface SignedMessagePayload {
  message: string
  signature: `0x${string}`
  address: `0x${string}`
}

export type SignedMessageCID = SignedMessagePayload & { cid: CID }

export async function createCidForSignedMessage(
  helia: Helia,
  { message, signature, address }: SignedMessagePayload,
) {
  const j = dagJson(helia)

  const cid = await j.add({
    address,
    message,
    signature,
  })

  return cid
}

export async function createCarBlob(helia: Helia, cid: CID) {
  const { writer, out } = await CarWriter.create(cid)
  car(helia).export(cid, writer)

  const carBlob = await carWriterOutToBlob(out)
  return carBlob
}

async function carWriterOutToBlob(out: AsyncIterable<Uint8Array>): Promise<Blob> {
  const parts = []
  for await (const part of out) {
    parts.push(part)
  }
  return new Blob(parts, { type: 'application/car' })
}

export const downloadCarFile = async (carBlob: Blob) => {
  if (carBlob == null) {
    return
  }
  const downloadEl = document.createElement('a')
  const blobUrl = window.URL.createObjectURL(carBlob)
  downloadEl.href = blobUrl
  downloadEl.download = 'signed-message.car'
  document.body.appendChild(downloadEl)
  downloadEl.click()
  window.URL.revokeObjectURL(blobUrl)
}

// Polyfill to make readablestreams async iterators in browser
// ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
//   const reader = this.getReader()
//   try {
//     while (true) {
//       const {done, value} = await reader.read()
//       if (done) return
//       yield value
//     }
//   }
//   finally {
//     reader.releaseLock()
//   }
// }
