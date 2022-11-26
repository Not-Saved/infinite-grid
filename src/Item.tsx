import { MotionValue, useMotionValue, motion } from 'framer-motion';
import * as React from 'react';

type Props = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  xCache: MotionValue<number>;
  yCache: MotionValue<number>;
  xTile: number;
  yTile: number;
  tileHeight: number;
  tileWidth: number;
  rowSize: number;
  columnSize: number;
};

export const Item = ({
  x,
  y,
  xCache,
  yCache,
  xTile,
  yTile,
  tileHeight = window.innerHeight,
  tileWidth = window.innerWidth,
  rowSize = 5,
  columnSize = 5,
}: Props) => {
  const xItem = useMotionValue(0);
  const yItem = useMotionValue(0);

  const xBase = useMotionValue(xTile * tileWidth);
  const yBase = useMotionValue(yTile * tileHeight);

  React.useEffect(() => {
    function handlePositioningX(l: number) {
      const totalX = l + xCache.get() + xBase.get();
      if (totalX > tileWidth * ((rowSize - 1) / 2)) {
        xBase.set(xBase.get() - tileWidth * rowSize);
        xItem.set(l + xCache.get() + xBase.get());
      } else if (totalX <= -tileWidth * ((rowSize - 1) / 2)) {
        xBase.set(xBase.get() + tileWidth * rowSize);
        xItem.set(l + xCache.get() + xBase.get());
      } else {
        xItem.set(totalX);
      }
    }

    handlePositioningX(x.get());
    return x.onChange((l) => {
      handlePositioningX(l);
    });
  }, [xItem, xCache, x, xBase, tileWidth, rowSize]);

  React.useEffect(() => {
    function handlePositioningY(l: number) {
      const totalY = l + yCache.get() + yBase.get();

      if (totalY > tileHeight * ((columnSize - 1) / 2)) {
        yBase.set(yBase.get() - tileHeight * columnSize);
        yItem.set(l + yCache.get() + yBase.get());
      } else if (totalY <= -tileHeight * ((columnSize - 1) / 2)) {
        yBase.set(yBase.get() + tileHeight * columnSize);
        yItem.set(l + yCache.get() + yBase.get());
      } else {
        yItem.set(totalY);
      }
    }

    handlePositioningY(y.get());
    return y.onChange((l) => {
      handlePositioningY(l);
    });
  }, [yItem, yCache, y, yBase, tileHeight, columnSize]);

  return (
    <motion.div
      style={{
        width: tileWidth,
        height: tileHeight,
        x: xItem,
        y: yItem,
        position: xTile === 0 && yTile === 0 ? 'relative' : 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 100,
        border: '1px solid black',
        userSelect: 'none',
      }}
    >
      {/*   <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: 200,
          height: 200,
          background: 'green',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '70%',
          width: 200,
          height: 200,
          background: 'red',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '80%',
          left: '20%',
          width: 200,
          height: 200,
          background: 'blue',
        }}
      /> */}
      {Math.abs(xTile + yTile) % 2 === 0 && (
        <img
          src="https://burst.shopifycdn.com/photos/fog-on-dark-waters-edge.jpg?width=1200&format=pjpg&exif=1&iptc=1"
          style={{
            width: '100%',
            height: '100%',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      )}
      {Math.abs(xTile + yTile) % 2 === 1 && (
        <img
          src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1600"
          style={{
            width: '100%',
            height: '100%',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
};
