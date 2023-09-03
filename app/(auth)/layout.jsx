import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect("/");
  }
  return (
    <>
      <nav className="flex justify-between">
        <h2>Dojo helpdesk</h2>
        <div className="flex gap-5">
          <Link href="/login">Log in</Link>
          <Link href="/signup">SignUp</Link>
        </div>
      </nav>
      {children}
    </>
  );
}
