import Link from 'next/link'
import Buscar from '@/components/buscar'
import { eliminarLibroAPI } from '@/lib/actions'
import { obtenerLibrosAPI } from '@/lib/data'
import LibroEditarAPI from './api-libro-editar'


async function Libros({ query }) {

    const libros = await obtenerLibrosAPI(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Listado de libros (API)
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {libros.sort((a, b) => a.createdAt - b.createdAt).reverse()
                    .map((libro) => (
                        <div key={libro.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <p>{libro.titulo}</p>
                            <div className='flex gap-6'>
                                <LibroEditarAPI libro={libro} />
                                <form action={eliminarLibroAPI}><input type="hidden" name='id' value={libro.id} /><button title='ELIMINAR'>🗑️</button></form>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Libros