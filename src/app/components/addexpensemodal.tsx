"use client";
import { useState } from "react";
import { addTransaction, Transaction } from "../utils/api";

export default function AddTransactionModal({ closeModal }: { closeModal: () => void }) {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("Groceries");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const finalAmount = type === "expense" ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

    const transactionData: Omit<Transaction, "transactionId"> = {
      amount: finalAmount,
      category,
      description,
      date: new Date().toISOString(),
      type,
    };

    try {
      const newTransaction = await addTransaction(transactionData);
      if (!newTransaction) throw new Error("Transaction failed.");

      console.log("Transaction Added:", newTransaction);
      closeModal();
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error adding transaction. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary-black text-white p-6 rounded-lg w-80">
        <h2 className="text-2xl font-title text-primary-yellow mb-4">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Transaction Type */}
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" value="expense" checked={type === "expense"} onChange={() => setType("expense")} />
              <span>Expense</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="income" checked={type === "income"} onChange={() => setType("income")} />
              <span>Income</span>
            </label>
          </div>

          {/* Category Dropdown */}
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded bg-secondary-brown text-white">
            {type === "expense" ? (
              <>
                <option value="Rent/Mortgage">🏡 Rent/Mortgage</option>
                <option value="Utilities">💡 Utilities</option>
                <option value="Groceries">🛒 Groceries</option>
                <option value="Dining Out">🍽️ Dining Out</option>
                <option value="Going Merry Repairs">⛵ Going Merry Repairs</option>
                <option value="Car Payment">🚗 Car Payment</option>
                <option value="Gas & Fuel">⛽ Gas & Fuel</option>
                <option value="Public Transport">🚇 Public Transport</option>
                <option value="Franky’s Workshop">🔧 Franky’s Workshop</option>
                <option value="Sanji’s Kitchen">🍔 Sanji’s Kitchen</option>
                <option value="Subscriptions">📺 Subscriptions</option>
                <option value="Video Games">🎮 Video Games</option>
                <option value="Streaming Services">🍿 Streaming Services</option>
                <option value="Vacation & Travel">✈️ Vacation & Travel</option>
                <option value="Pirate Party Fund">🏴‍☠️ Pirate Party Fund</option>
              </>
            ) : (
              <>
                <option value="Salary">💰 Salary</option>
                <option value="Freelance Work">🔧 Freelance Work</option>
                <option value="Passive Income">📈 Passive Income</option>
                <option value="Business Revenue">🏢 Business Revenue</option>
                <option value="Gifts">🎁 Gifts</option>
                <option value="Selling Items">🛍️ Selling Items</option>
                <option value="Treasure Found">🏴‍☠️ Treasure Found</option>
                <option value="Bounty Earnings">☠️ Bounty Earnings</option>
              </>
            )}
          </select>

          {/* Amount Input */}
          <input type="number" placeholder="Amount in Beri 🪙" value={amount} onChange={(e) => setAmount(e.target.value)} className="p-2 rounded bg-secondary-brown text-white" required />

          {/* Description Input */}
          <input type="text" placeholder="Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 rounded bg-secondary-brown text-white" />

          {/* Buttons */}
          <div className="flex justify-between">
            <button type="submit" className="bg-gold-light text-primary-black font-bold py-2 px-4 rounded-lg">Add</button>
            <button type="button" onClick={closeModal} className="text-white hover:text-gold-light">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
