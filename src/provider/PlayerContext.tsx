import React, { createContext, useContext, useState, ReactNode } from "react";

interface Player {
  name: string;
  ton: string;
  percent: string;
  showPercent: boolean;
}

interface PlayerContextType {
  inputs: Player[];
  players: Player[];
  setWinner: (param: any) => void;
  addInput: () => void;
  handleInputChange: (
    index: number,
    value: string,
    field: "name" | "ton"
  ) => void;
  winner: any;
  status: "idle" | "pending" | "progress" | "done";
  setStatus: (status: "idle" | "pending" | "progress" | "done") => void;
  removeInput: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputs, setInputs] = useState<Player[]>([
    { name: "", ton: "", percent: "", showPercent: false },
  ]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<string | null>("");
  const [status, setStatus] = useState<
    "pending" | "progress" | "done" | "idle"
  >("idle");

  const addInput = () => {
    const totalTon = inputs.reduce(
      (sum, input) => sum + parseFloat(input.ton || "0"),
      0
    );
    const newInputs = inputs.map((input) => {
      const tonValue = parseFloat(input.ton || "0");
      const percent = totalTon > 0 ? (tonValue / totalTon) * 100 : 0;
      return { ...input, percent: percent.toFixed(2), showPercent: true };
    });
    setInputs([
      ...newInputs,
      { name: "", ton: "", percent: "", showPercent: false },
    ]);
    setPlayers([...newInputs]);
  };

  const removeInput = () => {
    setInputs([{ name: "", ton: "", percent: "", showPercent: false }]);
    setStatus("idle");
    setWinner(null);
    setPlayers([]);
  };

  const handleInputChange = (
    index: number,
    value: string,
    field: "name" | "ton"
  ) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  return (
    <PlayerContext.Provider
      value={{
        inputs,
        addInput,
        handleInputChange,
        players,
        setWinner,
        winner,
        setStatus,
        status,
        removeInput,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
