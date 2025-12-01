'use client'

import { useState } from 'react';
import { nuevoAutorDB } from '@/lib/actions'
import { useRouter } from 'next/navigation';


function AutorNuevoDB() {
    const router = useRouter()
    const [modal, setModal] = useState(false);
    const [isPending, setIsPending] = useState(false); // Estado para deshabilitar el botón

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario
        setIsPending(true); // Deshabilitar el botón

        const formData = new FormData(event.target);
        await nuevoAutorDB(formData);

        setIsPending(false); // Habilitar el botón de nuevo
        setModal(false); // Cerrar modal
        router.refresh(); // Refrescar la ruta para ver los cambios
    };


    return (
        <div>
            <button onClick={() => setModal(true)} className="px-5 py-2 bg-blue-500 text-white rounded-md">Nuevo Autor</button>

            {
                modal &&
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Añadir nuevo autor (DB)</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">Nombre</label>
                                <input type="text" name="nombre" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">Lugar de Nacimiento</label>
                                <input type="text" name="lugar_de_nacimiento" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Premio Nobel</span>
                                    <input type="checkbox" name="premio_nobel" className="checkbox" />
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

export default AutorNuevoDB