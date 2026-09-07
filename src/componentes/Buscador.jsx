// mio: lucia
import { useState } from "react";

function Buscador({ onBuscar }) {
    const [nombre, setNombre] = useState("");

    function manejarBusqueda(event) {
        event.preventDefault();
        const nombreBuscado = nombre.trim();

        if (nombreBuscado === "") { return; }
        onBuscar(nombreBuscado);
    }

    return (
        <form onSubmit={manejarBusqueda}>
            <input
                type="text"
                placeholder="Busca un Pokémon"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
            />
            <button type="submit">
                Buscar
            </button>
        </form>
    );
}

export default Buscador;