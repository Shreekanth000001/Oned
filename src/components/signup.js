import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './alert';
import upskillistIcon from '../logos/upskillist.png';

const Signup = () => {
    const navigate = useNavigate();
    const [randomNo, setRandomNo] = useState(0);
    const [steps, setSetps] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [skillLvl, setSkillLvl] = useState('');
    const [favWayToLearn, setFavWayToLearn] = useState('');
    const [whyLearn, setWhyLearn] = useState('');


    const handleSteps = (n) => {
        if (n > 0) {
            setSetps(steps + 1)
        } else {
            setSetps(steps - 1)
        }
    }
    const renderDot = () => {
        return <div className="h-4 w-4 bg-[#9c6af9] rounded-full"></div>;
    }
    const renderTick = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-full right-0 left-0" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M5 12l5 5l10 -10" />
        </svg>;
    }
    const step2func = (skill) => {
        setSkillLvl(skill)
        handleSteps(1);
    }
    const step3func = (waytolearn) => {
        setFavWayToLearn(waytolearn)
        handleSteps(1);
    }
    const step4func = (whylearn) => {
        setWhyLearn(whylearn)
        handleSteps(1);
    }

    const submission = async (e) => {
        e.preventDefault();

        const response = await fetch('https://presidential-dina-critic-coder-bcfa82d2.koyeb.app//signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        const data = await response.json();

        if (!data.errors) {
            fetchuser(data.authToken);
        }
        else {
            const newRandomNo = Math.floor(Math.random() * 11);
            setRandomNo(newRandomNo);
            setMessage(data.errors.map(errors => errors.msg));
        }
    }

    const fetchuser = async (authToken) => {
        const response = await fetch('https://presidential-dina-critic-coder-bcfa82d2.koyeb.app//getuser', {
            method: 'POST',
            headers: {
                'authToken': authToken
            }
        })
        const user = await response.json();
        sessionStorage.setItem('authToken', authToken);
        sessionStorage.setItem('userid', user._id);
        sessionStorage.setItem('username', user.name);
        savepass(user);
    }
    const savepass = async (user) => {
        const response = await fetch('https://presidential-dina-critic-coder-bcfa82d2.koyeb.app//userpass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: user._id,
                password: password
            })
        })
        const userpass = await response.json();
        if (!userpass.errors) {
            userInfoSubmission(user);
        } else {
            console.log(userpass.errors);
        }
    }
    const userInfoSubmission = async (user) => {
        const response = await fetch('https://presidential-dina-critic-coder-bcfa82d2.koyeb.app//signupinfo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: user._id,
                skillLvl: skillLvl,
                favWayToLearn: favWayToLearn,
                whyLearn: whyLearn
            })
        })
        const data = await response.json()
        if (!response.ok) {
            console.error(data.message);
        } else {
            navigate('/');
        }

    }

    return (
        <div>
            <div className='bg-white py-5 shadow-md'>

                <div className='mx-auto max-w-[90%] flex items-center'>
                    <img src={upskillistIcon} className='w-10 h-10' alt='' />
                    <p className='ml-1 font-bold text-3xl'>ONED</p>
                </div>
            </div>
            <div className="h-full w-full py-16">

                <div className="container mx-auto">
                    <dh-component>
                        <div className="w-11/12 lg:w-2/6 mx-auto">
                            <div className="bg-[#F6F7F9] h-1 flex items-center justify-between">

                                <div className="w-full flex justify-between bg-[#9c6af9] h-1 items-center relative">
                                    <div className="bg-white h-8 w-8 border-4 border-[#9c6af9] rounded-full shadow flex items-center justify-center -mr-3 relative ">
                                        {steps >= 1 && renderDot()}
                                        {steps > 1 && renderTick()}
                                    </div>
                                    <div className="bg-white h-8 w-8 border-4 border-[#9c6af9] rounded-full shadow flex items-center justify-center -mr-3 relative">
                                        {steps >= 2 && renderDot()}
                                        {steps > 2 && renderTick()}
                                    </div>
                                    <div className="bg-white h-8 w-8 border-4 border-[#9c6af9] rounded-full shadow flex items-center justify-center -mr-3 relative">
                                        {steps >= 3 && renderDot()}
                                        {steps > 3 && renderTick()}
                                    </div>
                                    <div className="bg-white h-8 w-8 border-4 border-[#9c6af9] rounded-full shadow flex items-center justify-center -mr-3 relative">
                                        {steps >= 4 && renderDot()}
                                        {steps > 4 && renderTick()}
                                    </div>
                                    <div className="bg-white h-8 w-8 border-4 border-[#9c6af9] rounded-full shadow flex items-center justify-center -mr-3 relative">
                                        {steps >= 5 && renderDot()}
                                        {steps > 5 && renderTick()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </dh-component>
                </div>
            </div>
            <div className='h-screen bg-[#F6F7F9]'>
                {steps === 1 && <section>
                    <header className='flex flex-col items-center justify-center text-center pb-4'>
                        <p className='font-bold text-2xl'>Create a learner profile</p>
                        <p className='text-base text-[#52556e]'>Just a few questions before we begin</p>
                    </header>
                    <main className='flex justify-center m-3'>
                        <div className='flex justify-center items-center bg-custom-gradient md:w-[428px] md:h-[460px] rounded-[30px]'>
                            <div className=' flex flex-col items-center justify-center bg-white md:w-[416px] md:h-[448px] rounded-3xl p-5'>
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='text-text-purple font-bold text-xl pb-4'>Get Ready To Upskill</p>
                                    <img src="https://assets.upskillist.com/course-images/en/child-dev-20/website-square.png" className='w-[88px] h-[88px]' alt='' />
                                </div>
                                <div className='px-8 py-3'>
                                    <div className='text-center text-[15px]'>
                                        <p>
                                            Everyone learns differently, and the first step towards learning success is to know </p>
                                        <strong>how you should learn.</strong>
                                        <p className='pt-4'>For the best learner experience we need to understand your skill level and learning style.</p>

                                    </div>
                                </div>
                                <button className='bg-[#020417] text-white p-3 rounded-3xl w-fit' onClick={() => handleSteps(1)}>I’m excited! Let’s do it</button>

                            </div>
                        </div>

                    </main>
                </section>}

                {steps === 2 && <section>
                    <header className='flex flex-col items-center justify-center text-center pb-4'>
                        <p className='font-bold text-2xl'>Great! First off, what’s your current skill level?</p>
                        <p className='text-base text-[#52556e]'>Our content caters to all experience levels!</p>
                    </header>
                    <main className='flex justify-center m-3'>
                        <div className='flex justify-center items-center md:w-[428px] md:h-[460px] bg-custom-gradient rounded-[30px]'>
                            <div className=' flex flex-col items-center justify-center bg-[#F6F7F9] md:bg-white md:w-[416px] md:h-[448px] rounded-3xl md:p-5 space-y-3'>

                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step2func('Beginner')}>Beginner</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step2func('Low')}>Low</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step2func('Moderate')}>Moderate</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step2func('High')}>High</button>


                            </div>
                        </div>

                    </main>
                </section>}

                {steps === 3 && <section>
                    <header className='flex flex-col items-center justify-center text-center pb-4'>
                        <p className='font-bold text-2xl'>And what's your favourite way to learn?</p>
                        <p className='text-base text-[#52556e]'>Remember, there are no wrong answers!</p>
                    </header>
                    <main className='flex justify-center m-3'>
                        <div className='flex justify-center items-center md:w-[428px] md:h-[460px] bg-custom-gradient rounded-[30px]'>
                            <div className=' flex flex-col items-center justify-center bg-[#F6F7F9] md:bg-white md:w-[416px] md:h-[448px] rounded-3xl md:p-5 space-y-3'>

                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step3func('Reading or Writing')}>Reading or Writing</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step3func('Watching Videos')}>Watching Videos</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step3func('Listening to Podcasts')}>Listening to Podcasts</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step3func('Learning by Doing')}>Learning by Doing</button>


                            </div>
                        </div>

                    </main>
                </section>}

                {steps === 4 && <section>
                    <header className='flex flex-col items-center justify-center text-center pb-4'>
                        <p className='font-bold text-2xl'>
                            Why do you want to learn in ONED?</p>
                        <p className='text-base text-[#52556e]'>Knowing your goal is the first step to achieving it</p>
                    </header>
                    <main className='flex justify-center m-3'>
                        <div className='flex justify-center items-center md:w-[428px] md:h-[460px] bg-custom-gradient rounded-[30px]'>
                            <div className=' flex flex-col items-center justify-center bg-[#F6F7F9] md:bg-white md:w-[416px] md:h-[448px] rounded-3xl md:p-5 space-y-3'>

                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step4func('Get a Promotion')}>Get a Promotion</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step4func('Grow my Business')}>Grow my Business</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step4func('Start a Business')}>Start a Business</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step4func('As a Hobby')}>As a Hobby</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step4func('Professional Improvement')}>Professional Improvement</button>
                                <button className='bg-[#F6F7F9] text-[#52556e] hover:text-black p-3 rounded-3xl w-[340px] h-[72px]' onClick={() => step4func('Self Improvement')}>Self Improvement</button>

                            </div>
                        </div>

                    </main>
                </section>}

                {steps === 5 && <section>
                    <header className='flex flex-col items-center justify-center text-center pb-4'>
                        {message && <Alert message={message} bgcolor={'white'} newRandomNo={randomNo} />}

                        <p className='font-bold text-2xl'>Create a learner profile</p>
                        <p className='text-base text-[#52556e]'>Just a few questions before we begin</p>
                    </header>
                    <main className='flex justify-center m-3'>
                        <div className='flex justify-center items-center bg-custom-gradient w-full md:w-[428px] md:h-[460px] rounded-[30px]'>
                            <form className=' flex flex-col items-center justify-center w-full bg-[#F6F7F9] md:bg-white md:w-[416px] md:h-[448px] rounded-3xl md:p-5' onSubmit={submission}>
                                <div className='bg-[#F6F7F9] w-full p-4 rounded-xl'>
                                    <p>Creating your student ID 🎉</p>
                                    <hr />
                                    <p className='font-bold p-2'>Enter Your Information</p>
                                    <div className='flex flex-col justify-center items-center space-y-2'>
                                        <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="name" name="name" placeholder='Name' required="" onChange={(e) => setName(e.target.value)} value={name} />
                                        <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="email" name="email" placeholder='Email' required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                                        <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="password" name="password" placeholder='password' required="" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                </div>
                                <button className='bg-[#020417] text-white p-3 rounded-3xl w-fit' type="submit">I’m excited! Let’s do it</button>
                            </form>
                        </div>

                    </main>
                </section>}
            </div>
        </div>
    )
}

export default Signup
