"use client";
import React, { useState } from "react";

export default function AuthForm({ onSubmit, disabled = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </label>
      <button className="btn-primary" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}
