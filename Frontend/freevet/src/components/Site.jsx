import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useDispatch } from 'react-redux'
import { login, logout } from '@/services/Slice'
import { onAuthChange } from '@/lib/auth'

function Site() {
  const dispatch = useDispatch()

  useEffect(() => {
    const subscription = onAuthChange((event, session) => {
      if (session) {
        dispatch(login({ userData: { email: session.user.email } }))
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
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-violet-500/30 overflow-hidden flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 relative z-10">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Site