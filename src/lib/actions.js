'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "@/lib/cookies";


// BASE DE DATOS

export async function nuevoAutorDB(formData) {
    const nombre = formData.get('nombre')
    const lugar_de_nacimiento = formData.get('lugar_de_nacimiento')
    const premio_nobel = formData.get('premio_nobel') === 'on' ? 1 : 0 // Checkbox value

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    const sql = 'insert into autores (nombre, lugar_de_nacimiento, premio_nobel) values (?, ?, ?)'
    const values = [nombre, lugar_de_nacimiento, premio_nobel];

    const [result, fields] = await db.query(sql, values)
    revalidatePath('/autores-db')
}

export async function editarAutorDB(formData) {
    const id = formData.get('id')
    const nombre = formData.get('nombre')
    const lugar_de_nacimiento = formData.get('lugar_de_nacimiento')
    const premio_nobel = formData.get('premio_nobel') === 'on' ? 1 : 0 // Checkbox value

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    const sql = 'update autores set nombre=?, lugar_de_nacimiento=?, premio_nobel=? where id=?'
    const values = [nombre, lugar_de_nacimiento, premio_nobel, id];

    const [result, fields] = await db.query(sql, values)
    revalidatePath('/autores-db')
}

export async function eliminarAutorDB(formData) {
    const id = formData.get('id')

    const sql = 'delete from autores where id = ?'
    const values = [id]
    await db.query(sql, values);

    revalidatePath('/autores-db')
}

export async function nuevoLibroDB(formData) {
    const titulo = formData.get('titulo')
    const editorial = formData.get('editorial')
    const fecha_de_publicacion = formData.get('fecha_de_publicacion')

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    const sql = 'insert into libros (titulo, editorial, fecha_de_publicacion) values (?, ?, ?)'
    const values = [titulo, editorial, fecha_de_publicacion];

    const [result, fields] = await db.query(sql, values)
    revalidatePath('/libros-db')
}

export async function editarLibroDB(formData) {
    const id = formData.get('id')
    const titulo = formData.get('titulo')
    const editorial = formData.get('editorial')
    const fecha_de_publicacion = formData.get('fecha_de_publicacion')

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    const sql = 'update libros set titulo=?, editorial=?, fecha_de_publicacion=? where id=?'
    const values = [titulo, editorial, fecha_de_publicacion, id];

    const [result, fields] = await db.query(sql, values)
    revalidatePath('/libros-db')
}

export async function eliminarLibroDB(formData) {
    const id = formData.get('id')

    const sql = 'delete from libros where id = ?'
    const values = [id]
    await db.query(sql, values);

    revalidatePath('/libros-db')
}


// API

export async function nuevoAutorAPI(formData) {
    const nombre = formData.get('nombre')
    const lugar_de_nacimiento = formData.get('lugar_de_nacimiento')
    const premio_nobel = formData.get('premio_nobel') === 'on' // Checkbox value

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    const response = await fetch('http://localhost:3001/autores', {
        method: 'POST',
        body: JSON.stringify({ nombre, lugar_de_nacimiento, premio_nobel, createdAt: new Date().toISOString() })
    })
    const data = await response.json()
    revalidatePath('/autores-api')
}

export async function editarAutorAPI(formData) {
    const id = formData.get('id')
    const nombre = formData.get('nombre')
    const lugar_de_nacimiento = formData.get('lugar_de_nacimiento')
    const premio_nobel = formData.get('premio_nobel') === 'on' // Checkbox value

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    const response = await fetch('http://localhost:3001/autores/' + id, {
        method: 'PUT',
        body: JSON.stringify({ nombre, lugar_de_nacimiento, premio_nobel, createdAt: new Date().toISOString() })
    })
    const data = await response.json()
    revalidatePath('/autores-api')
}

export async function eliminarAutorAPI(formData) {
    const id = formData.get('id')
    await fetch('http://localhost:3001/autores/' + id, { method: 'DELETE' })
    revalidatePath('/autores-api')
}

export async function nuevoLibroAPI(formData) {
    const titulo = formData.get('titulo')
    const editorial = formData.get('editorial')
    const fecha_de_publicacion = formData.get('fecha_de_publicacion')

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    const response = await fetch('http://localhost:3001/libros', {
        method: 'POST',
        body: JSON.stringify({ titulo, editorial, fecha_de_publicacion, createdAt: new Date().toISOString() })
    })
    const data = await response.json()
    revalidatePath('/libros-api')
}

export async function editarLibroAPI(formData) {
    const id = formData.get('id')
    const titulo = formData.get('titulo')
    const editorial = formData.get('editorial')
    const fecha_de_publicacion = formData.get('fecha_de_publicacion')

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    const response = await fetch('http://localhost:3001/libros/' + id, {
        method: 'PUT',
        body: JSON.stringify({ titulo, editorial, fecha_de_publicacion, createdAt: new Date().toISOString() })
    })
    const data = await response.json()
    revalidatePath('/libros-api')
}

export async function eliminarLibroAPI(formData) {
    const id = formData.get('id')
    await fetch('http://localhost:3001/libros/' + id, { method: 'DELETE' })
    revalidatePath('/libros-api')
}


// --------------------------- AUTENTICACIÓN -----------------



const usuarios = [
    { nombre: 'ana', key: 'ana' },
    { nombre: 'eva', key: 'eva' },
]

export async function login(formData) {
    const LOGIN_URL = '/'

    // Obtener usuario datos del formulario
    const name = formData.get('name')
    const email = formData.get('email') // Though not used, keeping it for consistency if original Login form expects it
    const key = formData.get('key')
    const callbackUrl = formData.get('callbackUrl') || LOGIN_URL

    // Comprobar si credenciales son válidas
    const encontrado = usuarios.find(usuario => name == usuario.nombre && key == usuario.key)

    if (!encontrado) return

    // Si hay autenticación correcta, creamos cookie de sesión
    await setCookie('session', { name, email: encontrado.nombre }) // Using encontrado.nombre for email field, though it's not a real email.

    redirect(callbackUrl);
}



export async function logout() {
    // Eliminamos cookie de sesión
    await deleteCookie('session')

    // redirect("/");   // No recarga si ya estamos en esta página

    // Hack to reload page! https://github.com/vercel/next.js/discussions/49345#discussioncomment-6120148
    redirect('/?' + Math.random())

}