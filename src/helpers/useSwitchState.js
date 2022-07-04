import { useState } from "react";

const useSwitchState = (defaultValue = false) => {
  const [switchState, setSwitchState] = useState(defaultValue);

  const setActive = () => {
    setSwitchState(true);
  };

  const setInactive = () => {
    setSwitchState(false);
  };

  return { switchState, setActive, setInactive };
};

const useSwitchStates = (array = [], defaultValue = false) => {
  const [switchState, setSwitchState] = useState(
    [...Array(array.length)].fill(defaultValue)
  );

  const setActive = (i) => () => {
    const op = [...switchState];
    op[i] = true;
    setSwitchState(op);
  };
  const setInactive = (i) => () => {
    const op = [...switchState];
    op[i] = false;
    setSwitchState(op);
  };

  return { switchState, setActive, setInactive };
};

export { useSwitchState, useSwitchStates };
