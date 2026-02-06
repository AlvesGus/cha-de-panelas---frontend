import { Suspense } from 'react'
import ListPresent from './list-present'
import Loader from '@/components/ui/loader'

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center py-10">
          <Loader />
        </div>
      }
    >
      <ListPresent />
    </Suspense>
  )
}
