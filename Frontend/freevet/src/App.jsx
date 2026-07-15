import React from 'react';
import Header from './components/Header';
import MainBody from './components/MainBody';
import Diseases from './components/Diseases/Diseases';
import Animalcard from './components/Diseases/Animalcard';
import Problems from './components/Allproblems/Problems';
import Explain from './components/Explain/Explain';
import Symcheck from './components/Symptomcheck/Symcheck';
import About from './components/Siteinfo/About';
import Info from './components/Siteinfo/Info';
import Profile from './components/Profile/Profile';
import Profilecomp from './components/Profile/Profilecomp';
// import Option1Parent from './components/Symptomcheck/Quizandresult';
//import Signup from './components/Signing/Signup';
// import Signcomponent from './components/Signing/Signup';
// import Logincomponent from './components/Signing/Loginup';

// function App() {
//   return (
//     <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-violet-500/30 overflow-hidden flex flex-col items-center p-4 md:p-8">

//       <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 relative z-10">
//         <Header />
//         <MainBody />
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       {/* <Signup/> */}
//       {/* <Signcomponent/> */}
//       <Logincomponent/>
//     </div>
//   )
// }
 


// function App() {
//   return (
//     <div>
//      <Diseases/> 
//     </div>
//   )
// }


function App() {
  return (
    <div className='bg-gray-600 min-h-screen flex flex-col gap-7'>
      <Header className='mt-4'/>
      {/* <Problems/> */}
      {/* <Explain/> */}
    {/* <Symcheck/> */}
    {/* <Option1Parent/> */}
    {/* <About/> */}
    {/* <Info/> */}
    {/* <Profile/> */}
    <Profilecomp/>
    </div>
  )
}



export default App;
