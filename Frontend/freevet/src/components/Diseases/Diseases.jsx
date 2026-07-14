import React, { useEffect, useState, useId } from 'react'
import { useOutlet } from 'react-router-dom'
import Animalcard from './Animalcard'
import Page from './page'
import { MdWarning } from 'react-icons/md'



function Diseases() {
  const outlet = useOutlet();
  const id = useId();
  const [ warn , setWarn] = useState(false);

  useEffect(() => {
   const seen = localStorage.getItem("disclaimer")
   if(!seen){
    setWarn(true)
    setTimeout(() => 
      { setWarn(false)
        localStorage.setItem("disclaimer" , "true")
      }, 4000)
   }
  },[]);

  if (outlet) {
    return outlet;
  }

  return (
    <div className='flex flex-col gap-5 justify-center '>
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
