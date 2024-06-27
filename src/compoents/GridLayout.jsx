import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client'
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import Widget from "./Widget";
import Gauge from "./CurrentLevel";
import Graph from "./Graph";
import Meter from "./Meter";

const GridLayout = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(<Widget />);
    const grid = GridStack.init();
    grid.float(true);
    // grid.resizable(".no-resize", false);
    grid.movable(".no-drag", false);
  }, []);











  const addNewWidgetWithComponent = (Component, width = 1, height = 1) => {
    const grid = GridStack.init();
    const element = document.createElement('div');
    element.className = 'grid-stack-item border border-gray-500';
    element.setAttribute('data-gs-width', width);
    element.setAttribute('data-gs-height', height);

    const content = document.createElement('div');
    content.className = 'grid-stack-item-content bg-gray-200';
    element.appendChild(content);

    grid.addWidget(element);
    
    ReactDOM.createRoot(content).render(<Component />);
  };




  const addNewWidget1 = () => {
    addNewWidgetWithComponent(Gauge, 3, 1);
  };




  const addNewWidget2 = () => {
    const grid = GridStack.init();
    grid.addWidget(
      '<div class="grid-stack-item border border-gray-500" data-gs-width="2" data-gs-height="2"><div class="grid-stack-item-content bg-gray-200">hello</div></div>'
      // { w: 1, h: 1},
      // { h: 1 }
    );
  };


  const addNewWidget3 = () => {
    const grid = GridStack.init();
    grid.addWidget(
      '<div class="grid-stack-item border border-gray-500" data-gs-width="3" data-gs-height="2"><div class="grid-stack-item-content bg-gray-200">hello</div></div>'
      // { w: 1, h: 1},
      // { h: 1 }
    );
  };



  
  const addNewWidget4 = () => {
    addNewWidgetWithComponent(Widget, 2, 1);
  };

  const addNewWidget5 = () => {
    addNewWidgetWithComponent(Graph, 6, 4);
  };
  const addNewWidget6 = () => {
    addNewWidgetWithComponent(Meter, 2, 2);
  };








  const removeWidget = (item) => {
    const grid = GridStack.init();
    grid.removeWidget(item);
  };

  return (
    <div className="App p-4">
      <button
        className="py-2 my-4 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
        onClick={() => setShowModal(true)}
      >
        Add Widget
      </button>

      <dialog className="dialog">
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>

      <div className="grid-stack">
        {/* Box 1 */}
        <div
          className="grid-stack-item border border-gray-500 no-drag"
          data-gs-width="2"
          data-gs-height="1"
        >
          <div className="grid-stack-item-content bg-gray-200 p-4">
            <Widget />
          </div>
        </div>

        {/* Box 2 */}
        <div
          className="grid-stack-item border border-gray-500"
          data-gs-width="2"
          data-gs-height="3"
        >
          <div className="grid-stack-item-content bg-gray-200 p-4">Item 2</div>
        </div>

        {/* Box 3 */}
        <div
          className="grid-stack-item border border-gray-500"
          data-gs-width="1"
          data-gs-height="2"
        >
          <div className="grid-stack-item-content bg-gray-200 p-4">Item 3</div>
        </div>
      </div>

      {/*  */}
      {/* <Modal isVisible={showModal} onClose={() => setShowModal(false)}/> */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className=" flex flex-col">
            <button
              className="text-white text-3xl place-self-end"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <div className="bg-white p-2 h-72 flex justify-center items-center gap-5">
              <div
                className="w-60"
                onClick={() => {
                  addNewWidget4();
                  setShowModal(false);
                }}
              >
                <Widget />
              </div>

              <div
                className=""
                onClick={() => {
                  addNewWidget1();
                  setShowModal(false);
                }}
              >
                <Gauge />
              </div>


              <div
                className="w-60 h-32 "
                onClick={() => {
                  addNewWidget5();
                  setShowModal(false);
                }}
              >
                <img src="graphImg.png" height={40} className="w-full h-full" />
              </div>

              <div
                className=""
                onClick={() => {
                  addNewWidget6();
                  setShowModal(false);
                }}
              >
                <Meter />
              </div>
              <div
                className="w-24 h-24 border border-black"
                onClick={() => {
                  addNewWidget3();
                  setShowModal(false);
                }}
              >
                3 X 2
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridLayout;