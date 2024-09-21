import React from "react";
import SpeechRecognizerComponent from "../layout/SpeechRecognizerComponent";

const Home = () => {
  return (
    <>
      <div className="container lg:w-6xl">
        <div className="flex items-center flex-col h-full">
          <h1 className="text-3xl font-bold text-white mb-5">
            Transcriber
            <i className="fa-solid fa-microphone-lines pl-2 text-2xl text-teal-500"></i>
          </h1>
          <SpeechRecognizerComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
