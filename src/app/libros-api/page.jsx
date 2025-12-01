import LibrosAPI from '@/components/api-libros'
import { Suspense } from 'react'

function LibrosPage({ searchParams }) {
    const query = searchParams?.query || ''

    return <Suspense fallback={'Cargando libros...'}>
        <LibrosAPI query={query} />
    </Suspense>
}

export default LibrosPage
