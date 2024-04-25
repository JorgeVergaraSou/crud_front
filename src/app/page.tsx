"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const HomePage = () => {
  
  const { status } = useSession();
  const [postData, setPostData] = useState<Post[] | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Error al obtener los datos");
        }
        const dataResultPost = await res.json();
        setPostData(dataResultPost);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    
    if (status === "authenticated") {
      getPost(); // Llama a la función getPost cuando el estado de la sesión es "authenticated"
    }
  }, [status]); // Se ejecuta este efecto cada vez que cambia el estado de la sesión

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-primary">Home Page</h1>
      <div>
        {postData && (
          <ul>
            {postData.map(post => (
              <li key={post.idPost}>
                <p>Título: {post.title}</p>
                <p>Contenido: {post.content}</p> {post.pets}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
