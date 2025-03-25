import React , {useContext} from "react";
import Ra from "./assets/images.png";
import "./App.css";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif"
function App() {
  let {recognition,speaking,setspeaking,prompt,response,setPrompt}=useContext(datacontext)

  return (
    <div className="main">
      <img src={Ra} alt="Displayed Image" id="wali" />
     <span>I'm wali, your Advanced Virtual Assistant
      </span> 
      {!speaking?
      <button onClick={()=>{
        setPrompt("listening...")
        setspeaking(true)
      recognition.start() 
      }}>click here<CiMicrophoneOn /></button>
    :
    <div className="response">
      {!response?<img src={speakimg} alt="Displayed Image" id="speak" />
      :
      <img src={aigif} alt="Displayed Image" id="aigif" />}
      <p>{prompt}</p>
    </div>
    }
    </div>
  );
}

export default App;
