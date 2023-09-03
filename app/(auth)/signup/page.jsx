"use client";
import { useState } from "react";
import AuthForm from "../AuthForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email, password) => {
    setIsLoading(true);
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/api/auth/callback` },
    });
    if (error) {
      setErrorMessage(error.message);
    }
    if (!error) {
      router.push("/verify");
    }
    setIsLoading(false);
  };

  return (
    <main className="text-center text-primary">
      <h2>Sign Up</h2>
      <AuthForm onSubmit={handleSubmit} disabled={isLoading} />
      {isLoading && <p>Loading...</p>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </main>
  );
}
