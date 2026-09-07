// tuyo: sebas
// Funcionalidades:
//  1. Número de la Pokédex con formato fijo de 4 dígitos.
//  2. Chip por cada tipo con clase propia para colorearlo en CSS.
//     Los nombres llegan en inglés desde la API (electric, fire, ...) y App.css
//     tiene un color para cada uno.

function CardPokemon({ pokemon }) {
    // 1. #0025 en vez de #25
    const numero = String(pokemon.id).padStart(4, "0");

    return (
        <div className="card-pokemon">
            <span className="card-id">#{numero}</span>
            <img src={pokemon.imagen} alt={pokemon.nombre} />
            <h3>{pokemon.nombre}</h3>
            <div className="tipos">
                {/* 2. un <span> con clase por tipo -> color desde App.css */}
                {pokemon.tipos.map((tipo) => (
                    <span key={tipo} className={`tipo ${tipo}`}>{tipo}</span>
                ))}
            </div>
        </div>
    );
}

export default CardPokemon;
