import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

function MiniMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => (event) => {
        event.preventDefault();
        navigate(path);
        window.scrollTo(0, 0);
    };

    const isCurrentPage = (path) => location.pathname === path;
    
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
            <div className="px-4 sm:px-0">
                <motion.div className="bg-[#ffffff] rounded py-4 shadow-md shadow-[#e9e9e9]"
                    initial={{ scale: 0.2 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.25 }}
                    transition={{ duration: 0.1 }}
                >
                    <div className="ml-5 sm:space-x-4 space-x-2 flex flex-row align-center">
                        <motion.div className={`link ${isCurrentPage('/') ? '' : 'cursor-pointer'}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <a onClick={handleNavigation('/')} className={`text-[#4b5563] font-bold ${isCurrentPage('/') ? 'border-b-[3px] border-[#4b5563]' : 'hover:bg-[#4d4f53] hover:text-[#eecf9f] rounded'} sm:px-4 px-3 py-[6px] sm:text-[11px] text-[7px]`}>
                                <i class="fa-solid fa-house mr-2 text-[12px] hidden sm:inline"></i> Home
                            </a>
                        </motion.div>
                        <motion.div className={`link ${isCurrentPage('/CatAdopt') ? '' : 'cursor-pointer'}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <a onClick={handleNavigation('/CatAdopt')} className={`text-[#4b5563] font-bold ${isCurrentPage('/CatAdopt') ? 'border-b-[3px] border-[#4b5563]' : 'hover:bg-[#4d4f53] hover:text-[#eecf9f] rounded'} sm:px-4 px-3 py-[6px] sm:text-[11px] text-[7px]`}>
                                <i class="fa-solid fa-cat mr-2 text-[12px] hidden sm:inline"></i> Cat Adopt
                            </a>
                        </motion.div>
                        <motion.div className={`link ${isCurrentPage('/DogAdopt') ? '' : 'cursor-pointer'}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <a onClick={handleNavigation('/DogAdopt')} className={`text-[#4b5563] font-bold ${isCurrentPage('/DogAdopt') ? 'border-b-[3px] border-[#4b5563]' : 'hover:bg-[#4d4f53] hover:text-[#eecf9f] rounded'} sm:px-4 px-3 py-[6px] sm:text-[11px] text-[7px]`}>
                                <i class="fa-solid fa-dog mr-2 text-[12px] hidden sm:inline"></i> Dog Adopt
                            </a>
                        </motion.div>
                        <motion.div className={`link ${isCurrentPage('/Contribution') ? '' : 'cursor-pointer'}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <a onClick={handleNavigation('/Contribution')} className={`text-[#4b5563] font-bold ${isCurrentPage('/Contribution') ? 'border-b-[3px] border-[#4b5563]' : 'hover:bg-[#4d4f53] hover:text-[#eecf9f] rounded'} sm:px-4 px-3 py-[6px] sm:text-[11px] text-[7px]`}>
                                <i class="fa-solid fa-paw mr-2 text-[12px] hidden sm:inline"></i> Contribution
                            </a>
                        </motion.div>
                        <motion.div className={`link ${isCurrentPage('/PetLost') ? '' : 'cursor-pointer'}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <a onClick={handleNavigation('/PetLost')} className={`text-[#4b5563] font-bold ${isCurrentPage('/PetLost') ? 'border-b-[3px] border-[#4b5563]' : 'hover:bg-[#4d4f53] hover:text-[#eecf9f] rounded'} sm:px-4 px-3 py-[6px] sm:text-[11px] text-[7px]`}>
                                <i class="fa-solid fa-house-circle-xmark mr-2 text-[12px] hidden sm:inline"></i> Pet Lost
                            </a>
                        </motion.div>
                        <motion.div className={`link ${isCurrentPage('/Product') ? '' : 'cursor-pointer'}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                        >
                            <a onClick={handleNavigation('/Product')} className={`text-[#4b5563] font-bold ${isCurrentPage('/Product') ? 'border-b-[3px] border-[#4b5563]' : 'hover:bg-[#4d4f53] hover:text-[#eecf9f] rounded'} sm:px-4 px-3 py-[6px] sm:text-[11px] text-[7px]`}>
                                <i class="fa-solid fa-box-open mr-2 text-[12px] hidden sm:inline"></i> Pet Product
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default MiniMenu;