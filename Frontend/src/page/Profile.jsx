import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProfilePost from '../component/Profile_Post';
import UserCatPost from '../component/UserCatPost';
import UserDogPost from '../component/UserDogPost';
import UserContributionPost from '../component/UserPetLostPost';
import UserPetLostPost from '../component/UserContributionPost';
import UserAdoptList from '../component/UserAdoptList';
import UserDeliveryList from '../component/UserDeliveryList';
import Profile_Adopt from '../component/Profile_Adopt';

function Profile() {
    const [authenticated, setAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState("ProfilePost");
    const [activeTab2, setActiveTab2] = useState("ProfileAdopt");
    const UserId = localStorage.getItem('UserId');
    const [userData, setUser] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        image: '',
        Account_id: ''
    })

    // Fetch Data user_account
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/user_account'
                );
                const currentUser = result.data.data.find(user => user.Account_id === parseInt(UserId));
                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Upload Image
    const handleImageUpload = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            const fileName = file.name;
            const imagePath = `/img/account/${fileName}`;

            axios.post('http://localhost:5000/update_image', { ...inputs, image: imagePath, Account_id: UserId });
            window.location.reload();
        }
    }

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure ?',
            text: 'You want to logout ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('UserId');
                navigate('/');
                window.scrollTo(0, 0);
            }
        });
    };

    const linkHome = () => {
        navigate('/');
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const UserId = localStorage.getItem('UserId');
        if (UserId) {
            setAuthenticated(true);
        } else {
            navigate('/Login');
            window.scrollTo(0, 0);
        }
    }, [navigate]);
    
    return (
        <>
            {authenticated && (
                <div className="bg-gray-100 flex flex-col min-h-screen">
                    <div className="w-full text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] fixed w-full z-20">
                        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                            <div className="p-4 flex flex-row items-center justify-between">
                                <i className="fa-solid fa-house-chimney text-[15px] text-[#ffffff] pr-6 cursor-pointer" onClick={linkHome}></i>
                                <img className="h-10 w-10" src="/img/logo1.png" alt="Pet House Logo" />
                                <i className="fa-solid fa-arrow-right-from-bracket text-[15px] text-[#ffffff] px-4 cursor-pointer md:hidden" onClick={handleLogout}></i>
                            </div>
                            <nav className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
                                <div>
                                    <i className="fa-solid fa-arrow-right-from-bracket text-[15px] text-[#ffffff] px-4 cursor-pointer" onClick={handleLogout}></i>
                                </div>
                            </nav>
                        </div>
                    </div>

                    <div class="container mx-auto my-5 p-5 py-[65px]">
                        <div class="md:flex no-wrap md:-mx-2">
                            <div class="w-full md:w-3/12 md:mx-2">
                                <div class="bg-white p-6 border-t-4 border-green-400 shadow-md shadow-[#e9e9e9] rounded-lg">
                                    <div class="image overflow-hidden">
                                        <input name="image" id="imageInput" type="file" className="hidden" onChange={handleImageUpload}/>
                                        <img
                                            className="h-auto w-auto mx-auto cursor-pointer"
                                            src={userData.Image}
                                            alt="Profile Image"
                                            onClick={() => document.getElementById('imageInput').click()}
                                        />
                                    </div>
                                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{userData.Name} {userData.Surname}</h1>
                                    <h3 class="text-gray-600 font-lg text-semibold leading-6">User Account Pet House.</h3>
                                    
                                    <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        <li class="flex items-center py-3">
                                            <span>Status</span>
                                            <span class="ml-auto">
                                                <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">{userData.Status}</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            
                                <div class="my-4"></div>

                            </div>
                    
                            <div class="md:w-9/12 md:mx-2 mt-4 md:mt-0">
                            
                                <div class="bg-white p-6 shadow-md shadow-[#e9e9e9] rounded-lg">
                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <i class="fa-regular fa-user px-1"></i>
                                        <span class="tracking-wide">About</span>
                                    </div>
                                    <div class="text-gray-700">
                                        <div class="grid md:grid-cols-2 text-sm">
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Email.</div>
                                                <div class="px-4 py-2">{userData.Email}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">National ID</div>
                                                <div class="px-4 py-2">{userData.National_id}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Telephone</div>
                                                <div class="px-4 py-2">{userData.Telephone}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">House No.</div>
                                                <div class="px-4 py-2">{userData.House_id}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Alley</div>
                                                <div class="px-4 py-2">{userData.Alley}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">District</div>
                                                <div class="px-4 py-2">{userData.District}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">County</div>
                                                <div class="px-4 py-2">{userData.County}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Province</div>
                                                <div class="px-4 py-2">{userData.Province}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Postal No.</div>
                                                <div class="px-4 py-2">{userData.Postal_id}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div class="my-4"></div>

                                {activeTab === "ProfilePost" && <ProfilePost setActiveTab={setActiveTab} activeTab={activeTab}/> }
                                {activeTab === "UserCatPost" && <UserCatPost setActiveTab={setActiveTab} activeTab={activeTab}/>}
                                {activeTab === "UserDogPost" && <UserDogPost setActiveTab={setActiveTab} activeTab={activeTab}/>}
                                {activeTab === "UserContributionPost" && <UserContributionPost setActiveTab={setActiveTab} activeTab={activeTab}/>}
                                {activeTab === "UserPetLostPost" && <UserPetLostPost setActiveTab={setActiveTab} activeTab={activeTab}/>}
                                
                                <div class="my-4"></div>

                                {activeTab2 === "ProfileAdopt" && <Profile_Adopt setActiveTab={setActiveTab2} activeTab={activeTab2}/> }
                                {activeTab2 === "UserAdoptList" && <UserAdoptList setActiveTab={setActiveTab2} activeTab={activeTab2}/> }
                                {activeTab2 === "UserDeliveryList" && <UserDeliveryList setActiveTab={setActiveTab2} activeTab={activeTab2}/> }

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Profile