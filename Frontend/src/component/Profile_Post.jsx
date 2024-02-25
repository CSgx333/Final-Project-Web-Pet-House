import React, { useState, useEffect } from "react";
import axios from 'axios';

function Profile_Post({ setActiveTab }) {
    const UserId = localStorage.getItem('UserId');
    const [catCount, setCatCount] = useState([]);
    const [dogCount, setDogCount] = useState([]);
    const [petLostCount, setPetLostCount] = useState([]);
    const [contributionCount, setContributionCount] = useState([]);

    // Fetch Data pet_adopt
    const [catData, setCatData] = useState([]);
    const [dogData, setDogData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/pet_adopt');
                const allData = result.data.data;
                const catData = allData.filter(item => item.Pet_type_id === 2 && item.Account_id === parseInt(UserId));
                const dogData = allData.filter(item => item.Pet_type_id === 1 && item.Account_id === parseInt(UserId));
                setCatData(catData.slice(0, 4));
                setDogData(dogData.slice(0, 4));
                setCatCount(catData.length);
                setDogCount(dogData.length);
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
                const allData = result.data.data.filter(item => item.Account_id === parseInt(UserId));
                setContribution(allData.slice(0, 4));
                setContributionCount(allData.length);
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
                const allData = result.data.data.filter(item => item.Account_id === parseInt(UserId));
                allData.forEach((item) => {
                    if (item.Date_pet_lost) {
                        item.Date_pet_lost = new Date(item.Date_pet_lost).toLocaleDateString();
                    }
                });
                setLost(allData.slice(0, 4));
                setPetLostCount(allData.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="bg-white p-6 shadow-md shadow-[#e9e9e9] rounded-lg">
            <div className="grid grid-cols-2">
                <div className="border-r-2 border-[#f1f1f1] mr-5">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <i className="far fa-solid fa-cat px-1"></i>
                        <span className="tracking-wide">Cat Adopt Post</span>
                        <div className="bg-[#fed7d7] text-[#9c2e2e] font-bold flex items-center justify-center w-5 h-5 rounded +text-[10px]">
                            <div>
                                {catCount}
                            </div>
                        </div>
                    </div>
                    <ul className="list-inside space-y-2">
                        {catData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <i className="fa-regular fa-circle-xmark text-gray-500 text-[20px] py-5"></i>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Post not found . . .</p>
                            </div>
                        ) : (
                            catData.map((data, index) => (
                                <div key={index} className="flex items-center space-x-2 ">
                                    <div className="flex-shrink-0 sm:pr-2">
                                        <img className="w-10 h-10 rounded-full" src={data.Image} alt="Cat Adopt Image"/>
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
                    {catData.length !== 0 ? (
                        <div className="flex items-center justify-center mt-7 mb-7">
                            <button onClick={() => setActiveTab("UserCatPost")} class="relative inline-flex items-center px-7 y-2 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
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
                        <i class="far fa-solid fa-dog px-1"></i>
                        <span class="tracking-wide">Dog Adopt Post</span>
                        <div className="bg-[#fefcbf] text-[#975a16] font-bold flex items-center justify-center w-5 h-5 rounded text-[10px]">
                            <div>
                                {dogCount}
                            </div>
                        </div>
                    </div>
                    <ul class="list-inside space-y-2">
                        {dogData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[20px] py-5"></i>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Post not found . . .</p>
                            </div>
                        ) : (
                            dogData.map((data, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className="flex-shrink-0 sm:pr-2">
                                        <img className="w-10 h-10 rounded-full" src={data.Image} alt="Cat Adopt Image"/>
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
                    {dogData.length !== 0 ? (
                        <div className="flex items-center justify-center mt-7 mb-7">
                            <button onClick={() => setActiveTab("UserDogPost")} class="relative inline-flex items-center px-7 y-2 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-6 h-6 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative text-[12px]">Show All</span>
                            </button>
                        </div>                    
                    ) : <div class="my-4"></div>}
                </div>

                <div className="border-r-2 border-[#f1f1f1] mr-5 mt-[50px]">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <i class="far fa-solid fa-house-circle-xmark px-1"></i>
                        <span class="tracking-wide">Pet Lost Post</span>
                        <div className="bg-[#c6f6d5] text-[#276749] font-bold flex items-center justify-center w-5 h-5 rounded text-[10px]">
                            <div>
                                {petLostCount}
                            </div>
                        </div>
                    </div>
                    <ul class="list-inside space-y-2">
                        {lost.length === 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[20px] py-5"></i>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Post not found . . .</p>
                            </div>
                        ) : (  
                            lost.map((data, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className="flex-shrink-0 sm:pr-2">
                                        <img className="w-10 h-10 rounded-full" src={data.Image} alt="Cat Adopt Image"/>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-[14px] sm:text-[16px] font-medium truncate text-gray-700">
                                            {data.Breed}
                                        </p>
                                        <p className="text-[10px] sm:text-[12px] text-gray-500 truncate">
                                            {data.Pet_name} &nbsp; {data.Date_pet_lost}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </ul>
                    {lost.length !== 0 ? (
                        <div className="flex items-center justify-center mt-7 mb-7">
                            <button onClick={() => setActiveTab("UserContributionPost")} class="relative inline-flex items-center px-7 y-2 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-6 h-6 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative text-[12px]">Show All</span>
                            </button>
                        </div>
                    ) : <div class="my-4"></div>}
                </div>

                <div className="mt-[50px]">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <i class="far fa-solid fa-paw px-1"></i>
                        <span class="tracking-wide">Contribution Post</span>
                        <div className="bg-[#bee3f8] text-[#2e5483] font-bold flex items-center justify-center w-5 h-5 rounded text-[10px]">
                            <div>
                                {contributionCount}
                            </div>
                        </div>
                    </div>
                    <ul class="list-inside space-y-2">
                        {contribution.length === 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[20px] py-5"></i>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Post not found . . .</p>
                            </div>
                        ) : (  
                            contribution.map((data, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className="flex-shrink-0 sm:pr-2">
                                        <img className="w-10 h-10 rounded-full" src={data.Image} alt="Cat Adopt Image"/>
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
                    {contribution.length !== 0 ? (
                        <div className="flex items-center justify-center mt-7 mb-7">
                            <button onClick={() => setActiveTab("UserPetLostPost")} class="relative inline-flex items-center px-7 y-2 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
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
export default Profile_Post