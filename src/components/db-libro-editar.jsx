'use client'

import { useState } from 'react';
import { editarLibroDB } from '@/lib/actions'
import { useRouter } from 'next/navigation';


function LibroEditarDB({ libro }) {
    const router = useRouter()
    const [modal, setModal] = useState(false);
    const [isPending, setIsPending] = useState(false); // Estado para deshabilitar el botón

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario
        setIsPending(true); // Deshabilitar el botón

        const formData = new FormData(event.target);
        await editarLibroDB(formData);

        setIsPending(false); // Habilitar el botón de nuevo
        setModal(false); // Cerrar modal
        router.refresh(); // Refrescar la ruta para ver los cambios
    };

    // Formatear la fecha para que el input type="date" la muestre correctamente
    const formattedDate = libro.fecha_de_publicacion ? new Date(libro.fecha_de_publicacion).toISOString().split('T')[0] : '';


    return (
        <div>
            <button onClick={() => setModal(true)} className="btn btn-sm btn-info" title='EDITAR'>✏️</button>

            {
                modal &&
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Editar libro (DB)</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="id" defaultValue={libro.id} />
                            <div className="form-control">
                                <label className="label">Título</label>
                                <input type="text" name="titulo" defaultValue={libro.titulo} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">Editorial</label>
                                <input type="text" name="editorial" defaultValue={libro.editorial} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">Fecha de Publicación</label>
                                <input type="date" name="fecha_de_publicacion" defaultValue={formattedDate} className="input input-bordered" />
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

export default LibroEditarDB