import { PutCommand, QueryCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "./dynamodb";
import { v4 as uuidv4 } from "uuid";

// 📌 Transaction Type
export interface Transaction {
  transactionId: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  type: "expense" | "income";
}

// 📌 Savings Goal Type
export interface SavingsGoal {
  goalId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: "in-progress" | "completed";
}

// 📌 Dashboard Type
export interface Dashboard {
  totalBalance: number;
  totalExpenses: number;
  totalIncome: number;
  monthlySpending: Record<string, number>;
  categoryBreakdown: Record<string, number>;
  progress?: string;
}

/**
 * ✅ Add a New Savings Goal
 */
export const addGoal = async (goalData: Omit<SavingsGoal, "goalId">): Promise<SavingsGoal | null> => {
  try {
    const newGoal: SavingsGoal = {
      ...goalData,
      goalId: uuidv4(),
    };

    await dynamoDb.send(new PutCommand({
      TableName: "SavingsGoals",
      Item: newGoal,
    }));

    await updateDashboard();
    return newGoal;
  } catch (error) {
    console.error("Error adding goal:", error);
    return null;
  }
};

/**
 * ✅ Fetch Savings Goals
 */
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const fetchGoals = async (): Promise<SavingsGoal[]> => {
  try {
    const result = await dynamoDb.send(new ScanCommand({
      TableName: "SavingsGoals",
    }));
    return result.Items as SavingsGoal[] || [];
  } catch (error) {
    console.error("Error fetching goals:", error);
    return [];
  }
};


/**
 * ✅ Add a New Transaction
 */
export const addTransaction = async (transactionData: Omit<Transaction, "transactionId">): Promise<Transaction | null> => {
  try {
    const newTransaction: Transaction = {
      ...transactionData,
      transactionId: uuidv4(),
    };

    await dynamoDb.send(new PutCommand({
      TableName: "Transactions",
      Item: newTransaction,
    }));

    await updateDashboard();
    return newTransaction;
  } catch (error) {
    console.error("Error adding transaction:", error);
    return null;
  }
};

/**
 * ✅ Fetch Transactions
 */
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const result = await dynamoDb.send(new QueryCommand({
      TableName: "Transactions",
      KeyConditionExpression: "dummyKey = :val",
      ExpressionAttributeValues: { ":val": "static" },
    }));
    return result.Items as Transaction[] || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

/**
 * ✅ Fetch Dashboard
 */
export const fetchDashboard = async (): Promise<Dashboard | null> => {
    try {
      const result = await dynamoDb.send(new GetCommand({
        TableName: "Dashboard",
        Key: { dashboardId: "static" }, // ✅ Use correct primary key name
      }));
      return result.Item as Dashboard || null;
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      return null;
    }
  };
  

/**
 * ✅ Update Dashboard
 */
export const updateDashboard = async (): Promise<Dashboard | null> => {
  try {
    const transactions = await fetchTransactions();
    if (!transactions) return null;

    let totalBalance = 0;
    let totalExpenses = 0;
    let totalIncome = 0;
    let categoryBreakdown: Record<string, number> = {};
    let monthlySpending: Record<string, number> = {};

    transactions.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString("default", { month: "long" });

      if (txn.type === "expense") {
        totalExpenses += Math.abs(txn.amount);
        categoryBreakdown[txn.category] = (categoryBreakdown[txn.category] || 0) + Math.abs(txn.amount);
        monthlySpending[month] = (monthlySpending[month] || 0) + Math.abs(txn.amount);
      } else {
        totalIncome += txn.amount;
      }
    });

    totalBalance = totalIncome - totalExpenses;

    const dashboardData: Dashboard = {
      totalBalance,
      totalExpenses,
      totalIncome,
      monthlySpending,
      categoryBreakdown,
    };

    await dynamoDb.send(new PutCommand({
      TableName: "Dashboard",
      Item: { ...dashboardData, id: "static" },
    }));

    return dashboardData;
  } catch (error) {
    console.error("Error updating dashboard:", error);
    return null;
  }
};
