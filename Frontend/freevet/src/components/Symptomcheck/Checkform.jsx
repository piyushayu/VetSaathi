import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
  { ...questn , id : nanoid() , options : questn.options.map((text) => ({text , id : nanoid()}))}
))

const NewResult = RESULTS_DATA.map((result) => (
  { ...result , id : nanoid()}
))


function Checkform() {

  const [currentIndex , setCurrentIndex] = useState(0)

  const [isSubmitted , setIsSubmitted] = useState(false)

  const [allanswer , setAllanswer] = useState({})
  
  // Backend response and state management
  // const [results, setResults] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState('')

  const currentQuestion = Newquestions[currentIndex]
  const totalQuestions = Newquestions.length
  const isAnswered = allanswer[currentIndex] !== undefined
  const isLastQuestion = currentIndex === totalQuestions - 1


  function Handleoptions (key) {
      setAllanswer({
        ...allanswer , [currentIndex] : key
      })
    
  }

  function Nextquestion (){
      if(isLastQuestion){
        setIsSubmitted(true)
        // setLoading(true)
        // setError('')
        
        // axios.post('/api/symptoms/check', { answers: allanswer })
        //   .then(res => {
        //     const mappedResults = res.data.map(item => ({
        //       ...item,
        //       id: nanoid()
        //     }))
        //     setResults(mappedResults)
        //     setLoading(false)
        //   })
        //   .catch(err => {
        //     console.error("Diagnosis error:", err)
        //     setError('Failed to fetch diagnosis results. Showing mock data.')
        //     setLoading(false)
        //   })
      }else{
      setCurrentIndex((currentIndex) => currentIndex + 1)
      }
    }

  const displayResults = results.length > 0 ? results : NewResult


  function Previousquestion(){
    if(currentIndex > 0){
    setCurrentIndex((prev) => prev - 1)
    }
  }

  function Resettest (){
    setCurrentIndex(0),
    setAllanswer({})
    setIsSubmitted(false)
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      
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
                onClick={() => Handleoptions(option.text.key)}
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
          onClick={Previousquestion}
          >
            previous
          </button>

        
          <button
            className="px-6 py-2.5 bg-white text-neutral-950 rounded-xl text-sm font-semibold shadow-md cursor-pointer hover:bg-neutral-100 transition-all active:scale-[0.98]"
          onClick={Nextquestion}
          disabled = {!isAnswered}
          >
        {isLastQuestion ? "submit" : "next"}
          </button>
        </div>

      </div>

      { isSubmitted &&
      <div className="flex flex-col gap-4 mt-2">
        
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase">
            Possible Diagnoses
          </h3>

          <button className='underline' onClick={Resettest}>
            Test again 
          </button>
        </div>

        {loading && <div className="text-neutral-400 text-sm py-4">Analyzing symptoms...</div>}
        {error && <div className="text-red-400 text-sm py-2">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NewResult.map((result) => (
            <div
              key={result.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-neutral-700 hover:shadow-xl"
            >
              
              <div className="h-32 bg-neutral-950 relative overflow-hidden flex items-center justify-center">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent" />
              </div>

              
              <div className="p-4 flex flex-col gap-2 ">
                <h4 className="font-semibold text-sm text-neutral-200">
                  {result.name}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {result.desc}
                </p>
                <Link
                to={result.link}
                  className="mt-2 inline-flex items-center justify-center w-full py-2 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div> }

    </div>
  )
}

export default Checkform