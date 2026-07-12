import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────
// STEP 1 — DATA (same as always)
// ─────────────────────────────────────────────

const QUESTIONS_DATA = [
  {
    question: "What primary symptoms is your animal companion displaying?",
    options: [
      { key: "A", text: "Extreme tiredness, lethargy, or weakness" },
      { key: "B", text: "Frequent coughing, wheezing, or nasal discharge" },
      { key: "C", text: "Persistent vomiting, diarrhea, or refusal to eat" },
      { key: "D", text: "Limping, stiffness, or visible pain when moving" }
    ]
  },
  {
    question: "How long have these symptoms been present?",
    options: [
      { key: "A", text: "Just started today (under 24 hours)" },
      { key: "B", text: "Between 1 to 3 days" },
      { key: "C", text: "Around 4 to 7 days" },
      { key: "D", text: "Longer than a week" }
    ]
  },
  {
    question: "Is there any other noticeable change in behavior?",
    options: [
      { key: "A", text: "High body temperature / fever" },
      { key: "B", text: "Constant scratching, skin redness, or hair loss" },
      { key: "C", text: "Unusual aggression, confusion, or vocalization" },
      { key: "D", text: "No other behavioral changes noticed" }
    ]
  }
]

const RESULTS_DATA = [
  {
    name: "Parvovirus Infection",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=60",
    link: "/diseases/parvo",
    desc: "A highly contagious viral disease of dogs that commonly causes acute gastrointestinal illness."
  },
  {
    name: "Canine Influenza (Flu)",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b117b6297?w=300&auto=format&fit=crop&q=60",
    link: "/diseases/canine-flu",
    desc: "A contagious respiratory infection in dogs caused by specific type A influenza viruses."
  },
  {
    name: "Osteoarthritis",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&auto=format&fit=crop&q=60",
    link: "/diseases/arthritis",
    desc: "A degenerative joint disease that causes pain, loss of joint mobility, and inflammation."
  }
]

const Newquestions = QUESTIONS_DATA.map((questn) => (
  { ...questn, id: nanoid(), options: questn.options.map((text) => ({ text, id: nanoid() })) }
))

const NewResult = RESULTS_DATA.map((result) => (
  { ...result, id: nanoid() }
))


// ─────────────────────────────────────────────
// STEP 2 — QuizForm Component (CHILD 1)
//
// KEY DIFFERENCE FROM OPTION 1:
// This component owns its OWN state — currentIndex and allanswer.
// It does NOT receive them as props from the parent.
// The ONLY thing it receives from parent is: onSubmit (to signal "I'm done").
//
// This means the parent does NOT control currentIndex or allanswer at all.
// The parent only knows "did the form finish?" via onSubmit.
// ─────────────────────────────────────────────

function QuizForm({ onSubmit }) {

  // STEP 2a — currentIndex and allanswer live INSIDE QuizForm, not in the parent
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allanswer, setAllanswer] = useState({})

  const currentQuestion = Newquestions[currentIndex]
  const totalQuestions = Newquestions.length
  const isAnswered = allanswer[currentIndex] !== undefined
  const isLastQuestion = currentIndex === totalQuestions - 1

  function handleSelectOption(key) {
    setAllanswer({ ...allanswer, [currentIndex]: key })
  }

  function handleNext() {
    if (isLastQuestion) {
      // STEP 2b — Instead of setting isSubmitted ourselves (we don't have that state),
      // we just CALL the parent's onSubmit function to tell parent "form is done"
      onSubmit()
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div className="px-4 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-full tracking-wider uppercase border border-neutral-700">
          symptoms finder
        </div>
        <div className="text-xs text-neutral-400 font-medium">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
      </div>

      <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-5 min-h-[90px] flex items-center">
        <h2 className="text-base md:text-lg font-medium text-neutral-100 leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option) => {
          const isSelected = allanswer[currentIndex] === option.text.key
          return (
            <button
              key={option.text.key}
              onClick={() => handleSelectOption(option.text.key)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left text-sm transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-white text-neutral-950 font-semibold border-white shadow-lg"
                  : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:bg-neutral-800/30"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                isSelected
                  ? "bg-neutral-950 text-white border-neutral-950"
                  : "bg-neutral-800/50 text-neutral-400 border-neutral-700"
              }`}>
                {option.text.key}
              </div>
              <span>{option.text.text}</span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700 rounded-xl text-sm font-medium transition-all cursor-pointer active:scale-[0.98]"
          onClick={handlePrevious}
        >
          previous
        </button>
        <button
          className="px-6 py-2.5 bg-white text-neutral-950 rounded-xl text-sm font-semibold shadow-md cursor-pointer hover:bg-neutral-100 transition-all active:scale-[0.98]"
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? "submit" : "next"}
        </button>
      </div>

    </div>
  )
}


// ─────────────────────────────────────────────
// STEP 3 — ResultSection Component (CHILD 2)
// Same as Option 1 — receives onReset from parent.
// ─────────────────────────────────────────────

function ResultSection({ onReset }) {
  return (
    <div className="flex flex-col gap-4 mt-2">

      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase">
          Possible Diagnoses
        </h3>
        {/* STEP 3a — Calls parent's onReset which increments resetCount.
            That causes QuizForm to be destroyed and recreated with fresh state. */}
        <button className='underline' onClick={onReset}>
          Test again
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {NewResult.map((result) => (
          <div
            key={result.id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-neutral-700 hover:shadow-xl"
          >
            <div className="h-32 bg-neutral-950 relative overflow-hidden flex items-center justify-center">
              <img src={result.image} alt={result.name} className="w-full h-full object-cover opacity-80" loading="lazy" />
              <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent" />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h4 className="font-semibold text-sm text-neutral-200">{result.name}</h4>
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{result.desc}</p>
              <Link to={result.link} className="mt-2 inline-flex items-center justify-center w-full py-2 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-all">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}


// ─────────────────────────────────────────────
// STEP 4 — Parent Component
//
// KEY DIFFERENCE FROM OPTION 1:
// Parent only holds TWO state values:
//   isSubmitted  → show form or results
//   resetCount   → a number that changes on reset
//
// Parent does NOT hold currentIndex or allanswer.
// Those are private to QuizForm.
//
// THE KEY TRICK — "key" prop:
// When you give a component a "key" prop and that key CHANGES,
// React treats it as a completely new component.
// It DESTROYS the old one and MOUNTS a fresh one.
// So all state inside QuizForm (currentIndex, allanswer) resets to initial values automatically.
// ─────────────────────────────────────────────

function Option2Parent() {

  // STEP 4a — Parent only needs these two
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resetCount, setResetCount] = useState(0)
  // resetCount starts at 0. We use it as the "key" for QuizForm.

  // STEP 4b — When form calls onSubmit, we flip isSubmitted to true → show ResultSection
  function handleSubmit() {
    setIsSubmitted(true)
  }

  // STEP 4c — THE KEY TRICK:
  // Instead of manually calling setCurrentIndex(0) and setAllanswer({}),
  // we just increment resetCount by 1.
  // QuizForm has key={resetCount} → when resetCount changes,
  // React destroys the old QuizForm and mounts a brand new one.
  // A new QuizForm starts with useState(0) and useState({}) fresh — automatic reset!
  function handleReset() {
    setIsSubmitted(false)         // ← show form again
    setResetCount((prev) => prev + 1)  // ← force QuizForm to remount (resets its state)
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">

      {/* STEP 4d — The key prop is the magic here.
          Each time resetCount changes (0→1→2→...),
          React sees a DIFFERENT key and fully recreates the component.
          QuizForm's internal useState values go back to their initial values.

          Without key trick, QuizForm would keep its old currentIndex and allanswer
          even after isSubmitted goes back to false. */}

      {!isSubmitted
        ? (
          <QuizForm
            key={resetCount}    // ← THE TRICK: change this → destroy & remount QuizForm
            onSubmit={handleSubmit}
          />
        )
        : (
          <ResultSection
            onReset={handleReset}
          />
        )
      }

    </div>
  )
}

export default Option2Parent
