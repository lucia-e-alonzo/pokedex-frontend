// tuyo: sebas
//
// Funcionalidades:
//  1. Encabezado de la lista con el conteo y un indicador.
//  2. Contenedor .lista-pokemon-wrapper que envuelve encabezado y grid.

import CardPokemon from "./CardPokemon";

function ListaPokemon({ pokemones }) {
    if (!pokemones || pokemones.length === 0) {
        return <p>Cargando Pokémon...</p>;
    }

    return (
        <div className="lista-pokemon-wrapper">
            {/* 1. Encabezado: conteo + estado */}
            <div className="lista-encabezado">
                <span className="lista-conteo">
                    Mostrando {pokemones.length} Pokémon
                </span>
                <span className="lista-estado">• Sincronizado</span>
            </div>

            {/* 2. Grid de tarjetas */}
            <div className="lista-pokemon">
                {pokemones.map((pokemon) => (
                    <CardPokemon key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default ListaPokemon;
