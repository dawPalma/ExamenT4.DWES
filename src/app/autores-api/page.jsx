import AutoresAPI from '@/components/api-autores'
import { Suspense } from 'react'

function AutoresPage({ searchParams }) {
    const query = searchParams?.query || ''

    return <Suspense fallback={'Cargando autores...'}>
        <AutoresAPI query={query} />
    </Suspense>
}

export default AutoresPage
