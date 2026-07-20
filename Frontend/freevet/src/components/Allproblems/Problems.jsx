import React, { useState, useEffect } from 'react'
import Diseasecard from './Diseasecard'
import Page from '../Diseases/page'
import { useOutlet, useParams } from 'react-router-dom'
import { getDiseasesByAnimal } from '@/lib/database'

function Problems() {
  const outlet = useOutlet()
  const { animaltype } = useParams()          
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  const LIMIT = 5

  // Reset page to 1 when changing animal type
  useEffect(() => {
    setCurrentPage(1)
  }, [animaltype])

  useEffect(() => {
    async function fetchDiseases() {
      setLoading(true)
      const { data, error, count } = await getDiseasesByAnimal(animaltype, currentPage, LIMIT)
      if (data) {
        setProblems(data)
        if (count !== null && count !== undefined) {
          setTotalPages(Math.ceil(count / LIMIT) || 1)
        }
      } else {
        console.error("Error fetching diseases:", error)
      }
      setLoading(false)
    }
    fetchDiseases()
  }, [animaltype, currentPage]) 

  if (outlet) {
    return outlet
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-75">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6 justify-center max-w-7xl mx-auto px-4 py-6'>
      <div className='flex flex-row flex-wrap justify-center gap-6 w-full min-h-100'>
        {problems.map((problem) => (
          <div key={problem.id || problem.name} className='w-full max-w-85 flex justify-center'>
            <Diseasecard
              Name={problem.name}
              context={problem.context}
              Info={problem.symptoms || []}
              severity={problem.Severity || problem.severity}
            />
          </div>
        ))}
      </div>
      
      <div className='flex justify-center items-center w-full mt-4'>
        <Page
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </div>
  )
}

export default Problems
