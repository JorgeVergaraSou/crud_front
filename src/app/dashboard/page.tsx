"use client";
import { tokenPayloadRead } from "@/utils/tokenFunction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";



const Dashboard = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [petsData, setPetsData] = useState<Pet[] | null>(null);
  const [error, setError] = useState<string[]>([]);

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

    if (session) {
      fetchUserData();
    }
  }, [session]);

  /** INICIO GET PETS */
  useEffect(() => {
    const getPets = async () => {
      try {
        if (!userData) {
          console.error("No se pudo obtener el ID del usuario");
          return;
        }

        const userId = userData.idUser;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pets?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error en la solicitud');
        }

        const dataResultPets = await res.json();
        setPetsData(dataResultPets); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    if (status === "authenticated" && userData) {
      getPets(); // Llama a la función getPets cuando el estado de la sesión es "authenticated" y userData está disponible
    }
  }, [status, userData]);
  /** FIN GET PETS */

  if (status === "loading") {
    return <div className="loader"></div>;
  }

  if (status === "unauthenticated") {
    return <div>No autenticado</div>;
  }

  return (
    <>
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

        <div>
          {petsData && petsData.length > 0 ? (
            petsData.map(pet => (
              <div className="card" style={{ width: '18rem' }} key={pet.idPet}>
                <img src={`/img/${pet.image}`} className="card-img-top" alt={pet.namePet} />
                <div className="card-body">
                  <h5 className="card-title">{pet.namePet}</h5>
                  <p className="card-text">
                    Tiene {pet.age} año(s) de edad, es un(a) lind@ {pet.pet}. <br></br>
                    {pet.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay datos de mascotas disponibles</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
