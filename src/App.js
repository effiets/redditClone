import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Subreddits from "./components/Subreddits/Subreddits";

function App() {


  const [isVissible, setIsVissible] = useState(true);


  const changeVisibility = () => {
    setIsVissible(!isVissible);
  };

  

  return (
    <div className="App">
      <Header setVisibility={changeVisibility} isVissible={isVissible}/>
      <div className="home-content">
        <Home />
     
        {isVissible && <Subreddits />}
      </div>
    </div>
  );
}

export default App;
