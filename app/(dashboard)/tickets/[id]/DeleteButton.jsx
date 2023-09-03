"use client";

import React, { useTransition } from "react";
import { TiDelete } from "react-icons/ti";
import { deleteTicket } from "../../../api/tickets/actions";

export function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      className="btn-error"
      disabled={isPending}
      onClick={() => startTransition(() => deleteTicket(id))}
    >
      {isPending ? (
        "Deleting..."
      ) : (
        <>
          <TiDelete />
          <p>Delete Ticket</p>
        </>
      )}
    </button>
  );
}
