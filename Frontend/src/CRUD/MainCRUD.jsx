import React, { useState, useEffect } from "react";
import Dashboard from './Dashboard';
import CatAdoptCRUD from './CatAdoptCRUD';
import DogAdoptCRUD from './DogAdoptCRUD';
import PetLostCRUD from './PetLostCRUD';
import ContributionCRUD from './ContributionCRUD';
import AdoptListCRUD from './AdoptListCRUD';
import AddPetAdopt from './AddPetAdopt';
import AddPetLost from './AddPetLost';
import AddContribution from './AddContribution';
import EditPetPost from "./EditPetPost";
import ContributionDetails from "./ContributionDetails";
import ProductCRUD from "./productCRUD";
import AddSupplier from "./AddSupplier";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import TransportCRUD from "./transportCRUD";
import HelpCRUD from "./helpCRUD";
import ShowHelpPost from "./ShowHelpPost";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function MainCRUD() {
    const [authenticated, setAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [showHelp, setShowHelp] = useState(null);
    const [contributionData, setContribution] = useState(null);
    const navigate = useNavigate();
    const AdminId = localStorage.getItem('AdminId');
    const AdminName = localStorage.getItem('AdminName');
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

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
                localStorage.removeItem('AdminName');
                setAuthenticated(false);
                navigate('/Admin');
            }
        });
    };

    useEffect(() => {
        const adminName = localStorage.getItem('AdminName');
        if (adminName) {
            setAuthenticated(true);
        } else {
            navigate('/Admin');
        }
    }, [navigate]);
    
    return (
        <>
            {authenticated && (
                <div className="mx-auto font-Sarabun">
                    <div className="min-h-screen flex flex-col">
                        <header className="bg-gradient-to-r from-[#4b6cb7] to-[#182848] py-3 fixed w-full z-20">
                            <div className="flex justify-between">
                                <button onClick={toggleSidebar} type="button" className="inline-flex items-center justify-center px-4 text-white md:hidden lg:hidden">
                                    {!isOpen ? (
                                        <i class="fa-solid fa-bars text-[20px]"></i>
                                    ) : (
                                        <i class="fa-solid fa-xmark text-[20px]"></i>
                                    )}
                                </button>
                                <div className="p-1 mx-3 inline-flex items-center px-2">
                                    <img className="h-8 w-8" src="/img/logo1.png" alt="Pet House Logo" />
                                    <span className="ml-5 text-[13px] font-bold tracking-wide text-[#ffffff] uppercase">
                                        PET HOUSE
                                    </span>
                                </div>
                                <div className="p-1 flex flex-row items-center px-4">
                                    <a className="text-white p-2 text-[12px] no-underline hidden md:block lg:block mr-2">{AdminName}</a>
                                    <img className="inline-block h-7 w-7 rounded-full mr-2" src="/img/admin/Account_Admin.jpg" alt="Account Admin" />
                                    <i className="fa-solid fa-arrow-right-from-bracket text-[15px] text-[#ffffff] px-4 cursor-pointer" onClick={handleLogout}></i>
                                </div>
                            </div>
                        </header>

                        <div className="flex flex-1 mt-[65px]">
                            <div id="sidebar" className={`bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav ${isOpen ? "" : "hidden md:block lg:block"}`}>
                                <ul className="list-reset flex flex-col">
                                    <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "Dashboard" ? "bg-blue-500" : ""}`}>
                                        <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "Dashboard" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("Dashboard")}>
                                            <div className="flex items-center">
                                                <i className={`fas fa-tachometer-alt float-left mx-2 ${activeTab === "Dashboard" ? "text-[#3a7bd5]" : ""}`}></i>
                                                <div className={`${activeTab === "Dashboard" ? "font-medium text-[#3a7bd5]" : ""}`}>Dashboard</div>
                                            </div>
                                        </div>
                                    </li>
                                    {(AdminId === '1' || AdminId === '2') && (
                                        <div>
                                            <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "CatAdoptCRUD" ? "bg-blue-500" : ""}`}>
                                                <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "CatAdoptCRUD" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("CatAdoptCRUD")}>
                                                    <div className="flex items-center">
                                                        <i className={`far fa-solid fa-cat float-left mx-2 ${activeTab === "CatAdoptCRUD" ? "text-[#3a7bd5]" : ""}`}></i>
                                                        <div className={`${activeTab === "CatAdoptCRUD" ? "font-medium text-[#3a7bd5]" : ""}`}>Cat Adopt</div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "DogAdoptCRUD" ? "bg-blue-500" : ""}`}>
                                                <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "DogAdoptCRUD" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("DogAdoptCRUD")}>
                                                    <div className="flex items-center">
                                                        <i className={`far fa-solid fa-dog float-left mx-2 ${activeTab === "DogAdoptCRUD" ? "text-[#3a7bd5]" : ""}`}></i>
                                                        <div className={`${activeTab === "DogAdoptCRUD" ? "font-medium text-[#3a7bd5]" : ""}`}>Dog Adopt</div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "PetLostCRUD" ? "bg-blue-500" : ""}`}>
                                                <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "PetLostCRUD" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("PetLostCRUD")}>
                                                    <div className="flex items-center"> 
                                                        <i className={`far fa-solid fa-house-circle-xmark float-left mx-2 ${activeTab === "PetLostCRUD" ? "text-[#3a7bd5]" : ""}`}></i>
                                                        <div className={`${activeTab === "PetLostCRUD" ? "font-medium text-[#3a7bd5]" : ""}`}>Pet Lost</div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "ContributionCRUD" ? "bg-blue-500" : ""}`}>
                                                <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "ContributionCRUD" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("ContributionCRUD")}>
                                                    <div className="flex items-center">
                                                        <i className={`far fa-solid fa-paw float-left mx-2 ${activeTab === "ContributionCRUD" ? "text-[#3a7bd5]" : ""}`}></i>
                                                        <div className={`${activeTab === "ContributionCRUD" ? "font-medium text-[#3a7bd5]" : ""}`}>Contribution</div>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    )}
                                    {(AdminId === '2' || AdminId === '3') && (
                                        <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "AdoptListCRUD" ? "bg-blue-500" : ""}`}>
                                            <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "AdoptListCRUD" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("AdoptListCRUD")}>
                                                <div className="flex items-center">
                                                    <i className={`fa-solid fa-list float-left mx-2 ${activeTab === "AdoptListCRUD" ? "text-[#3a7bd5]" : ""}`}></i>
                                                    <div className={`${activeTab === "AdoptListCRUD" ? "font-medium text-[#3a7bd5]" : ""}`}>Adopt List</div>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                    {(AdminId === '1' || AdminId === '2') && (
                                        <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "ProductCRUD" ? "bg-blue-500" : ""}`}>
                                            <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "ProductCRUD" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("ProductCRUD")}>
                                                <div className="flex items-center">
                                                    <i className={`fa-solid fa-box-open float-left mx-2 ${activeTab === "ProductCRUD" ? "text-[#3a7bd5]" : ""}`}></i>
                                                    <div className={`${activeTab === "ProductCRUD" ? "font-medium text-[#3a7bd5]" : ""}`}>Product</div>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                    {(AdminId === '2' || AdminId === '3') && (
                                        <div>
                                            <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "transportCRUD" ? "bg-blue-500" : ""}`}>
                                                <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "transportCRUD" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("transportCRUD")}>
                                                    <div className="flex items-center">
                                                        <i className={`fa-solid fa-truck-field float-left mx-2 ${activeTab === "transportCRUD" ? "text-[#3a7bd5]" : ""}`}></i>
                                                        <div className={`${activeTab === "transportCRUD" ? "font-medium text-[#3a7bd5]" : ""}`}>Transport</div>
                                                    </div>
                                                </div> 
                                            </li>
                                            <li className={`w-full h-full py-4 px-2 border-b border-light-border cursor-pointer bg-white ${activeTab === "HelpCRUD" ? "bg-blue-500" : ""}`}>
                                                <div className={`font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline ${activeTab === "HelpCRUD" ? "text-[#3a7bd5]" : ""}`} onClick={() => setActiveTab("HelpCRUD")}>
                                                    <div className="flex items-center">
                                                        <i className={`fa-regular fa-circle-question float-left mx-2 ${activeTab === "HelpCRUD" ? "text-[#3a7bd5]" : ""}`}></i>
                                                        <div className={`${activeTab === "HelpCRUD" ? "font-medium text-[#3a7bd5]" : ""}`}>Help Message</div>
                                                    </div>
                                                </div> 
                                            </li>
                                        </div>
                                    )}
                                </ul>
                            </div>

                            {activeTab === "Dashboard" && <Dashboard />}
                            {activeTab === "CatAdoptCRUD" && <CatAdoptCRUD setActiveTab={setActiveTab} activeTab={activeTab} setEditData={setEditData} />}
                            {activeTab === "DogAdoptCRUD" && <DogAdoptCRUD setActiveTab={setActiveTab} activeTab={activeTab} setEditData={setEditData} />}
                            {activeTab === "PetLostCRUD" && <PetLostCRUD setActiveTab={setActiveTab} activeTab={activeTab} setEditData={setEditData} />}
                            {activeTab === "ContributionCRUD" && <ContributionCRUD setActiveTab={setActiveTab} activeTab={activeTab} setEditData={setEditData} setContribution={setContribution}/>}
                            {activeTab === "AdoptListCRUD" && <AdoptListCRUD setActiveTab={setActiveTab} activeTab={activeTab} />}
                            {activeTab === "AddPetAdopt" && <AddPetAdopt />}
                            {activeTab === "AddPetLost" && <AddPetLost />}
                            {activeTab === "AddContribution" && <AddContribution />}
                            {activeTab === "EditPetPost" && <EditPetPost data={editData} />}
                            {activeTab === "ContributionDetails" && <ContributionDetails contributionData={contributionData} />}
                            {activeTab === "ProductCRUD" && <ProductCRUD setActiveTab={setActiveTab} activeTab={activeTab} setEditProduct={setEditProduct}/>}
                            {activeTab === "AddSupplier" && <AddSupplier />}
                            {activeTab === "AddProduct" && <AddProduct />}
                            {activeTab === "EditProduct" && <EditProduct data={editProduct}/>}
                            {activeTab === "transportCRUD" && <TransportCRUD />}
                            {activeTab === "HelpCRUD" && <HelpCRUD setActiveTab={setActiveTab} activeTab={activeTab} setShowHelp={setShowHelp}/>}
                            {activeTab === "ShowHelpPost" && <ShowHelpPost data={showHelp}/>}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MainCRUD;