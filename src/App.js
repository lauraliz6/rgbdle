import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import Icons from "./components/Icons";
import Logo from "./components/Logo";
import HelpModal from "./components/HelpModal";
import Game from "./components/Game";
import BasicDateCalendar from "./components/PastDays";
import { TheColor, TheDay, fetchColor, getFormattedDate } from "./components/TheColor";
import Gist from "./components/Gist";

function App() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [pastOpen, setPastOpen] = useState(false);

  const initialDate = new Date();

  const [answerColor, setAnswerColor] = useState();
  const [currentDay, setCurrentDay] = useState(getFormattedDate(initialDate));

  useEffect(()=> {
    async function fetchAnswer(date){
      const response = await fetchColor(date);
      setAnswerColor(response);
    }
    fetchAnswer(initialDate);
  }, [])

  function newColor(color){
    setAnswerColor(color);
  }

  function newDay(date){
    setCurrentDay(date);
  }

  return (
    <TheColor.Provider value={{ answerColor, newColor }}>
      <TheDay.Provider value={{ currentDay, newDay }}>
      <div className="App">
        <p>{answerColor}</p>
        <CssBaseline />
        <div>
          <Icons passHelpOpen={setHelpOpen} passPastOpen={setPastOpen}/>
          <Logo />
        </div>
        <HelpModal open={helpOpen} passHelpOpen={setHelpOpen} />
        <BasicDateCalendar open = {pastOpen} passPastOpen={setPastOpen} />
        <Game />
        <Gist />
      </div>
      </TheDay.Provider>
    </TheColor.Provider>
  );
}

export default App;
