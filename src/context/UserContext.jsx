import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext =createContext()

function UserContext({children}) {
let [speaking,setspeaking]=useState(false)
let[prompt,setPrompt]=useState("listening...")
let[response,setResponse]=useState(false)


  function speak(text){
let text_speak=new SpeechSynthesisUtterance(text)
text_speak.volume=1;
text_speak.rate=1;
text_speak.pitch=1;
text_speak.lang="hi-GB"  
window.speechSynthesis.speak(text_speak)
}   
async function aiResponse(prompt){
  let text=await run(prompt)
  let newText=text.split("**")&&text.split("*")&&text.
  replace("google","sandeep")&&text.split("*")&&text.
  replace("Google","sandeep")
  setPrompt(newText)
  speak(newText)
  setResponse(true)
  setTimeout(()=>{
    setspeaking(false)
    setResponse(false)
   
  },4000)
}
let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition=new speechRecognition();
recognition.onresult=(e)=>{
  let currentIndex=e.resultIndex;
  let transcript=e.results[currentIndex][0].transcript;
  setPrompt(transcript)
  takeCommand(transcript.toLowerCase())
}

function takeCommand(command){
  if(command.includes("open")&& command.includes("youtube")){
    window.open("https://www.youtube.com/","_blank")
    speak("opening youtube...")
    setResponse(true)
    setPrompt("opening youtube...")
    setTimeout(()=>{
      setspeaking(false)

    },4000)
}else   if(command.includes("open")&& command.includes("google")){
  window.open("https://www.google.com/","_blank")
  speak("opening google...")
  setResponse(true)
  setPrompt("opening google...")
  setTimeout(()=>{
    setspeaking(false)

  },4000)
}else   if(command.includes("open")&& command.includes("instagram")){
  window.open("https://www.instagram.com/","_blank")
  speak("opening instagram..")
  setResponse(true)
  setPrompt("opening instagram...")
  setTimeout(()=>{
    setspeaking(false)

  },4000)
} else if(command.includes("time")){
  let time=new Date().toLocaleTimeString(undefined,{
    hour:"numeric",
    minute:"numeric",})
    speak(time)
    setResponse(true)
    setPrompt("time")
    setTimeout(()=>{
      setspeaking(false)
  
    },4000)

}
else if(command.includes("date")){
  let date=new Date().toLocaleDateString(undefined,
    {day:"numeric",month:"numeric"})
  speak(date)
  setResponse(true)
  setPrompt("date")
  setTimeout(()=>{
    setspeaking(false)

  },4000)
}
else{
  aiResponse(command)
}
}

 let value={ 
  recognition,
  speaking, 
  setspeaking,
  prompt,
  setPrompt,
  response
 };
  return (
    <div>
      <datacontext.Provider value={value} >
    {children}
    </datacontext.Provider>
    </div>
  )
}

export default UserContext