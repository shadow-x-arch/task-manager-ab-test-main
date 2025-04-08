// Custom hook for calculating the height and width of an element by passing its ref

import { MutableRefObject, useEffect, useState } from "react";

export const useDimensions = (ref: MutableRefObject<any>) => {
  const [size, setSize] = useState<{ width: 0; height: 0 }>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    setSize(
      ref?.current && {
        width: ref?.current.offsetWidth,
        height: ref?.current.offsetHeight,
      }
    );
  }, []);

  return { width: size["width"], height: size["height"] };
};
