import React from "react";
import { usePlayerContext } from "../../provider/PlayerContext";
import "./style.css";

export const GameStats: React.FC = () => {
  const { players } = usePlayerContext();
  const bets = players.map((player) => parseFloat(player.ton));

  const minBet = bets.length > 0 ? Math.min(...bets) : 0;
  const maxBet = bets.length > 0 ? Math.max(...bets) : 0;
  const totalSum = bets.reduce((sum, bet) => sum + bet, 0);

  const STATS = [
    { id: 1, label: "Prize Pool", value: totalSum, withDot: true },
    { id: 2, label: "Min bet", value: minBet, withDot: false },
    { id: 3, label: "Number of Players", value: players.length, withDot: true },
    { id: 4, label: "Max bet", value: maxBet, withDot: false },
  ];

  return (
    <div className="stat-wrapper">
      <p className="form-title">Game Stats</p>
      <div className="stat-container">
        {STATS.map((stat) => (
          <div className="stat-item" key={stat.id}>
            <div className="stat-value">
              {stat.withDot && <span className="dot"></span>}
              <p>{stat.value}</p>
            </div>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
