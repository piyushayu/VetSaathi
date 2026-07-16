import React, { useState , useEffect } from 'react'
import { QuizForm , ResultSection  } from './Quizandresult'
import { getSymptomQuestions } from '@/lib/database'

function Symcheck() {
  
  const [questiondata , setQuestiondata] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allanswer, setAllanswer] = useState({})

  const totalQuestions = questiondata.length
  const isLastQuestion = currentIndex === totalQuestions - 1

  useEffect(() => {
    async function Formdata() {
      const { data, error } = await getSymptomQuestions()
      if (data) {
        setQuestiondata(data)
      }
      setLoading(false)
    }
    Formdata()
  }, [])

  function handleSelectOption(key) {
    setAllanswer({
      ...allanswer,
      [currentIndex]: key
    })
  }

  function handleNext() {
    if (isLastQuestion) {
      setIsSubmitted(true)  
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  
  function handleReset() {
    setIsSubmitted(false)   
    setCurrentIndex(0)     
    setAllanswer({})        
  }

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-20">
        <p className="text-neutral-400 text-sm">Loading questions...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">

      {!isSubmitted
        ? (
          <QuizForm
            currentIndex={currentIndex}
            allanswer={allanswer}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrevious={handlePrevious}
            optiondata={questiondata}
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


export default Symcheck