import React from 'react'
import { useNavigate } from 'react-router-dom';

function Footer() {
    const UserId = localStorage.getItem('UserId');
    const navigate = useNavigate();
    const linkAbout = () => {
        navigate('/About');
        window.scrollTo(0, 0);
    }
    const linkHowToOrder = () => {
        navigate('/HowToOrder');
        window.scrollTo(0, 0);
    }
    const linkQuestions = () => {
        navigate('/Questions');
        window.scrollTo(0, 0);
    }
    const linkHelp = () => {
        navigate('/Help');
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <div className="bg-[#393b40] relative">
                <div className="absolute inset-0 bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: 'url("/img/background_footer.png")',
                        pointerEvents: 'none',
                    }}>
                </div>
                <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="sm:col-span-2">
                            <div className="inline-flex items-center">
                                <div className="flex-shrink-0 mr-2">
                                    <img className="h-10 w-10" src="/img/logo1.png" alt="Pet House Logo" />
                                </div>
                                <span className="ml-2 text-xl font-bold tracking-wide text-[#ffffff] uppercase">
                                    PET HOUSE
                                </span>
                            </div>
                            <div className="mt-4 lg:max-w-sm">
                                <p className="text-sm text-[#b5b5b5]">
                                    Helping one animal doesn't help the world. But that animal's life will be changed forever.
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-[20px] mb-2 font-bold tracking-wide text-[#ffffff]">
                                Contacts
                            </p>
                            <div className="flex text-[13px]">
                                <p className="mr-1 my-2 text-[#b5b5b5]">Phone:</p>
                                <div className="my-2 transition-colors duration-300 text-[#b5b5b5]">
                                    086-3757359
                                </div>
                            </div>
                            <div className="flex text-[13px]">
                                <p className="mr-1 my-2 text-[#b5b5b5]">Email:</p>
                                <div className="my-2 transition-colors duration-300 text-[#b5b5b5]">
                                    PetHouseED@gmail.com
                                </div>
                            </div>
                            <div className="flex text-[13px]">
                                <p className="mr-1 my-2 text-[#b5b5b5]">Address:</p>
                                <a className="my-2 transition-colors duration-300 text-[#b5b5b5]">
                                    1/1 Bueng Kum, Bangkok 10230
                                </a>
                            </div>
                        </div>
                        <div>
                            <span className="text-[20px] font-bold tracking-wide text-[#ffffff]">
                                Social
                            </span>
                            <div className="flex items-center mt-2 space-x-3">
                                <a href="https://www.facebook.com/" className="text-[#b5b5b5] pr-2 hover:text-[#000000] cursor-pointer" >
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                                <a href="https://www.instagram.com/" className="text-[#b5b5b5] px-2 hover:text-[#000000] cursor-pointer">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="https://twitter.com/" className="text-[#b5b5b5] px-2 hover:text-[#000000] cursor-pointer">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                                <a href="https://line.me/th/" className="text-[#b5b5b5] pl-2 hover:text-[#000000] cursor-pointer">
                                    <i className="fa-brands fa-line"></i>
                                </a>
                            </div>
                            <p className="mt-4 text-[12px] text-[#b5b5b5]">
                                Monday - Tuesday / Second - Friday 9.00-20.00 hrs.
                                Saturday-Sunday 10.00-19.00 hrs.
                                Every Wednesday, except public holidays
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                        <p className="text-[10px] text-[#b5b5b5]">
                            Copyright @ 2023 PET HOUSE. All Rights Reserved
                        </p>
                        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                            <li>
                                <div onClick={linkAbout} className="text-[14px] leading-6 text-[#b5b5b5] hover:text-[#000000] hover:bg-[#ffffff] px-2 py-1 rounded cursor-pointer">
                                    About
                                </div>
                            </li>
                            <li>
                                <div onClick={linkHowToOrder} className="text-[14px] leading-6 text-[#b5b5b5] hover:text-[#000000] hover:bg-[#ffffff] px-2 py-1 rounded cursor-pointer">
                                    How to Order
                                </div>
                            </li>
                            <li>
                                <div onClick={linkQuestions} className="text-[14px] leading-6 text-[#b5b5b5] hover:text-[#000000] hover:bg-[#ffffff] px-2 py-1 rounded cursor-pointer">
                                    Questions
                                </div>
                            </li>
                            {!UserId ? (
                                null
                            ) : (
                                <li>
                                    <div onClick={linkHelp} className="text-[14px] leading-6 text-[#b5b5b5] hover:text-[#000000] hover:bg-[#ffffff] px-2 py-1 rounded cursor-pointer">
                                        Help
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer