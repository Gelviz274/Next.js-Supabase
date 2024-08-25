"use client"
import React, { useEffect, useState } from 'react';
import supabase from "@/supabase/client";

function Homepage1() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const currentSession = supabase.auth.session();
        setSession(currentSession);

        // Suscribirse a los cambios en la sesión
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });

        // Limpiar el suscriptor cuando el componente se desmonte
        return () => {
            authListener.unsubscribe();
        };
    }, []);

    return (
        <div className='text-2xl text-white'>
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

export default Homepage1;
