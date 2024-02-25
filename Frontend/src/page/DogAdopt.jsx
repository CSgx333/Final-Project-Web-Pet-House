import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FadingBalls } from "react-cssfx-loading";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import breedTranslations from '/src/assets/Json/Breed.json';
import { motion } from "framer-motion";

function DogAdopt() {
    const navigate = useNavigate();
    const linkUserAddPetAdopt = () => {
        navigate('/AddPetAdopt');
        window.scrollTo(0, 0);
    }
    const linkDogProfile = (data) => {
        navigate('/DogProfile', { state: { profileData: data } });
        window.scrollTo(0, 0);
    }

    const UserId = localStorage.getItem('UserId');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBreed, setSearchBreed] = useState('');
    const [filterGender, setFilterGender] = useState(''); 
    const itemsPerPage = 9;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };
    
    // แสดงรูปช่อง Upload
    const [uploadedImage, setUploadedImage] = useState(null);
    const [predictedBreed, setPredictedBreed] = useState('');

    useEffect(() => {
        console.log('Breed :', predictedBreed);
    }, [predictedBreed]);

    const handleImageUpload = async (event) => {
        openModal();
        const file = event.target.files[0];

        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            const image = new Image();
            image.src = URL.createObjectURL(file);
            try {
                const model = await mobilenet.load();
                const predictions = await model.classify(image);
                const topPrediction = predictions[0];
                const predictedBreedValue = topPrediction.className;
                const translatedBreed = breedTranslations[predictedBreedValue] || predictedBreedValue;
                setPredictedBreed(translatedBreed);
                const fileName = file.name;
                const imagePath = `/img/pet/${fileName}`;
            closeModal();
            } catch (error) {
                console.error('Error during image classification:', error);
                closeModal();
            }
        }
    };

    // Fetch Data pet_adopt
    const [dogData, setDogData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/pet_adopt');
                const allData = result.data.data;
                const dogData = allData.filter(item => item.Pet_type_id === 1);

                // กรองจาก Breed
                const dogBreed = dogData.filter(item =>
                    item.Breed.toLowerCase().includes(searchBreed.toLowerCase())
                );

                // กรองจากเพศ
                const dogGender = filterGender ? dogBreed.filter(item => item.Gender === filterGender) : dogBreed;
                
                // กรองจาก Image Breed
                const imgBreed = dogGender.filter(item =>
                    item.Breed.toLowerCase().includes(predictedBreed.toLowerCase())
                );

                // กรอง Status
                const dogStatus = imgBreed.filter(item => item.Post_status === 1);
                setDogData(dogStatus);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchBreed, filterGender, predictedBreed]);

    // Fetch Data user_adopt_list
    const [dogEndPost, setDogEndPost] = useState([]);
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
                const filteredData = allData.sort(() => 0.5 - Math.random()).slice(0, 4);
                const dogData = filteredData.filter(item => item.Pet_type_id === 1);
                const postStatus = dogData.filter(item => item.List_pet_status === 1);
                setDogEndPost(postStatus);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = dogData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(dogData.length / itemsPerPage);
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
    const maxPageButtons = 6;
    const pageButtonsStart = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const pageButtonsEnd = Math.min(totalPages, pageButtonsStart + maxPageButtons - 1);
    const visiblePages = totalPagesArray.slice(pageButtonsStart - 1, pageButtonsEnd);

    const clearFilters = () => {
        setSearchBreed('');
        setFilterGender('');
        setIsModalOpen(false);
        setUploadedImage(null);
        setPredictedBreed('');
    };

    return (
        <div className="font-Sarabun">
            <Navbar/>
            <main className="py-[50px] bg-[#f1f5f9]">
                <div>
                    <div style={{ backgroundImage: `url(/img/hero6.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                        <div class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                            <div class="text-center">
                                <div class="container px-4 mx-auto">
                                    <div class="max-w-4xl mx-auto text-center">
                                        <motion.h2 class="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            Dog Adopt
                                        </motion.h2>
                                        <motion.p class="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; Dog Adopt
                                        </motion.p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <MiniMenu/>

                        <div className="max-w-7xl mx-auto px-4 mt-8 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        
                                        <div style={{ display: 'inline-flex' }}>
                                            <input type="text" className="border rounded mr-2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search Breed" value={searchBreed} onChange={(e) => setSearchBreed(e.target.value)}/>
                                            <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} className="border rounded py-2 px-2 text-xs">
                                                <option value="">เพศ</option>
                                                <option value="ชาย">ชาย</option>
                                                <option value="หญิง">หญิง</option>
                                                <option value="ชายหญิง">ชายหญิง</option>
                                            </select>
                                                {isModalOpen && (
                                                    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                                                        <div className="fixed inset-0 transition-opacity">
                                                            <div className="absolute inset-0 bg-black opacity-50"></div>
                                                        </div>
                                                        <div className="absolute flex items-center justify-center w-full h-full">
                                                            <FadingBalls color="#ffffff" width="127px" height="30px" />
                                                        </div>
                                                    </div>
                                                )}
                                                <label htmlFor="dropzone-file" className="mx-2 w-[65px] h-[33px] bg-[#ffffff] border-2 border-gray-300 border-dashed rounded cursor-pointer" style={{ overflow: 'hidden', position: 'relative' }}>
                                                    <div className="flex items-center justify-center">
                                                        {uploadedImage && (
                                                            <img id="uploaded-image" src={uploadedImage} alt="Uploaded Image" />
                                                        )}
                                                        {!uploadedImage && (
                                                            <svg className="w-4 h-4 mt-1.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <input name="image" id="dropzone-file" type="file" className="hidden" onChange={(e) => { handleImageUpload(e) }} />
                                                </label>
                                                <div className="mx-2 mt-0.5">
                                                    <i className="fa-solid fa-trash-can text-[15px] text-[#FF202B] cursor-pointer" onClick={clearFilters}></i>
                                                </div>
                                                
                                        </div>
                                            
                                    </div>
                                </div>
                                
                                {!UserId ? (
                                    null
                                ) : (
                                    <div className="relative flex-grow flex-1 text-right">
                                        <button onClick={linkUserAddPetAdopt} class="box-border z-30 inline-flex items-center justify-center w-auto px-6 py-2 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                                            <span class="relative z-20 flex items-center text-sm">
                                                <div className="text-[12px]">Add Post</div>
                                            </span>
                                        </button>
                                    </div>
                                )}  
                                
                            </div>
                        </div> 
                        
                        <div className="flex flex-wrap justify-center gap-4 py-2">
                        {dogData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-5">
                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[30px] py-8"></i>
                                <p className="text-[18px] mb-8 text-gray-500 dark:text-gray-400">Post not found . . .</p>
                            </div>
                        ) : (
                            currentPageData.map((row, index) => (
                                    <div key={index} className="p-2 cursor-pointer group" onClick={() => linkDogProfile(row.Pet_adopt_id)}>
                                        <div className="max-w-sm overflow-hidden bg-[#ffffff] inline-block">
                                            <div className="relative overflow-hidden">
                                                <span class="absolute mt-[110px] w-[400px] h-[400px] transition-all duration-100 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gradient-to-r from-[#e47600] to-[#aa1b28] opacity-50 group-hover:-rotate-180 ease"></span>
                                                <img className="w-[280px] h-[150px]" src={row.Image} alt="Pet Image" />
                                            </div>
                                            <div className="px-6 py-4">
                                                <div className="font-bold sm:text-[16px] text-[14px] mb-2">Name : {row.Pet_name}</div>
                                                <p className="text-gray-700 sm:text-[13px] text-[11px] py-1">
                                                    Breed : {row.Breed}
                                                </p>
                                                <p className="text-gray-700 sm:text-[13px] text-[11px]">
                                                    Gender : {row.Gender}
                                                </p>
                                            </div>
                                            <div className="px-6 pt-4 pb-2">
                                                {row.Vaccine !== "ไม่มี" && (
                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                                        {row.Vaccine}
                                                    </span>
                                                )}
                                                {row.Castrate == 2 && (
                                                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                                        ทำหมัน
                                                    </span>
                                                )}
                                                {row.Castrate == 1 && (
                                                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 sm:text-[13px] text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                                        ยังไม่ทำหมัน
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                                                    
                        {dogData.length === 0 ? (
                            null
                        ) : (
                            <div className="flex flex-wrap items-center justify-center py-5">
                                <nav className="isolate inline-flex rounded-md items-center space-x-3 text-[#5b616c]" aria-label="Pagination">
                                    <div className={`relative inline-flex items-center justify-center p-4 px-2 py-1.5 overflow-hidden font-medium transition text-[#5b616c] duration-300 ease-out rounded group ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#667eea] hover:text-[#ffffff] rounded'}`} 
                                        onClick={currentPage === 1 ? null : prevPage}
                                        style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}>
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#667eea] group-hover:translate-x-0 ease">
                                            <i className="fa-solid fa-arrow-left"></i>
                                        </span>
                                        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">Previous</span>
                                        <span className="relative invisible">Previous</span>
                                    </div>
                                    <div className="items-center space-x-6">
                                        {visiblePages.map((page) => (
                                            <span key={page} className={`font-semibold px-3 py-2 ${currentPage === page ? 'text-[#667eea]' : 'cursor-pointer hover:bg-[#667eea] hover:text-[#ffffff] rounded'}`} onClick={() => setCurrentPage(page)}>
                                                {page}
                                            </span>
                                        ))}
                                    </div>
                                    <div className={`relative inline-flex items-center justify-center p-4 px-3 py-1.5 overflow-hidden font-medium transition text-[#5b616c] duration-300 ease-out rounded group ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#667eea] hover:text-[#ffffff] rounded'}`} 
                                        onClick={currentPage === totalPages ? null : nextPage}
                                        style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}>
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#667eea] group-hover:translate-x-0 ease">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">Next</span>
                                        <span className="relative invisible">Next</span>
                                    </div>
                                </nav>
                            </div>
                        )}
                        
                        {dogEndPost.length === 0 ? (
                            null
                        ) : (
                            <div className="max-w-7xl mx-auto px-4 py-10 mt-8 sm:px-6 lg:px-8">
                                <div className="p-4 bg-white rounded-lg sm:p-8 bg-gradient-to-r from-[#39414c] to-[#161e28]">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="text-[14px] sm:text-[16px] font-bold leading-none text-gray-900 dark:text-white">Able to procure a house now</h5>
                                    </div>
                                    <div className="flow-root">
                                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                                {dogEndPost.map((row, index) => (
                                                    <li key={index} className="py-3 sm:py-4">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 sm:pr-2">
                                                                <img className="w-10 h-10 rounded-full" src={row.PetImage} alt="Pet Image"/>
                                                            </div>
                                                            <div className="flex-1 min-w-0 ms-4">
                                                                <p className="text-[14px] sm:text-[16px] font-medium text-gray-900 truncate dark:text-white">
                                                                    {row.Pet_name}
                                                                </p>
                                                                <p className="text-[10px] sm:text-[12px] text-gray-500 truncate dark:text-gray-400">
                                                                    ได้บ้านแล้ว
                                                                </p>
                                                            </div>
                                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                <img className="w-10 h-10 rounded-full " src={row.UserImage} alt="User Image"/>
                                                                <p className="text-[14px] sm:text-[16px] font-medium text-gray-900 truncate dark:text-white mx-3 sm:mx-7">
                                                                    {row.Name} {row.Surname}
                                                                </p>
                                                                <p className="text-[14px] sm:text-[16px] font-medium text-gray-900 truncate dark:text-white mx-3 sm:mx-10">
                                                                    {row.Adopt_date}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        

            </main>
            <Footer/>
        </div>
    )
}

export default DogAdopt
