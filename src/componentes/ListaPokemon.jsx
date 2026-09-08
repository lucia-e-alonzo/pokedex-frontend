// tuyo: sebas
// Funcionalidades:
//  1. Encabezado de la lista con el conteo y un indicador.
//  2. Contenedor .lista-pokemon-wrapper que envuelve encabezado y grid.
//  3. Grid ÚNICO con todos los Pokémon que entregue el backend (sin páginas):
//     se pinta `pokemones` completo, así que si el backend sube el límite de 20,
//     aquí aparecen todos automáticamente.
//  4. Filtro por tipo (debajo de la barra de búsqueda):
//       - los tipos salen de los datos recibidos (se adaptan a lo que dé el backend).
//       - se pueden seleccionar varios para combinarlos.
//       - modo "cualquiera" (tiene alguno de los tipos) o "todos" (los tiene todos).

import { useMemo, useState } from "react";
import CardPokemon from "./CardPokemon";

function ListaPokemon({ pokemones }) {
    const lista = pokemones ?? [];

    // 4. Estado del filtro por tipo
    const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
    const [modo, setModo] = useState("cualquiera"); // "cualquiera" = OR | "todos" = AND

    // Tipos presentes en los datos (ordenados) -> botones del filtro
    const tiposDisponibles = useMemo(
        () => [...new Set(lista.flatMap((pokemon) => pokemon.tipos))].sort(),
        [lista]
    );

    // Lista ya filtrada según los tipos elegidos
    const pokemonesFiltrados = useMemo(() => {
        if (tiposSeleccionados.length === 0) return lista;
        return lista.filter((pokemon) =>
            modo === "todos"
                ? tiposSeleccionados.every((t) => pokemon.tipos.includes(t))
                : tiposSeleccionados.some((t) => pokemon.tipos.includes(t))
        );
    }, [lista, tiposSeleccionados, modo]);

    if (lista.length === 0) {
        return <p>Cargando Pokémon...</p>;
    }

    function alternarTipo(tipo) {
        setTiposSeleccionados((prev) =>
            prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
        );
    }

    const hayFiltro = tiposSeleccionados.length > 0;

    return (
        <div className="lista-pokemon-wrapper">
            {/* 4. Filtro por tipo */}
            <div className="filtro-tipos">
                <button
                    type="button"
                    className="filtro-modo"
                    onClick={() =>
                        setModo((m) => (m === "todos" ? "cualquiera" : "todos"))
                    }
                    title="Cómo se combinan los tipos elegidos"
                >
                    {modo === "todos" ? "Coincide: TODOS" : "Coincide: CUALQUIERA"}
                </button>

                {tiposDisponibles.map((tipo) => (
                    <button
                        type="button"
                        key={tipo}
                        className={
                            "tipo " +
                            tipo +
                            (tiposSeleccionados.includes(tipo) ? " activo" : "")
                        }
                        onClick={() => alternarTipo(tipo)}
                    >
                        {tipo}
                    </button>
                ))}

                {hayFiltro && (
                    <button
                        type="button"
                        className="filtro-limpiar"
                        onClick={() => setTiposSeleccionados([])}
                    >
                        Limpiar
                    </button>
                )}
            </div>

            {/* 1. Encabezado: conteo + estado */}
            <div className="lista-encabezado">
                <span className="lista-conteo">
                    {hayFiltro
                        ? `Mostrando ${pokemonesFiltrados.length} de ${lista.length} Pokémon`
                        : `Mostrando ${lista.length} Pokémon`}
                </span>
                <span className="lista-estado">• Sincronizado</span>
            </div>

            {/* 3. Grid único con todos los Pokémon (ya filtrados) */}
            {pokemonesFiltrados.length === 0 ? (
                <p className="lista-vacia">Ningún Pokémon coincide con esos tipos.</p>
            ) : (
                <div className="lista-pokemon">
                    {pokemonesFiltrados.map((pokemon) => (
                        <CardPokemon key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaPokemon;
