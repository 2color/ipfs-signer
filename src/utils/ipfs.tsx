import { UnixFS } from '@helia/unixfs'
import { createHelia, Helia } from 'helia'
import { trustlessGateway } from 'helia/block-brokers'
import { CID } from 'multiformats/cid'
import { car } from '@helia/car'
import { CarWriter } from '@ipld/car/writer'

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

export async function getUnixFsJson(fs: UnixFS, cid: string): Promise<unknown> {
  const decoder = new TextDecoder()
  const parsedCid = CID.parse(cid)

  let unparsedJson = ''
  for await (const chunk of fs.cat(parsedCid)) {
    unparsedJson += decoder.decode(chunk, {
      stream: true,
    })
  }
  const parsedJSON = JSON.parse(unparsedJson)

  return parsedJSON
}

interface signedMessagePayload {
  message: string
  signature: string
  address: string
}

export async function createCidForSignedMessage(
  fs: UnixFS,
  { message, signature, address }: signedMessagePayload,
) {
  const encoder = new TextEncoder()
  const cidContent = encoder.encode(
    JSON.stringify({
      address,
      message,
      signature,
    }),
  )

  const cid = await fs.addBytes(cidContent)
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
