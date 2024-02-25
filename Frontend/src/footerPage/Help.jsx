import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Help() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const UserId = localStorage.getItem('UserId');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputs, setInputs] = useState({
        AccountId: UserId,
        TopicName: '',
        HelpDetails: '',
        HelpImage: ''
    })

    // แสดงรูปช่อง Upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            const fileName = file.name;
            const imagePath = `/img/pet/${fileName}`;
            setInputs({ ...inputs, HelpImage: imagePath });
        }
    };

    // ตรวจสอบ Form
    const validateForm = () => {
        const errors = {};
        if (!inputs.TopicName) {
            errors.TopicName = "Topic name is required";
        }
        if (!inputs.HelpDetails) {
            errors.HelpDetails = "Details is required";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    // Insert Data to Database
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:5000/add_help_post', inputs)
            const swal1 = Swal.fire({
                title: 'Success',
                text: 'Your data has been saved successfully !',
                icon: 'success',
            });
            setTimeout(() => {
                swal1.close();
                window.location.reload();
                window.scrollTo(0, 0);
            }, 700);
        }
    };

    useEffect(() => {
        const UserId = localStorage.getItem('UserId');
        if (!UserId) {
            navigate('/login');
            window.scrollTo(0, 0);
        } else {
            setAuthenticated(true);
        }
    }, [navigate]);

    return (
        <>
            {authenticated && (
                <div className="font-Sarabun">
                    <Navbar/>
                    <main className="py-[50px] bg-[#f1f5f9]">
                        <div>
                            <div style={{ backgroundImage: `url(/img/hero11.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                                <div class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                                    <div class="text-center">
                                        <div class="container px-4 mx-auto">
                                            <div class="max-w-4xl mx-auto text-center">
                                                <motion.h2 class="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                                    initial={{ opacity: 0, y: 50 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >  
                                                    Help
                                                </motion.h2>
                                                <motion.p class="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; Help
                                                </motion.p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <MiniMenu/>

                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                            <div className="px-4 sm:px-0">
                                <div className="border rounded-lg py-4 bg-[#f7fbff]">
                                    <form className="px-5 py-5" onSubmit={handleSubmit}>
                                        <div className="md:flex mb-6">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                                    Topic Name
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <input name="Topic_Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                                onChange={e => setInputs({...inputs, TopicName: e.target.value})}/>
                                                {formErrors.TopicName && (
                                                    <p className="text-red-500 text-xs">{formErrors.TopicName}</p>
                                                )}
                                            </div>
                                        </div>
                                            <div className="md:flex mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                                        Details
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <textarea onChange={e => setInputs({...inputs, HelpDetails: e.target.value})} name="Details" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder=". . ." rows="8"></textarea>
                                                    {formErrors.HelpDetails && (
                                                        <p className="text-red-500 text-xs">{formErrors.HelpDetails}</p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                        <div className="md:flex mb-6">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                                    Image
                                                </label>
                                            </div>
                                            <div className="md:w-2/3 bg-[#ffffff]">
                                                <div className="flex items-center justify-center w-full">
                                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer" style={{ overflow: 'hidden', position: 'relative' }}>
                                                        {uploadedImage && (                                
                                                            <div>
                                                                <img id="uploaded-image" src={uploadedImage} alt="Uploaded Image" className="absolute inset-0 w-full h-full object-cover"/>
                                                            </div>
                                                        )}
                                                        
                                                        {!uploadedImage && (
                                                            <div className="flex flex-col items-center justify-center">
                                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">Uploading pictures will help us better investigate the issue.</p>
                                                            </div>
                                                        )}
                                                        <input name="image" id="dropzone-file" type="file" className="hidden" onChange={(e) => {
                                                            handleImageUpload(e);
                                                        }} />
                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                            <div className="md:flex md:items-center">
                                                <div className="md:w-1/3"></div>
                                                <div className="md:w-2/3">
                                                    <button type="submit" value="Submit" className="shadow bg-[#007bff] hover:bg-[#0069d9] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                            
                                    </form>
                                </div>
                            </div>
                        </div>

                    </main>
                    <Footer/>
                </div>
            )}
        </>
    )
}

export default Help
