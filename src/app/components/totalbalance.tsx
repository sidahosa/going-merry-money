"use client";
import { useState } from "react";

export default function TotalBalance() {
  const [totalBalance] = useState(10000); // Example balance

  return (
    <section className="text-center mb-6">
      <h2 className="text-2xl font-blackops text-secondary-blue">Total Balance</h2>
      <p className="text-4xl font-extrabold text-primary-yellow">{totalBalance} Beri 🪙</p>
    </section>
  );
}
