import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ChatRoom from '../chat/ChatRoom.jsx';

function Navbar() {
    const UserId = localStorage.getItem('UserId');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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
                setCartDetails(cartStatus.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [cartData]);

    const [petDeliveryCount, setPetDeliveryCount] = useState([]);
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
                const accountData1 = postStatus.filter(item => item.OwnerId === parseInt(UserId));

                setPetDeliveryCount(accountData1.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

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

    const linkLogin = () => {
        navigate('/Login');
        window.scrollTo(0, 0);
    }
    const linkProfile = () => {
        navigate('/Profile');
        window.scrollTo(0, 0);
    }
    const linkProfile2 = () => {
        navigate('/Profile');
        window.scrollTo(0, 0);
    }
    const linkRegister = () => {
        navigate('/Register');
        window.scrollTo(0, 0);
    }
    const linkCart = () => {
        navigate('/Cart');
        window.scrollTo(0, 0);
    }

    const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
    const openChatRoom = () => {
        setIsChatRoomOpen(true);
        document.body.style.overflow = 'hidden';
    };
    const closeChatRoom = () => {
        setIsChatRoomOpen(false);
        document.body.style.overflow = 'auto';
    };

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={`fixed w-full z-20 transition-all duration-300 ease-in-out bg-gradient-to-r from-[#FFC371] to-[#FF5F6D] ${isScrolled ? 'opacity-80 backdrop-blur-sm' : ''}`}>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-[60px] sm:h-[70px]">

                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img className="h-8 w-8" src="/img/logo1.png" alt="Pet House Logo" />
                            </div>
                            <span className="ml-5 text-[13px] font-bold tracking-wide text-[#ffffff] uppercase">
                                    PET HOUSE
                            </span>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4 relative">
                                {!UserId ? (
                                    <>
                                        <a onClick={linkLogin} className="text-[#ffffff] hover:text-[#000000] hover:bg-[#ffffff] px-2 py-1 rounded text-[12px] font-medium cursor-pointer">
                                            Login
                                        </a>
                                        <div className="text-[#ffffff]"> / </div>
                                        <a onClick={linkRegister} className="text-[#ffffff] hover:text-[#000000] hover:bg-[#ffffff] px-2 py-1 rounded text-[12px] font-medium cursor-pointer">
                                            Register
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <div className="relative cursor-pointer" onClick={linkProfile2}>
                                            {petDeliveryCount > 0 && (
                                                <span className="rounded-full bg-[#2dc089] text-[#ffffff] text-[7px] px-1 absolute bottom-3 right-2">
                                                    {petDeliveryCount}
                                                </span>
                                            )}
                                            <i className="fa-solid fa-hand-holding-heart text-[14px] text-[#ffffff] hover:text-[#cccccc] px-4"></i>
                                        </div>
                                        <div className="relative cursor-pointer" onClick={linkCart}>
                                            {cartDetails > 0 && (
                                                <span className="rounded-full bg-[#2dc089] text-[#ffffff] text-[7px] px-1 absolute bottom-3 right-2">
                                                    {cartDetails}
                                                </span>
                                            )}
                                            <i className="fa-solid fa-cart-shopping text-[14px] text-[#ffffff] hover:text-[#cccccc] px-4"></i>
                                        </div>
                                        <div>
                                            <i className="fa-regular fa-comment text-[14px] text-[#ffffff] hover:text-[#cccccc] px-3 cursor-pointer" onClick={openChatRoom}></i>
                                            <a className="text-white text-[14px] px-2 ml-2 cursor-pointer" onClick={linkProfile}>{userData.Name}</a>
                                            <img className="inline-block h-6 w-6 rounded-full cursor-pointer mb-1 mx-1" src={userData.Image} alt="Account User" onClick={linkProfile}/>
                                            <i className="fa-solid fa-arrow-right-from-bracket text-[14px] text-[#ffffff] hover:text-[#cccccc] px-4 cursor-pointer" onClick={handleLogout}></i>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="-mr-2 flex md:hidden">
                            {!UserId ? (
                                null
                            ) : (
                                <div className="inline-flex items-center justify-center p-2 px-3">
                                    <div className="relative cursor-pointer" onClick={linkProfile2}>
                                        {petDeliveryCount > 0 && (
                                            <span className="rounded-full bg-[#2dc089] text-[#ffffff] text-[5px] px-1 absolute bottom-3 right-3">
                                                {petDeliveryCount}
                                            </span>
                                        )}
                                        <i className="fa-solid fa-hand-holding-heart text-[14px] text-[#ffffff] hover:text-[#cccccc] px-4"></i>
                                    </div>
                                    <div className="relative cursor-pointer" onClick={linkCart}>
                                        {cartDetails > 0 && (
                                            <span className="rounded-full bg-[#2dc089] text-[#ffffff] text-[5px] px-1 absolute bottom-3 right-3">
                                                {cartDetails}
                                            </span>
                                        )}
                                        <i class="fa-solid fa-cart-shopping text-[13px] text-[#ffffff] hover:text-[#cccccc] px-5"></i>
                                    </div>
                                    <div>
                                        <a className="text-white text-[12px] mr-2 cursor-pointer" onClick={linkProfile}>{userData.Name}</a>
                                        <img className="inline-block h-6 w-6 rounded-full cursor-pointer" src={userData.Image} alt="Account User" onClick={linkProfile}/>
                                    </div>
                                </div>
                            )}       
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#e0404e] focus:ring-2 focus:ring-white">         
                                {!isOpen ? (
                                    <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                ) : (
                                    <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                )}
                            </button>

                        </div>

                    </div>

                </div>

                <Transition show={isOpen}>

                    {(ref) => (
                        <div className="md:hidden bg-gradient-to-r from-[#e0a860] to-[#d6535f]" id="mobile-menu">

                            <div ref={ref} className="px-2 pt-2 pb-2 space-y-1 sm:px-3">
                                {!UserId ? (
                                    <>
                                        <a onClick={linkLogin} className="text-[14px] text-white block px-3 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:underline hover:text-[18px] cursor-pointer">
                                            Login
                                        </a>
                                        <a onClick={linkRegister} className="text-[14px] text-white block px-3 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:underline hover:text-[18px] cursor-pointer">
                                            Register
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <a onClick={openChatRoom} className="text-[14px] text-white block px-3 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:underline hover:text-[18px] cursor-pointer">
                                            ChatRoom
                                        </a>
                                        <a onClick={handleLogout} className="text-[14px] text-white block px-3 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:underline hover:text-[18px] cursor-pointer">
                                            Logout
                                        </a>
                                    </>
                                )}
                            </div>

                        </div>
                    )}

                </Transition>
                
                {isChatRoomOpen && (
                    <ChatRoom closeModal={closeChatRoom}/>
                )}

            </nav>

        </div>
    )
}

export default Navbar