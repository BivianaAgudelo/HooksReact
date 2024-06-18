import { createContext, useState, useEffect } from "react";
import React from "react";


// * Context API
// * 1_ crear el contexto
// * 2_ compartir el contexto
// * 3_ consumir las cosas que estan compartidas en el contexto como estados y funciones

// * 1_ crear el contexto

export const GlobalContext = createContext();

// * 2_ se crea el componente que nos va a permitir compartir o proveer las cosas (el contexto)

const GlobalContextProvider = ({ children }) => {
    const [consulta, setConsulta] = useState("");
    const [fotosDeGaleria, setFotosDeGaleria] = useState([]);
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://localhost:3000/fotos");
            const data = await res.json();
            setFotosDeGaleria([...data]);
        };

        setTimeout(() => getData(), 5000);
    }, []);

    const alAlternarFavorito = (foto) => {
        if (foto.id === fotoSeleccionada?.id) {
            setFotoSeleccionada({
                ...fotoSeleccionada,
                favorita: !fotoSeleccionada.favorita,
            });
        }

        setFotosDeGaleria(
            fotosDeGaleria.map((fotoDeGaleria) => {
                return {
                    ...fotoDeGaleria,
                    favorita:
                        fotoDeGaleria.id === foto.id
                            ? !foto.favorita
                            : fotoDeGaleria.favorita,
                };
            })
        );
    };

    return (
        <GlobalContext.Provider
            value={{
                consulta,
                setConsulta,
                fotosDeGaleria,
                fotoSeleccionada,
                setFotoSeleccionada,
                alAlternarFavorito,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
