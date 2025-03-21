"use client";
import { useEffect, useState } from "react";
import { fetchDashboard, Dashboard } from "../utils/api";

export default function DashboardSummary() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await fetchDashboard();
      setDashboard(data);
      setLoading(false);
    };

    loadDashboard();
  }, []);

  // Function to determine Grand Line Progress based on total balance
  const calculateProgress = (balance: number) => {
    const stages = [
      { milestone: "East Blue", threshold: 0 },
      { milestone: "Alabasta", threshold: 5000 },
      { milestone: "Skypiea", threshold: 10000 },
      { milestone: "Water 7", threshold: 20000 },
      { milestone: "Thriller Bark", threshold: 30000 },
      { milestone: "Sabaody Archipelago", threshold: 50000 },
      { milestone: "Fishman Island", threshold: 75000 },
      { milestone: "Dressrosa", threshold: 100000 },
      { milestone: "Whole Cake Island", threshold: 150000 },
      { milestone: "Wano", threshold: 200000 },
      { milestone: "Raftel (Laugh Tale)", threshold: 500000 },
    ];

    let current = stages[0].milestone;
    let nextThreshold = stages[1].threshold;
    let percentage = 0;

    for (let i = 0; i < stages.length; i++) {
      if (balance >= stages[i].threshold) {
        current = stages[i].milestone;
        nextThreshold = stages[i + 1]?.threshold || stages[i].threshold;
      }
    }

    percentage = Math.min((balance / nextThreshold) * 100, 100);

    return { current, percentage, nextThreshold };
  };

  if (loading) {
    return <p className="text-white">Loading your journey on the Grand Line...</p>;
  }

  if (!dashboard) {
    return <p className="text-white">No data available. Add transactions or goals to get started!</p>;
  }

  const { totalBalance } = dashboard;
  const { current, percentage, nextThreshold } = calculateProgress(totalBalance);

  return (
    <div className="bg-primary-black text-white p-6 rounded-lg shadow-lg space-y-6">
      {/* Total Balance */}
      <div>
        <h2 className="text-3xl font-title text-primary-yellow mb-2">🏴‍☠️ Total Balance</h2>
        <p className="text-4xl font-bold">{totalBalance.toLocaleString()} Beri</p>
      </div>

      {/* Grand Line Progress */}
      <div>
        <h2 className="text-3xl font-title text-primary-yellow mb-2">Grand Line Progress</h2>
        <p className="mb-2">Current Stop: <span className="font-bold">{current}</span></p>
        <div className="w-full bg-secondary-brown rounded-full h-4">
          <div
            className="bg-secondary-gold h-4 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm">
          {percentage.toFixed(0)}% toward next destination ({nextThreshold.toLocaleString()} Beri)
        </p>
      </div>
    </div>
  );
}
