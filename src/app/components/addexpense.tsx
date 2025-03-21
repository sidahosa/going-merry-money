"use client";
import { useState } from "react";
import AddExpenseModal from "./addexpensemodal";

export default function AddExpenseButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-secondary-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-red"
      >
        + Add Expense
      </button>

      {isModalOpen && <AddExpenseModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}
