import "./App.css";
import { PlayerProvider } from "./provider/PlayerContext";
import { GameStats, PlayerForm, Wheel } from "./components";

function App() {
  return (
    <PlayerProvider>
      <div className="main-container">
        <PlayerForm />
        <Wheel />
        <GameStats />
      </div>
    </PlayerProvider>
  );
}

export default App;
