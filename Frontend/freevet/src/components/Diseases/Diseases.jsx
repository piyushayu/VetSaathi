import React, { useEffect, useState, useId } from 'react'
import { useOutlet } from 'react-router-dom'
import Animalcard from './Animalcard'
import { getAllAnimals } from '@/lib/database'



function Diseases() {
  const outlet = useOutlet();
  const id = useId();
  const [animalsList, setAnimalsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimals() {
      const { data, error } = await getAllAnimals();
      if (data) {
        setAnimalsList(data);
      } else {
        console.error("Error fetching animals:", error);
      }
      setLoading(false);
    }
    fetchAnimals();
  }, []);

  if (outlet) {
    return outlet;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-5 justify-center '>
      <div className='flex flex-row flex-wrap justify-center gap-6 w-full'>
        {animalsList.map((animal) => (
          <div key={animal.name} className='w-full max-w-sm flex flex-col'>
            <Animalcard 
              Name={animal.name} 
              Info={animal.info || animal.Info} 
              ImageUrl={animal.image_url || animal.ImageUrl} 
              id={id} 
            />
          </div>
        ))}
    </div>
    </div>
  )
}

export default Diseases
