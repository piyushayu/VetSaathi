import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDiseaseByName, getAnimalByName, storequery } from '@/lib/database';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { Search } from 'lucide-react';
import { TextGenerateEffect } from './ui/text-generate-effect';

function MainBody() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const words = ` Freevet provides rapid, intelligent insights for your pets and livestock.Instantly diagnose symptoms, learn about potential diseases`

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
      storequery(searchQuery);
      const animalName = diseaseResult.data.animals?.name;
      const diseaseName = diseaseResult.data.name;

      if (!animalName) {
        setError("Could not determine animal type. Try the symptom checker.");
        return;
      }
      navigate(`/diseases/${encodeURIComponent(animalName)}/explain/${encodeURIComponent(diseaseName)}`);

    } else if (animalResult.data) {
      storequery(searchQuery);
      const animalName = animalResult.data.name;
      navigate(`/diseases/${encodeURIComponent(animalName)}`);

    } else {
      setError("Disease or animal not found. Try the symptom checker instead.");
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-center mt-2 md:mt-4 gap-8 text-center max-w-4xl mx-auto px-4">
      
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="div"
        className="dark:bg-black bg-white text-white dark:text-white flex items-center space-x-2 px-4 py-1 text-sm font-semibold"
      >
        <span>🐾 Virtual Pet Consultation</span>
      </HoverBorderGradient>

      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mt-2">
        Your Virtual Companion for <br />
        <span className="text-neutral-400">
          Animal Health
        </span>{' '}
        <span className="text-neutral-400">and Consultation</span>
      </h1>
      
      <div className="max-w-2xl mx-auto text-neutral-400 text-lg md:text-xl">
        <TextGenerateEffect words={words} className={`font-light`} />
      </div>

      <div className="w-full max-w-xl mx-auto mt-6">
        <form 
          onSubmit={handleSearch}
          className="flex items-center gap-3 p-2 bg-neutral-900/40 border border-white/10 rounded-2xl shadow-md transition-all duration-300 backdrop-blur-md"
        >
          <div className="flex-1 flex items-center pl-3 gap-2">
            <Search className="text-neutral-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); if(error) setError(''); }}
              placeholder="Search symptoms, diseases, or vets..."
              className="w-full bg-transparent border-none text-white text-base focus:outline-none placeholder-neutral-500"
            />
          </div>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            type="submit"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-6 py-2"
          >
            <span>Search</span>
            <ArrowRightIcon className="w-4 h-4" />
          </HoverBorderGradient>
        </form>
        {error && (
          <div
            role="alert"
            className="flex items-center justify-center gap-2 px-4 py-3 mt-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm w-fit mx-auto"
            style={{ animation: 'fadeInDown 0.25s ease-out' }}
          >
            <span>{error}</span>
          </div>
        )}
      </div>

    </main>
  );
}

export default MainBody;

    // <Button
    //           type="submit"
    //           variant="primary"
    //           className='flex flex-row items-center gap-5'
    //         >
    //           Start Search
    //           <ArrowRightIcon/>
    //         </Button>


      //  <div className="p-8 rounded-2xl bg-neutral-900/30 border border-white/10 backdrop-blur-md shadow-lg text-left flex flex-col justify-center hover:border-indigo-500/30 transition-all duration-300">
      //     <p className="text-neutral-400 text-base leading-relaxed">
      //       Freevet provides rapid, intelligent insights for your pets and livestock. 
      //       Instantly diagnose symptoms, learn about potential diseases, find nearby 
      //       vet clinics, and maintain comprehensive profile histories for all your animal friends.
      //     </p>
      //   </div>