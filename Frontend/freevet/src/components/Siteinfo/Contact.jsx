import React, { useState, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import Aftersubmit from './Aftersubmit'

function Contact({open , closefunction}) {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [feedback , setFeedback] = useState('Feature')
  const [suggestion , setSuggestion] = useState('')
  const [allfeedback , setAllfeedback] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const feedbackOptions = [
    { value: "Feature", label: "Feature Request" },
    { value: "Bug", label: "Report a Bug" },
    { value: "Content", label: "Medical Content Correction" },
    { value: "Other", label: "Other" }
  ]

  useEffect(() => {
    if (!open) {
      setIsSubmitted(false)
    }
  }, [open])

  function submit (e){
    e.preventDefault()
    setAllfeedback({
      name, 
      email,
      feedback,
      suggestion
    })
    setName('')
    setEmail('')
    setFeedback('Feature')
    setSuggestion('')
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      closefunction()
    }, 2000)
  }

  return (
    <div>
         {open && (
        <div className=" fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={closefunction}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
 
            {isSubmitted ? (
              <Aftersubmit />
            ) : (
              <form className="flex flex-col gap-4" onSubmit={submit}>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-white">Submit a Suggestion</h3>
                  <p className="text-xs text-neutral-400">Help us improve diagnostics or database resources.</p>
                </div>
   
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-neutral-400 font-semibold">Name (Optional)</label>
                  <input  
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="bg-neutral-950/60 border border-neutral-850 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 rounded-xl px-4 py-2.5 outline-none text-neutral-200 text-sm transition-all"
                  />
                </div>
   
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-neutral-400 font-semibold">Email (Optional)</label>
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="bg-neutral-950/60 border border-neutral-850 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 rounded-xl px-4 py-2.5 outline-none text-neutral-200 text-sm transition-all"
                  />
                </div>
   
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-neutral-400 font-semibold">Feedback Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {feedbackOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFeedback(option.value)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center ${
                          feedback === option.value
                            ? 'bg-violet-600 border-violet-500 text-white shadow-md shadow-violet-900/20'
                            : 'bg-neutral-950/60 border-neutral-850 text-neutral-400 hover:text-neutral-200 hover:border-neutral-755'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
   
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-neutral-400 font-semibold">Your Message</label>
                  <textarea 
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your suggestion here..."
                    className="bg-neutral-950/60 border border-neutral-850 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 rounded-xl px-4 py-2.5 outline-none text-neutral-200 text-sm resize-none transition-all"
                  />
                </div>
   
                <button
                  type="submit"
                  className="mt-2 w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Suggestion</span>
                </button>
              </form>
            )}
 
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact