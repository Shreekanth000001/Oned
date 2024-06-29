import React, { useState } from 'react';
import { Link } from "react-router-dom";

function DropdownComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [course, setCourse] = useState("Choose Faculty");

    const toggleDropdown = (coursename) => {
        setIsOpen(!isOpen);
        setCourse(coursename);
    };

    return (
        <div>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-light-black pr-9 md:w-[219px] bg-[#F6F7F9] hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={() => toggleDropdown("Choose Faculty")}>
                {course}
                <svg 
                    className="w-2.5 h-2.5 absolute right-1 m-4"
                    data-dropdown-trigger="{hover|click}"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4" />
                </svg>
            </button>

            <div
                id="dropdown"
                className={`z-10 ${isOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-2xl border shadow md:w-[176px]`}>
                <ul className="py-2 text-sm text-light-black" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <Link to="/"  className="block px-4 py-2 hover:bg-gray-100" onClick={() => toggleDropdown("Choose Faculty")}>Choose Faculty</Link>
                    </li>
                    <li>
                        <Link to="/faculty/Technology"  className="block px-4 py-2 hover:bg-gray-100" onClick={() => toggleDropdown("Technology")}>Technology</Link>
                    </li>
                    <li>
                        <Link to="/faculty/Design"  className="block px-4 py-2 hover:bg-gray-100" onClick={() => toggleDropdown("Design")}>Design</Link>
                    </li>
                    <li>
                        <Link to="/faculty/Photography"  className="block px-4 py-2 hover:bg-gray-100" onClick={() => toggleDropdown("Photography")}>Photography</Link>
                    </li>
                    <li>
                        <Link to="/faculty/Artificial-Intelligence"  className="block px-4 py-2 hover:bg-gray-100" onClick={() => toggleDropdown("Artificial Intelligence")}>Artificial Intelligence</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DropdownComponent;
