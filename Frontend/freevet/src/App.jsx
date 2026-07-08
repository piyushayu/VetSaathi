import React from 'react';
//import Header from '../component/Header';
//import MainBody from '../component/MainBody';
// import Signup from './components/Signing/Signup';
import Signcomponent from './components/Signing/Signup';
import Logincomponent from './components/Signing/Loginup';

// function App() {
//   return (
//     <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-violet-500/30 overflow-hidden flex flex-col items-center p-4 md:p-8">
      
//       {/* Background radial/linear glow elements */}
//       <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none animate-pulse" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none animate-pulse" />
      
//       {/* Mesh/Grid subtle overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

//       {/* Main Container */}
//       <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 relative z-10">
//         {/* Header Section */}
//         <Header />
        
//         {/* Main Body Section */}
//         <MainBody />
//       </div>
//     </div>
//   );
// }

function App() {
  return (
    <div>
      {/* <Signup/> */}
      {/* <Signcomponent/> */}
      <Logincomponent/>
    </div>
  )
}



export default App;
