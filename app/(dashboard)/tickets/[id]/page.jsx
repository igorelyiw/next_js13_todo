import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "./DeleteButton";
import { BiArrowBack } from "react-icons/bi";

export const dynamicParams = true; // default val = true

export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket } = await supabase
    .from("Tickets")
    .select()
    .eq("id", params.id)
    .single();
  return { title: `Helpdesk | ${ticket?.title || "Ticket not found"}` };
}

async function getTicket(id) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();
  if (!data) {
    notFound();
  }
  return data;
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { title, body, priority, user_email } = ticket;
  return (
    <main>
      <nav>
        <Link href="/tickets">
          <button className="btn-primary">
            <BiArrowBack /> Back
          </button>
        </Link>
        <h2 className="mr-auto">Ticket Details</h2>
        {session.user.email === user_email && <DeleteButton id={params.id} />}
      </nav>
      <div className="card">
        <h3>{title}</h3>
        <small>Created by {user_email}</small>
        <p>{body}</p>
        <div className={`pill ${priority}`}>{priority} priority</div>
      </div>
    </main>
  );
}
