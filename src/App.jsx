import { GridStack } from "gridstack";
import "./App.css";
import GridLayout from "./compoents/GridLayout";
import { useEffect } from "react";
import CurrentLevel from "./compoents/CurrentLevel";

function App() {
  return (
    <>
      <div className="min-h-screen min-w-max h-full w-full bg-violet-300">
        {/* <Comp />  */}
        {/* <RGLcomp /> */}
        {/* <RGLResponsive /> */}
        {/* <CurrentLevel props={"new prop"}/> */}
        <GridLayout />
      </div>
    </>
  );
}

export default App;

// import React, { useEffect } from "react";

// import { GridStack } from 'gridstack';
// import 'gridstack/dist/gridstack.css';

// import "./App.css";
// import Comp from "./compoents/Comp"

// function App() {
//     // _________________________________________________
//     // Initialize Gridstack inside useEffect so that DOM is rendered when its initialized
//     // _________________________________________________
//     useEffect(() => {
//         var grid = GridStack.init();
//     });
//     // _________________________________________________
//     // _________________________________________________

//     return (
//         <div className="App">
//             <div className="grid-stack">
//                 <div className="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
//                     <div className="grid-stack-item-content">Item 1</div>
//                 </div>
//                 <div className="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
//                     <div className="grid-stack-item-content">Item 2</div>
//                 </div>
//                 <div className="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
//                     <div className="grid-stack-item-content">Item 3</div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default App;
