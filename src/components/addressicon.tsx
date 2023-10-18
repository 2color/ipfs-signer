import { blo } from 'blo'

export function AddressIcon({ address }: { address: `0x${string}` }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="h-10" alt={address} src={blo(address)} />
}
