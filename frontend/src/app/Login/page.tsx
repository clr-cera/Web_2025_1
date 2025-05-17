"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o hook useRouter

// Função fictícia para verificar as credenciais
const verifyCredentials = (email: string, password: string): boolean => {
    // Simula a verificação de credenciais
    return email === "usuario@email.com" && password === "123456";
};

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se o login é como administrador
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter(); // Instancia o roteador

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário

        if (verifyCredentials(email, password)) {
            // Verifica se o login é como administrador
            if (isAdmin) {
                router.push("/Admin"); // Redireciona para a página de admin
            } else {
                router.push("/"); // Redireciona para a página principal
            }
        } else {
            setErrorMessage("Invalid email or password."); // Exibe mensagem de erro
        }
    };

    return (
        <div className="bg-background-gray w-full h-screen text-black">
            <div className="absolute top-1/2 left-1/2 bg-white border-2 shadow border-border-gray rounded-md p-10 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-auto translate-x-[-50%] translate-y-[-50%] flex gap-2 flex-col items-center">
                <h1 className="font-medium text-2xl text-center">Welcome Back</h1>
                <p className="font-medium text-text-gray text-center">Enter your credentials to access your account</p>
                <form
                    className="self-start flex flex-col w-full gap-5 mt-10"
                    onSubmit={handleLogin} // Chama a função de login ao enviar o formulário
                >
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Email</p>
                        <input
                            type="email"
                            placeholder="name@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
                            className="border-2 border-border-gray rounded-md p-2 w-full mb-4"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Password</p>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
                            className="border-2 border-border-gray rounded-md p-2 w-full mb-4"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2 w-6 h-6"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)} // Atualiza o estado de isAdmin
                        />
                        <label className="font-semibold">Login as Admin</label>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-center font-medium">{errorMessage}</p> // Exibe mensagem de erro
                    )}

                    <div className="mt-10">
                        <button
                            type="submit"
                            className="bg-primary-blue text-white font-semibold rounded-md p-2 w-full cursor-pointer hover:bg-secondary-blue"
                        >
                            Login
                        </button>
                    </div>

                    <div>
                        <p className="font-medium text-text-gray text-center mt-10">
                            Don't have an account?{" "}
                            <a href="/Register" className="text-primary-blue">
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}