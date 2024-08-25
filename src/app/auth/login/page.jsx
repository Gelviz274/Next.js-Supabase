"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/supabase/client";

function Pruebas() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            console.log("Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);

        try {
            const { error, data } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.log("Error de autenticación:", error.message);
            } else {
                console.log("Sesión iniciada. Datos de la sesión:", data.session);
                router.push("/dashboard");
            }
        } catch (error) {
            console.log("Ocurrió un error inesperado:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <h1 className="text-2xl m-4 text-center text-white">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input 
                    type="email"
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 m-2 rounded"
                />
                <input 
                    type="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 m-2 rounded"
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white rounded px-4 py-2 m-4 ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default Pruebas;
