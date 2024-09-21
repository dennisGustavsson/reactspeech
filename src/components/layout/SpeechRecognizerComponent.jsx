import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import React from "react";
import Button from "../button/Button";
import ButtonStyles from "../button/ButtonStyles";
import FormComp from "./FormComp";
import { useUser } from "@clerk/clerk-react";

const SPEECHRECOG = import.meta.env.VITE_SPEECH_RECOG_KEY;
const SPEECHREGION = import.meta.env.VITE_SPEECH_RECOG_REGION;

const SpeechRecognizerComponent = () => {
  const [transcription, setTranscription] = useState("");
  const [displayText, setDisplayText] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { user } = useUser();
  const speechConfig = useRef(null);
  const audioConfig = useRef(null);
  const recognizer = useRef(null);
  const scrollRef = useRef(null);

  const fields = [
    // { name: "firstName", label: "First Name", type: "text" },
    // { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    // Add more fields as needed
  ];

  const onSubmit = (formData) => {
    // console.log("Form data:", formData);
    // Here you can handle the form submission. For example, you can send the form data to a server.

    // After the form submission is complete, you can close the modal by setting isModalOpen to false.
    document.getElementById("my_modal_3").close();
  };

  const makeDisplayTextString = (displayText) => {
    let displayTextString = "";

    for (let i = 0; displayText.length >= i; i++) {
      displayTextString += displayText[i];
    }
    // console.log(user.emailAddresses.find((x) => x.emailAddress));
    // console.log(displayTextString + "testing");
    return displayTextString;
  };

  useEffect(() => {
    const savedTranscription = localStorage.getItem("transcription");
    if (savedTranscription) {
      setDisplayText(JSON.parse(savedTranscription));
      if (transcription.length > 1) {
        setDisplayText(savedTranscription.split("\n"));
      }
    }
  }, []);

  // Scroll to the bottom of the div when new transcription-text is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayText]);

  // Initialize the speech recognizer
  useEffect(() => {
    speechConfig.current = sdk.SpeechConfig.fromSubscription(
      SPEECHRECOG,
      SPEECHREGION
    );
    speechConfig.current.speechRecognitionLanguage = "sv-SE";

    audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizer.current = new sdk.ConversationTranscriber(
      speechConfig.current,
      audioConfig.current
    );

    recognizer.current.sessionStarted = (s, e) => {
      // console.log("Session started event:", e);
      // console.log("SessionId" + e.sessionId);
    };

    // transcribed event
    recognizer.current.transcribed = (s, e) => {
      if (
        e.result.text !== undefined ||
        e.result.speakerId !== "Unknown" ||
        e.result.text !== ""
      ) {
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

  // Start and stop the speech recognition
  const stopListening = () => {
    setIsListening(false);
    setTranscription(makeDisplayTextString(displayText));
    const jsonData = JSON.stringify(displayText);
    localStorage.setItem("transcription", jsonData);
    recognizer.current.stopTranscribingAsync(() => {
      // console.log("Speech recognition stopped.");
    });
  };

  const startListening = () => {
    setIsListening(true);
    recognizer.current.startTranscribingAsync(
      function () {
        // console.log("Transcription started");
      },
      function (err) {
        // console.trace("err - starting transcription: " + err);
      }
    );
  };

  const resetLocalStorage = () => {
    // const data = localStorage.getItem("transcription");

    let result = window.confirm(
      "Confirm that you want to delete the transcription"
    );

    if (result) {
      localStorage.setItem("transcription", "");
      window.location.reload();
    }
  };

  // const pauseListening = () => {
  //   setIsListening(false);
  //   recognizer.current.stopTranscribingAsync();
  //   console.log("Paused listening.");
  // };

  // const resumeListening = () => {
  //   if (!isListening) {
  //     setIsListening(true);
  //     recognizer.current.startTranscribingAsync(
  //       function () {
  //         console.log("Resumed listening...");
  //       },
  //       function (err) {
  //         console.trace("err - resuming transcription: " + err);
  //       }
  //     );
  //   }
  // };

  return (
    <>
      <div className="transcription-top container p-6 my-7 max-w-2xl h-full">
        <div className="w-full">
          {isListening ? (
            <h3 className="font-bold text-lg  animate-pulse">
              Transcribing...
            </h3>
          ) : (
            <h3 className="font-bold text-lg">Not Listening...</h3>
          )}
          <div
            ref={scrollRef}
            className="transcription mt-2 px-4 pt-2 pb-4 border-solid border-2 border-slate-700 rounded-lg font-mono font-semibold max-w-4xl
           shadow-md shadow-cyan-600/20 min-h-64 max-h-96 overflow-y-auto bg-slate-700"
          >
            {displayText.map((text, index) => (
              <React.Fragment key={index}>
                <p className="text-white mb-1 p-1 odd:bg-slate-600 rounded-md ">
                  {text}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="transcription-bottom grid justify-center max-w-sm grid-flow-col auto-cols-auto grid-flow-row auto-rows-max h-full md:grid-cols-1 gap-2">
        <div className="flex justify-center flex-col relative">
          <div className="m-2">
            {displayText.length > 4 && !isListening && (
              <div className="mt-7">
                <p className="text-center text-xs font-light italic mb-3">
                  Would you like to save the transcription? Or delete it?
                </p>
                <div className="flex justify-center ">
                  <button
                    className="rounded-full w-full bg-indigo-800 text-white font-medium px-5 py-3 hover:bg-indigo-300 active:bg-indigo-700 mx-2"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Save
                  </button>
                  <button
                    className="rounded-full w-full bg-pink-800 text-white font-medium px-5 py-3 hover:bg-indigo-300 active:bg-indigo-700"
                    onClick={() => resetLocalStorage()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="grid fixed inset-x-1 bottom-4">
            <div className="w-full flex justify-center">
              {isListening ? (
                <Button
                  className="animate-pulse"
                  style={ButtonStyles.stop}
                  onClick={stopListening}
                >
                  <i className="fa-solid fa-stop animate-pulse"></i>
                </Button>
              ) : (
                <Button style={ButtonStyles.record} onClick={startListening}>
                  <i className="fa-solid fa-microphone"></i>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <dialog
        id="my_modal_3"
        className="modal modal-middle sm:modal-middle max-w-full"
      >
        <div className="modal-box flex justify-center">
          <div className="m-4 w-full flex flex-col items-center">
            <form method="dialog" className="w-full">
              <h3 className="text-white font-semibold">
                Enter your email to save the transcription
              </h3>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <FormComp
              fields={fields}
              onSubmit={onSubmit}
              transcribtion={makeDisplayTextString(displayText)}
            />
            <div className="modal-action"></div>
            <span className="text-xs italic">
              Your email or transcription will not be stored.
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SpeechRecognizerComponent;
