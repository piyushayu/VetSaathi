import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { StickyBanner } from '@/components/ui/sticky-banner'
import { useDispatch } from 'react-redux'
import { login, logout } from '@/services/Slice'
import { onAuthChange } from '@/lib/auth'
import { useAnalytics } from '@/hooks/useAnalytics'

function Site() {
  const dispatch = useDispatch()
  
  useAnalytics()

  useEffect(() => {
    const subscription = onAuthChange((event, session) => {
      if (session) {
        dispatch(login({ userData: { email: session.user.email , id : session.user.id } }))
      } else {
        dispatch(logout())
      }
    })

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe()
      }
    }
  }, [dispatch])

  return (
    <div className="relative min-h-screen w-full bg-black text-neutral-100 font-sans selection:bg-violet-500/30 overflow-hidden flex flex-col items-center p-4 md:p-8">
      {/* Dark White Dotted Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
        <StickyBanner className="bg-linear-to-r from-red-600/90 to-amber-600/90 rounded-xl border border-red-500/20 shadow-md">
          <p className="mx-0 max-w-[90%] text-white font-medium drop-shadow-md text-sm text-center">
            ⚠️ <strong>Disclaimer:</strong> This website is for educational purposes only. Always consult a licensed veterinarian before diagnosing or treating animals.
          </p>
        </StickyBanner>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Site