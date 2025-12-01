import { nuevoLibroAPI } from '@/lib/actions'
import Boton from './boton'

function LibroNuevoAPI() {
    return (
        <div className="p-4 my-2 rounded-md bg-slate-200">
            <h2 className="text-xl text-slate-600 pb-1 mb-2 border-b-2 border-b-slate-400">
                Nuevo libro (API)
            </h2>
            <form action={nuevoLibroAPI} className="flex flex-col gap-3">
                <label htmlFor="titulo" className='flex flex-col'>
                    Título
                    <input type="text" id="titulo" name="titulo"
                        className="p-2 rounded-md"
                        placeholder="Título del libro" />
                </label>
                <label htmlFor="editorial" className='flex flex-col'>
                    Editorial
                    <input type="text" id="editorial" name="editorial"
                        className="p-2 rounded-md"
                        placeholder="Editorial" />
                </label>
                <label htmlFor="fecha_de_publicacion" className='flex flex-col'>
                    Fecha de publicación
                    <input type="date" id="fecha_de_publicacion" name="fecha_de_publicacion"
                        className="p-2 rounded-md" />
                </label>
                <Boton />
            </form>
        </div>
    )
}

export default LibroNuevoAPI