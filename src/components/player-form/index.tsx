import React from "react";
import { Input } from "../../ui";
import { usePlayerContext } from "../../provider/PlayerContext";
import { TonIcon } from "../../ui/icons";
import { BACKGROUNDS, COLORS } from "../../constants";
import "./style.css";

export const PlayerForm: React.FC = () => {
  const { inputs, addInput, handleInputChange, status } = usePlayerContext();

  const isLastInputDisabled = () => {
    const lastInput = inputs[inputs.length - 1];
    return lastInput.name.trim() === "" || lastInput.ton.trim() === "";
  };

  return (
    <>
      <div className="form-wrapper">
        <p className="form-title">{inputs.length - 1} players</p>
        <div className="form-container">
          {inputs.map((input, index) => (
            <div className="input-wrapper" key={index}>
              <Input
                value={input.name}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, "name")
                }
                style={{
                  borderColor: COLORS[index % COLORS.length],
                  background: BACKGROUNDS[index % BACKGROUNDS.length],
                  width: "142px",
                }}
                placeholder="Enter name"
                required
                readOnly={index !== inputs.length - 1}
              />
              <Input
                value={input.ton}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, "ton")
                }
                style={{
                  borderColor: COLORS[index % COLORS.length],
                  background: BACKGROUNDS[index % BACKGROUNDS.length],
                  width: "86px",
                  paddingLeft: 28,
                }}
                type="number"
                placeholder="TON"
                readOnly={index !== inputs.length - 1}
                startIcon={<TonIcon />}
              />
              {input.showPercent ? (
                <Input
                  value={`${input.percent}%`}
                  style={{
                    borderColor: COLORS[index % COLORS.length],
                    background: BACKGROUNDS[index % BACKGROUNDS.length],
                    width: "86px",
                  }}
                  placeholder="Percent"
                  readOnly
                />
              ) : (
                inputs.length < 10 &&
                (status === "idle" || status === "pending") && (
                  <button
                    onClick={addInput}
                    className="add-button"
                    style={{ backgroundColor: COLORS[inputs.length - 1] }}
                    disabled={isLastInputDisabled()}
                  >
                    +
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
