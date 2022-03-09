import React, { useState } from "react";
import "./App.css";

import Home from "./pages/Home";

function App() {
  /*
    const [counter, setCounter] = useState(0); // [valor, função para atualizar valor]

    function handleButtonClick() {
      setCounter(counter + 1);
    }

    <p>{counter}</p>
    <button type="button" onClick={handleButtonClick}>
      Adicionar
    </button>
  */

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
