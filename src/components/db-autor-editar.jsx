'use client'

import { useState } from 'react';
import { editarAutorDB } from '@/lib/actions'
import { useRouter } from 'next/navigation';


function AutorEditarDB({ autor }) {
    const router = useRouter()
    const [modal, setModal] = useState(false);
    const [isPending, setIsPending] = useState(false); // Estado para deshabilitar el botón

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario
        setIsPending(true); // Deshabilitar el botón

        const formData = new FormData(event.target);
        await editarAutorDB(formData);

        setIsPending(false); // Habilitar el botón de nuevo
        setModal(false); // Cerrar modal
        router.refresh(); // Refrescar la ruta para ver los cambios
    };

    return (
        <div>
            <button onClick={() => setModal(true)} className="btn btn-sm btn-info" title='EDITAR'>✏️</button>

            {
                modal &&
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Editar autor (DB)</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="id" defaultValue={autor.id} />
                            <div className="form-control">
                                <label className="label">Nombre</label>
                                <input type="text" name="nombre" defaultValue={autor.nombre} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">Lugar de Nacimiento</label>
                                <input type="text" name="lugar_de_nacimiento" defaultValue={autor.lugar_de_nacimiento} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Premio Nobel</span>
                                    <input type="checkbox" name="premio_nobel" defaultChecked={autor.premio_nobel === 1} className="checkbox" />
                                </label>
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

export default AutorEditarDB