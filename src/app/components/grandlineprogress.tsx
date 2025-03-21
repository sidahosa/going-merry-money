"use client";
import { motion } from "framer-motion";

export default function GrandLineProgress() {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-blackops text-secondary-blue text-center">Grand Line Progress</h2>
      <div className="bg-secondary-brown h-6 w-full rounded-lg overflow-hidden mt-2">
        <motion.div
          className="bg-primary-red h-full"
          initial={{ width: "0%" }}
          animate={{ width: "40%" }} // Example progress
          transition={{ duration: 2 }}
        />
      </div>
      <p className="text-center mt-2">You’ve reached Alabasta! 🏝️</p>
    </section>
  );
}
