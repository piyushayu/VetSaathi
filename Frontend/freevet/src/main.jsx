import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Site from './components/Site'
import Container from './components/Container'
import Info from './components/Siteinfo/Info'
import Diseases from './components/Diseases/Diseases'
import Symcheck from './components/Symptomcheck/Symcheck'
import Signcomponent from './components/Signing/Signup'
import Logincomponent from './components/Signing/Loginup'
import Explain from './components/Explain/Explain'
import Problems from './components/Allproblems/Problems'

const Router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Site/>}>
    <Route path='' element={<Container/>}/>
    <Route path='about' element={<Info/>}/>
    <Route path='diseases' element={<Diseases/>}>
    <Route path=':animaltype' element={<Problems/>}>
    <Route path='explain/:diseaseId'element={<Explain/>}/>
    </Route>
    </Route>
    <Route path='symptoms' element={<Symcheck/>}/>
    <Route path='signup' element={<Signcomponent/>}/>
    <Route path='login' element={<Logincomponent/>}/>
    
    </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {Router} />
  </StrictMode>,
)

 {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}