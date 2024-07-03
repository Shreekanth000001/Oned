import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import bookmarkIcon from '../logos/bookmark.png';
import bookmarkedIcon from '../logos/bookmarked.png';
import Alert from './alert';

const Course = ({ courseId, savedcourses }) => {
    const [data, setData] = useState({});
    const location = useLocation();
    const userid = sessionStorage.getItem('userid');
    const [focusedModule, setFocusedModule] = useState(0);
    const [bookmark, setBookmark] = useState(false);
    const [loginmodel, setLoginmodel] = useState(false);
    const [randomNo, setRandomNo] = useState(0);
    const [readmore, setReadmore] = useState(false);
    const [expandedLessons, setExpandedLessons] = useState({});
    const [shouldShowReadMore, setShouldShowReadMore] = useState({});
    const descriptionRefs = useRef({});

    useEffect(() => {
        fetch(`https://presidential-dina-critic-coder-bcfa82d2.koyeb.app//course/${courseId}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching course:', error);
            });
        if (savedcourses.includes(courseId)) {
            setBookmark(true);
        } else {
            setBookmark(false);
        }


    }, [savedcourses, courseId, location.pathname]);

    useEffect(() => {
        if (data.lessons) {
            data.lessons.forEach(lesson => {
                const descriptionElement = descriptionRefs.current[lesson._id];
                if (descriptionElement) {
                    const { scrollHeight, clientHeight } = descriptionElement;
                    setShouldShowReadMore(prevState => ({
                        ...prevState,
                        [lesson._id]: scrollHeight > clientHeight
                    }));
                }
            });
        }
    }, [data]);



    const handleModuleClick = (index) => {
        setFocusedModule(index);
    };
    const toggleReadmore = () => {
        setReadmore(true);
    };

    const toggleReadMoreL = (id) => {
        setExpandedLessons(prevState => ({
            ...prevState,
            [id]: true
        }));
    };

    const bookmarkcourse = async () => {
        if (userid) {
            const response = await fetch('https://presidential-dina-critic-coder-bcfa82d2.koyeb.app//bookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: userid,
                    courseid: courseId
                })
            });
            const result = await response.json();
            if (result.errors) {
                console.error('unable to fetch user info');
            } else { setBookmark(true); }
        }
        else {
            setLoginmodel(true);
            const newRandomNo = Math.floor(Math.random() * 11);
            setRandomNo(newRandomNo);
        }
    }

    const unbookmarkcourse = async () => {
        const response = await fetch('https://presidential-dina-critic-coder-bcfa82d2.koyeb.app//bookmark/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userid,
                courseid: courseId
            })
        });
        const result = await response.json();
        if (result.errors) {
            console.error('unable to fetch user info');
        } else { setBookmark(false); }
    }

    const renderModuleDivs = () => {
        const moduleCount = data.module || 0;
        const elements = [];
        for (let i = 0; i < moduleCount; i++) {
            const isLastModule = i === moduleCount - 1;
            elements.push(
                <div
                    key={i}
                    className='flex mt-4 min-w-9 h-9 text-xl items-center justify-center px-3 text-purple-500 border-[1px] border-purple-500 rounded-full cursor-pointer'
                    style={isLastModule ? { borderRight: '1px dashed purple', paddingRight: '15px' } : {}}
                    onClick={() => handleModuleClick(i)}
                >
                    {focusedModule === i ? `Module ${i + 1}` : i + 1}
                </div>
            );
        }
        return elements;
    };

    const renderLessons = () => {
        if (!data.lessons) return null;

        // Group lessons by module
        const groupedLessons = data.lessons.reduce((acc, lesson) => {
            if (!acc[lesson.module]) {
                acc[lesson.module] = [];
            }
            acc[lesson.module].push(lesson);
            return acc;
        }, {});

        // Sort each group by slno
        Object.keys(groupedLessons).forEach(module => {
            groupedLessons[module].sort((a, b) => a.slno - b.slno);
        });

        // Flatten the sorted groups into a single list
        const sortedLessons = Object.keys(groupedLessons)
            .sort((a, b) => a - b)
            .reduce((acc, module) => {
                return acc.concat(groupedLessons[module]);
            }, []);

        return (
            <div className="relative">
                {sortedLessons.map(lesson => (
                    <div key={lesson._id} className='py-5 relative'>
                        {lesson.slno === 1 && <p className='text-[23px] font-bold'>Module {lesson.module}</p>}

                        <p className='text-[#e1d2fd] text-[20px]'>Module {lesson.module}</p>
                        <p className='text-[17px] font-bold'>{lesson.slno}.{lesson.name}</p>
                        <p
                            ref={el => descriptionRefs.current[lesson._id] = el}
                            className={`mb-2 leading-relaxed text-light-gray ${expandedLessons[lesson._id] ? '' : 'line-clamp-3'}`}
                        >
                            {lesson.description}
                        </p>
                        {shouldShowReadMore[lesson._id] && (
                            <button
                                className={`text-[#21243d] underline ${expandedLessons[lesson._id] ? 'hidden' : 'block'}`}
                                onClick={() => toggleReadMoreL(lesson._id)}
                            >Read More
                            </button>
                        )}
                        <div className='w-[110%] h-[250px] md:w-[640px] md:h-[360px] md:my-3 md:ml-3 md:rounded-3xl overflow-hidden'>
                            <iframe className='w-full h-full rounded-[30px]'
                                title={lesson.name}
                                src={lesson.url}
                                allow="picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <p className='my-2'>Lesson resources</p>
                        <div>
                            {data.notes && data.notes.filter(note => note.slno === lesson.slno && note.module === lesson.module).map(note => (
                                <div key={note._id} className='w-[88px] h-[120px]'>
                                    <a href={note.url}>
                                        <img src='https://in.upskillist.com/images/learner/lessonResources/lessonNotes-unlocked.png' alt=''></img>
                                        <p className='text-[11px] p-1'>Lesson {lesson.slno} notes</p>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className="z-10 absolute top-12 -left-7 w-5 h-5 bg-gray-300 rounded-full border-[5px] border-white"></div>
                    </div>
                ))}
                <div className="absolute top-3 -left-5 w-0.5 h-full bg-gray-300"></div>
            </div>
        );

    };

    const loginmessage = (
        <>Login to save the course. Click here to <a href='/login' className='underline'>Login</a></>
    )

    return (
        <div>
            {loginmodel && <Alert message={loginmessage} bgcolor={'[#F6F7F9]'} newRandomNo={randomNo} />}

            <div className="md:flex tracking-wider">
                <img className="absolute md:relative md:top-0 top-10 right-0 md:rounded-tl-3xl md:rounded-br-3xl w-16 md:w-[415px]" src={`${data.img}`} alt="unable to fetch course img" />
                <div className='flex flex-col p-4'>
                    <p className="mb-2 leading-relaxed font-bold text-black text-[35px]">{data.name}</p>
                    <p className={`mb-2 leading-relaxed text-light-gray ${readmore ? '' : 'line-clamp-3'}`}>{data.description}</p>
                    <button className={`text-[#21243d] underline w-fit ${readmore ? 'hidden' : 'block'}`} onClick={toggleReadmore}>Read more</button>
                    {bookmark ? <img src={bookmarkedIcon} alt='' className='w-7 ml-auto hover:cursor-pointer' onClick={unbookmarkcourse} /> :
                        <img src={bookmarkIcon} alt='' className='w-7 ml-auto hover:cursor-pointer' onClick={bookmarkcourse} />}
                </div>
            </div>

            <div className='flex space-x-3'>{renderModuleDivs()}</div>

            <div className="p-2 ">
                {renderLessons()}
            </div>
        </div>
    );
}

export default Course;
