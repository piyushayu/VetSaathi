import React, { useEffect } from 'react'
import Wideinfo from './Wideinfo'
import { nanoid } from 'nanoid'
import { data, useParams } from 'react-router-dom'

const Particulardisease = [
    {
        name : "jdkfkdfdfd",
        context : "also known as",
        overview : [
        "jdfdfad;fjd",
        " jkdkjfjdfjd",
        ] ,
        Symptoms : [
            "djkfjdfd",
            "kfdkfkldfj"
        ] , 
        Medicine : [
            {
                name : "kdkfiie",
                sideeffect : [
                    "jkfjkjjfeoieiinncie",
                    "jlkdfjeiiehenen"
                ]
            }
        ] ,
        Treatment : [
          "ioeiorei",
          "pierpeinc",
          "pewioruep"
        ]
    }
]


function Explain() {

  const disease = Particulardisease.map((dis) => ({
     ...dis,
     overview: dis.overview.map((text) => ({ text, id: nanoid() })),
     Symptoms: dis.Symptoms.map((text) => ({ text, id: nanoid() })),
     Medicine: dis.Medicine.map((med) => ({
          ...med,
          id: nanoid(),
          sideeffect: med.sideeffect.map((effect) => ({ text: effect, id: nanoid() }))
     })) ,
     Treatment : dis.Treatment.map((text) => ({text , id : nanoid()}))
}))

  // const {diseaseId} = useParams()
  // const decodename = decodeURIComponent(diseaseId)
  // const [disease, setDisease] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')

  // useEffect(() => {
  //   fetch(`/api/disease/${decodename}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     setDisease(data)
  //     setLoading(false)
  //   })
  //   .catch(() => {
  //     setError("Failed to load")
  //     setLoading(false)
  //   })

  // }, [diseaseId])

  // if (loading) return <div>Loading...</div>
  // if (error)   return <div>{error}</div>
  // if (!disease) return <div>Disease not found.</div>

  return (
    <div className="w-full flex flex-col gap-6">
      <Wideinfo 
        name={disease[0]?.name}
        context={disease[0]?.context}
        overview={disease[0]?.overview || []}
        symptoms={disease[0]?.Symptoms|| []}
        medicine={disease[0]?.Medicine || []}
        treatment={disease[0]?.Treatment || []}
      />
    </div>
  )
}

export default Explain