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
    return <div className="loader-container"><div className="loader"></div> <div className="loader2"></div></div>;
  }

  return (
    <>
<div>
  <section id='info-section' className='my-4 row justify-content-md-center'>
    <div className='col-md-4 d-flex justify-content-center align-items-center mb-4 mb-md-0'>
      <img
        className='img-fluid mx-auto'    
        src={`/img/logoRounded.png`}
        alt='logo'
        width={150}
        height={150}
      />
    </div>
    <div className='col-md-8'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        ¡Bienvenidos a Lost & Founds Pets!
      </h1>
      <p>
        Estás en el lugar indicado si estás buscando a tu compañero peludo
        perdido o si querés ayudar a reunir a una mascota con su familia.
        En Lost & Founds Pets, estamos dedicados a conectar a
        las mascotas perdidas con sus dueños amorosos. Nuestro objetivo es
        proporcionar un espacio seguro y confiable donde puedas compartir
        información sobre mascotas perdidas y encontradas en tu comunidad.
      </p>
    </div>
  </section>
  <section id='lost-section' className='my-4'>
    <h2 className='text-lg font-bold mb-1'>
      ¿Perdiste a tu preciado amigo de cuatro patas?
    </h2>
    <p>
      No te preocupes, estamos acá para ayudarte. Publicá detalles sobre
      tu mascota perdida, incluyendo una descripción, fotos y la ubicación
      donde fue vista por última vez. Nuestra comunidad está lista para
      ayudarte a difundir la información y reunirte con tu peludo amigo lo
      antes posible.
    </p>
  </section>
  <section id='found-section' className='my-4'>
    <h2 className='text-lg font-bold mb-1'>
      ¿Encontraste una mascota perdida?
    </h2>
    <p>
      Tu acción puede marcar la diferencia en la vida de una familia.
      Publicá los detalles sobre la mascota que encontraste para ayudar a
      reunirla con su hogar. Juntos, podemos hacer que cada mascota
      perdida regrese a casa de manera segura.
    </p>
  </section>
  <section id='care-section' className='my-4'>
    <h2 className='text-lg font-bold mb-1'>Cuidado de mascotas</h2>
    <p>
      Además de servir como plataforma de reunión para mascotas perdidas,
      también ofrecemos información valiosa sobre cuidado de mascotas.
      Mantenete al día con nuestro calendario de vacunación y castraciones
      para garantizar la salud y el bienestar de tu mascota. Creemos en
      educar a nuestra comunidad sobre la importancia de la atención
      adecuada de las mascotas para promover una convivencia armoniosa y
      amorosa entre humanos y animales.
    </p>
  </section>
  <p>
    Sumate a nuestra comunidad de amantes de los animales y juntos
    trabajaremos para garantizar que cada mascota reciba el amor y el
    cuidado que merece. En Lost & Founds Pets, creemos que
    cada mascota perdida tiene un camino de regreso a casa. ¡Sumate y
    ayudemos a que eso suceda!
  </p>
</div>

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
    </>
  );
};

export default HomePage;
