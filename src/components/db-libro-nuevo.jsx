'use client'

import { useState } from 'react';
import { nuevoLibroDB } from '@/lib/actions'
import { useRouter } from 'next/navigation';


function LibroNuevoDB() {
    const router = useRouter()
    const [modal, setModal] = useState(false);
    const [isPending, setIsPending] = useState(false); // Estado para deshabilitar el botón

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario
        setIsPending(true); // Deshabilitar el botón

        const formData = new FormData(event.target);
        await nuevoLibroDB(formData);

        setIsPending(false); // Habilitar el botón de nuevo
        setModal(false); // Cerrar modal
        router.refresh(); // Refrescar la ruta para ver los cambios
    };


    return (
        <div>
            <button onClick={() => setModal(true)} className="px-5 py-2 bg-blue-500 text-white rounded-md">Nuevo Libro</button>

            {
                modal &&
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Añadir nuevo libro (DB)</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">Título</label>
                                <input type="text" name="titulo" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">Editorial</label>
                                <input type="text" name="editorial" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">Fecha de Publicación</label>
                                <input type="date" name="fecha_de_publicacion" className="input input-bordered" />
                            </div>
                            <div className="modal-action">
                                <button type="button" onClick={() => setModal(false)} className="btn">Cerrar</button>
                                <button type="submit" className="btn btn-primary" disabled={isPending}>
                                    {isPending ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default LibroNuevoDB