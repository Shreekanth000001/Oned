import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Alert from './alert';
import Dropdown from './dropdown';

const Courses = ({ faculty }) => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses from the backend
        fetch(`http://localhost:3000/faculty/${faculty}`)
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error));
    }, [faculty]);

    return (
        <div>
            <h4 className='text-2xl md:text-[32px] font-bold mb-3'>Courses</h4>

            <Alert message={'Choose from one of our Popular courses below or you can search by course, skill or faculty that you are most interested'}  
            bgcolor={'[#F6F7F9]'}/>
            <div className="absolute right-0 top-16 md:mr-[64px] mb-2 md:mb-0">
                <Dropdown />
            </div>
            <h5 className="text-[23px] font-bold text-light-black">{faculty} courses</h5>

            <ul className='grid md:grid-cols-4 gap-4 my-4'>
                {courses.map(course => (
                    <li key={course._id} >
                        <Link to={`/course/${course._id}`}>

                            <div className="md:w-[205px] md:h-[250px] bg-white border border-gray-200 rounded-2xl shadow flex flex-col">

                                <img className="rounded-t-2xl md:w-[205px]" src={`${course.img}`} alt="unable to fetch course img" />

                                <div className="p-2 ">
                                    <h5 className="mb-2 text-[13px] leading-relaxed tracking-wider font-bold text-gray-900 dark:text-white">{course.name}</h5>
                                </div>
                                <div className='mt-auto m-3'>
                                    <div className="inline-flex mt-auto items-center px-4 py-2 text-sm font-medium text-center text-text-purple bg-light-purple rounded-3xl">
                                        Learn
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Courses
