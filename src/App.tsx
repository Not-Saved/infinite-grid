import {
  useMotionValue,
  motion,
  useDragControls,
  useSpring,
} from 'framer-motion';
import * as React from 'react';
import { Item } from './Item';
import './index.css';

export default function App() {
  const controls = useDragControls();

  const xCache = useMotionValue(0);
  const yCache = useMotionValue(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function onDragStart(event: any) {
    controls.start(event);
  }

  function renderItems() {
    let items = [];
    const rowPadding = 3;
    const columnPadding = 2;
    for (let i = -rowPadding; i < rowPadding + 1; i++) {
      for (let j = -columnPadding; j < columnPadding + 1; j++) {
        items.push(
          <Item
            key={`${i},${j}`}
            x={x}
            y={y}
            xCache={xCache}
            yCache={yCache}
            xTile={i}
            yTile={j}
            tileHeight={500}
            tileWidth={500}
            rowSize={rowPadding * 2 + 1}
            columnSize={columnPadding * 2 + 1}
          />
        );
      }
    }
    return items;
  }

  return (
    <React.Fragment>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'none',
        }}
        onPointerDown={onDragStart}
      >
        <div style={{ position: 'relative' }}>{renderItems()}</div>
      </motion.div>
      <motion.div
        style={{ x, y }}
        drag
        dragControls={controls}
        onDragTransitionEnd={() => {
          console.log('DRAG END');
          xCache.set(xCache.get() + x.get());
          yCache.set(yCache.get() + y.get());
          x.set(0);
          y.set(0);
        }}
        dragTransition={{
          power: 0.4,
          timeConstant: 200,
        }}
      />
    </React.Fragment>
  );
}
