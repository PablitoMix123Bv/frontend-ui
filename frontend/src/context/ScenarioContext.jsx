import { createContext, useContext, useState } from 'react';

export const SCENARIOS = {
  iss: { label: 'ISS', gravity: 'microgravity', oxygenPct: 21, pressurePsi: 14.7 },
  lunarBase: { label: 'Lunar Base', gravity: 'lunar', oxygenPct: 34, pressurePsi: 10.2 },
  rover: { label: 'Pressurized Rover', gravity: 'lunar', oxygenPct: 30, pressurePsi: 10.2 },
  spacesuit: { label: 'Spacesuit', gravity: 'microgravity', oxygenPct: 100, pressurePsi: 4.3 },
  mars: { label: 'Mars', gravity: 'martian', oxygenPct: 30, pressurePsi: 10.2 },
};

const ScenarioContext = createContext(null);

export function ScenarioProvider({ children }) {
  const [scenarioKey, setScenarioKey] = useState('iss');
  const [weights, setWeights] = useState({});

  const value = {
    scenarioKey,
    scenario: SCENARIOS[scenarioKey],
    setScenarioKey,
    weights,
    setWeights,
  };

  return <ScenarioContext.Provider value={value}>{children}</ScenarioContext.Provider>;
}

export const useScenario = () => useContext(ScenarioContext);
