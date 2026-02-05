import { Suspense } from 'react'
import ListPresent from './list-present'

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ListPresent />
    </Suspense>
  )
}
