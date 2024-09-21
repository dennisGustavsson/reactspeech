import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <div className="App">
        <SignedOut>
          <div className="flex items-center justify-center min-h-screen">
            <div className="">
              <h2 className="pb-5 text-white font-mono">
                To use this app you need to be signed in
              </h2>
              <SignInButton className="rounded-full w-full bg-indigo-800 text-white font-medium px-5 py-3 hover:bg-indigo-300 active:bg-indigo-700" />
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="container mx-auto">
            <Navbar />
            <div className="flex flex-cols justify-center h-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </div>
        </SignedIn>
      </div>
    </>
  );
}

export default App;
