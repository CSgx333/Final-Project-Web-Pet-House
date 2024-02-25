import React, { useState, useEffect, useRef } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Product() {
    const UserId = localStorage.getItem('UserId');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [filterProductType, setFilterProductType] = useState('');
    const [productQuantities, setProductQuantities] = useState({});
    const itemsPerPage = 12;

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

    // Fetch Data product_type
    const [typeData, setTypeData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/product_type');
                const allData = result.data.data;
                setTypeData(allData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Fetch Data shop_post
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/shop_post');
                const allData = result.data.data;

                // กรองจาก Product Name
                const productName = allData.filter(item =>
                    item.Product_name.toLowerCase().includes(searchName.toLowerCase())
                );

                // กรองประเภทสินค้า
                const productType = filterProductType ? productName.filter(item => item.Product_type_id === parseInt(filterProductType)) : productName;
                
                // กรอง Status
                const postStatus = productType.filter(item => item.Post_status === 1);

                setProductData(postStatus);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchName, filterProductType]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = productData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(productData.length / itemsPerPage);
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
        setSearchName('');
        setFilterProductType('');
    };

    // Insert Data to Database
    const [inputs, setInputs] = useState({});
    const handleAddToCart = (row, quantity) => {
        if (quantity === 0) {
            return;
        } else {
            const TotalPrice = quantity * row.Price;
            axios.post('http://localhost:5000/add_cart_details', { ...inputs,
                CartID: cartData.Cart_id,
                ShopPostId: row.Shop_post_id,
                Quantity: quantity,
                TotalPrice: TotalPrice
            })
            const swal1 = Swal.fire({
                title: 'Success',
                text: 'Product added to cart successfully !',
                icon: 'success',
            });
            setTimeout(() => {
                swal1.close();
            }, 700);
            swal1.then(() => {
                window.location.reload();
            })
        }
    }

    return (
        <div className="font-Sarabun">
            <Navbar/>
            <main className="py-[50px] bg-[#f1f5f9]">
                <div>
                    <div style={{ backgroundImage: `url(/img/hero12.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                        <div class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                            <div class="text-center">
                                <div class="container px-4 mx-auto">
                                    <div class="max-w-4xl mx-auto text-center">
                                        <motion.h2 class="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            Pet Product
                                        </motion.h2>
                                        <motion.p class="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; Pet Product
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
                                            <input type="text" className="border rounded mr-2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search Name" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
                                            <select value={filterProductType} onChange={(e) => setFilterProductType(e.target.value)} className="border rounded mx-2 py-2 px-2 text-xs">
                                                <option value="">สินค้า</option>
                                                {typeData.map((type, index) => (
                                                    <option key={index} value={type.Product_type_id}>
                                                        {type.Product_type_name}{type.Pet_type_name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="mx-4 mt-0.5">
                                                <i className="fa-solid fa-trash-can text-[15px] text-[#FF202B] cursor-pointer" onClick={clearFilters}></i>
                                            </div>                                   
                                        </div>
                                            
                                    </div>
                                </div>
                                
                            </div>
                        </div> 
                        
                        <div className="flex flex-wrap justify-center gap-2 py-2">
                        {productData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-5">
                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[30px] py-8"></i>
                                <p className="text-[18px] mb-8 text-gray-500 dark:text-gray-400">Post not found . . .</p>
                            </div>
                        ) : (
                                currentPageData.map((row, index) => (
                                    <div key={index} className="p-2 sm:w-1/5">
                                            <div className="max-w-sm overflow-hidden bg-[#ffffff] inline-block">
                                                <img className="w-[270px] h-[270px]" src={row.Product_Image} alt="Pet Image" />
                                                <div className="px-6 py-4">
                                                    <div className="font-bold sm:text-[16px] text-[14px] mb-2 max-w-[225px] overflow-hidden whitespace-nowrap overflow-ellipsis">Name : {row.Product_name}</div>
                                                    <p className="text-gray-700 sm:text-[13px] text-[11px] py-1 block max-w-[225px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                                                        Details : {row.Product_details}
                                                    </p>
                                                    <p className="flex items-center justify-center text-[20px] my-4">{row.Price} ฿</p>
                                                    {row.Product_quantity === 0 ? (
                                                        <p className="text-red-500 flex items-center justify-center my-3">สินค้าหมด</p>
                                                    ) : (
                                                        <>
                                                            <div className="flex items-center justify-center text-red-500 text-[12px] mb-3">Quantity : {row.Product_quantity}</div>
                                                            <form className="flex items-center justify-center">
                                                                <div className="relative flex items-center max-w-[8rem] mx-auto">
                                                                <button
                                                                    type="button"
                                                                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-9 focus:ring-gray-100 focus:outline-none flex items-center justify-center"
                                                                    onClick={() => {
                                                                    setProductQuantities((prevQuantities) => ({
                                                                        ...prevQuantities,
                                                                        [row.Shop_post_id]: Math.max(
                                                                        (prevQuantities[row.Shop_post_id] || 0) - 1,
                                                                        0
                                                                        ),
                                                                    }));
                                                                    }}
                                                                >
                                                                    <div className="text-gray-700 font-bold">-</div>
                                                                </button>
                                                                <input
                                                                    type="text"
                                                                    className="bg-gray-50 border border-gray-300 h-9 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 placeholder-gray-500"
                                                                    value={productQuantities[row.Shop_post_id] || 0}
                                                                    onChange={(e) => {
                                                                        const value = parseInt(e.target.value, 10);
                                                                        if (!isNaN(value) && value >= 0 && value <= 10) {
                                                                        setProductQuantities((prevQuantities) => ({
                                                                            ...prevQuantities,
                                                                            [row.Shop_post_id]: value,
                                                                        }));
                                                                        }
                                                                    }}
                                                                    required
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-9 focus:ring-gray-100 focus:outline-none flex items-center justify-center"
                                                                    onClick={() => {
                                                                    setProductQuantities((prevQuantities) => ({
                                                                        ...prevQuantities,
                                                                        [row.Shop_post_id]: Math.min(
                                                                        (prevQuantities[row.Shop_post_id] || 0) + 1,
                                                                        10
                                                                        ),
                                                                    }));
                                                                    }}
                                                                >
                                                                    <div className="text-gray-700 font-bold">+</div>
                                                                </button>
                                                                </div>
                                                            </form>
                                                            {UserId ? (
                                                                <div className="flex items-center justify-center mt-5 mb-2">
                                                                    <div onClick={() => handleAddToCart(row, productQuantities[row.Shop_post_id] ?? 0)} class="cursor-pointer text-[12px] inline-flex overflow-hidden text-white bg-gray-900 rounded group">
                                                                        <span class="px-3.5 py-2 text-white bg-yellow-500 group-hover:bg-orange-400 flex items-center justify-center">
                                                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                                                        </span>
                                                                        <span class="pl-4 pr-5 py-2.5">ADD TO CART</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                null
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                
                            )}
                        </div>
                                                    
                        {productData.length === 0 ? (
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
                    
            </main>
            <Footer/>
        </div>
    )
}

export default Product
