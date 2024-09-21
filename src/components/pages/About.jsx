import React from "react";
import Navbar from "../layout/Navbar";
const About = () => {
  return (
    <>
      <div className="flex justify-center pt-10">
        <div className="flex flex-col justify-center mt-6 bg-slate-700 py-7 px-3 rounded-2xl text-gray-300 max-w-md mx-3">
          <h1 className="text-3xl font-bold text-white mb-5 ">
            About{" "}
            <i className="fa-solid fa-laptop-code  pl-2 text-2xl text-teal-500"></i>
          </h1>
          <div className=" font-mono max-w-md">
            <p className="pb-5">
              This is a simple web application that uses the Azure AI Speech
              Services to transcribe speech to text. The app is built using
              React and Tailwind CSS. The app uses the Azure Speech SDK to
              transcribe speech to text.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
