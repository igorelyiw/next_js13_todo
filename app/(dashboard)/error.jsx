"use client";

import React from "react";

export default function error({ error, reset }) {
  return (
    <main className="text-center">
      <h2>Oh, no!</h2>
      <p>{error.message}</p>
      <button className="btn-primary mx-auto mt-5" onClick={reset}>
        Maybe, try again!
      </button>
    </main>
  );
}
