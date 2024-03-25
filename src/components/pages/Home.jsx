import React from "react";
import SpeechRecognizerComponent from "../layout/SpeechRecognizerComponent";

const Home = () => {
	return (
		<>
			<h1 className='text-3xl font-bold m-4 text-white'>Transcriber</h1>

			<div className='h-screen flex items-center flex-col'>
				<SpeechRecognizerComponent />
				
			</div>
		</>
	);
};

export default Home;
