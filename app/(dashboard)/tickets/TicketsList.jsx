import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";

async function getTickets() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("Tickets").select();
  if (error) {
    console.log(error.message);
  }
  return data;
}

export async function TicketsList() {
  const tickets = await getTickets();

  if (!tickets) return <p>There are no tickets!</p>;
  return (
    <>
      {tickets.map(({ id, title, body, priority }) => (
        <div key={id} className="card my-5 hover:shadow-md transition-shadow">
          <Link href={`/tickets/${id}`}>
            <h3>{title}</h3>
            <p>{body.slice(0, 250)}...</p>
            <div className={`pill ${priority}`}>{priority} priority</div>
          </Link>
        </div>
      ))}
    </>
  );
}
