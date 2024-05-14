"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link
          href="/"
          className="btn btn-primary btn-sm"
        >
          Inicio
        </Link>
        {session?.user ? (
          <>
            <Link
              href="/dashboard"
              className="btn btn-primary btn-sm"
            >
             Perfil
            </Link>

            <Link
              href="/dashboard/newpost"
              className="btn btn-primary btn-sm"
            >
             Crear Publicacion
            </Link>

            <button
              onClick={() => signOut()}
              className="btn btn-danger btn-sm"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-primary btn-sm"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="btn btn-primary btn-sm"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
