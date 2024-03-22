import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='w-full'>
			<ul className='flex flex-row my-4'>
				<li className='underline decoration-sky-500 mx-3'>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
