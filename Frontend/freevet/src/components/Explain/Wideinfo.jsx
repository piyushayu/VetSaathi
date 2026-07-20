import React, { useState } from 'react'
import Button from '../Button'
import { addBookmark, addLike } from '@/lib/database'
import { useSelector } from 'react-redux'
import { Heart, Bookmark, ExternalLink } from 'lucide-react'

function Wideinfo({
    name,
    diseaseid,
    context,
    overview = [],
    symptoms = [],
    medicine = [],
    treatment = [],
    reference
}) {

  const user = useSelector((state) => state.auth.userData)
  const userId = user?.id

  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  async function onlike () { 
    setIsLiked(!isLiked)
    if (!userId) return
    await addLike(userId , diseaseid)
  }

  async function onbookmark () { 
    setIsBookmarked(!isBookmarked)
    if (!userId) return
    await addBookmark(userId , diseaseid)
  }

  const handleReferenceClick = () => {
    if (reference) {
      window.open(reference, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className='flex flex-col gap-6 sm:gap-8 w-full max-w-5xl mx-auto bg-neutral-900/40 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-neutral-800/80 shadow-xl backdrop-blur-md'>
      
      <div className='bg-neutral-950/40 border border-neutral-850 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5'>
        <div className='flex flex-col gap-1.5 text-left'>
          <h1 className='text-2xl md:text-3xl font-black text-neutral-100 tracking-tight'>
            {name}
          </h1>
          <p className='text-sm text-neutral-400 font-medium leading-relaxed'>
            {context}
          </p>
        </div>
        
        <div className='flex gap-3 shrink-0 flex-wrap sm:flex-nowrap items-center'>
          {reference && (
            <a
              href={reference}
              target="_blank"
              rel="noopener noreferrer"
              className='h-10 px-4 inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-full border border-cyan-500/50 text-white hover:border-cyan-400 shadow-md shadow-cyan-500/10 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 active:translate-y-0 active:scale-100 cursor-pointer select-none'
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Reference</span>
            </a>
          )}
          <Button 
            className={`h-10 transition-all duration-300 active:scale-95 ${
              isLiked 
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-300' 
                : 'bg-neutral-800 hover:bg-neutral-750 border-neutral-700 text-neutral-200 hover:text-white'
            }`} 
            icon={<Heart className={`w-4 h-4 text-rose-500 ${isLiked ? 'fill-rose-500' : ''}`} />} 
            Clickfunctn={onlike}
          >
            Like
          </Button>
          <Button 
            className={`h-10 transition-all duration-300 active:scale-95 ${
              isBookmarked 
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300' 
                : 'bg-neutral-800 hover:bg-neutral-750 border-neutral-700 text-neutral-200 hover:text-white'
            }`} 
            icon={<Bookmark className={`w-4 h-4 text-amber-500 ${isBookmarked ? 'fill-amber-500' : ''}`} />}  
            Clickfunctn={onbookmark}
          >
            Bookmark
          </Button>
        </div>
      </div>

      <hr className='border-neutral-800/60'/>

      {/* Overview Section */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2.5 text-neutral-200 font-bold text-lg'>
          <span className="w-1 h-5 rounded-full bg-emerald-500" />
          Overview
        </div>
        
        <ul className='flex flex-col gap-3 pl-3 text-neutral-350 text-sm leading-relaxed list-disc list-inside'>
          {overview.map((point, index) => (
            <li key={index} className='marker:text-emerald-500 pl-1'>{point}</li>
          ))}
        </ul>
      </div>

      <hr className='border-neutral-800/60' />

      {/* Symptoms Section */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2.5 text-neutral-200 font-bold text-lg'>
          <span className="w-1 h-5 rounded-full bg-emerald-500" />
          Symptoms
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pl-1'>
          {symptoms.map((symptom, index) => (
            <div key={index} className='flex gap-3.5 items-start bg-neutral-950/30 border border-neutral-850 hover:border-neutral-800 rounded-xl p-4.5 transition-all duration-300 hover:shadow-md hover:shadow-neutral-950/20'>
              <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-450 text-xs font-bold'>
                {index + 1}
              </span>
              <p className='text-sm text-neutral-300 leading-relaxed'>{symptom}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className='border-neutral-800/60' />

      {/* Medicine Section */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2.5 text-neutral-200 font-bold text-lg'>
          <span className="w-1 h-5 rounded-full bg-emerald-500" />
          Recommended Medicine
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-1'>
          {medicine.map((med) => (
            <div key={med.id} className='bg-neutral-950/30 border border-neutral-850 rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:border-neutral-800 hover:shadow-md hover:shadow-neutral-950/20'>
              <div className='text-base font-bold text-neutral-100 border-b border-neutral-800/80 pb-2.5'>{med.name}</div>
              <div className='flex flex-col gap-2'>
                <span className='text-xs font-bold text-neutral-500 uppercase tracking-wider'>Side Effects</span>
                <ul className='list-disc pl-4 text-xs text-neutral-450 flex flex-col gap-1.5'>
                  {med.side_effects.map((effect, idx) => (
                    <li key={idx} className='leading-relaxed'>{effect}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className='border-neutral-800/60' />

      {/* Treatment Section */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2.5 text-neutral-200 font-bold text-lg uppercase tracking-wide'>
          <span className="w-1 h-5 rounded-full bg-emerald-500" />
          Treatment & Cure
        </div>
        
        <ul className='flex flex-col gap-3 pl-3 text-neutral-350 text-sm leading-relaxed list-disc list-inside'>
          {treatment.map((treat, index) => (
            <li key={index} className='marker:text-emerald-500 pl-1'>{treat}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Wideinfo



