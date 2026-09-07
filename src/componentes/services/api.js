// mio: lucia
const API_URL = "http://localhost:3000/api";

export async function obtenerListaPokemon() {
    const respuesta = await fetch(`${API_URL}/pokemon`);

    if (!respuesta.ok) {
        throw new Error("No se pudo obtener la lista de Pokémon");
    }

    return await respuesta.json();
}

export async function obtenerPokemon(nombre) {
    const respuesta = await fetch(
        `${API_URL}/pokemon/${encodeURIComponent(nombre)}`
    );

    if (!respuesta.ok) {
        throw new Error("No se encontró el Pokémon");
    }

    return await respuesta.json();
}