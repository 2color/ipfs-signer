import { IRequest, Router, createCors, json } from 'itty-router'
import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
import { importDAG } from '@ucanto/core/delegation'
import { CarReader } from '@ipld/car'
import * as Signer from '@ucanto/principal/ed25519'

export interface Env {
	W3_KEY: string
	W3_PROOF: string
}
type CF = [env: Env, context: ExecutionContext]

const router = Router<IRequest, CF>()

const { preflight, corsify } = createCors({
	origins: ['*'],
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
})

router.all('*', preflight)

router.post('/signature', async (request, env) => {
	const principal = Signer.parse(env.W3_KEY)
	const store = new StoreMemory()
	const client = await Client.create({ principal, store })
	// Add proof that this agent has been delegated capabilities on the space
	const proof = await parseProof(env.W3_PROOF)
	const space = await client.addSpace(proof)
	await client.setCurrentSpace(space.did())

	try {
		const cid = await client.uploadCAR(await request.blob())
		console.log(cid)
		return new Response(JSON.stringify({ cid: cid.toString() }), { status: 200 })
	} catch (e) {
		console.log((e as Error).stack)
		return new Response((e as Error).toString(), { status: 500 })
	}
})

/** @param {string} data Base64 encoded CAR file */
async function parseProof(data: string) {
	const blocks = []
	const reader = await CarReader.fromBytes(base64ToUint8(data))

	for await (const block of reader.blocks()) {
		blocks.push(block)
	}
	return importDAG(blocks)
}

router.get('/', () => 'Hello, world! This is the root page of your Worker template.')

export default {
	// @ts-ignore
	fetch: (...args) => router.handle(...args).then(corsify),
}

const base64ToUint8 = (str: string): Uint8Array => Uint8Array.from(atob(str), (c) => c.charCodeAt(0))
