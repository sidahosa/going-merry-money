import { useState } from "react";

export default function AddExpenseModal({ closeModal }: { closeModal: () => void }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Sanji’s Kitchen");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Expense Added:", { amount, category, description });
    closeModal(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary-black text-white p-6 rounded-lg w-80">
        <h2 className="text-2xl font-title text-primary-yellow mb-4">Add Expense</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Amount Input */}
          <input
            type="number"
            placeholder="Amount in Beri"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 rounded bg-secondary-brown text-white"
            required
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded bg-secondary-brown text-white"
          >
            <option value="Sanji’s Kitchen">Sanji’s Kitchen 🍽️</option>
            <option value="Going Merry">Going Merry ⛵</option>
            <option value="Franky’s Workshop">Franky’s Workshop 🔧</option>
          </select>

          {/* Description Input */}
          <input
            type="text"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded bg-secondary-brown text-white"
          />

          {/* Submit & Close Buttons */}
          <div className="flex justify-between">
            <button type="submit" className="bg-gold-light text-primary-white font-bold py-2 px-4 rounded-lg">
              Add
            </button>
            <button onClick={closeModal} className="text-white hover:text-gold-light">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
