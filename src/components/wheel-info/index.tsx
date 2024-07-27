import React from "react";
import { StarsIcon } from "../../ui/icons";
import { usePlayerContext } from "../../provider/PlayerContext";
import { convertTonToUsd } from "../../utils/convertTonToUsd";
import { TonIcon } from "../../ui/icons";
import "./style.css";

export const WheelInfo: React.FC = () => {
  const { winner, players, status } = usePlayerContext();
  const bets = players.map((player) => parseFloat(player.ton));
  const totalSum = bets.reduce((sum, bet) => sum + bet, 0);

  const renderStatusMessage = () => {
    switch (status) {
      case "pending":
        return (
          <div>
            <div className="ton-item">
              <TonIcon />
              <p className="ton">{totalSum} </p>
            </div>
            <p className="usd-item">{convertTonToUsd(totalSum)}</p>
          </div>
        );
      case "progress":
        return (
          <div>
            <div className="ton-item">
              <TonIcon />
              <p className="ton">{totalSum} </p>
            </div>
            <p className="usd-item">Drawing winner</p>
          </div>
        );
      case "done":
        return (
          <div>
            <StarsIcon />
            {winner && (
              <div className="winner-info">
                <p className="winner-name">{winner.name}</p>
                <p className="winner-bet">
                  {totalSum} &#x2022;{" "}
                  {(Number(totalSum) / Number(winner.ton)).toFixed(2)}x WIN{" "}
                </p>
              </div>
            )}
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={`info-wrapper wheel-info ${status}`}>
      {renderStatusMessage()}
    </div>
  );
};
