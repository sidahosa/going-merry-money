import Image from "next/image";
import Link from "next/link";
import AddExpenseButton from "./components/addexpense";
import AddSavingsButton from "./components/addsavingsbutton";
import DashboardSummary from "./components/dashboardsummary";
import PirateJourneySummary from "./components/piratejourneysummary";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary-black text-white p-6 space-y-12">

      {/* Centered Welcome Section */}
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-blackops text-secondary-blue">Welcome to Beri Tracker</h2>
        <p className="text-lg">Track your expenses and savings goals like a pirate!</p>
        <Image
          src="/images/one-piece.png"
          alt="One Piece"
          className="mx-auto"
          width={250}
          height={250}
        />
      </section>

      {/* Aligned Two Column Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left - Pirate Journey Summary */}
        <PirateJourneySummary />

        {/* Right - Dashboard Summary */}
        <DashboardSummary />
      </section>

      {/* Get Started Section */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-blackops text-secondary-blue">Get Started</h2>
        <p className="text-lg">Start tracking your expenses and savings goals today!</p>
        <p className="text-lg">Click the buttons below to get started. 🏴‍☠️</p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <Link href="/goals">
            <button className="bg-secondary-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-red">
              View Goals
            </button>
          </Link>
          <AddExpenseButton />
          <AddSavingsButton />
        </div>
      </section>

    </div>
  );
}
