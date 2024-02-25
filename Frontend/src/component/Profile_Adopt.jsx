import React, { useState, useEffect } from "react";
import axios from 'axios';

function Profile_Adopt({ setActiveTab }) {
    const UserId = localStorage.getItem('UserId');
    const [petListCount, setPetListCount] = useState([]);
    const [petDeliveryCount, setPetDeliveryCount] = useState([]);

    // Fetch Data user_adopt_list
    const [petListPost, setPetListPost] = useState([]);
    const [petDeliveryList, setPetDeliveryList] = useState([]);
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
                const postStatus = allData.filter(item => item.List_pet_status === 2);
                const accountData1 = postStatus.filter(item => item.Account_id === parseInt(UserId));
                const accountData2 = postStatus.filter(item => item.OwnerId === parseInt(UserId));
                
                setPetListPost(accountData1.slice(0, 4));
                setPetDeliveryList(accountData2.slice(0, 4));
                setPetListCount(accountData1.length)
                setPetDeliveryCount(accountData2.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div class="bg-white p-6 shadow-md shadow-[#e9e9e9] rounded-lg">
            <div class="grid grid-cols-2">
                <div className="border-r-2 border-[#f1f1f1] mr-5">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <i class="fa-solid fa-hands-holding-circle mr-3"></i>
                        <span class="tracking-wide">Your Pet Adopt List</span>
                        <div className="bg-[#f9d3ff] text-[#b662c3] font-bold flex items-center justify-center w-5 h-5 rounded text-[10px]">
                            <div>
                                {petListCount}
                            </div>
                        </div>
                    </div>
                    <ul class="list-inside space-y-2">
                        {petListPost.length === 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[20px] py-5"></i>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Post not found . . .</p>
                            </div>
                        ) : (
                            petListPost.map((data, index) => (
                                <div key={index} className="flex items-center space-x-2 ">
                                    <div className="flex-shrink-0 sm:pr-2">
                                        <img className="w-10 h-10 rounded-full" src={data.PetImage} alt="Adopt Image"/>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-[14px] sm:text-[16px] font-medium truncate text-gray-700">
                                            {data.Breed}
                                        </p>
                                        <p className="text-[10px] sm:text-[12px] text-gray-500 truncate">
                                            {data.Pet_name}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </ul>
                    {petListPost.length !== 0 ? (
                        <div className="flex items-center justify-center mt-7 mb-7">
                            <button onClick={() => setActiveTab("UserAdoptList")} class="relative inline-flex items-center px-7 y-2 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-6 h-6 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative text-[12px]">Show All</span>
                            </button>
                        </div>
                    ) : <div class="my-4"></div>}
                </div>

                <div>
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <i class="fa-solid fa-hand-holding-heart mr-3"></i>
                        <span class="tracking-wide">Pet Adopt Request List</span>
                        <div className="bg-[#cefff1] text-[#53af94] font-bold flex items-center justify-center w-5 h-5 rounded text-[10px]">
                            <div>
                                {petDeliveryCount}
                            </div>
                        </div>
                    </div>
                    <ul class="list-inside space-y-2">
                        {petDeliveryList.length === 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[20px] py-5"></i>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Post not found . . .</p>
                            </div>
                        ) : (
                            (petDeliveryList.map((data, index) => (
                                <div key={index} className="flex items-center space-x-2 ">
                                    <div className="flex-shrink-0 sm:pr-2">
                                        <img className="w-10 h-10 rounded-full" src={data.PetImage} alt="Adopt Image"/>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-[14px] sm:text-[16px] font-medium truncate text-gray-700">
                                            {data.Breed}
                                        </p>
                                        <p className="text-[10px] sm:text-[12px] text-gray-500 truncate">
                                            {data.Pet_name}
                                        </p>
                                    </div>
                                </div>
                            )))
                        )}
                    </ul>
                    {petDeliveryList.length !== 0 ? (
                        <div className="flex items-center justify-center mt-7 mb-7">
                            <button onClick={() => setActiveTab("UserDeliveryList")} class="relative inline-flex items-center px-7 y-2 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-6 h-6 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative text-[12px]">Show All</span>
                            </button>
                        </div>
                    ) : <div class="my-4"></div>}
                </div>

            </div>
                                    
        </div>
    )
}
export default Profile_Adopt