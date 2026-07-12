import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import About from './About'
import Contact from './Contact'

function Info() {
    const location = useLocation()
    const navigate = useNavigate()

    const [isOpen , setIsOpen] = useState(location.pathname === '/contact')

    useEffect(() => {
      setIsOpen(location.pathname === '/contact')
    }, [location.pathname])

    function Openform(){
      navigate('/contact')
    }

   function Closeform (){
      navigate('/about')
   }

  return (
    <div>
        <About openform = {Openform}
        open = {isOpen}
        />
        <Contact open={isOpen}
        closefunction = {Closeform}
        />
    </div>
  )
}

export default Info