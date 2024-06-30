import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from './alert';
import trophyIcon from '../logos/trophy.png';
import nextIcon from '../logos/next.png';
import settingsIcon from '../logos/settings.png';
import linkIcon from '../logos/link.png';
import userIcon from '../logos/user.png';
import backIcon from '../logos/back.png';

const Account = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const userid = sessionStorage.getItem('userid');
    const username = sessionStorage.getItem('username');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const authToken = sessionStorage.getItem('authToken');
    const [userinfo, setUserinfo] = useState({});
    const [title, setTitle] = useState({});
    const [description, setDescrption] = useState({});
    const [tab, setTab] = useState('Student Profile');
    const [editProfile, seteditProfile] = useState(false);
    const [settingfocus, setSettingsfocus] = useState(false);
    const [editSettings, seteditSettings] = useState({
        email: false,
        password: false,
        phoneno: false
    });
    const [settings, setSettings] = useState({
        email: '',
        password: '',
        phoneno: ''
    })
    const [randomNo, setRandomNo] = useState(0);
    const [refreshData, setRefreshData] = useState(false);
    const [profileData, setProfileData] = useState({
        age: '',
        goal: '',
        degree: '',
        industry: '',
        employment: '',
        gender: '',
    });


    useEffect(() => {
        const getuserinfo = async () => {
            const response = await fetch('https://oned-backend-yfvd.onrender.com/userinfo/g', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: userid,
                })
            });
            const result = await response.json();
            setUserinfo(result[0]);
            if (result.errors) {
                console.error('unable to fetch user info');
            } else {
                setUserinfo(result[0]);
                setProfileData({
                    age: result[0].age || '',
                    goal: result[0].goal || '',
                    degree: result[0].degree || '',
                    industry: result[0].industry || '',
                    employment: result[0].employment || '',
                    gender: result[0].gender || ''
                });
            }

            const userResponse = await fetch('https://oned-backend-yfvd.onrender.com/getuser', {
                method: 'POST',
                headers: {
                    'authToken': authToken
                }
            })
            const user = await userResponse.json();
            setSettings((prevSettings) => ({
                ...prevSettings,
                email: user.email,
                phoneno: user.phoneno
            }));
            setEmail(user.email);
            setPhoneno(user.phoneno);
        }
        if (userid) {
            getuserinfo();
        }
    }, [refreshData]);

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    }
    const helpSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('https://oned-backend-yfvd.onrender.com/help', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid,
                title,
                description,
            })
        })
        const result = await response.json();
        if (result.error) {
            setMessage(result.error[0]);
        } else {
            setMessage(result.message);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    }

    const profileSubmition = async () => {
        const response = await fetch('https://oned-backend-yfvd.onrender.com/userinfo/p', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userid,
                ...profileData
            })
        });
        const result = await response.json();
        const newRandomNo = Math.floor(Math.random() * 11);
        setRandomNo(newRandomNo);
        if (result.error) {
            setMessage(result.error[0]);
        } else {
            setMessage(result.message);
        }
        seteditProfile(false);
        setRefreshData(!refreshData);
    }

    const toggleEdit = (name) => {
        seteditSettings((prevState) => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    };

    const handleSettingsChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const settingsSubmition = async (name) => {
        const response = await fetch('https://oned-backend-yfvd.onrender.com/userinfo/sp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userid,
                ...settings
            })
        });
        const result = await response.json();
        const newRandomNo = Math.floor(Math.random() * 11);
        setRandomNo(newRandomNo);
        if (result.error) {
            setMessage(result.error[0]);
        } else {
            setMessage(result.message);
        }
        toggleEdit(name);
        setRefreshData(!refreshData);
    }

    return (
        <div>
            {message && <Alert message={message} bgcolor={'[#F6F7F9]'} newRandomNo={randomNo} />}

            <div className='flex mt-3 md:mt-0 overflow-auto'>
                <div>

                    <section className={`w-[87vw] md:w-72 h-max ${settingfocus ? '-translate-x-[92vw] md:-translate-x-0' : '-translate-x-0'}  border border-gray-200 space-y-2 rounded-3xl`}>


                        <div className='flex p-6 items-center hover:bg-[#F5F0FE] rounded-t-3xl' onClick={() => {
                            setTab('Student Profile');
                            setSettingsfocus(true);
                        }}>
                            <img src={trophyIcon} className='w-6 h-6 mr-2' alt='' />
                            <p>Student Profile</p>
                            <img src={nextIcon} className='w-4 h-4 ml-auto' alt='' />
                        </div>

                        <div className='flex p-6 items-center hover:bg-[#F5F0FE]' onClick={() => {
                            setTab('Account Settings');
                            setSettingsfocus(true);
                        }}>
                            <img src={settingsIcon} className='w-6 h-6 mr-2' alt='' />
                            <p>Account Settings</p>
                            <img src={nextIcon} className='w-4 h-4 ml-auto ' alt='' />
                        </div>

                        <div className='flex p-6 items-center hover:bg-[#F5F0FE]' onClick={() => {
                            setTab('Help Center');
                            setSettingsfocus(true);
                        }}>
                            <p>Help Center</p>
                            <img src={linkIcon} className='w-5 h-5 ml-auto' alt='' />
                        </div>

                        <div className='flex p-6 items-center hover:bg-[#F5F0FE]' onClick={() => {
                            setTab('Terms Of Use');
                            setSettingsfocus(true);
                        }}>
                            <p>Terms Of Use</p>
                            <img src={nextIcon} className='w-4 h-4 ml-auto' alt='' />
                        </div>

                        <div className='flex p-6 items-center hover:bg-[#F5F0FE] rounded-b-3xl' onClick={() => {
                            setTab('Privacy Policy');
                            setSettingsfocus(true);
                        }}>
                            <p>Privacy Policy</p>
                            <img src={nextIcon} className='w-4 h-4 ml-auto' alt='' />
                        </div>


                    </section>
                    <button className={`px-8 mt-8 bg-light-purple hover:bg-text-purple text-text-purple hover:text-white rounded-3xl border py-2 font-black border-text-purple ${settingfocus ? '-translate-x-[92vw] md:-translate-x-0' : '-translate-x-0'}`} onClick={logout}>Logout</button>
                </div>
                
                    
                <section className={`w-full md:w-full ${settingfocus ? '-translate-x-[92vw] md:-translate-x-0' : '-translate-x-0'}`}>
                {settingfocus && <div className='block md:hidden h-min absolute left-6 mb-3'>
                        <img src={backIcon} className='min-w-5 max-w-5 min-h-5 max-h-5' onClick={()=> {setSettingsfocus(false)}}/>
                    </div>
                    }
                    {tab === 'Student Profile' && <aside className='px-6 pt-7 md:px-16 w-full'>
                        <div className='flex items-center'>
                            <img src={userIcon} className='w-14 h-14' alt='' />
                            <p className='pl-7 font-bold text-xl'>{username}</p>
                            <button className='absolute left-[130%] md:relative ml-auto text-[13px] px-3 py-[2px] rounded-2xl text-[#21243d] bg-[#f0f4f7]' onClick={() => seteditProfile(true)}>Edit</button>
                            {editProfile && <button className='ml-2 text-[13px] px-3 py-[2px] rounded-2xl text-white bg-black' onClick={profileSubmition}>Save Changes</button>}
                        </div>

                        <div className='pt-7 m-4'>
                            <p className='font-bold'>Personal Info</p>
                        </div>
                        <main className='text-light-gray text-sm m-4'>
                            <div className='md:grid grid-cols-3 gap-8 my-5 space-y-5 md:space-y-0 mb-8'>
                                <div>
                                    <p className='font-bold'>Age</p>
                                    {!editProfile && <p>{userinfo.age || '-'}</p>}
                                    {editProfile && <select className='bg-[#f0f4f7] mt-2 border outline-none rounded-xl min-w-full max-w-full' name="age"
                                        value={profileData.age}
                                        onChange={handleChange}>
                                        <option value=''>{!userinfo.age || 'Select'}</option>
                                        <option value="Less than 18">Less than 18</option>
                                        <option value="18-21">18-21</option>
                                        <option value="22-25">22-25</option>
                                        <option value="26-30">26-30</option>
                                        <option value="31-35">31-35</option>
                                        <option value="36-40">36-40</option>
                                        <option value="41-45">41-45</option>
                                        <option value="45-50">45-50</option>
                                        <option value="51-55">51-55</option>
                                        <option value="56-60">56-60</option>
                                        <option value="61-65">61-65</option>
                                        <option value="65+">65+</option>
                                    </select>}
                                </div>
                                <div>
                                    <p className='font-bold'>Goals</p>
                                    {!editProfile && <p>{userinfo.goal || '-'}</p>}
                                    {editProfile && <select className='bg-[#f0f4f7] mt-2 border outline-none rounded-xl min-w-full max-w-full' name="goal" value={profileData.goal}
                                        onChange={handleChange}>

                                        <option value=''>{!userinfo.goal || 'Select'}</option>
                                        <option value="Gain Promotion">Gain Promotion</option>
                                        <option value="Enter New Industry">Enter New Industry</option>
                                        <option value="Grow My Business">Grow My Business</option>
                                        <option value="Self Improvement">Self Improvement</option>
                                        <option value="Start a Business">Start a Business</option>
                                        <option value="Hobby">Hobby</option>
                                        <option value="Personal Improvement">Professional Improvement</option>
                                    </select>}
                                </div>
                                <div>
                                    <p className='font-bold'>Degree</p>
                                    {!editProfile && <p>{userinfo.degree || '-'}</p>}
                                    {editProfile && <select className='bg-[#f0f4f7] mt-2 border outline-none rounded-xl min-w-full max-w-full' name='degree'
                                        value={profileData.degree}
                                        onChange={handleChange}>

                                        <option value=''>{!userinfo.degree || 'Select'}</option>
                                        <option value="Secondary / 2nd Level">Secondary / 2nd Level</option>
                                        <option value="Postgraduate">Postgraduate</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Master Degree">Master Degree</option>
                                    </select>}

                                </div>
                            </div>
                            <div className='md:grid grid-cols-3 space-y-5 md:space-y-0 gap-8'>
                                <div>
                                    <p className='font-bold'>Industry</p>
                                    {!editProfile && <p>{userinfo.industry || '-'}</p>}
                                    {editProfile && <select className='bg-[#f0f4f7] mt-2 border outline-none rounded-xl min-w-full max-w-full' name='industry'
                                        value={profileData.industry}
                                        onChange={handleChange}>

                                        <option value=''>{!userinfo.industry || 'Select'}</option>
                                        <option value="Account Management">Account Management</option>
                                        <option value="Architecture">Architecture</option>
                                        <option value="Arts">Arts</option>
                                        <option value="Aviation">Aviation</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Financial Services">Financial Services</option>
                                        <option value="Academic Student">Academic Student</option>
                                        <option value="Government Public Sector">Government Public Sector</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="IT Programming">IT Programming</option>
                                        <option value="Legal">Legal</option>
                                        <option value="Media">Media</option>
                                        <option value="Retail">Retail</option>
                                        <option value="Retired">Retired</option>
                                        <option value="Unemployed">Unemployed</option>
                                        <option value="Photography">Photography</option>
                                    </select>}
                                </div>
                                <div>
                                    <p className='font-bold'>Employment</p>
                                    {!editProfile && <p>{userinfo.employment || '-'}</p>}
                                    {editProfile && <select className='bg-[#f0f4f7] mt-2 border outline-none rounded-xl min-w-full max-w-full' name='employment'
                                        value={profileData.employment}
                                        onChange={handleChange}>

                                        <option value=''>{!userinfo.employment || 'Select'}</option>
                                        <option value="Student">Student</option>
                                        <option value="Employed full time (35+ hours per week)">Employed full time (35+ hours per week)</option>
                                        <option value="Employed part time (less than 35 hours per week)">Employed part time (less than 35 hours per week)</option>
                                        <option value="Self-employed full time">Self-employed full time</option>
                                        <option value="Self-employed part time/ Freelancer">Self-employed part time/ Freelancer</option>
                                        <option value="Homemaker/Taking Care of Family">Homemaker/Taking Care of Family</option>
                                        <option value="On Sabbatical/ Maternity/ Paternity Leave">On Sabbatical/ Maternity/ Paternity Leave</option>
                                        <option value="Unemployed and looking for work">Unemployed and looking for work</option>
                                        <option value="Unemployed but not looking for work">Unemployed but not looking for work</option>
                                        <option value="Retired">Retired</option>
                                        <option value="Unable to work">Unable to work</option>
                                    </select>}
                                </div>
                                <div className='w-full'>
                                    <p className='font-bold'>Gender</p>
                                    {!editProfile && <p>{userinfo.gender || '-'}</p>}
                                    {editProfile && <select className='bg-[#f0f4f7] mt-2 border outline-none rounded-xl min-w-full max-w-full' name='gender'
                                        value={profileData.gender}
                                        onChange={handleChange}>

                                        <option value=''>{!userinfo.gender || 'Select'}</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>}
                                </div>
                            </div>
                        </main>
                    </aside>}

                    {tab === 'Account Settings' && <aside className='px-6 pt-7 md:px-16 w-max md:w-full'>
                        <div className='px-5'>
                            <p className='text-2xl font-bold'>Account & settings</p>
                            <div className='mt-7 flex items-center'>
                                <div className='w-2/3'><p className='font-bold text-lg'>Email address</p>
                                    {!editSettings.email && <p className='mt-3 text-sm text-[#52556e]'>{email}</p>}
                                    {editSettings.email && <input className='bg-[#f0f4f7] border mt-3 text-sm text-[#52556e] w-full rounded-xl p-2 bg-' name='email' value={settings.email} onChange={handleSettingsChange} />}
                                </div>
                                {editSettings.email && <button className='ml-auto w-min h-min text-[13px] px-3 py-[2px] rounded-2xl text-[#21243d] bg-[#f0f4f7]'
                                    onClick={() => settingsSubmition('email')}>Save</button>}
                                    <button className='ml-auto w-min h-min text-[13px] px-3 py-[2px] rounded-2xl text-[#21243d] bg-[#f0f4f7]'
                                    onClick={() => toggleEdit('email')}>{editSettings.email ? 'Cancel' : 'Edit'}</button>
                            </div>

                            <div className='mt-7 flex items-center'>
                                <div className='w-2/3'><p className='font-bold text-lg'>Password</p>

                                    {!editSettings.password && <p className='mt-3 text-sm text-[#52556e]'>********</p>}
                                    {editSettings.password && <input className='bg-[#f0f4f7] border mt-3 text-sm text-[#52556e] w-full rounded-xl p-2' name='password' value={settings.password} onChange={handleSettingsChange} />}
                                </div>
                                {editSettings.password && <button className='ml-auto w-min h-min text-[13px] px-3 py-[2px] rounded-2xl text-[#21243d] bg-[#f0f4f7]'
                                    onClick={() => settingsSubmition('password')}>Save</button>}
                                <button className='ml-auto w-fit h-min text-[13px] px-3 py-[2px] rounded-2xl text-[#21243d] bg-[#f0f4f7]'
                                    onClick={() => toggleEdit('password')}>{editSettings.password ? 'cancel' : 'change password'}</button>
                            </div>

                            <div className='mt-7 flex items-center'>
                                <div><p className='font-bold text-lg'>Phone number</p>

                                    {!editSettings.phoneno && <p className='mt-3 text-sm text-[#52556e]'>{phoneno || '____'}</p>}
                                    {editSettings.phoneno && <input className='bg-[#f0f4f7] border mt-3 text-sm text-[#52556e] w-full rounded-xl p-2' name='phoneno' value={settings.phoneno} onChange={handleSettingsChange} />}
                                </div>
                                {editSettings.phoneno && <button className='ml-auto w-min h-min text-[13px] px-3 py-[2px] rounded-2xl text-[#21243d] bg-[#f0f4f7]'
                                    onClick={() => settingsSubmition('email')}>Save</button>}
                                <button className={`${editSettings.phoneno ? 'ml-1' : 'ml-auto'} w-min h-min text-[13px] px-3 py-[2px] rounded-2xl text-[#21243d] bg-[#f0f4f7]`}
                                    onClick={() => toggleEdit('phoneno')}>{editSettings.phoneno ? 'Cancel' : 'Edit'}</button>
                            </div>
                        </div>
                    </aside>
                    }

                    {tab === 'Help Center' && <aside className='px-6 pt-7 md:px-16 w-full'>
                        <div className='px-5'>
                            <p className='text-2xl font-bold'>Help Center</p>
                            <p className='text-xl font-bold mt-3'>Send Report</p>
                            <form className='flex flex-col space-y-5 mt-6 items-center w-full' onSubmit={helpSubmit}>
                                <input className='border border-text-purple rounded-2xl w-full pl-1 p-2 focus:outline-text-purple' placeholder='Title'
                                    onChange={(e) => setTitle(e.target.value)} />
                                <textarea className='border border-text-purple rounded-2xl w-full pl-1 p-2 min-h-48 focus:outline-text-purple' placeholder='Report the issue' onChange={(e) => setDescrption(e.target.value)} />
                                <button className='px-8 mt-8 w-1/2 bg-light-purple hover:bg-text-purple text-text-purple hover:text-white rounded-3xl border py-2 font-black border-text-purple' type="submit">SUBMIT</button>
                            </form>

                        </div>
                        <main>
                            <p className='text-2xl font-bold mt-3'>Frequently Asked Questions</p>
                            <div className='mt-3 text-[#52556e] text-lg'>
                                <p className='font-bold text-xl text-black mt-3'>Are all the courses free?</p>
                                <p>Yes, the courses are FREE! This website is made for people who can't afford education on particular speciality and get it for free.There should be no price on knowlegde is our motto.But if you want to support us by donating you can visit <a href='https://in.upskillist.com/' className='text-text-purple underline'>Upskillist </a> from which all the content is taken.But if you want to support <b>Oned</b> then you can email us from the above form.</p>

                                <p className='font-bold text-xl text-black mt-3'>How do i save to course ?</p>
                                <p>To save the course you need to visit the course page , you can get there by browising.In the course page you need to click on a image resembling boomark.This will save that course and you can later easily access it later with the swicher in the navbar.</p>

                                <p className='font-bold text-xl text-black mt-3'>How do i delete my account ?</p>
                                <p>To delete your account send us an report to delete your account with the reason.Our team will check the report and delee he accoun.It might take some time.Even after a week the account isn't taken down then you could email us at <b>whatever0.1.2.3.0.1.2@gmail.com</b>.</p>

                                <p className='font-bold text-xl text-black mt-3'></p>
                                <p></p>
                            </div>

                        </main>
                    </aside>
                    }


                    {tab === 'Terms Of Use' && <aside className='px-6 pt-7 md:px-16 w-full'>
                        <div className='px-5'>
                            <p className='text-3xl font-bold text-text-purple'>Terms Of Use</p>
                            <div className='mt-7 flex items-center'>
                                <div className='text-[#52556e] text-lg'><p>The information (“Information”) accessible by you (“Visitor”) using the Oned website.</p>

                                    <p className='mt-2'> Visitor’s Duty:</p>
                                </div>
                            </div>
                            <div className='mt-7'>
                                <div className='w-full text-[17px]'>
                                    <p className='font-bold text-xl bg-light-purple w-full text-center p-3'>1. OUR CONTRACT WITH YOU</p>
                                    <div className='flex mt-3 text-[#52556e]'>
                                        <p className='-translate-x-4'>1.</p><p className='-translate-x-3 '>These subscriber terms of use (“Terms of Use” or “Terms”) govern your use of our Services and constitute a binding contract between you (“Subscriber” or “Customer” or “You”) and Edtech Services LLC - 170 Commerce Way, Portsmouth, New Hampshire, 03801, a US corporation (“Company” or “We” or “Us” ), regarding the terms under which the Company will provide Subscriber with access to the Services.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>2.</p>
                                        <p className='-translate-x-3'>BY ACTIVATING YOUR MEMBERSHIP, SUBSCRIBER SIGNIFIES ITS AGREEMENT TO ABIDE BY THESE TERMS OF USE (“Acceptance”).</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>3.</p>
                                        <p className='-translate-x-3'>Subscriber agrees that its assent, given electronically, will have the same legal effect as if it had been personally signed by Subscriber. To the extent permitted by law, these Terms of Use are intended to supersede any provisions of applicable law, which might otherwise limit their enforceability or effect, because they were entered into electronically. Please print a copy of these Terms of Use for future reference.</p>
                                    </div>
                                </div>

                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>2. WHO WE ARE AND HOW TO CONTACT US</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>1.</p>
                                        <p className='-translate-x-3'>Who we are. Edtech Services LLC - 170 Commerce Way, Portsmouth, New Hampshire, 03801 is a New Hampshire limited liability company.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>2.</p>
                                        <p className='-translate-x-3'>How to contact us. You can contact us by writing to us <a href='#' className='text-text-purple underline cursor-pointer'>here</a></p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>3.</p>
                                        <p className='-translate-x-3'>How we may contact you. If we have to contact you we will do so by telephone or by writing to you at the email address or postal address you provided to us in your order.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>4.</p>
                                        <p className='-translate-x-3'>"Writing" includes emails. When we use the words "writing" or "written" in these terms, this includes emails.</p>
                                    </div>

                                </div>

                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>3. YOUR PERSONAL DATA</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>1.</p>
                                        <p className='-translate-x-3'>We will only use your personal data as set out in our <a className='text-text-purple underline cursor-pointer'>Privacy Policy</a></p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>2.</p>
                                        <p className='-translate-x-3'>Should you wish to adjust your choices regarding unsolicited commercial communications, please email us at <a className='text-text-purple underline cursor-pointer'>whatever0.1.2.3.0.1.2@gmail.com</a></p>
                                    </div>


                                </div>
                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>4. GENERAL</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>1.</p>
                                        <p className='-translate-x-3'>The Services enable Students to connect to recorded instruction, tutoring, and the courses. The Services include, without limitation, facilitating and delivering Courses and supporting materials.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>2.</p>
                                        <p className='-translate-x-3'>You are solely responsible for all service, telephony, data charges and/or other fees and costs associated with your access to and use of the Services, as well as for obtaining and maintaining all telephone, computer hardware, and other equipment required for such access and use.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>3.</p>
                                        <p className='-translate-x-3'>If You elect to access or use our Services that involve payment of a fee, then you agree to pay, and will be responsible for payment of, that fee and all taxes associated with such access or use. If you provide credit card information to pay for such fees then you hereby represent and warrant that you are authorized to supply such information and hereby authorize Oned to charge your credit card on a regular basis to pay the fees as they are due.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>4.</p>
                                        <p className='-translate-x-3'>If your payment method fails or your account is past due, then We may collect fees owed using other collection mechanisms. This may include charging other payment methods on file with Us and/or retaining collection agencies and legal counsel. We may also block your access to any of the Services pending resolution of any amounts due by You to Oned post 25 days of payment failed.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4'>5.</p>
                                        <p className='-translate-x-3'>All of your use, access and other activities relating to the Services must be in compliance with all applicable laws and regulations, including, without limitations, laws relating to copyright and other intellectual property use, and to privacy and personal identity. Further, access to our Services from territories where their contents are illegal is prohibited. You agree to comply with all applicable laws regarding the transmission of technical data exported from the India or the country in which You reside. You must agree to abide by all local rules regarding online conduct and acceptable content..</p>
                                    </div>


                                </div>

                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>5. AVAILABILITY OF WEBSITE</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className=''>Subscriber recognizes that the traffic of data through the Internet may cause delays during the download of information from the Website and accordingly, it shall not hold the Company liable for delays that are ordinary in the course of Internet use. Subscriber further acknowledges and accepts that the Website will not be available on a continual twenty-four-hour basis due to such delays, or delays caused by the Company’s upgrading, modification, or standard maintenance of the Website.</p>
                                    </div>

                                </div>
                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>6. THIRD PARTY LINKS OR INFORMATION</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className=''>This Website may contain links to other websites that are not operated by or related to Company. Company is not responsible for the content, accuracy or opinions expressed in such third-party websites, and does not investigate, monitor, or check these websites for accuracy or completeness. The inclusion of any linked website on this Website does not imply approval or endorsement of the linked website by Company. A Subscriber that leaves this Website to access these third-party sites does so at its own risk.</p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </aside>
                    }

                    {tab === 'Privacy Policy' && <aside className='px-6 pt-7 md:px-16 w-[150%] md:w-full'>
                        <div className='px-5'>
                            <p className='text-3xl font-bold text-text-purple'>Privacy Policy</p>
                            <div className='mt-7'>
                                <div className='w-full text-[17px]'>
                                    <p className='font-bold text-xl bg-light-purple w-full text-center p-3'>COLLECTION OF PERSONAL INFORMATION</p>
                                    <div className='mt-3 text-[#52556e]'>
                                        <p>Personal information (also commonly known as personally identifiable information (PII) or personal data) is information that can be used to identify you, or any other individual to whom the information may relate. The categories of personal information that Oned may collect in the course of our relationship with you is described below.</p>
                                        <p className=''><b className='font-bold text-black'>Information you provide to us:</b>In order to facilitate the provision of education, we collect personal details from you together with information we learn about you from your use of our website. These details may include (where applicable).</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <div className='-translate-x-4 mt-2 bg-[#52556e] min-w-2 h-2 rounded-full'></div>
                                        <p className='-translate-x-3'>Name and contact information (e.g., address, telephone number, e-mail);</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <div className='-translate-x-4 mt-2 bg-[#52556e] min-w-2 h-2 rounded-full'></div>
                                        <p className='-translate-x-3'>Account information (e.g. personal goals, account profile photos, ratings, webinar chat);</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <div className='-translate-x-4 mt-2 bg-[#52556e] min-w-2 h-2 rounded-full'></div>
                                        <p className='-translate-x-3'>Information contained in posts you may make on the public forums and interactive features of the Service;</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4 mt-2 bg-[#52556e] min-w-2 h-2 rounded-full'></p>
                                        <p className='-translate-x-3'>Other information that may be exchanged in the course of engaging with the Service. You will be aware of any subsequently collected information because it will come directly from you.</p>
                                    </div>
                                    <div className='mt-3 text-[#52556e]'>
                                        <p>To provide location-based services we may collect, use, and share precise location data, including the real-time geographic location of your computer or device through GPS, Bluetooth, and your IP address, along with crowd-sourced Wi-Fi hotspot and cell tower locations. This location data is collected anonymously, unless you provide consent. You may withdraw consent to Oned and our partners’ collection, use, transmission, processing and maintenance of location and account data at any time by not using the location-based features and turning off the Location Services settings (as applicable) on your device and computer..</p>
                                    </div>
                                </div>

                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>USE OF PERSONAL INFORMATION</p>
                                    <div className='mt-3 text-[#52556e]'>
                                        <p>Subject to the terms of this Privacy Statement, Oned uses the above described categories of personal information in several ways. Unless otherwise stated specifically, the above information may be used for any of the following purposes:</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4 mt-2 bg-[#52556e] min-w-2 h-2 rounded-full'></p>
                                        <p className='-translate-x-3'>to administer the Service to you;</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4 mt-2 bg-[#52556e] min-w-2 h-2 rounded-full'></p>
                                        <p className='-translate-x-3'>to respond to your requests;.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className='-translate-x-4 mt-2 bg-[#52556e] min-w-2 h-2 rounded-full'></p>
                                        <p className='-translate-x-3'>to distribute communications relevant to your use of the Service, such as system updates, customer surveys, or information about your use of the Service;</p>
                                    </div>

                                </div>

                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>SHARING INFORMATION ABOUT YOU</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p>We follow strict security procedures in the storage and disclosure of student information.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p>We may disclose any of the described categories of personal information to Oned employees, consultants, affiliates or other businesses or persons for the purpose of processing such information on our behalf in order to provide the Service to you. These disclosures may include trusted contracted companies who act as “data processors” on our behalf for the purposes set out in this Privacy Statement. In such circumstances, we require that these parties agree to protect the confidentiality of such information consistent with the terms of this Privacy Statement by executing transfer agreements with all entities to which we transfer data for processing. The agreements provide for specific and limited processing of user data in service of Oned’s operations and have been prepared so as to meet the requirements of the jurisdictions in which we operate (including the US and EU).</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p>Where permitted by law, we may also pass your information (including relating to the stages of your training) to third parties with whom we have a contractual or other close relationship and where we believe they offer products or services that may enhance the training we provide to you, your ability to practice or gain additional skills or their offering may otherwise be of interest to you.</p>
                                    </div>


                                </div>
                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>LINKS TO THIRD PARTY WEBSITES</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p>This privacy statement only covers websites that we own and control. It does not cover links to other websites and accordingly any information collected by those parties that own and control those websites or their use of cookies set from their domains when you visit their websites. Please be aware that individual third-party organizations operate their own policies regarding the use and sale of personal information and the use of cookies. If you have a concern regarding the way your personal information will be used on other sites or on the type of cookies used and how they are being used then you are advised to read the relevant privacy statement and cookie policy or in the absence of such a statement and policy on the site, contact the company concerned. Any data stored by third party websites are stored completely separately by third party.</p>
                                    </div>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p>You hereby acknowledge and agree that Oned is not responsible for the privacy practices, data collection policies and procedures, or the content of such third-party sites, and you hereby release Oned from any and all claims arising out of or related to the privacy practices, data collection policies and procedures, and/or the content of such third-party sites.</p>
                                    </div>


                                </div>

                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>CHILDREN’S PRIVACY</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className=''>The Service is not intended for children under the age of 16, and Oned does not knowingly collect the personal information of children under the age of 16.</p>
                                    </div>

                                </div>
                                <div className='w-full'><p className='font-bold text-xl bg-light-purple w-full text-center p-3 mt-6'>CHANGES TO PRIVACY STATEMENT</p>
                                    <div className='flex mt-2 text-[#52556e]'>
                                        <p className=''>Our Privacy Statement may change from time to time and any changes to the statement will be posted on this page.</p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </aside>
                    }

                </section>
            </div>

        </div>
    )
}

export default Account
