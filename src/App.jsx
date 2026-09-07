// mio: lucia
import { useState } from "react";
import Buscador from "./componentes/Buscador";
import Pokemon from "./componentes/Pokemon";
import { obtenerPokemon } from "./componentes/services/api";
import './App.css'

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    async function buscarPokemon(nombre) {
        setCargando(true);
        setError("");
        setPokemon(null);

        try {
            const resultado = await obtenerPokemon(nombre);
            setPokemon(resultado);
        } catch (error) {
            setError("No se encontró el Pokémon");
        } finally {
            setCargando(false);
        }
    }

    return (
        <div>
            <h1>Pokédex</h1>

            <Buscador onBuscar={buscarPokemon} />

            {cargando && <p>Buscando Pokémon...</p>}

            {error && <p>{error}</p>}

            {pokemon && <Pokemon pokemon={pokemon} />}
        </div>
    );
}

export default App;
