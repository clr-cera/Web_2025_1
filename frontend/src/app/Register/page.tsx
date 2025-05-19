"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/authServices";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const router = useRouter();
  const { login: loginContext } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return setErrorMessage("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match.");
    }

    const newUser = await register(name, email, password);

    if (newUser) {
      loginContext(newUser); // já loga automaticamente
      router.push("/");
    } else {
      setErrorMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="bg-background-gray w-full h-screen text-black">
      <div className="absolute top-1/2 left-1/2 bg-white border-2 shadow border-border-gray rounded-md p-10 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-auto translate-x-[-50%] translate-y-[-50%] flex gap-2 flex-col items-center">
        <h1 className="font-medium text-2xl text-center">Create an Account</h1>
        <p className="font-medium text-text-gray text-center">Fill in the details to register a new account</p>
        <form className="self-start flex flex-col w-full gap-5 mt-10" onSubmit={handleRegister}>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Name</p>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-border-gray rounded-md p-2 w-full mb-4"
            />
          </div>
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
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Confirm Password</p>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-2 border-border-gray rounded-md p-2 w-full mb-4"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center font-medium">{errorMessage}</p>
          )}

          <div className="mt-10">
            <button type="submit" className="bg-primary-blue text-white font-semibold rounded-md p-2 w-full cursor-pointer hover:bg-secondary-blue">
              Register
            </button>
          </div>

          <div>
            <p className="font-medium text-text-gray text-center mt-10">
              Already have an account?{" "}
              <a href="/Login" className="text-primary-blue">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
