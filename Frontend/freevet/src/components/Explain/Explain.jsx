import React from 'react'
import Wideinfo from './Wideinfo'
import { nanoid } from 'nanoid'
import { useParams } from 'react-router-dom'

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

const Idofoverview = Particulardisease.map((dis) => ({
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

function Explain() {

  const {diseaseId} = useParams()
  const decodename = decodeURIComponent(diseaseId)

  const match = Idofoverview.find(
    (d) => d.name.toLowerCase() === decodename.toLowerCase()
  )

  if(!match) return <div> Disease not match </div>
  return (
    <div className="w-full flex flex-col gap-6">
      <Wideinfo 
        name={match?.name}
        context={match?.context}
        overview={match?.overview || []}
        symptoms={match?.Symptoms|| []}
        medicine={match?.Medicine || []}
        treatment={match?.Treatment || []}
      />
    </div>
  )
}

export default Explain