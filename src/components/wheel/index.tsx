import React, { useEffect } from "react";
import { usePlayerContext } from "../../provider/PlayerContext";
import { CountdownTimer } from "../../ui";

export const Wheel: React.FC = () => {
  const { status, removeInput } = usePlayerContext();

  useEffect(() => {
    if (status === "done") {
      const timer = setTimeout(() => {
        removeInput();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, removeInput]);

  return (
    <>
      <CountdownTimer />
    </>
  );
};
