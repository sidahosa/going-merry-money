"use client";
import { useState } from "react";
import AddSavingsModal from "./addsavingsmodal";

export default function AddSavingsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-secondary-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-red"
      >
        + Add Savings
      </button>

      {isModalOpen && <AddSavingsModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}