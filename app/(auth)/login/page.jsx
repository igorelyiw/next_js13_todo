"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email, password) => {
    setIsLoading(true);
    setErrorMessage("");
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
    }
    if (!error) {
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <main className="text-center text-primary">
      <h2>Log in</h2>
      <AuthForm onSubmit={handleSubmit} />
      {isLoading && <p>Loading ...</p>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </main>
  );
}
