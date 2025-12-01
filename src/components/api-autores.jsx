import Link from 'next/link'
import Buscar from '@/components/buscar'
import { eliminarAutorAPI } from '@/lib/actions'
import { obtenerAutoresAPI } from '@/lib/data'
import AutorEditarAPI from './api-autor-editar'


async function Autores({ query }) {

    const autores = await obtenerAutoresAPI(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Listado de autores (API)
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {autores.sort((a, b) => a.createdAt - b.createdAt).reverse()
                    .map((autor) => (
                        <div key={autor.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <p>{autor.nombre}</p>
                            <div className='flex gap-6'>
                                <AutorEditarAPI autor={autor} />
                                <form action={eliminarAutorAPI}><input type="hidden" name='id' value={autor.id} /><button title='ELIMINAR'>🗑️</button></form>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Autores
