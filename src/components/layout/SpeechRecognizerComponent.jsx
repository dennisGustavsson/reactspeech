import { useEffect, useState, useRef } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import React from "react";
const SpeechRecognizerComponent = () => {
  const [displayText, setDisplayText] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const speechConfig = useRef(null);
  const audioConfig = useRef(null);
  const recognizer = useRef(null);

  useEffect(() => {
    speechConfig.current = sdk.SpeechConfig.fromSubscription(
      "1824630089eb4d558f5e8466b9ea8acf",
      "swedencentral"
    );
    speechConfig.current.speechRecognitionLanguage = "sv-SE";

    audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizer.current = new sdk.ConversationTranscriber(
      speechConfig.current,
      audioConfig.current
    );

    recognizer.current.sessionStarted = (s, e) => {
      console.log("Session started event:", e);
      console.log("SessionId" + e.sessionId);
    };

    recognizer.current.transcribed = (s, e) => {
      if (e.result.text !== undefined) {
        setDisplayText((prevText) => [
          ...prevText,
          `${e.result.speakerId}: ${e.result.text}`,
        ]);
      }
    };
    return () => {
      recognizer.current.stopTranscribingAsync();
    };
  }, []);

  const pauseListening = () => {
    setIsListening(false);
    recognizer.current.stopTranscribingAsync();
    console.log("Paused listening.");
  };

  const resumeListening = () => {
    if (!isListening) {
      setIsListening(true);
      recognizer.current.startTranscribingAsync(
        function () {
          console.log("Resumed listening...");
        },
        function (err) {
          console.trace("err - resuming transcription: " + err);
        }
      );
    }
  };

  const stopListening = () => {
    setIsListening(false);
    recognizer.current.stopTranscribingAsync(() => {
      console.log("Speech recognition stopped.");
    });
  };

  const startListening = () => {
    setIsListening(true);
    recognizer.current.startTranscribingAsync(
      function () {
        console.log("Transcription started");
      },
      function (err) {
        console.trace("err - starting transcription: " + err);
      }
    );
  };

  return (
    <>
      <div className="grid justify-center max-w-sm grid-flow-col auto-cols-auto grid-flow-row auto-rows-max md:grid-cols-4 gap-2">
        <button
          className="rounded-full w-auto bg-indigo-500 text-white font-medium px-4 py-2 hover:bg-indigo-600 active:bg-indigo-700"
          onClick={startListening}
        >
          Start
        </button>
        <button
          className="rounded-full w-auto bg-indigo-500 text-white font-medium px-4 py-2 hover:bg-indigo-600"
          onClick={pauseListening}
        >
          Pause
        </button>
        <button
          className="rounded-full w-auto bg-indigo-500 text-white font-medium px-4 py-2 hover:bg-indigo-600"
          onClick={resumeListening}
        >
          Resume
        </button>
        <button
          className="rounded-full w-auto bg-indigo-500 text-white font-medium px-4 py-2 hover:bg-indigo-600"
          onClick={stopListening}
        >
          Stop
        </button>
      </div>
      <div className="container flex justify-center p-6 my-7 max-w-2xl">
        <div className="w-full">
          {isListening ? (
            <h3 className="font-medium text-lg decoration-3 underline animate-pulse">
              Listening...
            </h3>
          ) : (
            <h3 className="font-medium text-lg decoration-3 underline">
              Not Listening...
            </h3>
          )}
          <div className="mt-2 px-4 pt-2 pb-4 border-solid border-2 border-slate-700 rounded-lg font-mono font-semibold max-w-4xl">
            {displayText.map((text, index) => (
              <React.Fragment key={index}>
                <p className="text-white">{text}</p>
              </React.Fragment>
            ))}
          </div>
          {/* {displayText.length > 0 && (
            <div className="mt-2 px-4 pt-2 pb-4 border-solid border-2 border-slate-700 rounded-xl">
              <p className="text-white">{displayText}</p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default SpeechRecognizerComponent;
