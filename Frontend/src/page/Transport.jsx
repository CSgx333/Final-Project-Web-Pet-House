import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Transport() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const UserId = localStorage.getItem('UserId');
    
    useEffect(() => {
        const UserId = localStorage.getItem('UserId');
        if (UserId) {
            setAuthenticated(true);
        } else {
            navigate('/Login');
            window.scrollTo(0, 0);
        }
    }, [navigate]);

    const linkProduct = () => {
        navigate('/Product');
        window.scrollTo(0, 0);
    }
    const linkCart = () => {
        navigate('/Cart');
        window.scrollTo(0, 0);
    }

    // Fetch Data cart
    const [cartData, setCart] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/cart'
                );
                const currentCart = result.data.data.find(user => user.Account_id === parseInt(UserId));
                setCart(currentCart);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Fetch Data cart_details
    const [cartDetails2, setCartDetails2] = useState([]);
    const [cartDetails3, setCartDetails3] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/cart_details'
                );
                const filteredCartDetails = result.data.data.filter(
                    (cartDetail) => cartDetail.Cart_id === cartData.Cart_id
                );
                const cartStatus2 = filteredCartDetails.filter(item => item.Cart_status === 2);
                const cartStatus3 = filteredCartDetails.filter(item => item.Cart_status === 3);
                setCartDetails2(cartStatus2);
                setCartDetails3(cartStatus3);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [cartData]);

    const handleDelete = (CartDetailsId) => {
        Swal.fire({
            title: 'Are you sure ?',
            text: 'You won\'t be able to revert this !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    CartDetailsId: CartDetailsId
                };
                axios.delete('http://localhost:5000/cart_details', { data: data })
                const swal1 = Swal.fire({
                    title: 'Success',
                    text: 'Your data has been successfully deleted!',
                    icon: 'success',
                });
                setTimeout(() => {
                    swal1.close();
                }, 700);
                swal1.then(() => {
                    window.location.reload();
                })
            }
        });
    };

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = cartDetails2.slice(startIndex, endIndex);
    const totalPages = Math.ceil(cartDetails2.length / itemsPerPage);
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


    const [currentPage2, setCurrentPage2] = useState(1);
    const startIndex2 = (currentPage2 - 1) * itemsPerPage;
    const endIndex2 = startIndex2 + itemsPerPage;
    const currentPageData2 = cartDetails3.slice(startIndex2, endIndex2);
    const totalPages2 = Math.ceil(cartDetails3.length / itemsPerPage);
    const nextPage2 = () => {
        setCurrentPage2((prevPage) => prevPage + 1);
    };
    const prevPage2 = () => {
        setCurrentPage2((prevPage) => prevPage - 1);
    };
    const totalPagesArray2 = Array.from({ length: totalPages2 }, (_, index) => index + 1);
    const pageButtonsStart2 = Math.max(1, currentPage2 - Math.floor(maxPageButtons / 2));
    const pageButtonsEnd2 = Math.min(totalPages2, pageButtonsStart2 + maxPageButtons - 1);
    const visiblePages2 = totalPagesArray2.slice(pageButtonsStart2 - 1, pageButtonsEnd2);

    return (
        <>
            {authenticated && (
                <div className="font-Sarabun">
                    <Navbar/>
                    <main className="py-[50px] bg-[#f1f5f9]">

                        <div>
                            <div style={{ backgroundImage: `url(/img/hero14.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                                <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                                    <div className="text-center">
                                        <div className="container px-4 mx-auto">
                                            <div className="max-w-4xl mx-auto text-center">
                                                <motion.h2 className="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                                    initial={{ opacity: 0, y: 50 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    Transport
                                                </motion.h2>
                                                <motion.p className="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; Checkout &nbsp;&nbsp;&gt;&nbsp;&nbsp; Transport
                                                </motion.p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <MiniMenu/>

                            <>

                                <div class="flex flex-col items-center border-b py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                                    <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                                        <div class="relative">
                                            <nav>
                                                <ol className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                                    <li className="flex items-center space-x-3 text-left sm:space-x-4" onClick={linkProduct}>
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white cursor-pointer">
                                                            1
                                                        </div>
                                                        <span className="font-semibold text-gray-500">Shop</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3 text-left sm:space-x-4" onClick={linkCart}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white cursor-pointer">
                                                            2
                                                        </div>
                                                        <span className="font-semibold text-gray-500">Checkout</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                                                            3
                                                        </div>
                                                        <span className="font-semibold text-gray-900">Transport</span>
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">

                                    <div class="px-4 pt-8">
                                        <p class="text-xl font-medium">Transport List</p>
                                        <p class="text-gray-400">List of goods being transported</p>
                                        <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                            {cartDetails2.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center py-5">
                                                    <i class="fa-regular fa-circle-xmark text-gray-500 text-[30px] py-8"></i>
                                                    <p className="text-[18px] mb-8 text-gray-500 dark:text-gray-400">There are no products yet . . .</p>
                                                </div>
                                            ) : (
                                                currentPageData.map((row, index) => (
                                                    <div key={index} className={`flex ${cartDetails2.length > 0 ? 'flex-col-mobile' : 'flex-row'} rounded-lg bg-white sm:flex-row`}>
                                                        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={row.Product_Image} alt="Product Image" />
                                                        <div className="flex w-full flex-col px-4 py-4">
                                                            <span className="font-semibold">{row.Product_name}</span>
                                                            <span className={`float-${cartDetails2.length > 0 ? 'left' : 'right'} text-gray-400`}>Quantity : {row.Quantity}</span>
                                                            <p className="text-lg font-bold">{row.Total_price} ฿</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {cartDetails2.length === 0 ? (
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

                                    </div>

                                    <div class="px-4 pt-8">
                                        <p class="text-xl font-medium">Received List</p>
                                        <p class="text-gray-400">List of products that have been shipped</p>
                                        <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                            {cartDetails3.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center py-5">
                                                    <i class="fa-regular fa-circle-xmark text-gray-500 text-[30px] py-8"></i>
                                                    <p className="text-[18px] mb-8 text-gray-500 dark:text-gray-400">There are no products yet . . .</p>
                                                </div>
                                            ) : (
                                                currentPageData2.map((row, index) => (
                                                    <div key={index} className={`flex ${cartDetails3.length > 0 ? 'flex-col-mobile' : 'flex-row'} rounded-lg bg-white sm:flex-row`}>
                                                        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={row.Product_Image} alt="Product Image" />
                                                        <div className="flex w-full flex-col px-4 py-4">
                                                            <span className="font-semibold">{row.Product_name}</span>
                                                            <span className={`float-${cartDetails3.length > 0 ? 'left' : 'right'} text-gray-400`}>Quantity : {row.Quantity}</span>
                                                            <p className="text-lg font-bold">{row.Total_price} ฿</p>
                                                        </div>
                                                        <i onClick={() => handleDelete(row.Cart_Details_id)} className="fa-solid fa-xmark text-gray-400 text-[20px] mr-5 flex items-center justify-center cursor-pointer"></i>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {cartDetails3.length === 0 ? (
                                            null
                                        ) : (
                                            <div className="flex flex-wrap items-center justify-center py-5">
                                                <nav className="isolate inline-flex rounded-md items-center space-x-3 text-[#5b616c]" aria-label="Pagination">
                                                    <div className={`relative inline-flex items-center justify-center p-4 px-2 py-1.5 overflow-hidden font-medium transition text-[#5b616c] duration-300 ease-out rounded group ${currentPage2 === 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#667eea] hover:text-[#ffffff] rounded'}`} 
                                                        onClick={currentPage2 === 1 ? null : prevPage2}
                                                        style={{ pointerEvents: currentPage2 === 1 ? 'none' : 'auto' }}>
                                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#667eea] group-hover:translate-x-0 ease">
                                                            <i className="fa-solid fa-arrow-left"></i>
                                                        </span>
                                                        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">Previous</span>
                                                        <span className="relative invisible">Previous</span>
                                                    </div>
                                                    <div className="items-center space-x-6">
                                                        {visiblePages2.map((page) => (
                                                            <span key={page} className={`font-semibold px-3 py-2 ${currentPage2 === page ? 'text-[#667eea]' : 'cursor-pointer hover:bg-[#667eea] hover:text-[#ffffff] rounded'}`} onClick={() => setCurrentPage2(page)}>
                                                                {page}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className={`relative inline-flex items-center justify-center p-4 px-3 py-1.5 overflow-hidden font-medium transition text-[#5b616c] duration-300 ease-out rounded group ${currentPage2 === totalPages2 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#667eea] hover:text-[#ffffff] rounded'}`} 
                                                        onClick={currentPage2 === totalPages2 ? null : nextPage2}
                                                        style={{ pointerEvents: currentPage2 === totalPages2 ? 'none' : 'auto' }}>
                                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#667eea] group-hover:translate-x-0 ease">
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </span>
                                                        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">Next</span>
                                                        <span className="relative invisible">Next</span>
                                                    </div>
                                                </nav>
                                            </div>
                                        )}

                                    </div>

                                </div>

                            </>

                        </main>
                    <Footer/>
                </div>
            )}
        </>
    );
};

export default Transport;