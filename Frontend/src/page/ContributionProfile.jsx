import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

function ContributionProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const profileData = location.state && location.state.profileData;
    const [Visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const TriggerPosition = 400;
            setVisible(scrollY > TriggerPosition);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const linkContribution = () => {
        navigate('/Contribution');
        window.scrollTo(0, 0);
    }
    const UserId = localStorage.getItem('UserId');

    // Fetch Data contribution
    const [contributionData, setContributionData] = useState([]);
    const [allContributionData, setAllContributionData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/contribution');
                const setProfileID = result.data.data.find(item => item.Contribution_id === parseInt(profileData));
                const allData = result.data.data;

                const filteredData = allData
                .filter(item => item.Contribution_id !== parseInt(profileData))
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
                
                setContributionData(setProfileID);
                setAllContributionData(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [profileData]);
    
    const linkContributionProfile = (data) => {
        navigate('/ContributionProfile', { state: { profileData: data } });
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (!profileData) {
            navigate('/');
            window.scrollTo(0, 0);
        }
    }, [profileData, navigate]);

    const handleContribution = (data) => {
        navigate('/ContributionPayment', { state: { profileData: data } });
        window.scrollTo(0, 0);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const [catCount, setCatCount] = useState([]);
    const [dogCount, setDogCount] = useState([]);
    const [petLostCount, setPetLostCount] = useState([]);
    const [contributionCount, setContributionCount] = useState([]);
    const AccountID = contributionData.Account_id;
    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result1 = await axios.get('http://localhost:5000/pet_adopt');
                const dogData2 = result1.data.data.filter(item => item.Account_id === AccountID && item.Pet_type_id === 1);
                const catData = result1.data.data.filter(item => item.Account_id === AccountID && item.Pet_type_id === 2);
                setCatCount(catData.length);
                setDogCount(dogData2.length);

                const result2 = await axios.get('http://localhost:5000/pet_lost');
                const allData2 = result2.data.data.filter(item => item.Account_id === AccountID);
                setPetLostCount(allData2.length);

                const result3 = await axios.get('http://localhost:5000/contribution');
                const allData3 = result3.data.data.filter(item => item.Account_id === AccountID);
                setContributionCount(allData3.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [AccountID]);

    // Insert Data to Database
    const [addRoom, setAddRoom] = useState({})
    const handleAddRoom = () => {
            axios.post('http://localhost:5000/chat_room',{ ...addRoom,
            Account1_id: parseInt(UserId),
            Account2_id: AccountID,
            })
            const swal1 = Swal.fire({
                title: 'Success',
                text: 'Add Friend successfully !',
                icon: 'success',
            });
            setTimeout(() => {
                swal1.close();
            }, 700);
            swal1.then(() => {
                window.location.reload();
            })
            .then(res => console.error(res))
            .catch(error => console.error(error));
    };

    // Fetch Data user_account
    const [filteredChatRooms, setFilteredChatRooms] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/chat_room');
                const allData = result.data.data;
                const filteredRooms = allData.filter(room =>
                    (room.Account1_id === parseInt(UserId) && room.Account2_id === AccountID) ||
                    (room.Account1_id === AccountID && room.Account2_id === parseInt(UserId))
                );
                setFilteredChatRooms(filteredRooms);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [UserId, AccountID]);

    return (
        <div className="font-Sarabun">
            <Navbar/>
            <main className="py-[50px] bg-[#f1f5f9]">

                <div>
                    <div style={{ backgroundImage: `url(/img/hero9.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                        <div class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                            <div class="text-center">
                                <div class="container px-4 mx-auto">
                                    <div class="max-w-4xl mx-auto text-center">
                                        <motion.h2 class="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            Contribution Profile
                                        </motion.h2>
                                        <motion.p class="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; Contribution &nbsp;&nbsp;&gt;&nbsp;&nbsp; Profile
                                        </motion.p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <MiniMenu/>

                <div className="flex items-center justify-center my-5">
                    <div class="sm:max-w-[600px] max-w-[400px]">
                        <div className="rounded-md overflow-hidden border bg-[#ffffff]">
                            <img className="sm:w-full sm:h-full w-[25rem] h-[14rem]" src={contributionData.Image} alt="Pet Image" />
                            <div className="px-6 py-4">
                                <div className="flex flex-wrap items-center">
                                    <div className="font-bold sm:text-[25px] text-[16px] mb-2">Name : {contributionData.Pet_name}</div>
                                    <div className="relative flex-grow flex-1 text-right cursor-pointer" onClick={openModal}>
                                        <img className="inline-block h-8 w-8 rounded-full mr-3 cursor-pointer" src={contributionData.UserImage} alt="Account User"/>
                                        <a className="text-gray-700 cursor-pointer">{contributionData.Name} {contributionData.Surname}</a>
                                    </div>
                                </div>
                                <p className="text-gray-700 sm:text-base text-[12px] py-1">
                                    Breed : {contributionData.Breed}
                                </p>
                                <p className="text-gray-700 sm:text-base text-[12px] py-1">
                                    Gender : {contributionData.Gender}
                                </p>
                                <p className="text-gray-700 sm:text-base text-[12px] py-1">
                                    Color : {contributionData.Color}
                                </p>
                                <p className="text-gray-700 sm:text-base text-[12px] py-1">
                                    Age : {contributionData.Age}
                                </p>
                                <p className="text-gray-700 sm:text-base text-[12px] py-1">
                                    Province : {contributionData.Province}
                                </p>
                                <p className="font-bold text-gray-700 sm:text-[20px] text-[15px] py-1 mt-2">
                                    Details
                                </p>
                                <p className="text-gray-700 sm:text-base text-[12px] py-1">
                                    {contributionData.Details}
                                </p>
                                <p className="font-bold text-gray-700 sm:text-[20px] text-[15px] py-1 mt-2">
                                    Total Money
                                </p>
                                <p className="text-gray-700 sm:text-base text-[12px] py-1">
                                    {contributionData.Total_money} ฿
                                </p>
                                <div className="pt-5">
                                    {contributionData.Vaccine !== "ไม่มี" && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-base text-[12px] font-semibold text-gray-700 mr-5 mb-2">
                                            {contributionData.Vaccine}
                                        </span>
                                    )}
                                    {contributionData.Castrate == 2 && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-base text-[12px] font-semibold text-gray-700 mr-5 mb-2">
                                            ทำหมัน
                                        </span>
                                    )}
                                    {contributionData.Castrate == 1 && (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-base text-[12px] font-semibold text-gray-700 mr-5 mb-2">
                                            ยังไม่ทำหมัน
                                        </span>
                                    )}
                                </div>
                                {UserId && contributionData.Account_id !== parseInt(UserId) ? (
                                    <div className="flex items-center justify-center mt-3 my-4">
                                        <button onClick={() => handleContribution(contributionData.Contribution_id)} class="text-[12px] relative rounded px-5 py-2.5 overflow-hidden group bg-yellow-500 relative hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-yellow-500 transition-all ease-out duration-300">
                                            <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                            <span class="relative"><i class="fa-solid fa-hand-holding-dollar pr-2"></i>CONTRIBUTION</span>
                                        </button>
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {isModalOpen && (
                    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>

                        <div className="bg-white p-5 rounded shadow-lg max-w-md w-full mx-auto z-50">
                            <div className="flex items-center justify-between text-[20px]">
                                {UserId && contributionData.Account_id !== parseInt(UserId) && filteredChatRooms.length === 0 ? (
                                    <i className="fa-solid fa-user-plus text-gray-500 hover:text-gray-700 cursor-pointer" onClick={handleAddRoom}></i>
                                ) : (
                                    <div></div>
                                )}
                                <i className="fa-solid fa-xmark text-gray-500 hover:text-gray-700 cursor-pointer" onClick={closeModal}></i>
                            </div>
                            <div className="flex items-center justify-center mt-5 mb-4">
                                <img
                                    className={`inline-block h-[120px] w-[120px] rounded-full ${
                                        contributionData.Status === "ใช้งาน" ? "border-4 border-green-500" : ""
                                    }`}
                                    src={contributionData.UserImage}
                                    alt="Account User"
                                />
                            </div>
                            <a className="flex items-center justify-center text-gray-700 text-[20px] font-bold">{contributionData.Name} {contributionData.Surname}</a>
                            <div className="rounded-md overflow-hidden border bg-[#ffffff] mt-3">
                                <div className="px-6 py-4">
                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <i class="fa-regular fa-user"></i>
                                        <span class="tracking-wide">About</span>
                                    </div>
                                    <div class="my-2">Email : {contributionData.Email}</div>
                                    <div class="my-2">Telephone : {contributionData.Telephone}</div>
                                    <div class="my-2">Province : {contributionData.UserProvince}</div>
                                </div>
                                <div class="px-6 py-4 grid grid-cols-2 gap-2">
                                    <div>
                                        <div className="font-bold flex items-center justify-center">
                                            <img className="w-[27px] h-[17px]" src="/img/cat_icon.png" alt="Cat Icon"/> Cat Adopt
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {catCount} Post
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold flex items-center justify-center">
                                            <img className="w-[30px] h-[20px]" src="/img/dog_icon.png" alt="dog Icon"/>  Dog Adopt
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {dogCount} Post
                                        </div>
                                    </div>
                                    <div className="mt-5 mb-2">
                                        <div className="font-bold flex items-center justify-center">
                                            <img className="w-[30px] h-[20px]" src="/img/dog_icon.png" alt="dog Icon"/> Pet Lost
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {petLostCount} Post
                                        </div>
                                    </div>
                                    <div className="mt-5 mb-2">
                                        <div className="font-bold flex items-center justify-center">
                                            <img className="w-[27px] h-[17px]" src="/img/cat_icon.png" alt="Cat Icon"/> Contribution
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {contributionCount} Post
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mt-[60px] mb-[10px]">
                        <motion.div className="flex items-center"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: Visible ? 1 : 0, x: Visible ? 0 : -50 }}
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
                            animate={{ opacity: Visible ? 1 : 0, x: Visible ? 0 : 50 }}
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
                    {allContributionData.map((profile, index) => (
                        <motion.div key={index} className="p-2 cursor-pointer group"
                            onClick={() => linkContributionProfile(profile.Contribution_id)}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: Visible ? 1 : 0, y: Visible ? 0 : 50 }}
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

            </main>
            <Footer/>
        </div>
    )
}

export default ContributionProfile
