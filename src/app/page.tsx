"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from 'next/image'

const HomePage = () => {

  const { status } = useSession();
  const [postData, setPostData] = useState<Post[] | null>(null);
  //const [pets] = useState<Pet[] | null>(null) ;
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

    if (status === "unauthenticated" || status === "authenticated") {
      getPost(); // Llama a la función getPost cuando el estado de la sesión es "authenticated"
    }
  }, [status]); // Se ejecuta este efecto cada vez que cambia el estado de la sesión

  if (status === "loading") {
    return <p>Loading...</p>;

  }

  return (
    <div className="divCardPet">
      {postData && postData.map(post => (
        <div className="cardDiv" key={post.idPost}>
          <p> {post.title}</p>
          <p> {post.content}</p>
          {/* Verifica si hay mascotas en el post */}
          {post.pets.length > 0 && (
            <div key={post.pets[0].idPet}> {/* Muestra solo la primera mascota del post */}
              <p>Nombre de la mascota: {post.pets[0].namePet}</p>
              <p>Descripción: {post.pets[0].description}</p>
              <Image
                src={`/img/${post.pets[0].image}`}
                width={150}
                height={150}
                alt="Picture of the author"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
