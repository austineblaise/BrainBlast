import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { questions } from "@/lib/questions";

export default function Result() {
  const router = useRouter();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedScore = Number(localStorage.getItem("quizScore") || 0);
    setScore(savedScore);
    localStorage.removeItem("quizScore");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-pink-600 p-6">
      <div className="bg-white max-w-md w-full rounded-xl shadow-xl p-10 text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">🎉 Quiz Completed!</h1>
        <p className="text-xl mb-6">
          You scored <span className="font-bold text-green-600">{score}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
