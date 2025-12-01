'use client'

import { editarAutorAPI } from '@/lib/actions'
import { useState } from 'react'
import Boton from './boton'

function AutorEditarAPI({ autor }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)} title='EDITAR'>✏️</button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className='flex flex-col bg-slate-200 p-4 rounded-md'>
                        <h2 className="text-xl text-slate-600 pb-1 mb-2 border-b-2 border-b-slate-400">
                            Editar autor (API)
                        </h2>
                        <form action={editarAutorAPI} onSubmit={() => setShowModal(false)} className="flex flex-col gap-3">
                            <input type="hidden" name="id" value={autor.id} />
                            <label htmlFor="nombre" className='flex flex-col'>
                                Nombre
                                <input type="text" id="nombre" name="nombre" defaultValue={autor.nombre}
                                    className="p-2 rounded-md"
                                    placeholder="Nombre del autor" />
                            </label>
                            <label htmlFor="lugar_de_nacimiento" className='flex flex-col'>
                                Lugar de nacimiento
                                <input type="text" id="lugar_de_nacimiento" name="lugar_de_nacimiento" defaultValue={autor.lugar_de_nacimiento}
                                    className="p-2 rounded-md"
                                    placeholder="Lugar de nacimiento" />
                            </label>
                            <label htmlFor="premio_nobel" className='flex gap-2 items-center'>
                                <input type="checkbox" id="premio_nobel" name="premio_nobel" defaultChecked={autor.premio_nobel} />
                                Premio Nobel
                            </label>
                            <Boton />
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AutorEditarAPI