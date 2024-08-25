"use client"
import { useState } from "react"
import supabase from "@/supabase/client"

function Registro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Resetea el estado de error
        setSuccess(null); // Resetea el estado de éxito

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                setSuccess("¡Registro exitoso! Por favor, revisa tu correo electrónico para confirmar tu cuenta.");
            }
        } catch (error) {
            setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <input 
                type="email"
                placeholder="youremail@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="p-2 m-4 rounded border text-black w-1/2"
            />

            <input 
                type="password"
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="p-2 m-4 rounded border text-black w-1/2"
            />

            <button className="bg-blue-500 text-white rounded px-4 py-2 m-4">Register</button>

            {error && <p className="text-red-500 m-4">{error}</p>}
            {success && <p className="text-green-500 m-4">{success}</p>}
        </form>
    );
}

export default Registro;
