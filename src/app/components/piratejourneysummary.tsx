'use client';
import { fetchDashboard, fetchGoals } from "../utils/api";
import { useEffect, useState } from "react";

export default function PirateJourneySummary() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const dash = await fetchDashboard();
      const goalList = await fetchGoals();
      setDashboard(dash);
      setGoals(goalList);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading || !dashboard) {
    return <p className="text-white">Loading your pirate journey...</p>;
  }

  // Rank system based on total balance
  const totalBalance = dashboard.totalBalance;
  const completedGoals = goals.filter(goal => goal.status === "completed").length;

  // Pirate Ranks & Thresholds
  const ranks = [
    { rank: "Cabin Boy", threshold: 0 },
    { rank: "First Mate", threshold: 100000 },
    { rank: "Captain", threshold: 200000 },
    { rank: "Warlord", threshold: 500000 },
    { rank: "Yonko", threshold: 1000000 },
    { rank: "Pirate King", threshold: 2000000 },
  ];

  // Determine current rank and next rank threshold
  let currentRank = ranks[0].rank;
  let nextThreshold = ranks[1].threshold;

  for (let i = 0; i < ranks.length; i++) {
    if (totalBalance >= ranks[i].threshold) {
      currentRank = ranks[i].rank;
      nextThreshold = ranks[i + 1]?.threshold || ranks[i].threshold;
    }
  }

  // Calculate progress percentage
  const progressPercent = Math.min((totalBalance / nextThreshold) * 100, 100);

  return (
    <div className="bg-primary-black text-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-title text-primary-yellow">🏴‍☠️ Pirate Journey Summary</h2>

      <div className="space-y-1">
        <p><span className="font-title text-primary-yellow mb-2">Treasure Collected (Income):</span> {dashboard.totalIncome.toLocaleString()} Beri</p>
        <p><span className="font-title text-primary-yellow mb-2">Bounty (Expenses):</span> {dashboard.totalExpenses.toLocaleString()} Beri</p>
        <p><span className="font-title text-primary-yellow mb-2">Goals Completed:</span> {completedGoals}</p>
        <div className="space-y-2">
        <p><span className="text-3xl font-title text-primary-yellow mb-2">Pirate Rank:</span> {currentRank}</p>
        <div className="w-full bg-secondary-brown rounded-full h-4">
          <div
            className="bg-secondary-gold h-4 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">
          {progressPercent.toFixed(0)}% toward next rank ({nextThreshold.toLocaleString()} Beri)
        </p>
      </div>
      </div>
    </div>
  );
}
