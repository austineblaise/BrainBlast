"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCrown,
  FaRegLaughSquint,
  FaRedoAlt,
} from "react-icons/fa";

const questions = [
  {
    question: "What is Farcaster?",
    options: [
      "A blockchain",
      "A decentralized social network",
      "A DEX",
      "A Layer 2 wallet",
    ],
    answer: "A decentralized social network",
  },
  {
    question: "What is Celo known for?",
    options: [
      "Privacy coins",
      "Stablecoins and mobile-first DeFi",
      "NFT marketplace",
      "GameFi",
    ],
    answer: "Stablecoins and mobile-first DeFi",
  },
  {
    question: "Which consensus does Celo use?",
    options: ["Proof of Work", "Proof of Authority", "DAG", "Proof of Stake"],
    answer: "Proof of Stake",
  },
  {
    question: "What language powers Farcaster protocol (Hubble)?",
    options: ["Solidity", "Rust", "Hubble", "JavaScript"],
    answer: "Hubble",
  },
];

export default function QuizGame() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [noAnswer, setNoAnswer] = useState(false);
  const [questionFinished, setQuestionFinished] = useState(false);

  const currentQuestion = questions[step];
  const userAnswer = answers[step];

  useEffect(() => {
    if (score !== null || !currentQuestion) return;

    setTimeLeft(15);
    setNoAnswer(false);
    setQuestionFinished(false); // ✅ reset step completion

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (answers[step] === undefined) {
            handleAnswer(""); // triggers setQuestionFinished later
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  // ✅ Advance to next question after timeout feedback is done
  useEffect(() => {
    if (!questionFinished) return;

    if (step + 1 === questions.length) {
      const correctCount = answers.filter(
        (ans, i) => ans === questions[i].answer
      ).length;
      setScore(correctCount);
    } else {
      setStep((prev) => prev + 1);
    }
  }, [questionFinished]);

  //   useEffect(() => {
  //     if (score !== null || !currentQuestion) return;

  //     setTimeLeft(15);
  //     setNoAnswer(false);

  //     const timer = setInterval(() => {
  //       setTimeLeft((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           if (answers[step] === undefined) {
  //             handleAnswer(""); // Unanswered
  //           }
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, [step]);

  const handleAnswer = (option: string) => {
    if (!currentQuestion || answers[step] !== undefined) return;

    const updatedAnswers = [...answers];
    updatedAnswers[step] = option;
    setAnswers(updatedAnswers);

    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    setNoAnswer(option === "");
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setIsCorrect(null);
      setNoAnswer(false);
      setQuestionFinished(true); // ✅ mark step as completed
    }, 2000);
  };

  //   const handleAnswer = (option: string) => {
  //     if (!currentQuestion || answers[step] !== undefined) return;

  //     const updatedAnswers = [...answers];
  //     updatedAnswers[step] = option;
  //     setAnswers(updatedAnswers);

  //     const correct = option === currentQuestion.answer;
  //     setIsCorrect(correct);
  //     setNoAnswer(option === "");
  //     setShowFeedback(true);

  //     setTimeout(() => {
  //       setShowFeedback(false);
  //       setIsCorrect(null);
  //       setNoAnswer(false);

  //       if (step + 1 === questions.length) {
  //         const correctCount = updatedAnswers.filter(
  //           (ans, i) => ans === questions[i].answer
  //         ).length;
  //         setScore(correctCount);
  //       } else {
  //         setStep((prev) => prev + 1);
  //       }
  //     }, 2000);
  //   };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setScore(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setTimeLeft(15);
    setNoAnswer(false);
  };

  const unansweredCount = answers.filter((ans) => ans === "").length;

  return (
    <div className="min-h-screen bg-[#17111F] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl p-6 bg-white shadow-2xl rounded-2xl space-y-6 relative">
        <h1 className="text-3xl font-bold text-center text-[#17111F]">
          BrainBlast
        </h1>

        {score === null && (
          <>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="bg-[#17111F] h-4"
                initial={{ width: 0 }}
                animate={{
                  width: `${((step + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex justify-between text-sm text-[#17111F]">
              <span>
                Question {step + 1} of {questions.length}
              </span>
              <span>⏱ {timeLeft}s</span>
            </div>
          </>
        )}

        {/* Quiz Section */}
        {score === null && currentQuestion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-[#17111F] mb-4">
                {currentQuestion.question}
              </h2>

              <div className="grid gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={userAnswer !== undefined}
                    className={`px-4 py-3 rounded-lg text-[#17111F] border text-left transition-all ${
                      userAnswer !== undefined
                        ? option === currentQuestion.answer
                          ? "bg-green-100 border-green-500"
                          : option === userAnswer
                          ? "bg-red-100 border-red-500"
                          : "border-gray-300"
                        : "border-gray-300 hover:border-[#17111F]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className="mt-4 text-center">
                  {noAnswer ? (
                    <div className="text-yellow-600">
                      ⏱ No answer selected! Correct:{" "}
                      <strong>{currentQuestion.answer}</strong>
                    </div>
                  ) : isCorrect ? (
                    <div className="text-green-600 flex items-center justify-center gap-2">
                      <FaCheckCircle /> Correct!
                    </div>
                  ) : (
                    <div className="text-red-500 flex items-center justify-center gap-2">
                      <FaTimesCircle /> Wrong! Correct:{" "}
                      <strong>{currentQuestion.answer}</strong>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : score !== null ? (
          // Results Section
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 rounded-2xl px-8 py-10 shadow-2xl space-y-8"
            >
              <div className="flex flex-col items-center gap-2">
                <FaCrown className="text-yellow-400 text-5xl drop-shadow-md" />
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Your Results
                </h2>
                <p className="text-base text-gray-400">
                  Quiz completed successfully
                </p>
              </div>

              <div className="text-center">
                <p className="text-xl text-gray-300">
                  You scored{" "}
                  <span className="text-white font-bold text-2xl">
                    {score} / {questions.length}
                  </span>
                </p>
              </div>

              {score === 0 && unansweredCount === questions.length ? (
                <div className="flex flex-col items-center text-yellow-400 text-center gap-2 mt-4">
                  <FaRegLaughSquint className="text-4xl" />
                  <p className="text-lg font-medium">Did you even try? 😅</p>
                  <span className="text-sm text-gray-500">
                    All questions were skipped. Let's give it another shot!
                  </span>
                </div>
              ) : score === 0 ? (
                <div className="flex flex-col items-center text-red-400 text-center gap-2 mt-4">
                  <FaTimesCircle className="text-4xl" />
                  <p className="text-lg font-medium">No correct answers 😢</p>
                  <span className="text-sm text-gray-500">
                    Don't worry. You'll do better next time!
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <FaCheckCircle className="text-green-400 text-4xl" />
                  <p className="text-lg font-semibold text-gray-200">
                    Great job!
                  </p>
                  <button className="bg-gradient-to-r cursor-pointer from-farcaster to-farcaster/80 text-white px-6 py-3 rounded-lg font-semibold tracking-wide hover:opacity-90 shadow-lg transition-all duration-200">
                    🎁 Claim Your Reward
                  </button>
                </div>
              )}

              <div className="text-center cursor-pointer">
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-farcaster font-semibold px-5 py-2 rounded-full shadow transition-all duration-200"
                >
                  <FaRedoAlt className="text-farcaster" />
                  Restart Quiz
                </button>
              </div>
            </motion.div>

            <button
              onClick={restart}
              className="block mx-auto text-farcaster underline mt-4"
            >
              Restart Quiz
            </button>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
