import React from "react";
import Navbar from "../layout/Navbar";
const About = () => {
  return (
    <>
      <div className="flex justify-center pt-10">
        <div className="flex flex-col justify-center mt-6 bg-slate-700 py-7 px-5 rounded-2xl text-gray-300 max-w-md">
          <h1 className="text-3xl font-bold text-white mb-5">About</h1>
          <div className=" font-mono max-w-md">
            <p>
              This is a short presentation about me, the developer of this small
              demo site.
            </p>
            <p>
              I've built this as a portfolio/demo project and will probably
              continue to expand on its functions!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
