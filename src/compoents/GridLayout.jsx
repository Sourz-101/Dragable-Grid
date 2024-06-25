import React, { useEffect, useState } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import Widget from "./Widget";
import Modal from "./Modal";

const GridLayout = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const grid = GridStack.init();
    grid.float(true);
    // grid.resizable(".no-resize", false);
    grid.movable(".no-drag", false);
  }, []);

  const addNewWidget1 = () => {
    const grid = GridStack.init();
    grid.addWidget(
      '<div class="grid-stack-item border border-gray-500" data-gs-width="1" data-gs-height="1"><div class="grid-stack-item-content bg-gray-200">hello</div></div>',
      // { w: 1, h: 1},
      // { h: 1 }
    );
  };
  const addNewWidget2 = () => {
    const grid = GridStack.init();
    grid.addWidget(
      '<div class="grid-stack-item border border-gray-500" data-gs-width="2" data-gs-height="2"><div class="grid-stack-item-content bg-gray-200">hello</div></div>',
      // { w: 1, h: 1},
      // { h: 1 }
    );
  };
  const addNewWidget3 = () => {
    const grid = GridStack.init();
    grid.addWidget(
      '<div class="grid-stack-item border border-gray-500" data-gs-width="3" data-gs-height="2"><div class="grid-stack-item-content bg-gray-200">hello</div></div>',
      // { w: 1, h: 1},
      // { h: 1 }
    );
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
        <div
          className="grid-stack-item border border-gray-500 no-resize no-drag"
          data-gs-width="2"
          data-gs-height="2"
        >
          <div className="grid-stack-item-content bg-gray-200 p-4">
            <Widget />
          </div>
        </div>

        <div
          className="grid-stack-item border border-gray-500"
          data-gs-width="2"
          data-gs-height="3"
        >
          <div className="grid-stack-item-content bg-gray-200 p-4">Item 2</div>
        </div>

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
          <div className="w-[600px] flex flex-col">
            <button
              className="text-white text-3xl place-self-end"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <div className="bg-white p-2 h-72 flex justify-center items-center gap-5">
              <div
                className="w-24 h-24 border border-black"
                onClick={() => {
                  addNewWidget1();
                  setShowModal(false);
                }}
              >
                1 X 1
              </div>
              <div
                className="w-24 h-24 border border-black"
                onClick={() => {
                  addNewWidget2();
                  setShowModal(false);
                }}
              >
                2 X 2
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
