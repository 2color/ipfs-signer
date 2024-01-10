import dynamic from 'next/dynamic'

const DynamicSignPage = dynamic(() => import('../components/sign-page'), {
  ssr: false,
})

export default function SignPage() {
  return <DynamicSignPage />
}
