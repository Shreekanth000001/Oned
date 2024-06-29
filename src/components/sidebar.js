import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import Popular from './popular';
import Course from './course';
import Courses from './courses';
import Account from './account';
import browseIcon from '../logos/browse.png';
import helpIcon from '../logos/help.png';
import accountIcon from '../logos/account.png';
import upskillistIcon from '../logos/upskillist.png';

const Sidebar = () => {
   const location = useLocation();
   const userid = sessionStorage.getItem('userid');
   const [savedcoursesid, setSavedcoursesid] = useState([]);
   const [courses, setCourses] = useState([]);
   const [savedcourses, setSavedcourses] = useState([]);
   const [openmodal, setOpenmodal] = useState(false);

   const fetchCourses = () => {
      fetch('http://localhost:3000/')
         .then(response => response.json())
         .then(data => setCourses(data))
         .catch(error => console.error('Error fetching courses:', error));

      if (userid) {
         fetchsavedCourses();
      }
   }

   const fetchsavedCourses = async () => {
      try {
         const response = await fetch('http://localhost:3000/getuser/savedcourses', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid: userid })
         });
         const result = await response.json();
         if (result.errors) {
            console.error('Unable to fetch user info');
         } else {
            setSavedcoursesid(result.savedcourses);
            if (savedcoursesid.length > 0 && courses.length > 0) {
               const filteredCourses = courses.filter(course => savedcoursesid.includes(course._id));
               setSavedcourses(filteredCourses);

            }
         }
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };

   useEffect(() => {
      console.log('hi')
      fetchCourses();
   },[location.pathname]);

   useEffect(() => {
      if (savedcoursesid.length > 0 && courses.length > 0) {
         const filteredCourses = courses.filter(course => savedcoursesid.includes(course._id));
         setSavedcourses(filteredCourses);

      }
   }, [savedcoursesid, courses]);


   const renderContent = () => {


      if (location.pathname === '/') {
         const popularCoursesId = ["665861832fee164f0d4e1888", "665871a150184f512f5e5c02", "66593359530a891197fd8389", "66571ab2d9d18bd9c47f254d"];
         const popcourse = courses.filter(course => popularCoursesId.includes(course._id))

         return <Popular courses={popcourse} />;

      } else if (location.pathname === '/account') {
         return <Account />;

      } else if (location.pathname.startsWith('/course/')) {

         const courseId = location.pathname.split('/')[2];
         return <Course courseId={courseId} savedcourses={savedcoursesid} />;

      } else if (location.pathname.startsWith('/faculty/')) {
         const faculty = location.pathname.split('/')[2];
         return <Courses faculty={faculty} />;
      }
      return null;
   };

   const renderSavedcourses = () => {
      return (
         <div>
            {savedcourses.slice(0, 4).map((course, index) => (
               <div key={course._id} className={`relative ${index > 0 ? '-mt-2' : ''}`}>
                  <Link to={`/course/${course._id}`} className='flex w-full justify-center border-t-2 rounded-2xl border-white'>
                     <img src={course.img} className='w-[47px] h-11 rounded-2xl' alt=''/>
                  </Link>
               </div>
            ))}
         </div>
      )
   }

   const handleClose = (e) => {
      if (e.target.id !== 'modal') {
         setOpenmodal(false);
      }
   }

   return (
      <div className='md:flex md:mx-auto justify-center tracking-wider mb-7 md:mb-0'>

         {openmodal && userid &&

            <div tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-black bg-opacity-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full px-2 md:px-0" onClick={handleClose}>
               <div className="relative md:ml-[20%] md:px-0 mt-8 pb-8 w-full max-w-[480px] max-h-[360px] md:max-h-[415px] bg-white rounded-lg">
                  <p className='pt-6 ml-9 text-[19px] font-semibold mb-4'>Switch Course</p>

                  <div id="modal" className="relative overflow-y-auto max-h-[290px] pt-0 p-6 md:p-8">

                     {savedcourses.length > 0 ? (savedcourses.map(course => (
                        <div key={course._id}>
                           <Link to={`/course/${course._id}`} className='flex w-full items-center space-x-3 text-[#21243d] text-[13px] font-bold border-t-2 rounded-2xl border-white mb-4'>
                              <img src={course.img} className='w-[47px] h-[42px] rounded-xl' alt='' />
                              <p>{course.name}</p>
                           </Link>
                        </div>)
                     )) : (
                        <div className="relative bg-white rounded-lg text-text-purple">
                           Save an course to have easy access.
                        </div>
                     )}
                  </div>
               </div>
            </div>

         }

         {openmodal && !userid &&
            <div tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-black bg-opacity-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full" onClick={handleClose}>
               <div className="relative ml-4 md:ml-[20%] mt-28 w-fit max-w-[480px] max-h-full">

                  <div className="relative bg-white rounded-lg w-[95%] text-text-purple p-5 md:p-8">
                     To save the course and have easy access <Link to="/login" className='underline'>SignIn</Link>
                  </div>
               </div>
            </div>
         }

         <aside className="hidden md:block sticky top-7 mt-[34px] mr-5 z-40 w-[108px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full pt-10 py-4 overflow-y-auto rounded-[30px] border-[1px] bg-white">
               <ul className="space-y-4 font-medium">
                  <li>
                     <Link to="/" className="flex flex-col items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ">

                        <img src={upskillistIcon} alt="unable to fetch " className='w-14  h-14clear' />
                     </Link>
                  </li>
                  <li>
                     <div className="flex flex-col items-center justify-center text-gray-900 rounded-2xl" onClick={() => setOpenmodal(true)}>
                        {userid && renderSavedcourses()
                        }
                        <div className='flex flex-col items-center justify-center bg-[#21243d] rounded-2xl w-[47px] h-[46px] space-y-1 border-t-2  border-white -mt-1 z-10'>
                           <div className='flex w-full justify-center space-x-2'>
                              <p className='bg-white rounded-sm w-2 h-2'></p>
                              <p className='bg-white rounded-sm w-2 h-2'></p>
                           </div>
                           <div className='flex justify-center space-x-2 '>
                              <p className='bg-white rounded-sm w-2 h-2'></p>
                              <p className='bg-white rounded-sm w-2 h-2'></p>
                           </div>
                        </div>
                     </div>
                  </li>
                  <li>
                     <Link to="/" className="flex flex-col items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 ">
                        <img src={browseIcon} className='w-7 h-7' alt='' />
                        <span className="flex-1 whitespace-nowrap mt-2">browse</span>

                     </Link>
                  </li>
                  {userid ? (<li>
                     <Link to="/account" className="flex flex-col items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 ">
                        <img src={accountIcon} className='w-7 h-7' alt='' />
                        <span className="flex-1 whitespace-nowrap mt-2">account</span>
                     </Link>
                  </li>) : (
                     <li>
                        <Link to="/login" className="flex flex-col items-center p-3 text-gray-900 rounded-lg  hover:bg-gray-100">
                           <img src={accountIcon} className='w-7 h-7' alt='' />
                           <span className="flex-1 whitespace-nowrap mt-2">Sign In</span>
                        </Link>
                     </li>)}
                  <li>
                     <Link to="/" className="flex flex-col items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 ">
                        <img src={helpIcon} className='w-7 h-7' alt='' />

                        <span className="flex-1 whitespace-nowrap mt-2">Help</span>
                     </Link>
                  </li>

               </ul>
            </div>
         </aside>

         <aside className='md:hidden fixed bottom-2 z-40 w-full flex justify-center '>
            <ul className='flex bg-white border h-14 w-[90%] justify-between px-6 justify-self-center rounded-r-3xl rounded-l-3xl'>
               <li>
                  <Link to="/" className="flex flex-col items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 ">
                     <img src={browseIcon} className='w-6 h-6' alt='' />
                  </Link>
               </li>
               {userid ? (<li>
                  <Link to="/account" className="flex flex-col items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 ">
                     <img src={accountIcon} className='w-6 h-6' alt='' />
                  </Link>
               </li>) : (
                  <li>
                     <Link to="/login" className="flex flex-col items-center p-3 text-gray-900 rounded-lg  hover:bg-gray-100">
                        <img src={accountIcon} className='w-6 h-6' alt='' />
                     </Link>
                  </li>)}
            </ul>
         </aside>

         <div className="p-6 md:py-16 md:px-14 md:my-[34px] bg-white md:w-[1042px] md:rounded-[30px] md:shadow-lg relative">
            <div className="md:hidden w-fit flex flex-col text-gray-900 rounded-2xl" onClick={() => setOpenmodal(true)}>
               <div className='flex flex-col items-center justify-center bg-[#21243d] rounded-2xl w-[47px] h-[46px] space-y-1 border-t-2  border-white -mt-1 z-10'>
                  <div className='flex w-full justify-center space-x-2'>
                     <p className='bg-white rounded-sm w-2 h-2'></p>
                     <p className='bg-white rounded-sm w-2 h-2'></p>
                  </div>
                  <div className='flex justify-center space-x-2 '>
                     <p className='bg-white rounded-sm w-2 h-2'></p>
                     <p className='bg-white rounded-sm w-2 h-2'></p>
                  </div>
               </div>
            </div>
            {renderContent()}
         </div>

      </div >
   )
}

export default Sidebar