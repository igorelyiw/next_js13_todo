import React, { Suspense } from "react";
import { TicketsList } from "./TicketsList";
import Loading from "../loading";
import Link from "next/link";

export const metadata = {
  title: "Helpdesk | Tickets",
};

const Tickets = () => {
  return (
    <main>
      <nav>
        <h2>Tickets List</h2>
        <p>
          <small>Currently open tickets</small>
        </p>
        <Link href="/tickets/create" className="ml-auto">
          <button className="text-white bg-green-500">+ New Ticket</button>
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketsList />
      </Suspense>
    </main>
  );
};

export default Tickets;
