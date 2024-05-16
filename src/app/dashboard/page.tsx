"use client";
import { tokenPayloadRead } from "@/utils/tokenFunction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const Dashboard = () => {

  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [catsData, setCatsData] = useState<Breed[] | null>(null);
  const [error, setError] = useState<string[]>([]);

  if (status === "loading") {
    return <div className="loader-container"><div className="loader"></div> <div className="loader2"></div></div>;
  }

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


      <button onClick={getCats} className="btn btn-primary">Get Cats</button>
      <div>
        {catsData && (
          <ul>
            {catsData.map(cat => (
              <li key={cat.idBreed}>Nombre: {cat.nameBreed}   </li> // Renderiza el nombre de cada gato
            ))}
          </ul>
        )}
      </div>

    </div>

  );
};
export default Dashboard;