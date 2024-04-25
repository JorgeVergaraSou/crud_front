"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";


const Dashboard = () => {

  const { data: session, status } = useSession();

  const [catsData, setCatsData] = useState<Breed[] | null>(null);

  if (status === "loading") {
    return <p>Loading...</p>;
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

  let msg = '';
  if (session?.user.role === 'admin')
    msg = 'hola admin';
  else (
    msg = 'hola user'
  )
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <h2>correo {session?.user.email} </h2>
      <h2>nivel {session?.user.role} </h2>
      <h1> {msg} </h1>
      <button onClick={getCats} className="btn btn-primary">Get Cats</button>
      <div>
        {catsData && (
          <ul>
            {catsData.map(cat => (
              <li key={cat.idBreed}>Nombre: {cat.nameBreed} --  </li> // Renderiza el nombre de cada gato
            ))}
          </ul>
        )}
      </div>

    </div>
    
  );
};
export default Dashboard;