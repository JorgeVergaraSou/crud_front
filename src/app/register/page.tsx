"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [errors,  setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const [name, setName] = useState<string>("test");
  const [email, setEmail] = useState<string>("test@test.com");
  const [password, setPassword] = useState<string>("123123");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
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
    
    /*
    if (!res.ok) {
      console.log(responseAPI.message);
      setMessage(responseAPI.message.split(","));
      return;
    }
*/

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="centradito">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="test"
          name="name"
          className="form-control mb-2"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="test@test.com"
          name="email"
          className="form-control mb-2"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
export default RegisterPage;
