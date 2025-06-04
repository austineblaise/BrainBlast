"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaRocket, FaGift, FaPlay } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  return (
    <main className="h-screen bg-[#17111F] flex flex-col justify-center items-center text-white px-4">
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl font-extrabold mb-4 flex items-center gap-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <FaRocket className="text-purple-400" />
          BrainBlast ⚡️
        </motion.h1>

        <motion.p
          className="text-lg text-purple-200 mb-6 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Test your brainpower and score awesome rewards like{" "}
          <FaGift className="inline text-yellow-300" /> NFTs and Celo tokens.
          It’s fast, fun, and on-chain!
        </motion.p>

        <motion.button
          onClick={() => router.push("/quiz")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white cursor-pointer text-purple-700 px-8 py-3 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-purple-100 transition-all duration-300 shadow-lg"
        >
          <FaPlay />
          Start Quiz
        </motion.button>
      </motion.div>
    </main>
  );
}
