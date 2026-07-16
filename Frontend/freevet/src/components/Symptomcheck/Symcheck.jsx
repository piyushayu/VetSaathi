import React, { useState, useEffect } from 'react'
import { QuizForm, ResultSection } from './Quizandresult'
import { getSymptomQuestions, getDiseasesWithSymptomsByAnimal } from '@/lib/database'


//hardest code or logic of whole site for me 
const SYMPTOM_KEYWORD_MAP = {
  'A': ['vomit', 'diarrhea', 'appetite', 'weight loss', 'nausea', 'eat'],
  'B': ['cough', 'nasal', 'discharge', 'wheez', 'breathing', 'sneez'],
  'C': ['itch', 'hair loss', 'alopecia', 'rash', 'sore', 'scab', 'skin', 'lesion', 'crusty'],
  'D': ['limp', 'stiff', 'lame', 'pain', 'hoof', 'foot', 'joint'],
  'E': ['fever', 'lethargy', 'dehydrat', 'pale', 'weakness', 'tired'],
  'F': ['aggression', 'seizure', 'confusion', 'paralysis', 'spasm', 'tremor'],
}

const ADDITIONAL_SIGNS_MAP = {
  'A': ['fever', 'temperature'],
  'B': ['swelling', 'lymph', 'lump', 'enlarg'],
  'C': ['discharge', 'eye', 'nasal', 'conjunctiv'],
  'D': ['urination', 'thirst', 'urine', 'kidney'],
  'E': ['lesion', 'scab', 'wound', 'sore'],
  'F': [],
}

const ANIMAL_NAME_MAP = {
  'Dog': 'Dog',
  'Cat': 'Cat',
  'Cow': 'Cow',
  'Goat / Sheep': 'Goat',
  'Horse': 'Horse',
  'Poultry': 'Poultry',
}

async function matchDiseases(allanswer, questiondata) {
  const q1Options = questiondata[0]?.symptom_options || []
  const selectedAnimalOption = q1Options.find(o => o.key === allanswer[0])
  const animalText = selectedAnimalOption?.text         
  const animalName = ANIMAL_NAME_MAP[animalText] || animalText

  if (!animalName) return []

  const { data: diseases, error } = await getDiseasesWithSymptomsByAnimal(animalName)
  if (error || !diseases || diseases.length === 0) return []

  const primaryKeywords  = SYMPTOM_KEYWORD_MAP[allanswer[1]] || []   
  const additionalKeywords = ADDITIONAL_SIGNS_MAP[allanswer[4]] || []
  const allKeywords = [...primaryKeywords, ...additionalKeywords]

  const scored = diseases.map(disease => {
    const diseaseSymptoms = (disease.symptoms || []).map(s => s.toLowerCase())
    let score = 0

    allKeywords.forEach(kw => {
      diseaseSymptoms.forEach(ds => {
        if (ds.includes(kw)) score += 1
      })
    })

    return { ...disease, score }
  })

  const top = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return top
}
//
function Symcheck() {

  const [questiondata, setQuestiondata] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allanswer, setAllanswer] = useState({})
  const [matchedDiseases, setMatchedDiseases] = useState([])
  const [matchLoading, setMatchLoading] = useState(false)

  const totalQuestions = questiondata.length
  const isLastQuestion = currentIndex === totalQuestions - 1

  useEffect(() => {
    async function Formdata() {
      const { data, error } = await getSymptomQuestions()
      if (data) setQuestiondata(data)
      setLoading(false)
    }
    Formdata()
  }, [])

  function handleSelectOption(key) {
    setAllanswer({ ...allanswer, [currentIndex]: key })
  }

  async function handleNext() {
    if (isLastQuestion) {
      setMatchLoading(true)
      const results = await matchDiseases(allanswer, questiondata)
      setMatchedDiseases(results)
      setMatchLoading(false)
      setIsSubmitted(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1)
  }

  function handleReset() {
    setIsSubmitted(false)
    setCurrentIndex(0)
    setAllanswer({})
    setMatchedDiseases([])
  }

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-20">
        <p className="text-neutral-400 text-sm">Loading questions...</p>
      </div>
    )
  }

  if (matchLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-20">
        <p className="text-neutral-400 text-sm">Analysing symptoms...</p>
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
            matchedDiseases={matchedDiseases}
          />
        )
      }
    </div>
  )
}

export default Symcheck