export async function getLatestBlock() {
  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['latest', false],
    }),
  }

  try {
    const req = await fetch('https://eth.llamarpc.com', options)
    const block = await req.json()
    return block
  } catch (e) {
    throw e
  }
}
