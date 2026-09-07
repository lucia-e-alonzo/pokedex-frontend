// mio: lucia
function Pokemon({ pokemon }) {
    if (!pokemon) {
        return null;
    }

    return (
        <div className="pokemon">
            <img
                src={pokemon.imagen}
                alt={pokemon.nombre}
            />

            <h2>{pokemon.nombre}</h2>

            <p>#{pokemon.id}</p>

            <div>
                {pokemon.tipos.map((tipo) => (
                    <span key={tipo}>{tipo}</span>
                ))}
            </div>
        </div>
    );
}

export default Pokemon;