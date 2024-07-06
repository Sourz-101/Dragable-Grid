import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import Widget from "./Widget";
import CurrentLevel from "./CurrentLevel";
import Graph from "./Graph";
import Meter from "./Meter";
import { useGlobalState } from "../store/GlobalVariable";

const GridLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const { component, setComponent } = useGlobalState();
  const [grid, setGrid] = useState(null);
  const initialized = useRef(false);

  const [currentLevelText, setCurrentLevelText] = useState('Current Level');
  const [motorStatus, setMotorStatus] = useState('Motor Status');

  const findBestPosition = (component, newWidth, newHeight) => {
    const maxGridWidth = 12; // Assuming a 12-column grid
    const occupiedSpaces = component.map(comp => ({
      x1: comp.x,
      y1: comp.y,
      x2: comp.x + comp.width,
      y2: comp.y + comp.height
    }));

    const checkOverlap = (x, y) => {
      for (let space of occupiedSpaces) {
        if (x < space.x2 && x + newWidth > space.x1 &&
            y < space.y2 && y + newHeight > space.y1) {
          return true;
        }
      }
      return false;
    };

    let bestX = 0;
    let bestY = 0;
    let minArea = Infinity;

    for (let y = 0; y <= 100; y++) { // Limit vertical search to prevent infinite loop
      for (let x = 0; x <= maxGridWidth - newWidth; x++) {
        if (!checkOverlap(x, y)) {
          const area = x * y;
          if (area < minArea) {
            minArea = area;
            bestX = x;
            bestY = y;
          }
          break; // Move to next row if we found a spot
        }
      }
      if (minArea !== Infinity) {
        break; // We found a suitable position
      }
    }

    return { x: bestX, y: bestY };
  };

  const initializeGrid = () => {
    if (initialized.current) return;
    initialized.current = true;

    const newGrid = GridStack.init({
      float: true,
      // Add any other GridStack options you need
    });
    setGrid(newGrid);

    // Restore widgets from the context state
    if (component.length > 0) {
      component.forEach((item) => {
        const Comp = getComponentByName(item.comp);
        if (Comp) {
          addNewWidgetWithComponent(
            newGrid,
            Comp,
            item.width,
            item.height,
            item.id,
            item.x,
            item.y,
            item.props
          );
        }
      });
    }

    // Listen for change events
    newGrid.on('change', (event, items) => {
      setComponent(prevComponents => {
        const updatedComponents = [...prevComponents];
        items.forEach(item => {
          const index = updatedComponents.findIndex(comp => comp.id === item.id);
          if (index !== -1) {
            updatedComponents[index] = {
              ...updatedComponents[index],
              width: item.width,
              height: item.height,
              x: item.x,
              y: item.y,
            };
          }
        });
        return updatedComponents;
      });
    });
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const addNewWidgetWithComponent = (gridInstance, Component, width = 1, height = 1, id = null, x = 0, y = 0, props = {}) => {
    if (gridInstance) {
      const element = document.createElement("div");
      element.className = "grid-stack-item border border-gray-500 bg-violet-300 overflow-x-auto overflow-y-hidden";
      element.setAttribute("data-gs-width", width);
      element.setAttribute("data-gs-height", height);
      element.setAttribute("data-gs-x", x);
      element.setAttribute("data-gs-y", y);
      element.setAttribute("data-gs-id", id || `gs-item-${Date.now()}`);
      element.setAttribute("data-gs-component", Component.name);
      element.setAttribute("data-gs-props", JSON.stringify(props));

      const content = document.createElement("div");
      content.className = "grid-stack-item-content bg-gray-200 relative";
      element.appendChild(content);

      gridInstance.addWidget(element, { x, y, width, height });

      ReactDOM.createRoot(content).render(
        <div className="relative w-full h-full">
          <Component {...props} />
          <button
            className="absolute top-1 right-1 bg-red-400 text-white p-1 rounded text-xs hover:bg-red-600 transition-colors"
            onClick={() => removeWidget(gridInstance, element)}
          >
            X
          </button>
        </div>
      );
    }
  };

  const removeWidget = (gridInstance, item) => {
    if (gridInstance) {
      const itemId = item.getAttribute("data-gs-id");
      setComponent((prevComponents) => {
        const updatedComponents = prevComponents.filter((comp) => comp.id !== itemId);
        gridInstance.removeWidget(item);
        return updatedComponents;
      });
    }
  };

  const updateContext = (comp, width, height, props = {}) => {
    const { x: newX, y: newY } = findBestPosition(component, width, height);

    const newItem = { 
      comp, 
      width, 
      height, 
      id: `gs-item-${Date.now()}`, 
      x: newX, 
      y: newY,
      props 
    };
    
    setComponent(prevComponents => [...prevComponents, newItem]);
    addNewWidgetWithComponent(
      grid,
      getComponentByName(comp),
      width,
      height,
      newItem.id,
      newItem.x,
      newItem.y,
      props
    );
  };

  const getComponentByName = (name) => {
    switch (name) {
      case "Widget":
        return Widget;
      case "CurrentLevel":
        return CurrentLevel;
      case "Graph":
        return Graph;
      case "Meter":
        return Meter;
      default:
        return null;
    }
  };

  return (
    <div className="App p-4">
      <button
        className="py-2 my-4 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
        onClick={() => setShowModal(true)}
      >
        Add Widget
      </button>

      <div className="grid-stack"></div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="flex flex-col">
            <button
              className="text-white text-3xl place-self-end pr-4"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <div className="bg-white p-2 h-72 flex justify-center items-center gap-5">
              {/* Green Light Widget */}
              <div className="w-60 flex flex-col">
                <Widget />
                <div className="flex">
                  <input 
                    placeholder="Motor Status" 
                    type="text" 
                    className="m-1 px-2 py-1 border-black w-full bg-green-300 rounded-md" 
                    onChange={(e) => setMotorStatus(e.target.value)}
                  />
                  <button 
                    className="m-1 bg-green-300 rounded-md inline-flex items-center"
                    onClick={() => {
                      updateContext("Widget", 4, 2, { message: motorStatus });
                      setShowModal(false);
                    }}
                  >
                    ✔️
                  </button>
                </div>
              </div>

              {/* Current Level Widget */}
              <div className="flex flex-col">
                <CurrentLevel />
                <div className="flex">
                  <input 
                    placeholder="Current Level" 
                    type="text" 
                    className="m-1 px-2 py-1 border-black w-full bg-green-300 rounded-md" 
                    onChange={(e) => setCurrentLevelText(e.target.value)}
                  />
                  <button 
                    className="m-1 bg-green-300 rounded-md inline-flex items-center"
                    onClick={() => {
                      updateContext("CurrentLevel", 4, 2, { message: currentLevelText });
                      setShowModal(false);
                    }}
                  >
                    ✔️
                  </button>
                </div>
              </div>

              {/* Graph Widget */}
              <div
                className="w-60 h-32"
                onClick={() => {
                  updateContext("Graph", 6, 4);
                  setShowModal(false);
                }}
              >
                <img src="graphImg.png" height={40} className="w-full h-full" alt="Graph" />
              </div>

              {/* Meter Widget */}
              <div
                className=""
                onClick={() => {
                  updateContext("Meter", 2, 2);
                  setShowModal(false);
                }}
              >
                <Meter />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridLayout;