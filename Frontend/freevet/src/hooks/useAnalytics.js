import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

// Helper to get or create a persistent visitor ID (across sessions)
function getVisitorId() {
  try {
    let visitorId = localStorage.getItem('fv_visitor_id')
    if (!visitorId) {
      visitorId = crypto.randomUUID()
      localStorage.setItem('fv_visitor_id', visitorId)
    }
    return visitorId
  } catch (err) {
    console.warn('localStorage disabled or unavailable for visitorId', err)
    return 'anonymous'
  }
}

// Helper to get or create a session ID (resets when tab is closed)
function getSessionId() {
  try {
    let sessionId = sessionStorage.getItem('fv_session_id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      sessionStorage.setItem('fv_session_id', sessionId)
    }
    return sessionId
  } catch (err) {
    console.warn('sessionStorage disabled or unavailable for sessionId', err)
    return 'session-unknown'
  }
}

export function useAnalytics() {
  const location = useLocation()
  const lastLoggedPath = useRef(null)

  useEffect(() => {
    const fullPath = location.pathname + location.search
    
    // Avoid re-logging the exact same page view if location didn't change
    if (lastLoggedPath.current === fullPath) {
      return
    }
    lastLoggedPath.current = fullPath

    const logPageView = async () => {
      try {
        const visitorId = getVisitorId()
        const sessionId = getSessionId()

        // Get currently authenticated user if present
        let userId = null
        try {
          const { data } = await supabase.auth.getSession()
          userId = data?.session?.user?.id || null
        } catch {
          // ignore auth fetch error if offline or unauthenticated
        }

        const { error } = await supabase.from('page_views').insert({
          path: fullPath,
          visitor_id: visitorId,
          session_id: sessionId,
          user_id: userId,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
        })

        if (error) {
          console.error('Supabase analytics logging error:', error.message)
        }
      } catch (err) {
        console.error('Failed to log page view:', err)
      }
    }

    logPageView()
  }, [location])
}
