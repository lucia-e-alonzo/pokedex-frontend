// tuyo: sebas
// Funcionalidades:
//  1. Número de la Pokédex con formato fijo de 4 dígitos.
//  2. Chip por cada tipo con clase propia para colorearlo en CSS.
//     Los nombres llegan en inglés desde la API (electric, fire, ...) y App.css
//     tiene un color para cada uno.
//  3. Tarjeta con giro (flip) al pasar el mouse:
//       - Frente: imagen a toda la card + número arriba-izquierda.
//         Fondo = color sólido del tipo principal (pokemon.tipos[0]).
//       - Reverso: imagen reducida + tipos abajo, SIN número.

// 3. Color sólido por tipo para el fondo del frente de la card.
const COLORES_TIPO = {
    normal: "#a8a878",
    fire: "#f08030",
    water: "#6890f0",
    electric: "#f8d030",
    grass: "#78c850",
    ice: "#98d8d8",
    fighting: "#c03028",
    poison: "#a040a0",
    ground: "#e0c068",
    flying: "#a890f0",
    psychic: "#f85888",
    bug: "#a8b820",
    rock: "#b8a038",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#b8b8d0",
    fairy: "#ee99ac",
};

function CardPokemon({ pokemon }) {
    // 1. #0025 en vez de #25
    const numero = String(pokemon.id).padStart(4, "0");

    // 3. tipo principal -> color de fondo del frente
    const tipoPrincipal = pokemon.tipos[0];
    const colorFondo = COLORES_TIPO[tipoPrincipal] ?? "#9aa4bf";

    return (
        <div className="card-pokemon">
            <div className="card-inner">
                {/* Frente: imagen grande + número, fondo del tipo principal */}
                <div className="card-front" style={{ background: colorFondo }}>
                    <span className="card-id">#{numero}</span>
                    <img src={pokemon.imagen} alt={pokemon.nombre} />
                </div>

                {/* Reverso: se ve al pasar el mouse. Imagen chica + tipos, sin número */}
                <div className="card-back">
                    <img src={pokemon.imagen} alt={pokemon.nombre} />
                    <h3>{pokemon.nombre}</h3>
                    <div className="tipos">
                        {/* 2. un <span> con clase por tipo -> color desde App.css */}
                        {pokemon.tipos.map((tipo) => (
                            <span key={tipo} className={`tipo ${tipo}`}>{tipo}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardPokemon;
