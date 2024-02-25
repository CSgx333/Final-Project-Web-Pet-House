import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Cart() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const UserId = localStorage.getItem('UserId');
    const [shippingType, setShippingType] = useState("existing");
    const [paymentType, setPaymentType] = useState("creditCard");
    
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
    const linkTransport = () => {
        navigate('/Transport');
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
    const [cartDetails, setCartDetails] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/cart_details'
                );
                const filteredCartDetails = result.data.data.filter(
                    (cartDetail) => cartDetail.Cart_id === cartData.Cart_id
                );
                const cartStatus = filteredCartDetails.filter(item => item.Cart_status === 1);
                setCartDetails(cartStatus);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [cartData]);

    const [inputs, setInputs] = useState({});
    const [creditCard, setCreditCard] = useState({
        NameCard: '',
        CardNumber: '',
        Expiration: '',
        Security: '',
        Money: '',
    })
    const [addressData, setAddressData] = useState({
        House_id: '',
        Alley: '',
        District: '',
        County: '',
        Province: '',
        Postal_id: '',
    })

    // ตรวจสอบ Form
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        const isValid = Object.keys(formErrors).length === 0;
        setIsFormValid(isValid);
    }, [formErrors]);
    
    const validateForm = () => {
        const errors = {};
        if (!creditCard.NameCard) {
            errors.NameCard = "Name Card is required";
        }
        if (!creditCard.CardNumber || !/^\d{16}$/.test(creditCard.CardNumber)) {
            errors.CardNumber = "Card Number is required and must be 16 digits";
        }
        if (!creditCard.Expiration || !/^\d{2}\/\d{2}$/.test(creditCard.Expiration)) {
            errors.Expiration = "Expiration is required and must be in MM / YY format";
        }
        if (!creditCard.Security || !/^\d{3}$/.test(creditCard.Security)) {
            errors.Security = "Security is required and must be 3 digits";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateForm2 = () => {
        const errors = {};
        if (!creditCard.NameCard) {
            errors.NameCard = "Name Card is required";
        }
        if (!creditCard.CardNumber || !/^\d{16}$/.test(creditCard.CardNumber)) {
            errors.CardNumber = "Card Number is required and must be 16 digits";
        }
        if (!creditCard.Expiration || !/^\d{2}\/\d{2}$/.test(creditCard.Expiration)) {
            errors.Expiration = "Expiration is required and must be in MM / YY format";
        }
        if (!creditCard.Security || !/^\d{3}$/.test(creditCard.Security)) {
            errors.Security = "Security is required and must be 3 digits";
        }
        if (!addressData.House_id) {
            errors.House_id = "House_id is required";
        }
        if (!addressData.Alley) {
            errors.Alley = "Alley is required";
        }
        if (!addressData.District) {
            errors.District = "District is required";
        }
        if (!addressData.County) {
            errors.County = "County is required";
        }
        if (!addressData.Province) {
            errors.Province = "Province is required";
        }
        if (!addressData.Postal_id) {
            errors.Postal_id = "Postal_id is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateForm3 = () => {
        const errors = {};
        if (!addressData.House_id) {
            errors.House_id = "House_id is required";
        }
        if (!addressData.Alley) {
            errors.Alley = "Alley is required";
        }
        if (!addressData.District) {
            errors.District = "District is required";
        }
        if (!addressData.County) {
            errors.County = "County is required";
        }
        if (!addressData.Province) {
            errors.Province = "Province is required";
        }
        if (!addressData.Postal_id) {
            errors.Postal_id = "Postal_id is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const totalPrice = cartDetails.reduce((total, row) => total + row.Total_price, 0);
    const [hasExistingAddress, setHasExistingAddress] = useState(true);

    // Fetch Data user_account
    const [userData, setUser] = useState([]);
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
    
    // Insert Data to Database
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmResult = await Swal.fire({
            title: 'Do you insist on payment ?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });
    
        if (confirmResult.isConfirmed) {
            const shopPostCheck = await axios.get('http://localhost:5000/shop_post');
            const shopPostData = shopPostCheck.data.data;
        
            const isQuantitySufficient = cartDetails.every((item) => {
                const correspondingShopPost = shopPostData.find(
                    (shopPost) => shopPost.Shop_post_id === item.Shop_post_id
                );
                return correspondingShopPost && correspondingShopPost.Product_quantity >= item.Quantity;
            });
            if (!isQuantitySufficient) {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: 'There is not enough product for the quantity you selected',
                });
                return;
            }
            const updateData = cartDetails.map((item) => {
                const correspondingShopPost = shopPostData.find(
                    (shopPost) => shopPost.Shop_post_id === item.Shop_post_id
                );
                if (correspondingShopPost) {
                    const updatedProductQuantity = correspondingShopPost.Product_quantity - item.Quantity;
                    return {
                        ProductQuantity: updatedProductQuantity,
                        ShopPostId: item.Shop_post_id,
                    };
                }
                return null;
            }).filter(Boolean);

            const updateCartDetails = cartDetails.map((item) => ({
                CartStatus: 2,
                CartDetailsId: item.Cart_Details_id,
            }));
            
            if (paymentType == "creditCard"){
                if (shippingType === "existing") {
                    if (validateForm()) {
                        axios.post('http://localhost:5000/update_quantity', { updateData })
                        axios.post('http://localhost:5000/update_cart_details', { updateCartDetails })
                        const swal1 = Swal.fire({
                            title: 'Success',
                            text: 'Your data has been saved successfully!',
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
                    }
                } else {
                    if (validateForm2()) {
                        axios.post('http://localhost:5000/update_quantity', { updateData })
                        axios.post('http://localhost:5000/update_cart_details', { updateCartDetails })
                        const swal1 = Swal.fire({
                            title: 'Success',
                            text: 'Your data has been saved successfully !',
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
                    }
                }
            } else {
                if (shippingType === "existing") {
                    const response = await axios.post('http://localhost:5000/generateQR', {
                        Money: parseFloat(totalPrice),
                        page: 2
                    });
                    setQrCodeUrl(response.data.Result);
                    document.body.style.overflow = 'hidden';
                } else {
                    if (validateForm3()) {
                        const response = await axios.post('http://localhost:5000/generateQR', {
                            Money: parseFloat(totalPrice),
                            page: 2
                        });
                        setQrCodeUrl(response.data.Result);
                        document.body.style.overflow = 'hidden';
                    }
                }
            }
        }
    };

    const closeModal = async () => {
        const shopPostCheck = await axios.get('http://localhost:5000/shop_post');
        const shopPostData = shopPostCheck.data.data;
        
        const isQuantitySufficient = cartDetails.every((item) => {
            const correspondingShopPost = shopPostData.find(
                (shopPost) => shopPost.Shop_post_id === item.Shop_post_id
            );
            return correspondingShopPost && correspondingShopPost.Product_quantity >= item.Quantity;
        });
        if (!isQuantitySufficient) {
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'There is not enough product for the quantity you selected',
            });
            return;
        }
        const updateData = cartDetails.map((item) => {
            const correspondingShopPost = shopPostData.find(
                (shopPost) => shopPost.Shop_post_id === item.Shop_post_id
            );
            if (correspondingShopPost) {
                const updatedProductQuantity = correspondingShopPost.Product_quantity - item.Quantity;
                return {
                    ProductQuantity: updatedProductQuantity,
                    ShopPostId: item.Shop_post_id,
                };
            }
            return null;
        }).filter(Boolean);

        const updateCartDetails = cartDetails.map((item) => ({
            CartStatus: 2,
            CartDetailsId: item.Cart_Details_id,
        }));

        axios.post('http://localhost:5000/update_quantity', { updateData })
        axios.post('http://localhost:5000/update_cart_details', { updateCartDetails })
        const swal1 = Swal.fire({
            title: 'Success',
            text: 'Your data has been saved successfully !',
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
        setQrCodeUrl('');
        document.body.style.overflow = 'auto';
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = cartDetails.slice(startIndex, endIndex);
    const totalPages = Math.ceil(cartDetails.length / itemsPerPage);
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

    return (
        <>
            {authenticated && (
                <div className="font-Sarabun">
                    <Navbar/>
                    <main className="py-[50px] bg-[#f1f5f9]">

                        <div>
                            <div style={{ backgroundImage: `url(/img/hero13.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                                <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                                    <div className="text-center">
                                        <div className="container px-4 mx-auto">
                                            <div className="max-w-4xl mx-auto text-center">
                                                <motion.h2 className="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                                    initial={{ opacity: 0, y: 50 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    Checkout
                                                </motion.h2>
                                                <motion.p className="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; Checkout
                                                </motion.p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <MiniMenu/>

                            <>
                                {qrCodeUrl && (
                                    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                                        <div className="fixed inset-0 transition-opacity">
                                            <div className="absolute inset-0 bg-black opacity-50"></div>
                                        </div>
                                        <div className="bg-white p-5 rounded shadow-lg max-w-[380px] w-full z-50">
                                            <div className="flex items-center justify-between text-[20px]">
                                                <div></div>
                                                <i className="fa-solid fa-xmark text-gray-500 hover:text-gray-700 cursor-pointer" onClick={closeModal}></i>
                                            </div>
                                            <div className="flex items-center justify-center font-bold mt-[35px] text-[18px] text-[#303030]">Scan with your bank app</div>
                                            <div className="flex items-center justify-center font-bold text-[18px] text-[#303030]">or payment app</div>
                                            <div className="flex items-center justify-center my-4">
                                                <div className="bg-[#003d6a] p-3 rounded-lg">
                                                    <div>
                                                        <img src={qrCodeUrl} alt="Generated QR Code" className="rounded-lg" id="imgqr" />
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <img src="/img/promptPay.png" alt="promptPay" className="h-4 mt-3 mb-2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center mt-1 text-[10px] text-[#a3a3a3]">PromptPay is supported by bank apps and</div>
                                            <div className="flex items-center justify-center text-[10px] text-[#a3a3a3]">payment apps such as KBank, SCB, Bangkok</div>
                                            <div className="flex items-center justify-center text-[10px] text-[#a3a3a3]">Bank, Krunthai Bank and Krungsri.</div>
                                            <div className="flex items-center justify-center mb-4">
                                                <img src="/img/Bank.png" alt="Bank" style={{ transform: 'scale(0.35)' }} />
                                            </div>
                                        </div>
                                    </div>                    
                                )}

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
                                                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                                                        2
                                                    </div>
                                                    <span className="font-semibold text-gray-900">Checkout</span>
                                                    </li>
                                                    <li className="flex items-center space-x-3 text-left sm:space-x-4" onClick={linkTransport}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white cursor-pointer">
                                                        3
                                                    </div>
                                                    <span className="font-semibold text-gray-500">Transport</span>
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                                    <div class="px-4 pt-8">
                                        <p class="text-xl font-medium">Order Summary</p>
                                        <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
                                        <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                        {cartDetails.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-5">
                                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[30px] py-8"></i>
                                                <p className="text-[18px] mb-8 text-gray-500 dark:text-gray-400">There are no products yet . . .</p>
                                            </div>
                                        ) : (
                                            currentPageData.map((row, index) => (
                                                <div key={index} className={`flex ${cartDetails.length > 0 ? 'flex-col-mobile' : 'flex-row'} rounded-lg bg-white sm:flex-row`}>
                                                    <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={row.Product_Image} alt="Product Image" />
                                                    <div className="flex w-full flex-col px-4 py-4">
                                                        <span className="font-semibold">{row.Product_name}</span>
                                                        <span className={`float-${cartDetails.length > 0 ? 'left' : 'right'} text-gray-400`}>Quantity : {row.Quantity}</span>
                                                        <p className="text-lg font-bold">{row.Total_price} ฿</p>
                                                    </div>
                                                    <i onClick={() => handleDelete(row.Cart_Details_id)} className="fa-solid fa-xmark text-gray-400 text-[20px] mr-5 flex items-center justify-center cursor-pointer"></i>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {cartDetails.length === 0 ? (
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

                                        <p class="mt-8 text-lg font-medium">Shipping</p>
                                        <form class="mt-5 grid gap-6">
                                            <div class="relative" onClick={() => {setHasExistingAddress(true), setShippingType("existing")}}>
                                                <input class="peer hidden" id="radio_1" type="radio" name="radio" checked={hasExistingAddress} />
                                                <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white cursor-pointer"></span>
                                                <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                                                    <img class="w-14 object-contain" src="/img/Shipping1.png" alt="Shipping" />
                                                    <div class="ml-5">
                                                        <span class="mt-2 font-semibold">Existing Address</span>
                                                        <p class="text-slate-500 text-sm leading-6">{userData.House_id}
                                                            {userData.Alley} {userData.District} {userData.County} {userData.Province} {userData.Postal_id}</p>
                                                    </div>
                                                </label>
                                            </div>

                                            <div class="relative" onClick={() => {setHasExistingAddress(false), setShippingType("newAddress")}}>
                                                <input class="peer hidden" id="radio_2" type="radio" name="radio" checked={!hasExistingAddress} />
                                                <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white cursor-pointer"></span>
                                                <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                                                    <img class="w-14 object-contain" src="/img/Shipping2.png" alt="Shipping" />
                                                    <div class="ml-5">
                                                        <span class="mt-2 font-semibold">Add New Address</span>
                                                        <p class="text-slate-500 text-sm leading-6">( add another address )</p>
                                                    </div>
                                                </label>
                                            </div>
                                            
                                            {hasExistingAddress === false && (
                                                <div className="my-6">
                                                    <div class="mb-3 -mx-2 flex items-end">
                                                        <div class="px-2 w-2/3">
                                                            <label class="font-bold text-sm mb-2 ml-1">House No</label>
                                                            <div>
                                                                <input onChange={e => setAddressData({...addressData, House_id: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="House No" type="text"/>
                                                            </div>
                                                            {formErrors.House_id && (
                                                                <p className="text-red-500 text-xs">{formErrors.House_id}</p>
                                                            )}
                                                        </div>
                                                        <div className="px-2 w-2/3">
                                                            <label className="font-bold text-sm mb-2 ml-1">Alley</label>
                                                            <div>
                                                                <input onChange={e => setAddressData({...addressData, Alley: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Alley" type="text"/>
                                                            </div>
                                                            {formErrors.Alley && (
                                                                <p className="text-red-500 text-xs">{formErrors.Alley}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 -mx-2 flex items-end">
                                                        <div class="px-2 w-2/3">
                                                            <label class="font-bold text-sm mb-2 ml-1">District</label>
                                                            <div>
                                                                <input onChange={e => setAddressData({...addressData, District: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="District" type="text"/>
                                                            </div>
                                                            {formErrors.District && (
                                                                <p className="text-red-500 text-xs">{formErrors.District}</p>
                                                            )}
                                                        </div>
                                                        <div className="px-2 w-2/3">
                                                            <label className="font-bold text-sm mb-2 ml-1">County</label>
                                                            <div>
                                                                <input onChange={e => setAddressData({...addressData, County: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="County" type="text"/>
                                                            </div>
                                                            {formErrors.County && (
                                                                <p className="text-red-500 text-xs">{formErrors.County}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 -mx-2 flex items-end">
                                                        <div class="px-2 w-2/3">
                                                            <label class="font-bold text-sm mb-2 ml-1">Province</label>
                                                            <div>
                                                                <input onChange={e => setAddressData({...addressData, Province: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Province" type="text"/>
                                                            </div>
                                                            {formErrors.Province && (
                                                                <p className="text-red-500 text-xs">{formErrors.Province}</p>
                                                            )}
                                                        </div>
                                                        <div className="px-2 w-2/3">
                                                            <label className="font-bold text-sm mb-2 ml-1">Postal Code</label>
                                                            <div>
                                                                <input onChange={e => setAddressData({...addressData, Postal_id: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Postal Code" type="text"/>
                                                            </div>
                                                            {formErrors.Postal_id && (
                                                                <p className="text-red-500 text-xs">{formErrors.Postal_id}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                        </form>
                                    </div>
                                    
                                    <form onSubmit={handleSubmit}>
                                        <div class="mt-10 px-4 pt-8 lg:mt-0">
                                            <p class="text-xl font-medium">Payment Details</p>
                                            <p class="text-gray-400">Complete your order by providing your payment details.</p>
                                            <div className="my-3 flex -mx-2">
                                                <div className="px-2">
                                                    <label for="type1" className="flex items-center cursor-pointer">
                                                        <input type="radio" className="form-radio h-5 w-5" name="type" id="type1" onClick={() => setPaymentType("creditCard")} checked={paymentType === "creditCard"}/>
                                                        <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" alt="Card"/>
                                                    </label>
                                                </div>
                                                <div className="px-2">
                                                    <label for="type3" className="flex items-center cursor-pointer">
                                                        <input type="radio" className="form-radio h-5 w-5" name="type" id="type3" onClick={() => setPaymentType("promptPay")} checked={paymentType === "promptPay"}/>
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png" class="h-8 ml-3" alt="Prompt Pay"/>
                                                    </label>
                                                </div>
                                            </div>
                                            {paymentType === "creditCard" ? (
                                                <div className="my-6">
                                                    <div className="mb-3">
                                                        <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                                                        <div>
                                                            <input onChange={e => setCreditCard({...creditCard, NameCard: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Name" type="text"/>
                                                        </div>
                                                        {formErrors.NameCard && (
                                                            <p className="text-red-500 text-xs">{formErrors.NameCard}</p>
                                                        )}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                                                        <div>
                                                            <input onChange={e => setCreditCard({...creditCard, CardNumber: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="xxxx xxxx xxxx xxxx" type="text"/>
                                                        </div>
                                                        {formErrors.CardNumber && (
                                                            <p className="text-red-500 text-xs">{formErrors.CardNumber}</p>
                                                        )}
                                                    </div>
                                                    <div class="mb-3 -mx-2 flex items-end">
                                                        <div class="px-2 w-2/3">
                                                            <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
                                                            <div>
                                                                <input onChange={e => setCreditCard({...creditCard, Expiration: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="MM / YY" type="text"/>
                                                            </div>
                                                            {formErrors.Expiration && (
                                                                <p className="text-red-500 text-xs">{formErrors.Expiration}</p>
                                                            )}
                                                        </div>
                                                        <div className="px-2 w-2/3">
                                                            <label className="font-bold text-sm mb-2 ml-1">Security</label>
                                                            <div>
                                                                <input onChange={e => setCreditCard({...creditCard, Security: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="CVC" type="text"/>
                                                            </div>
                                                            {formErrors.Security && (
                                                                <p className="text-red-500 text-xs">{formErrors.Security}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                null
                                            )}
                                            <div class="mt-6 border-t border-b py-2">
                                                <div class="flex items-center justify-between">
                                                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                                                <p class="font-semibold text-gray-900">{totalPrice.toFixed(2)} ฿</p>
                                                </div>
                                                <div class="flex items-center justify-between">
                                                <p class="text-sm font-medium text-gray-900">Shipping</p>
                                                <p class="font-semibold text-[#2dc089]">FREE</p>
                                                </div>
                                            </div>
                                            <div class="mt-6 flex items-center justify-between">
                                                <p class="text-sm font-medium text-gray-900">Total</p>
                                                <p class="text-2xl font-semibold text-gray-900">{totalPrice.toFixed(2)} ฿</p>
                                            </div>
                                            {cartDetails.length !== 0 && (
                                                <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-800 focus:shadow-outline focus:outline-none">Checkout</button>
                                            )}
                                        </div>
                                    </form>
                                    
                                </div>

                            </>

                        </main>
                    <Footer/>
                </div>
            )}
        </>
    );
};

export default Cart;