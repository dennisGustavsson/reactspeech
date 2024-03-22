import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";

function App() {
	return (
		<>
			<div className='App container mx-auto'>
				<Navbar />
				<div className='m-5 grid w-full content-center'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
