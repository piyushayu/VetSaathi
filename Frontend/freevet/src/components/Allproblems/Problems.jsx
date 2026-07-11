import React from 'react'
import Diseasecard from './Diseasecard'
import { useState } from 'react'
import { useEffect , useId} from 'react'
import Header from '../Header'
import Page from '../Diseases/page'
import { MdWarning } from 'react-icons/md'
import { nanoid } from 'nanoid'
import { useOutlet, useParams } from 'react-router-dom'

const rawDiseases = [
  {
    name: "ljfkdfd",
    info: [
      "jkfkdjf",
      "fjkeiore",
      "jrioeior"
    ]
  },
  {
    name: "Canine Distemper",
    info: [
      "Highly contagious viral disease spread through airborne exposure like sneezing and coughing",
      "Attacks the respiratory, gastrointestinal, and nervous systems",
      "Symptoms include fever, runny nose, coughing, vomiting, diarrhea, and seizures",
      "Can progress to paralysis in advanced stages — no cure, only supportive care",
      "Preventable through vaccination"
    ]
  },
  {
    name: "Canine Parvovirus",
    info: [
      "Extremely contagious virus spread through infected feces, contaminated surfaces, and direct contact",
      "Attacks the intestinal tract causing severe bloody vomiting and diarrhea",
      "Leads to rapid dehydration, shock, and can cause death within 48 to 72 hours",
      "Particularly deadly for puppies and unvaccinated dogs",
      "The virus is resilient and can survive in the environment for months"
    ]
  },
  {
    name: "Leptospirosis",
    info: [
      "Bacterial infection spread through contaminated water, urine of infected animals, or cuts in the skin",
      "Street dogs are highly vulnerable due to drinking from rivers, streams, and puddles",
      "Symptoms include fever, muscle pain, diarrhea, loss of appetite, and jaundice",
      "Can lead to kidney or liver failure in severe cases",
      "Zoonotic disease — can also spread from dogs to humans"
    ]
  },
  {
    name: "Mange",
    info: [
      "Skin disease caused by microscopic mites (Sarcoptes or Demodex) infesting hair follicles",
      "Leads to intense itching, hair loss, redness, and scabbing across the body",
      "Commonly affects puppies and immunocompromised dogs",
      "Can cause severe secondary bacterial infections if left untreated",
      "Treatable with antiparasitic medications prescribed by a vet"
    ]
  }
]



const problems = rawDiseases.map((disease) => ({
    ...disease , info : disease.info.map((text) => ({text , id : nanoid()}))
}))


function Problems() {

  const outlet = useOutlet()
  const [ warn , setWarn] = useState(false)
//const [problems , setProblems] = useState(null)

  useEffect(() => {
   const seen = localStorage.getItem("disclaimer")
   if(!seen){
    setWarn(true)
    setTimeout(() => 
      { setWarn(false)
        localStorage.setItem("disclaimer" , "true")
      }, 4000)
   }
  },[])


  const id = useId()

  if (outlet) {
    return outlet
  }

  // const {animaltype} = useParams()

  // useEffect(() => {
  //    fetch(`/api/disease?animal=${animaltype}`)
  //    .then(res => res.json())
  //   .then(data => setProblems(data))
  // },[animaltype])



  return (
    <div className='flex flex-col gap-5 justify-center '>

    <div className='flex flex-row flex-wrap justify-center gap-6 w-full'>
  {problems.slice(0, 5).map((problem) => (
    <div key={problem.name} className='w-full max-w-sm flex justify-center'>
      <Diseasecard Name={problem.name} Info={problem.info} id={id} />
          </div>
  ))}
        </div>
        <div className='relative flex justify-center items-center w-full px-5'>
          <Page/>
          <div className='absolute right-4 flex flex-col items-end '>
            { warn && <div className='h-25 w-70 bg-gray-600 text-black overflow-hidden p-2 rounded shadow mb-1'>
              <p className="text-xs tracking-wide"> All information on this site is for 
               educational purposes only. 
              Always consult a licensed veterinarian 
              before giving any medicine to your animal.</p>
            </div>}
            <MdWarning onClick={() => setWarn(!warn)} size={24} color="red" className="cursor-pointer" />
          </div>
        </div>
    </div>
  )
}




export default Problems