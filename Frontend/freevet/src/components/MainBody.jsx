import React, { useState } from 'react';
import Button from './Button';
import { ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDiseaseByName, getAnimalByName, storequery } from '@/lib/database';


function MainBody() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");

    const [diseaseResult, animalResult] = await Promise.all([
      getDiseaseByName(searchQuery),
      getAnimalByName(searchQuery)
    ]);

    setLoading(false);

    if (diseaseResult.data) {
      storequery(null, searchQuery);
      const animalName = diseaseResult.data.animals?.name;
      const diseaseName = diseaseResult.data.name;

      if (!animalName) {
        setError("Could not determine animal type. Try the symptom checker.");
        return;
      }
      navigate(`/diseases/${encodeURIComponent(animalName)}/explain/${encodeURIComponent(diseaseName)}`);

    } else if (animalResult.data) {
      storequery(null, searchQuery);
      const animalName = animalResult.data.name;
      navigate(`/diseases/${encodeURIComponent(animalName)}`);

    } else {
      setError("Disease not found. Try the symptom checker instead.");
    }
  };

  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 ">
      
      <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
        
        {/* Moto Card */}
        <div className="flex-1 p-8 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-md shadow-xl flex flex-col justify-center text-left hover:border-violet-500/30 transition-all duration-300">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-4 w-fit">
            🐾 Virtual Pet Consultation
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Your Virtual Companion for{' '}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-400 via-indigo-300 to-purple-400">
              Animal Health
            </span>{' '}
            and Consultation
          </h1>
        </div>

        {/* Info Card */}
        <div className="p-8 rounded-2xl bg-neutral-900/30 border border-white/10 backdrop-blur-md shadow-lg text-left flex flex-col justify-center hover:border-indigo-500/30 transition-all duration-300">
          <p className="text-neutral-400 text-base leading-relaxed">
            Freevet provides rapid, intelligent insights for your pets and livestock. 
            Instantly diagnose symptoms, learn about potential diseases, find nearby 
            vet clinics, and maintain comprehensive profile histories for all your animal friends.
          </p>
        </div>

        {/* Search Row */}
        <div className="flex flex-col gap-2">
          <form 
            onSubmit={handleSearch}
            className="flex items-center gap-3 p-2 bg-neutral-900/50 border border-white/10 rounded-2xl shadow-md focus-within:border-violet-500/50 transition-all duration-300"
          >
            <div className="flex-1 flex items-center pl-3 gap-2">
              <svg
                className="w-5 h-5 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); if(error) setError(''); }}
                placeholder="Search symptoms, diseases, or vets..."
                className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-neutral-500"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className='flex flex-row items-center gap-5'
              // icon={
              //   <svg
              //     className="w-4 h-4"
              //     fill="none"
              //     stroke="currentColor"
              //     viewBox="0 0 24 24"
              //     xmlns="http://www.w3.org/2000/svg"
              //   >
              //     <path
              //       strokeLinecap="round"
              //       strokeLinejoin="round"
              //       strokeWidth="2"
              //       d="M14 5l7 7m0 0l-7 7m7-7H3"
              //     />
              //   </svg>
              // }
              // iconPosition="right"
            >
              Start Search
              <ArrowRightIcon/>
            </Button>
          </form>

          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              style={{ animation: 'fadeInDown 0.25s ease-out' }}
            >
              <span>{error}</span>
            </div>
          )}
        </div>

      </div>

      <div className="lg:col-span-7 flex">
        <div className="w-full min-h-[400px] lg:min-h-full rounded-2xl bg-neutral-950/30 border-2 border-dashed border-white/10 hover:border-violet-500/30 backdrop-blur-sm flex flex-col items-center justify-center p-8 transition-all duration-300 relative group overflow-hidden">
          
         
          <div className="absolute w-72 h-72 rounded-full bg-violet-600/10 blur-[80px] -z-10 group-hover:bg-violet-600/15 transition-all duration-300" />
          
       
          <div className="flex flex-col items-center text-center gap-4 max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:scale-110 group-hover:text-white transition-all duration-300 shadow-xl">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg mb-1">
                Veterinary Animal Showcase
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                [Space reserved for the Hero illustration featuring all 10 animals]
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainBody;
