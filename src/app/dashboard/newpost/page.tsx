"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Newpost = () => {

    const { data: session, status } = useSession();
    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("Título");
    const [content, setContent] = useState<string>("Contenido");
    const [password, setPassword] = useState<string>("123123");

    const [catsData, setCatsData] = useState<Breed[] | null>(null);

    if (status === "loading") {
        return <div className="loader"></div>;
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);

        const responsePost = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    password,
                }),
            }
        );

        const responseAPI = await responsePost.json();

        if (!responsePost.ok) {
            // Verificar si responseAPI.message es un string
            console.log(responseAPI.message);
            if (typeof responseAPI.message === 'string') {
                setMessage(responseAPI.message.split(","));
            } else if (Array.isArray(responseAPI.message)) {
                // Si responseAPI.message es un array, asumimos que ya contiene mensajes separados
                setMessage(responseAPI.message);
            } else {
                // Si responseAPI.message es un objeto, tratamos de obtener sus valores
                setMessage(Object.values(responseAPI.message));
            }
            return;
        }


    };
    const getCats = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/breeds`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session?.user?.token}`,
            },
        });
        const dataResultCats = await res.json();
        setCatsData(dataResultCats); // Actualiza el estado con los datos obtenidos    
    };


    return (
        <div className="centradito">
            <h1>Necesitas compartir tu idea? estás en el lugar ideal</h1>
            <form onSubmit={handleSubmit}>

<select className="form-select">
    <option value={0}>
        SELECCIONE OPCIÓN
    </option>
   <option value={1}>
    MASCOTA PERDIDA
   </option>
   <option value={2}>
    OFREZCO MASCOTA EN ADOPCIÓN
   </option>
   <option value={3}>
    QUIERO ADOPTAR
   </option>
</select>

                <input
                    type="text"
                    placeholder="Título"
                    name="Título"
                    className="form-control mb-2"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <textarea
                    placeholder="Contenido"
                    name="content"
                    className="form-control mb-2"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />


                <input
                    type="password"
                    placeholder="123123"
                    name="password"
                    className="form-control mb-2"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Register
                </button>
            </form>

            {message.length > 0 && (
                <div className="alert alert-danger mt-2">
                    <ul className="mb-0">
                        {message.map((msg) => (
                            <li key={msg}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}

            {errors.length > 0 && (
                <div className="alert alert-danger mt-2">
                    <ul className="mb-0">
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
export default Newpost;