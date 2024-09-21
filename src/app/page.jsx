"use client"
import React, { useEffect, useState } from 'react';
import supabase from "@/supabase/client";

function Homepage() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    // Suscribirse a los cambios en la sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    // Limpiar el suscriptor cuando el componente se desmonte
    return () => {
      // `subscription` debería tener el método `unsubscribe` en versiones recientes
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='text-2xl text-secondary'>
      Homepage
      <div>
        {session ? (
          <p>Usuario autenticado: {session.user.email}</p>
        ) : (
          <p>No hay sesión activa.</p>
        )}
      </div>
    </div>
  );
}

export default Homepage;