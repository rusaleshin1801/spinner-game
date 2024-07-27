import React, { useRef, useEffect } from "react";
import { usePlayerContext } from "../../provider/PlayerContext";
import { COLORS } from "../../constants";
import "./style.css";

export const Wheel: React.FC = () => {
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { players } = usePlayerContext();

  useEffect(() => {
    let cumulativePercent = 0;
    sliceRefs.current.forEach((slice, index) => {
      if (slice) {
        const percent = parseFloat(players[index].percent);
        const rotateAngle = cumulativePercent * 3.6;
        cumulativePercent += percent;
        slice.style.setProperty("--a", `${percent * 3.6}deg`);
        slice.style.setProperty("--color", COLORS[index % COLORS.length]);
        slice.style.transform = `rotate(${rotateAngle}deg)`;
      }
    });
  }, [players]);

  return (
    <div className="sliceWrapper">
      {players.map((_slice, index) => (
        <div
          key={index}
          ref={(el) => (sliceRefs.current[index] = el)}
          className="arc tooltip"
          style={{
            backgroundColor: "var(--color)",
          }}
        >
        </div>
      ))}
    </div>
  );
};
