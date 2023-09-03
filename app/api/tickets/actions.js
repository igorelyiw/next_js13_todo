"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addTicket(formData) {
  const ticket = Object.fromEntries(formData);
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { error } = await supabase.from("Tickets").insert({
    ...ticket,
    user_email: session.user.email,
  });
  if (error) {
    throw new Error("Something went wrong!");
  }
  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id) {
  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.from("Tickets").delete().eq("id", id);
  if (error) {
    throw new Error("Couldn't delete this ticket");
  }
  revalidatePath("/tickets");
  redirect("/tickets");
}
