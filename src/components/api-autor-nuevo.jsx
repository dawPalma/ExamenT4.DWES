import { nuevoAutorAPI } from '@/lib/actions'
import Boton from './boton'

function AutorNuevoAPI() {
    return (
        <div className="p-4 my-2 rounded-md bg-slate-200">
            <h2 className="text-xl text-slate-600 pb-1 mb-2 border-b-2 border-b-slate-400">
                Nuevo autor (API)
            </h2>
            <form action={nuevoAutorAPI} className="flex flex-col gap-3">
                <label htmlFor="nombre" className='flex flex-col'>
                    Nombre
                    <input type="text" id="nombre" name="nombre"
                        className="p-2 rounded-md"
                        placeholder="Nombre del autor" />
                </label>
                <label htmlFor="lugar_de_nacimiento" className='flex flex-col'>
                    Lugar de nacimiento
                    <input type="text" id="lugar_de_nacimiento" name="lugar_de_nacimiento"
                        className="p-2 rounded-md"
                        placeholder="Lugar de nacimiento" />
                </label>
                <label htmlFor="premio_nobel" className='flex gap-2 items-center'>
                    <input type="checkbox" id="premio_nobel" name="premio_nobel" />
                    Premio Nobel
                </label>
                <Boton />
            </form>
        </div>
    )
}

export default AutorNuevoAPI
