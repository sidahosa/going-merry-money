"use client";
import { useState } from "react";
import { addGoal, SavingsGoal } from "../utils/api";

export default function AddSavingsGoalModal({ closeModal }: { closeModal: () => void }) {
  const [goalName, setGoalName] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedTargetAmount = Number(targetAmount);
    if (isNaN(parsedTargetAmount) || parsedTargetAmount <= 0) {
      alert("Please enter a valid target amount.");
      return;
    }

    const savingsGoalData: Omit<SavingsGoal, "goalId"> = {
      name: goalName,
      targetAmount: parsedTargetAmount,
      currentAmount: 0, // New goal starts at 0
      deadline,
      status: "in-progress",
    };

    try {
      const newGoal = await addGoal(savingsGoalData);
      if (!newGoal) throw new Error("Failed to add savings goal.");

      console.log("Savings Goal Added:", newGoal);
      closeModal();
    } catch (error) {
      console.error("Error adding savings goal:", error);
      alert("Error adding savings goal. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary-black text-white p-6 rounded-lg w-80">
        <h2 className="text-2xl font-title text-primary-yellow mb-4">Add Savings Goal</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Goal Name */}
          <input
            type="text"
            placeholder="Goal Name (e.g., Buy a New Ship)"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="p-2 rounded bg-secondary-brown text-white"
            required
            aria-label="Goal Name"
          />

          {/* Target Amount */}
          <input
            type="number"
            placeholder="Target Amount in Beri 🪙"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="p-2 rounded bg-secondary-brown text-white"
            required
            aria-label="Target Amount"
          />

          {/* Deadline */}
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-2 rounded bg-secondary-brown text-white"
            required
            aria-label="Deadline"
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <button type="submit" className="bg-gold-light text-primary-black font-bold py-2 px-4 rounded-lg">
              Add Goal
            </button>
            <button type="button" onClick={closeModal} className="text-white hover:text-gold-light">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
