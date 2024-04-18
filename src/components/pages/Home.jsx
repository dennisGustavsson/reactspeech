import React from "react";
import SpeechRecognizerComponent from "../layout/SpeechRecognizerComponent";

const Home = () => {
  return (
    <>
      <div className="container lg:w-6xl">
        <div className="h-screen flex items-center flex-col">
          <h1 className="text-3xl font-bold text-white mb-5">Transcriber</h1>
          <SpeechRecognizerComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
