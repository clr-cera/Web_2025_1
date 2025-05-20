"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authServices";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  // Estados controlados para formulário de login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Checkbox opcional para admin
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login: loginContext } = useAuth(); // Função de login do contexto global

  // Lógica executada ao submeter o formulário
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await login(email, password); // Chama API fake/local

    if (user) {
      loginContext(user); // Salva no contexto global (AuthProvider)

      // Redireciona com base no papel do usuário e no checkbox
      if ((user.role === "Admin" || user.role === "Super Admin") && isAdmin) {
        router.push("/Admin");
      } else {
        router.push("/");
      }
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="bg-background-gray w-full h-screen text-black">
      {/* Container centralizado */}
      <div className="absolute top-1/2 left-1/2 bg-white border-2 shadow border-border-gray rounded-md p-10 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-auto translate-x-[-50%] translate-y-[-50%] flex gap-2 flex-col items-center">
        <h1 className="font-medium text-2xl text-center">Welcome Back</h1>
        <p className="font-medium text-text-gray text-center">
          Enter your credentials to access your account
        </p>

        {/* Formulário de login */}
        <form
          className="self-start flex flex-col w-full gap-5 mt-10"
          onSubmit={handleLogin}
        >
          {/* Campo de e-mail */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Email</p>
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-border-gray rounded-md p-2 w-full mb-4"
            />
          </div>

          {/* Campo de senha */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Password</p>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-border-gray rounded-md p-2 w-full mb-4"
            />
          </div>

          {/* Checkbox para login na pagina de admin direto */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 w-6 h-6"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label className="font-semibold">Login as Admin</label>
            <p className="text-xs font-thin mt-1 ml-1">work if you are one</p>
          </div>

          {/* Mensagem de erro se login falhar */}
          {errorMessage && (
            <p className="text-red-500 text-center font-medium">
              {errorMessage}
            </p>
          )}

          {/* Botão de envio */}
          <div className="mt-10">
            <button
              type="submit"
              className="bg-primary-blue text-white font-semibold rounded-md p-2 w-full cursor-pointer hover:bg-secondary-blue"
            >
              Login
            </button>
          </div>

          {/* Link para página de cadastro */}
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
