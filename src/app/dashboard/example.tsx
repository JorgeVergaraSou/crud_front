"use client";
import { tokenPayloadRead } from "@/utils/tokenFunction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const Dashboard = () => {

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [petsData, setPetsData] = useState<Pet[] | null>(null);
  const [error, setError] = useState<string[]>([]);

  if (status === "loading") {
    <div className="loader"></div>;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session) throw new Error('No hay sesión activa');

        const token = session.user.token;
        const decodedToken = tokenPayloadRead(token);

        if (!decodedToken) throw new Error('Error al decodificar el token');

        // Asignar los datos del token a variables de estado
        setUserData(decodedToken);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [session]);

const getPets = async () => {
  const userId = userData?.idUser; // Obtener el ID del usuario de la sesión
  if (!userId) {
    console.error("No se pudo obtener el ID del usuario");
    return;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pets?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.user?.token}`,
    },
  });
  const dataResultPets = await res.json();
  setPetsData(dataResultPets); // Actualiza el estado con los datos obtenidos    
};


  return (
    <div>
   

      <div>
        <h1>Perfil de usuario</h1>
        {userData ? (
          <>
            <p>Email: {userData.email}</p>
            <p>Rol: {userData.role}</p>
            <p>ID de usuario: {userData.idUser}</p>
            <p>Fecha de creación del token: {new Date(userData.iat * 1000).toLocaleString()}</p>
            <p>Fecha de expiración del token: {new Date(userData.exp * 1000).toLocaleString()}</p>
          </>
        ) : (
          <p>No hay datos de usuario disponibles</p>
        )}
      </div>


      <button onClick={getPets} className="btn btn-primary">Get Cats</button>
      <div>
        {petsData && (
          <ul>
            {petsData.map(pet => (
              <li key={pet.idPet}>Nombre: {pet.namePet}   </li> // Renderiza el nombre de cada gato
            ))}
          </ul>
        )}
      </div>

      <div className="card" >
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>

  );
};
export default Dashboard;