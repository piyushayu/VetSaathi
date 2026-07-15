import React from 'react'
import Button from '../Button'
import ReactLogo from "../../assets/react.svg"

function Wideinfo({
    name,
    context,
    overview = [],
    symptoms = [],
    medicine = [],
    treatment = []
}) {
  return (
    <div className='flex flex-col gap-6 w-full max-w-3xl mx-auto bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800'>
      
      <div className='bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-5 flex items-center justify-between'>
        <div className='flex flex-col gap-2.5 w-80'>
    
          <div className='h-7 bg-neutral-600 rounded-md w-1/2'>
          {name}
          </div>

          <div className='h-4 bg-neutral-700 rounded-md w-3/4'>
          {context}
          </div>
        </div>
        
        <div className='flex gap-3'>
          <Button className='h-9  bg-neutral-700' icon={ReactLogo}  children={"Like"}/>
          <Button className='h-9  bg-neutral-700' icon={ReactLogo} children={"Save"}/>
        </div>
      </div>

      <hr className='border-neutral-800/80'/>

      <div className='flex flex-col gap-4'>
        <div className='h-6 bg-neutral-600 rounded-full w-24 ml-1 flex items-center justify-center'>
            Overview
        </div>
        
        <div className='flex flex-col gap-3.5 pl-1'>
        {
            overview.map((point , index) => (
                <li key={index} className='ml-5'>{point}</li>
            ))
        }
        </div>
      </div>

      <hr className='border-neutral-800/80' />

      <div className='flex flex-col gap-4'>

        <div className='h-6 bg-neutral-600 rounded-full ml-1 w-24 flex items-center justify-center'>Symptoms</div>
        
        <div className='flex flex-wrap gap-2.5'>
        {
            symptoms.map((med , index) => (
                <li key={index} className='h-8 w-26 ml-6 flex justify-center items-center bg-neutral-700 rounded-full'>{med}</li>
            ))
        }
        </div>
      </div>

      <hr className='border-neutral-800/80' />

      <div className='flex flex-col gap-4'>

        <div className='h-6 bg-neutral-600 rounded-full w-24 flex justify-center items-center'>
            Medicine
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {medicine.map((med) => (
            <div key={med.id} className='bg-neutral-950/50 border border-neutral-800/60 rounded-xl p-4 flex flex-col gap-2'>
              <div className='text-sm font-semibold text-neutral-200'>{med.name}</div>
              <ul className='list-disc pl-4 text-xs text-neutral-400 flex flex-col gap-1.5'>
                {(med.side_effects).map((effect) => (
                  <li key={effect}>{effect}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className='border-neutral-800/80' />

      <div className='flex flex-col gap-4'>
      
        <div className='h-6 bg-neutral-600 rounded-full w-50 ml-1 flex justify-center items-center'>
          TREATMENT & CURE
        </div>
        
        <div className='flex flex-col gap-3.5 pl-1'>
        {
            treatment.map((treat) => (
                <li key={treat} className='ml-6 '>{treat}</li>
            ))
        }
        </div>
      </div>

    </div>
  )
}

export default Wideinfo



