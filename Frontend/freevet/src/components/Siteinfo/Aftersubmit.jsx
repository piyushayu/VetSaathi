import React from 'react'
import { CheckCircle2 } from 'lucide-react'

function Aftersubmit() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in zoom-in-95 duration-300">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Submission Complete</h3>
      <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
        Thank you for helping us improve Freevet! Your suggestion has been successfully submitted.
      </p>
    </div>
  )
}

export default Aftersubmit