// mio: lucia
import { useState } from "react";
import Buscador from "./componentes/Buscador";
import Pokemon from "./componentes/Pokemon";
import { obtenerPokemon } from "./componentes/services/api";
import './App.css'

// ===== sebas (sesión de estilos) — soporte para la vista de cuadrícula =====
// Se agrega el montaje de <ListaPokemon> con la lista completa que entrega la
// misma API (GET /api/pokemon). Todo lo de sebas va marcado y separado del
// código de Lucía.
import { useEffect } from "react";
import ListaPokemon from "./componentes/ListaPokemon";
import { obtenerListaPokemon } from "./componentes/services/api";

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // --- sebas: estado + carga de la lista completa para el grid ---
    // listaPokemon: array que se pinta en la rejilla.
    // cargandoLista: true hasta que responde la API (muestra "Cargando lista...").
    // errorLista: mensaje si la API falla.
    const [listaPokemon, setListaPokemon] = useState([]);
    const [cargandoLista, setCargandoLista] = useState(true);
    const [errorLista, setErrorLista] = useState("");

    // Se pide la lista una sola vez, al montar el componente.
    useEffect(() => {
        async function cargarLista() {
            try {
                const resultado = await obtenerListaPokemon();
                setListaPokemon(resultado);
            } catch (error) {
                setErrorLista("No se pudo cargar la lista de Pokémon");
            } finally {
                setCargandoLista(false);
            }
        }

        cargarLista();
    }, []);
    // --- fin sebas ---

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

            {/* --- sebas: cuadrícula con toda la lista de Pokémon (misma API) --- */}
            {/* Se muestra error, o "cargando", o la rejilla ya con datos. */}
            {errorLista && <p>{errorLista}</p>}
            {cargandoLista && <p>Cargando lista de Pokémon...</p>}
            {!cargandoLista && !errorLista && <ListaPokemon pokemones={listaPokemon} />}
            {/* --- fin sebas --- */}
        </div>
    );
}

export default App;
