import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import { getSymptomQuestions } from '@/lib/database'


function QuizForm({ currentIndex, allanswer, onSelectOption, onNext, onPrevious , optiondata }) {
  
  const totalQuestions = optiondata.length
  const isAnswered = allanswer[currentIndex] !== undefined
  const isLastQuestion = currentIndex === totalQuestions - 1
 
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
          {optiondata[currentIndex].question}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {optiondata[currentIndex].symptom_options.map((option) => {
          const isSelected = allanswer[currentIndex] === option.key
          return (
            <button
              key={option.key}
              onClick={() => onSelectOption(option.key)}
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
                {option.key}
              </div>
              <span>{option.text}</span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-4">
      
        <button
          className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700 rounded-xl text-sm font-medium transition-all cursor-pointer active:scale-[0.98]"
          onClick={onPrevious}
        >
          previous
        </button>

        <button
          className="px-6 py-2.5 bg-white text-neutral-950 rounded-xl text-sm font-semibold shadow-md cursor-pointer hover:bg-neutral-100 transition-all active:scale-[0.98]"
          onClick={onNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? "submit" : "next"}
        </button>
      </div>

    </div>
  )
}

function ResultSection({ onReset, matchedDiseases = [] }) {
  return (
    <div className="flex flex-col gap-4 mt-2">

      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase">
          Possible Diagnoses
        </h3>
        <button className='underline text-xs text-neutral-400 hover:text-white transition-colors' onClick={onReset}>
          Test again
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matchedDiseases.map((result) => {
          const animalName = result.animals?.name || 'Dog';
          const link = `/diseases/${encodeURIComponent(animalName)}/explain/${encodeURIComponent(result.name)}`;
          const description = result.context || result.desc || '';
          
          const defaultImages = {
            Dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=60',
            Cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=60',
            Cow: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&auto=format&fit=crop&q=60',
            Horse: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&auto=format&fit=crop&q=60',
            Goat: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=400&auto=format&fit=crop&q=60',
            Poultry: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&auto=format&fit=crop&q=60'
          };
          const image = result.image || defaultImages[animalName] || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&auto=format&fit=crop&q=60';

          return (
            <div
              key={result.id || result.name}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-neutral-700 hover:shadow-xl"
            >
              <div className="h-32 bg-neutral-950 relative overflow-hidden flex items-center justify-center">
                <img src={image} alt={result.name} className="w-full h-full object-cover opacity-80" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent" />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h4 className="font-semibold text-sm text-neutral-200">{result.name}</h4>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{description}</p>
                <Link to={link} className="mt-2 inline-flex items-center justify-center w-full py-2 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-all">
                  View Details
                </Link>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

 export { QuizForm, ResultSection }


