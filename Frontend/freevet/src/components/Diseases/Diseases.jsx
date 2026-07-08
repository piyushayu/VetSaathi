import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Animalcard from './Animalcard'
import { useId } from 'react'
import Page from './page'
import { MdWarning } from 'react-icons/md'

const Allanimals = [
  {
    name : "Dog",
    Info : "Dogs are loyal and intelligent companions, often kept as household pets or working dogs for herding and security.",
    href : "/dog"
  },
  {
    name : "Cow",
    Info : "Cows are gentle, herbivorous farm animals raised primarily for milk production, dairy products, and agricultural labor.",
    href : "/cow"
  },
  {
    name : "Horse",
    Info : "Horses are strong, majestic animals widely utilized for riding, transport, sports, and working on farms.",
    href : "/horse"
  },
  {
    name : "Sheep",
    Info : "Sheep are gentle, flocking ruminant animals raised for their warm woolly fleece, milk, and meat.",
    href : "/sheep"
  },
  {
    name : "Goat",
    Info : "Goats are active, curious, and resilient animals known for their climbing ability, raised for milk, meat, and fiber.",
    href : "/goat"
  },
  {
    name : "Cat",
    Info : "Cats are agile, carnivorous domestic pets known for their independent nature, companionship, and pest control.",
    href : "/cat"
  },
  {
    name : "Pig",
    Info : "Pigs are highly intelligent, social omnivores kept on farms and valued for food production and keen senses.",
    href : "/pig"
  },
  {
    name : "Rabbit",
    Info : "Rabbits are small, swift herbivores with long ears and soft fur, commonly raised as gentle family pets.",
    href : "/rabbit"
  },
  {
    name : "Chicken",
    Info : "Chickens are domesticated birds raised globally for their nutrient-rich eggs and meat.",
    href : "/chicken"
  },
  {
    name : "Rooster",
    Info : "Roosters are male chickens characterized by their colorful plumage, proud stance, and distinctive early morning crowing.",
    href : "/rooster"
  }
]


// const [ warn , setWarn] = useState(true)

// function Warninginfo(){
//   return (
//     setWarn(false)
//   )
// }


function Diseases() {

  const [ warn , setWarn] = useState(false)

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
  return (
    <div className='flex flex-col gap-5 justify-center '>
        <Header className="w-auto mx-5 mt-3" />

    <div className='flex flex-row flex-wrap justify-center gap-6 w-full'>
  {Allanimals.slice(0, 5).map((animals) => (
    <div key={animals.name} className='w-full max-w-sm flex justify-center'>
      <Animalcard Name={animals.name} Info={animals.Info} id={id} />
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

export default Diseases

