import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Site from './components/Site'
import Container from './components/Container'
import { Provider } from 'react-redux'
import Store from '@/services/store'

const Info = lazy(() => import('./components/Siteinfo/Info'))
const Diseases = lazy(() => import('./components/Diseases/Diseases'))
const Symcheck = lazy(() => import('./components/Symptomcheck/Symcheck'))
const Signcomponent = lazy(() => import('./components/Signing/Signup'))
const Logincomponent = lazy(() => import('./components/Signing/Loginup'))
const ResetPassword = lazy(() => import('./components/Signing/ResetPassword'))
const Explain = lazy(() => import('./components/Explain/Explain'))
const Problems = lazy(() => import('./components/Allproblems/Problems'))
const Profilecomp = lazy(() => import('./components/Profile/Profilecomp'))

function SuspenseFallback() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <h1 className="text-6xl font-black text-neutral-200">404</h1>
      <p className="text-neutral-400 text-lg">Page not found</p>
      <a href="/" className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 rounded-xl text-sm font-medium transition-all">
        Go Home
      </a>
    </div>
  )
}

const Router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Site/>}>
    <Route path='' element={<Container/>}/>
    <Route path='about' element={<Suspense fallback={<SuspenseFallback/>}><Info/></Suspense>}/>
    <Route path='contact' element={<Suspense fallback={<SuspenseFallback/>}><Info/></Suspense>}/>
    <Route path='diseases' element={<Suspense fallback={<SuspenseFallback/>}><Diseases/></Suspense>}>
    <Route path=':animaltype' element={<Suspense fallback={<SuspenseFallback/>}><Problems/></Suspense>}>
    <Route path='explain/:diseaseid'element={<Suspense fallback={<SuspenseFallback/>}><Explain/></Suspense>}/>
    </Route>
    </Route>
    <Route path='symptoms' element={<Suspense fallback={<SuspenseFallback/>}><Symcheck/></Suspense>}/>
    <Route path='signup' element={<Suspense fallback={<SuspenseFallback/>}><Signcomponent/></Suspense>}/>
    <Route path='login' element={<Suspense fallback={<SuspenseFallback/>}><Logincomponent/></Suspense>}/>
    <Route path='reset-password' element={<Suspense fallback={<SuspenseFallback/>}><ResetPassword/></Suspense>}/>
    <Route path='profile' element={<Suspense fallback={<SuspenseFallback/>}><Profilecomp/></Suspense>}/>
    <Route path='*' element={<NotFound/>}/>
    </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store} >
    <RouterProvider router = {Router} />
    </Provider>
  </StrictMode>,
)