import Image from "next/image";
import Link from "next/link";
import AddExpenseButton from "./components/addexpense"; // Client component
import GrandLineProgress from "./components/grandlineprogress"; // Client component
import TotalBalance from "./components/totalbalance"; // Client component

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary-black text-white p-6">
      <TotalBalance />
      <GrandLineProgress />

      {/* Quick Action Buttons */}
      <section className="flex justify-center space-x-4">
        <Link href="/expenses">
          <button className="bg-secondary-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-red">
            View Expenses
          </button>
        </Link>
        <Link href="/goals">
          <button className="bg-secondary-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-red">
            View Goals
          </button>
        </Link>
        <AddExpenseButton />
      </section>
    </div>
  );
}
