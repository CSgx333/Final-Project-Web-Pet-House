import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Home() {
    const UserId = localStorage.getItem('UserId');
    const navigate = useNavigate();
    const [dogAdoptVisible, setDogAdoptVisible] = useState(false);
    const [contributionVisible, setContributionVisible] = useState(false);
    const [petLostVisible, setPetLostVisible] = useState(false);
    const [position1, setPosition1] = useState(false);
    const [position2, setPosition2] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const dogAdoptTriggerPosition = 400;
            const contributionTriggerPosition = 1000;
            const petLostTriggerPosition = 1400;
            const Position1 = 1800;
            const Position2 = 2000;
            setDogAdoptVisible(scrollY > dogAdoptTriggerPosition);
            setContributionVisible(scrollY > contributionTriggerPosition);
            setPetLostVisible(scrollY > petLostTriggerPosition);
            setPosition1(scrollY > Position1);
            setPosition2(scrollY > Position2);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const linkCatAdopt = () => {
        navigate('/CatAdopt');
        window.scrollTo(0, 0);
    }
    const linkDogAdopt = () => {
        navigate('/DogAdopt');
        window.scrollTo(0, 0);
    }
    const linkPetLost = () => {
        navigate('/PetLost');
        window.scrollTo(0, 0);
    }
    const linkContribution = () => {
        navigate('/Contribution');
        window.scrollTo(0, 0);
    }
    
    // Hero
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        '/img/Video/cat.mp4',
        '/img/Video/dog.mp4',
        '/img/Video/dog.mp4',
    ];
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
    useEffect(() => {
        const slideshowInterval = setInterval(() => {
            nextImage();
        }, 6000); 
        return () => {
            clearInterval(slideshowInterval);
        };
    }, []);

    // Fetch Data pet_adopt
    const [catData, setCatData] = useState([]);
    const [dogData, setDogData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/pet_adopt');
                const allData = result.data.data;

                const catData = allData.filter(item => item.Pet_type_id === 2);
                const dogData = allData.filter(item => item.Pet_type_id === 1);
                
                const catStatus = catData.filter(item => item.Post_status === 1);
                const dogStatus = dogData.filter(item => item.Post_status === 1);
                
                setCatData(catStatus.slice(0, 4));
                setDogData(dogStatus.slice(0, 4));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Fetch Data Contribution
    const [contribution, setContribution] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/contribution'
                );
                const allData = result.data.data;
                const ContributionStatus = allData.filter(item => item.Post_status === 1);
                setContribution(ContributionStatus.slice(0, 4));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Fetch Data pet_lost
    const [lost, setLost] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/pet_lost'
                );
                const allData = result.data.data;
                allData.forEach((item) => {
                    if (item.Date_pet_lost) {
                        item.Date_pet_lost = new Date(item.Date_pet_lost).toLocaleDateString();
                    }
                });
                const lostStatus = allData.filter(item => item.Post_status === 1);
                setLost(lostStatus.slice(0, 4));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const linkLogin = () => {
        navigate('/Login');
        window.scrollTo(0, 0);
    }
    const linkCatProfile = (data) => {
        navigate('/CatProfile', { state: { profileData: data } });
        window.scrollTo(0, 0);
    }
    const linkDogProfile = (data) => {
        navigate('/DogProfile', { state: { profileData: data } });
        window.scrollTo(0, 0);
    }
    const linkContributionProfile = (data) => {
        navigate('/ContributionProfile', { state: { profileData: data } });
        window.scrollTo(0, 0);
    }
    const linkPetLostProfile = (data) => {
        navigate('/PetLostProfile', { state: { profileData: data } });
        window.scrollTo(0, 0);
    }

    // Fetch Data user_adopt_list
    const [petEndPost, setPetEndPost] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/user_adopt_list');
                const allData = result.data.data;
                allData.forEach((item) => {
                    if (item.Adopt_date) {
                        item.Adopt_date = new Date(item.Adopt_date).toLocaleDateString();
                    }
                });
                const postStatus = allData.filter(item => item.List_pet_status === 1);
                const filteredData = postStatus.sort(() => 0.5 - Math.random()).slice(0, 3);
                setPetEndPost(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="font-Sarabun">
            <Navbar/>
            
            <main className="pt-[50px] bg-[#f1f5f9]">
                <div className="relative w-full h-[400px] overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 100% 100%, 95% 91%, 5% 91%, 0 100%, 0% 30%)" }}>
                    <video src={images[currentImageIndex]} type="video/mp4" className="w-full h-full object-cover" autoPlay loop muted/>
                        <div class="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                            <div class="text-center">
                                <div class="container px-4 mx-auto">
                                    <div class="max-w-4xl mx-auto text-center">
                                        <div className="flex items-center justify-center mb-5">
                                            <i class="fa-solid fa-paw text-white text-[25px]"></i>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="max-w-4xl mx-auto text-center"
                                        >
                                            <span className="text-gray-100 font-semibold uppercase tracking-widest">
                                                Pet House
                                            </span>
                                            <motion.h2
                                                className="mt-4 mb-6 text-4xl lg:text-5xl font-bold text-gray-100"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                Website and Community to help pets.
                                            </motion.h2>
                                            <motion.p
                                                className="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                Helping one animal doesn't help the world. But that animal's life
                                                will be changed forever.
                                            </motion.p>
                                            {!UserId ? (
                                                <motion.a
                                                    className="inline-block md:w-auto mb-8 py-3 px-6 text-[15px] font-bold uppercase border-2 border-transparent bg-gray-200 rounded hover:bg-gray-100 text-gray-800 transition duration-200 cursor-pointer"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    onClick={linkLogin}
                                                >
                                                    Get Started
                                                </motion.a>
                                            ) : (
                                                null
                                            )}
                                        </motion.div>
                                    </div>
                                    <div className="max-w-[1px] bg-white mx-auto h-full absolute inset-0 right-2/3 transform bg-opacity-20"></div>
                                    <div className="max-w-[1px] bg-white mx-auto h-full absolute inset-0 left-2/3 transform bg-opacity-20"></div>
                                </div>
                            </div>
                        </div>
                    
                </div>

                <MiniMenu/>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mt-[60px] mb-[10px]">
                        <motion.div className="flex items-center"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="z-10">
                                <h2 className="font-AlfaSlabOne text-[#ff626e] tracking-widest sm:text-[50px] text-[12px] absolute -mt-[24px]">
                                    Cat Adopt
                                </h2>
                            </div>
                        </motion.div>
                        <motion.div className="md:block" 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div onClick={linkCatAdopt} class="group sm:text-[15px] text-[12px] text-[#ff626e] font-bold cursor-pointer">
                                <span>See More</span>
                                <svg class="w-5 h-5 hidden sm:inline ml-4 transition ease-in-out group-delay-150 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 15">
                                    <path d="M16.2.5 19.9 4m4.6 3.5-8.3 7" fill="none" stroke="#ff626e"></path>
                                    <path fill="none" stroke="#ff626e" stroke-miterlimit="10" d="M16 7.5H0"></path>
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {catData.map((profile, index) => (
                        <motion.div key={index} className="p-2 cursor-pointer group" 
                            onClick={() => linkCatProfile(profile.Pet_adopt_id)}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 + index * 0.3 }}
                        >
                            <div className="max-w-sm overflow-hidden bg-[#ffffff] inline-block">
                                <div className="relative overflow-hidden">
                                    <span class="absolute mt-[110px] w-[400px] h-[400px] transition-all duration-100 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gradient-to-r from-[#e47600] to-[#aa1b28] opacity-50 group-hover:-rotate-180 ease"></span>
                                    <img className="w-[280px] h-[150px]" src={profile.Image} alt="Pet Image" />
                                </div>
                                <div className="px-6 py-4">
                                    <div className="font-bold sm:text-[16px] text-[14px] mb-2">Name : {profile.Pet_name}</div>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px] py-1">
                                        Breed : {profile.Breed}
                                    </p>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px]">
                                        Gender : {profile.Gender}
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    {profile.Vaccine !== "ไม่มี" && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                            {profile.Vaccine}
                                        </span>
                                    )}
                                    {profile.Castrate == 2 && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                            ทำหมัน
                                        </span>
                                    )}
                                    {profile.Castrate == 1 && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                            ยังไม่ทำหมัน
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="flex items-center justify-between mt-[60px] mb-[10px]">
                        <motion.div className="flex items-center"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: dogAdoptVisible ? 1 : 0, x: dogAdoptVisible ? 0 : -50 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="z-10">
                                <h2 className="font-AlfaSlabOne text-[#ff626e] tracking-widest sm:text-[50px] text-[12px] absolute -mt-[24px]">
                                    Dog Adopt
                                </h2>
                            </div>     
                        </motion.div>
                        <motion.div className="md:block"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: dogAdoptVisible ? 1 : 0, x: dogAdoptVisible ? 0 : 50 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div onClick={linkDogAdopt} class="group sm:text-[15px] text-[12px] text-[#ff626e] font-bold cursor-pointer">
                                <span>See More</span>
                                <svg class="w-5 h-5 hidden sm:inline ml-4 transition ease-in-out group-delay-150 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 15">
                                    <path d="M16.2.5 19.9 4m4.6 3.5-8.3 7" fill="none" stroke="#ff626e"></path>
                                    <path fill="none" stroke="#ff626e" stroke-miterlimit="10" d="M16 7.5H0"></path>
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                    {dogData.map((profile, index) => (
                        <motion.div key={index} className="p-2 cursor-pointer group"
                            onClick={() => linkDogProfile(profile.Pet_adopt_id)}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: dogAdoptVisible ? 1 : 0, y: dogAdoptVisible ? 0 : 50 }}
                            transition={{ duration: 0.3 + index * 0.3 }}
                        >
                            <div className="max-w-sm overflow-hidden bg-[#ffffff] inline-block">
                                <div className="relative overflow-hidden">
                                    <span class="absolute mt-[110px] w-[400px] h-[400px] transition-all duration-100 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gradient-to-r from-[#e47600] to-[#aa1b28] opacity-50 group-hover:-rotate-180 ease"></span>
                                    <img className="w-[280px] h-[150px]" src={profile.Image} alt="Pet Image" />
                                </div>
                                <div className="px-6 py-4">
                                    <div className="font-bold sm:text-[16px] text-[14px] mb-2">Name : {profile.Pet_name}</div>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px] py-1">
                                        Breed : {profile.Breed}
                                    </p>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px]">
                                        Gender : {profile.Gender}
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    {profile.Vaccine !== "ไม่มี" && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                            {profile.Vaccine}
                                        </span>
                                    )}
                                    {profile.Castrate == 2 && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                            ทำหมัน
                                        </span>
                                    )}
                                    {profile.Castrate == 1 && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                            ยังไม่ทำหมัน
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mt-[60px] mb-[10px]">
                        <motion.div className="flex items-center"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: contributionVisible ? 1 : 0, x: contributionVisible ? 0 : -50 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="z-10">
                                <h2 className="font-AlfaSlabOne text-[#ff626e] tracking-widest sm:text-[50px] text-[12px] absolute -mt-[24px]">
                                    Contribution
                                </h2>
                            </div>
                        </motion.div>
                        <motion.div className="md:block"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: contributionVisible ? 1 : 0, x: contributionVisible ? 0 : 50 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div onClick={linkContribution} class="group sm:text-[15px] text-[12px] text-[#ff626e] font-bold cursor-pointer">
                                <span>See More</span>
                                <svg class="w-5 h-5 hidden sm:inline ml-4 transition ease-in-out group-delay-150 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 15">
                                    <path d="M16.2.5 19.9 4m4.6 3.5-8.3 7" fill="none" stroke="#ff626e"></path>
                                    <path fill="none" stroke="#ff626e" stroke-miterlimit="10" d="M16 7.5H0"></path>
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                    {contribution.map((profile, index) => (
                        <motion.div key={index} className="p-2 cursor-pointer group"
                            onClick={() => linkContributionProfile(profile.Contribution_id)}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: contributionVisible ? 1 : 0, y: contributionVisible ? 0 : 50 }}
                            transition={{ duration: 0.3 + index * 0.3 }}
                        >
                            <div className="max-w-sm overflow-hidden bg-[#ffffff] inline-block">
                                <div className="relative overflow-hidden">
                                    <span class="absolute mt-[110px] w-[400px] h-[400px] transition-all duration-100 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gradient-to-r from-[#e47600] to-[#aa1b28] opacity-50 group-hover:-rotate-180 ease"></span>
                                    <img className="w-[280px] h-[150px]" src={profile.Image} alt="Pet Image" />
                                </div>
                                <div className="px-6 py-4">
                                    <div className="font-bold sm:text-[16px] text-[14px] mb-2">Name : {profile.Pet_name}</div>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px] py-1">
                                        Breed : {profile.Breed}
                                    </p>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px]">
                                        Gender: {profile.Gender}
                                    </p>
                                    <span className="text-gray-700 sm:text-[13px] text-[11px] py-1 block max-w-[225px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        Details: {profile.Details}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mt-[60px] mb-[10px]">
                        <motion.div className="flex items-center"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: petLostVisible ? 1 : 0, x: petLostVisible ? 0 : -50 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="z-10">
                                <h2 className="font-AlfaSlabOne text-[#ff626e] tracking-widest sm:text-[50px] text-[12px] absolute -mt-[24px]">
                                    Pet Lost
                                </h2>
                            </div>
                        </motion.div>
                        <motion.div className="md:block"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: petLostVisible ? 1 : 0, x: petLostVisible ? 0 : 50 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div onClick={linkPetLost} class="group sm:text-[15px] text-[12px] text-[#ff626e] font-bold cursor-pointer">
                                <span>See More</span>
                                <svg class="w-5 h-5 hidden sm:inline ml-4 transition ease-in-out group-delay-150 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 15">
                                    <path d="M16.2.5 19.9 4m4.6 3.5-8.3 7" fill="none" stroke="#ff626e"></path>
                                    <path fill="none" stroke="#ff626e" stroke-miterlimit="10" d="M16 7.5H0"></path>
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {lost.map((profile, index) => (
                        <motion.div key={index} className="p-2 cursor-pointer group"
                            onClick={() => linkPetLostProfile(profile.Pet_lost_id)}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: petLostVisible ? 1 : 0, y: petLostVisible ? 0 : 50 }}
                            transition={{ duration: 0.3 + index * 0.3 }}
                        >
                            <div className="max-w-sm overflow-hidden bg-[#ffffff] inline-block">
                                <div className="relative overflow-hidden">
                                    <span class="absolute mt-[110px] w-[400px] h-[400px] transition-all duration-100 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gradient-to-r from-[#e47600] to-[#aa1b28] opacity-50 group-hover:-rotate-180 ease"></span>
                                    <img className="w-[280px] h-[150px]" src={profile.Image} alt="Pet Image" />
                                </div>
                                <div className="px-6 py-4">
                                    <div className="font-bold sm:text-[16px] text-[14px] mb-2">Name : {profile.Pet_name}</div>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px] py-1">
                                        Breed : {profile.Breed}
                                    </p>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px]">
                                        Gender : {profile.Gender}
                                    </p>
                                    <p className="text-gray-700 sm:text-[13px] text-[11px] py-1">
                                        Date Lost : {profile.Date_pet_lost}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="bg-gradient-to-r from-[#ff8a8a] to-[#ffdbac] relative w-full mt-[100px] overflow-hidden" style={{ clipPath: "polygon(5% 13%, 95% 13%, 100% 0, 100% 70%, 100% 100%, 0 100%, 0% 70%, 0 0)" }}>
                    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                        <div className="flex items-center justify-center h-full">
                            <motion.div className="absolute sm:translate-y-[40px] translate-y-[2px]"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: position1 ? 1 : 0, x: position1 ? 0 : 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                {petEndPost.map((data, index) => (
                                    <div key={index} className={`flex items-center space-x-2 ${index === 1 ? 'md:mr-[120px]' : 'md:ml-[120px]'}`} 
                                        style={{ transform: `translateX(${index === 1 ? '-130px' : (index === 2 ? '125px' : '0')})`,
                                    }}>
                                        {index === 1 ? (
                                            <>
                                                <div className="sm:mb-[70px] mb-[20px] flex-1 hidden sm:inline bg-[#ffffff] p-3 rounded">
                                                    <p className="text-[14px] sm:text-[16px] font-medium truncate text-gray-700">
                                                        {data.Breed}
                                                    </p>
                                                    <p className="text-[10px] sm:text-[12px] text-gray-500 truncate">
                                                        {data.Pet_name} &nbsp; {data.Adopt_date}
                                                    </p>
                                                </div>
                                                <div className="sm:mb-[70px] mb-[20px] pl-4">
                                                    <motion.img className="sm:w-[80px] sm:h-[80px] w-[40px] h-[40px] border sm:border-[3px] border-[2px] rounded-full" src={data.PetImage} alt="Pet Image"
                                                        initial={{ opacity: 0, y: 70 }}
                                                        animate={{ opacity: position2 ? 1 : 0, y: position2 ? 0 : 70 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="sm:mb-[70px] mb-[20px] pr-4 ">
                                                    <motion.img className="sm:w-[80px] sm:h-[80px] w-[40px] h-[40px] border sm:border-[3px] border-[2px] rounded-full" src={data.PetImage} alt="Pet Image"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: position2 ? 1 : 0, y: position2 ? 0 : 20 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                </div>
                                                <div className="sm:mb-[70px] mb-[20px] flex-1 hidden sm:inline bg-[#ffffff] p-3 rounded">
                                                    <p className="text-[14px] sm:text-[16px] font-medium truncate text-gray-700">
                                                        {data.Breed}
                                                    </p>
                                                    <p className="text-[10px] sm:text-[12px] text-gray-500 truncate">
                                                        {data.Pet_name} &nbsp; {data.Adopt_date}
                                                    </p>
                                                </div>
                                            </>  
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                            <motion.div className="flex items-center justify-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: position1 ? 1 : 0, y: position1 ? 0 : 50 }}
                            transition={{ duration: 0.6 }}>
                                <img className="sm:w-[450px] sm:h-[500px] w-[400px] h-[200px] sm:mt-[200px] mt-[80px]" 
                                src="/img/condo1.png" 
                                alt="Condo Image"
                            />
                            </motion.div>
                        </div>
                        <motion.div class="mt-[170px] ml-[50px] hidden sm:inline"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: position1 ? 1 : 0, y: position1 ? 0 : 50 }}
                        transition={{ duration: 0.6 }}>
                            <div className="z-10">
                                <motion.h2 className="font-AlfaSlabOne text-[#ff626e] tracking-widest absolute text-[40px]"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: position2 ? 1 : 0, x: position2 ? 0 : 30 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Pets that get a home
                                </motion.h2>
                            </div>
                            <div className="flex items-center justify-center mt-[43px]">
                                <article class="prose prose-slate px-8 py-8 rounded-md bg-[#ffffff] shadow-lg">
                                    <p style={{ textAlign: 'justify' }}>
                                        Many times in life that the journey of time often leads us to encounter sadness 
                                        and faced a heart wrenching story In addition to the encouragement and 
                                        good wishes of those around us that we can always feel, there is another "pure love" 
                                        that always embraces us. is the concern of "Four-legged friends" dogs and cats
                                    </p>
                                    <p style={{ textAlign: 'justify' }}>
                                        It is believed that most people who raise animals You can always feel the power of great love. 
                                        Even though they can't communicate in spoken language. But the actions of the furry gang that come to snuggle, 
                                        lie beside or touch their legs. He comforts us when we cry. including eyes full of concern 
                                        All of that is enough to replace the word "love".
                                    </p>
                                </article>
                            </div>
                        </motion.div>
                    </div>
                    
                </div>

            </main>
            <Footer/>

        </div>
    )
}

export default Home