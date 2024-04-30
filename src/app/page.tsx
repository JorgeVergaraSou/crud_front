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
    <div>
    
      <div className="backGroundDiv">
      {postData && postData.map(post => (
  <div className=" grid" key={post.idPost}>
    <p> {post.title}</p>
    <p> {post.content}</p>
    
      {post && post.pets.map(pet => (
        <div key={pet.idPet}>
          <p>Nombre de la mascota: {pet.namePet}</p>
          <p>Descripción: {pet.description}</p>
          <Image
      src={`/img/${pet.image}`}
      width={150}
      height={150}
      alt="Picture of the author"
    />
  
         
        </div>
      ))}
   
  </div>
))}

      </div>
    </div>
  );
};

export default HomePage;
