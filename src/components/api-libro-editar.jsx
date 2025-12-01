'use client'

import { editarLibroAPI } from '@/lib/actions'
import { useState } from 'react'
import Boton from './boton'

function LibroEditarAPI({ libro }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)} title='EDITAR'>✏️</button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className='flex flex-col bg-slate-200 p-4 rounded-md'>
                        <h2 className="text-xl text-slate-600 pb-1 mb-2 border-b-2 border-b-slate-400">
                            Editar libro (API)
                        </h2>
                        <form action={editarLibroAPI} onSubmit={() => setShowModal(false)} className="flex flex-col gap-3">
                            <input type="hidden" name="id" value={libro.id} />
                            <label htmlFor="titulo" className='flex flex-col'>
                                Título
                                <input type="text" id="titulo" name="titulo" defaultValue={libro.titulo}
                                    className="p-2 rounded-md"
                                    placeholder="Título del libro" />
                            </label>
                            <label htmlFor="editorial" className='flex flex-col'>
                                Editorial
                                <input type="text" id="editorial" name="editorial" defaultValue={libro.editorial}
                                    className="p-2 rounded-md"
                                    placeholder="Editorial" />
                            </label>
                            <label htmlFor="fecha_de_publicacion" className='flex flex-col'>
                                Fecha de publicación
                                <input type="date" id="fecha_de_publicacion" name="fecha_de_publicacion" defaultValue={libro.fecha_de_publicacion}
                                    className="p-2 rounded-md" />
                            </label>
                            <Boton />
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default LibroEditarAPI