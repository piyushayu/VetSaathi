import React from 'react';
import Header from './components/Header';
import Profilecomp from './components/Profile/Profilecomp';

function App() {
  return (
    <div className='bg-gray-600 min-h-screen flex flex-col gap-7'>
      <Header className='mt-4'/>
    <Profilecomp/>
    </div>
  )
}

export default App;
