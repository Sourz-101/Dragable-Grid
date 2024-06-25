import { useState, useEffect, useLayoutEffect, createRef, useRef } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";

const Item = ({ id }) => <div>{id}</div>;




const ControlledStack = ({ items, addItem, changeItems }) => {
  console.log(items);
  const refs = useRef({});
  const gridRef = useRef();
  const gridContainerRef = useRef(null);
  refs.current = {};

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }


  useLayoutEffect(() => {
    console.log("alsdf");
    if (!gridRef.current) {
      const grid = (gridRef.current = GridStack.init(
        {
          float: false,
          acceptWidgets: true,
          column: 6,
          minRow: 1,
        },
        gridContainerRef.current
      )
        .on("added", (ev, gsItems) => {
          console.log("added");
          if (grid._ignoreCB) return;
          gsItems.forEach((n) => {
            grid.removeWidget(n.el, true, false);
            addItem({ id: n.id, x: n.x, y: n.y, w: n.w, h: n.h });

          });
        })
        .on("removed change", (ev, gsItems) => {
          const newItems = grid.save(false);
          changeItems(newItems);
        }));
    } else {
      const grid = gridRef.current;
      const layout = items.map(
        (a) =>
          refs.current[a.id].current.gridstackNode || {
            ...a,
            el: refs.current[a.id].current,
          }
      );
      grid._ignoreCB = true;
      grid.load(layout);
      console.log("alsdf");

      delete grid._ignoreCB;
    }
  }, [items]);



  return (
    <div style={{ width: "100%", marginRight: "5px" }}>
      <div className="grid-stack" ref={gridContainerRef}>
        {items.map((item, i) => (
          <div
            ref={refs.current[item.id]}
            key={item.id}
            className="grid-stack-item"
            gs-id={item.id}
            gs-w={item.w}
            gs-h={item.h}
            gs-x={item.x}
            gs-y={item.y}
          >
            <div className="grid-stack-item-content">
              <Item {...item} />
            </div>
          </div>
        ))}
      </div>
      <code>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </code>
    </div>
  );
};

const ControlledExample = () => {
  const [items1, setItems1] = useState([
    { id: "item-1-1", x: 0, y: 0},
    { id: "item-1-2", x: 2, y: 0},
  ]);
  const [items2, setItems2] = useState([
    { id: "item-2-1", x: 0, y: 0, w: 2, h: 2 },
    { id: "item-2-2", x: 0, y: 1, w: 2, h: 2 },
    { id: "item-2-3", x: 1, y: 0, w: 2, h: 2 },
  ]);

  return (
    <div>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <div></div>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <button
          onClick={() =>
            setItems1((items) => [
              ...items,
              { id: `item-1-${Date.now()}`, x: 2, y: 0, w: 2, h: 2 },
            ])
          }
        >
          Add Item to 1 grid
        </button>
        <button
          onClick={() =>
            setItems2((items) => [
              ...items,
              { id: `item-2-${Date.now()}`, x: 2, y: 0, w: 2, h: 2 },
            ])
          }
        >
          Add Item to 2 grid
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "50%" }}>
          {/* <ControlledStack
            items={items1}
            addItem={(item) => {
              setItems1((items) => [...items, item]);
            }}
            changeItems={(items) => setItems1(items)}
          /> */}
          <div
          className="grid-stack-item border border-gray-500"
          data-gs-width="2"
          data-gs-height="3"
        >
          <div className="grid-stack-item-content bg-gray-200 p-4">Item 2</div>
        </div>
        </div>
        <div style={{ display: "flex", width: "50%" }}>
          <ControlledStack
            items={items2}
            addItem={(item) => {
              setItems2((items) => [...items, item]);
            }}
            changeItems={(items) => setItems2(items)}
          />
          <div
          className="grid-stack-item border border-gray-500"
          data-gs-width="2"
          data-gs-height="3"
        >
          <div className="grid-stack-item-content bg-gray-200 p-4">Item 2</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ControlledExample;
