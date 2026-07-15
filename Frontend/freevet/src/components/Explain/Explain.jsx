import React, { useEffect, useState } from 'react'
import Wideinfo from './Wideinfo'
import { useParams } from 'react-router-dom'
import { getDiseaseByName } from '@/lib/database'


function Explain() {

  const { diseasename, animaltype } = useParams()
  const [disease, setDisease] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {

  setLoading(true)

  async function Particulardisease() {
    const {data} = await getDiseaseByName(diseasename, animaltype)
    if(data){
      setDisease(data)
    } else {
      setError("Disease not found.")
    }
    setLoading(false)
  }

  Particulardisease()

  }, [diseasename])

   if (loading) return <div>Loading...</div>
   if (error)   return <div>{error}</div>
   if (!disease) return <div>Disease not found.</div>

  return (
    <div className="w-full flex flex-col gap-6">
      <Wideinfo 
        name={disease.name}
        context={disease?.context}
        overview={disease?.overview || []}
        symptoms={disease?.symptoms || []}
        medicine={disease?.medicines || []}
        treatment={disease?.treatment || []}
      />
    </div>
  )
}

export default Explain