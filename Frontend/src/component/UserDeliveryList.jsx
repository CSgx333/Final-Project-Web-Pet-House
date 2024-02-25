import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

function UserDeliveryList({ setActiveTab }) {
    const UserId = localStorage.getItem('UserId');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [searchBreed, setSearchBreed] = useState('');
    const [inputs, setInputs] = useState({});
    const itemsPerPage = 6;

    // Fetch Data user_adopt_list
    const [petDeliveryList, setPetDeliveryList] = useState([]);
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
                const accountData = allData.filter(item => item.OwnerId === parseInt(UserId));
                const petName = accountData.filter(item =>
                    item.Pet_name.toLowerCase().includes(searchName.toLowerCase())
                );
                const petBreed = petName.filter(item =>
                    item.Breed.toLowerCase().includes(searchBreed.toLowerCase())
                );
                const postStatus = petBreed.filter(item => item.List_pet_status === 2);
                setPetDeliveryList(postStatus);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchBreed, searchName]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = petDeliveryList.slice(startIndex, endIndex);
    const totalPages = Math.ceil(petDeliveryList.length / itemsPerPage);
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

    const handleDelete = (AdoptListId) => {
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
                    AdoptListId: AdoptListId
                };
                axios.delete('http://localhost:5000/user_adopt_list', { data: data })
                const updatedDeliveryList = petDeliveryList.filter((item) => item.User_adopt_list_id !== AdoptListId);
                setPetDeliveryList(updatedDeliveryList);
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
    
    const handleConfirm = (OwnerStatus, AdoptListId) => {
        Swal.fire({
            title: 'Are you sure ?',
            text: 'You will be able to return this !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (OwnerStatus == 0){
                    axios.post('http://localhost:5000/update_adopt_list', { ...inputs,
                        OwnerStatus: 2,
                        AdoptListId: AdoptListId
                    })
                    const swal1 = Swal.fire({
                        title: 'Success',
                        text: 'Your data has been updated successfully !',
                        icon: 'success',
                    });
                    setTimeout(() => {
                        swal1.close();
                    }, 700);
                    swal1.then(() => {
                        window.location.reload();
                    })
                } else {
                    axios.post('http://localhost:5000/update_adopt_list', { ...inputs,
                        OwnerStatus: 1,
                        AdoptListId: AdoptListId
                    })
                    const swal1 = Swal.fire({
                        title: 'Success',
                        text: 'Your data has been updated successfully !',
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
        });
    };

    const [AccountID, setAccountID] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (accountId) => {
        setAccountID(accountId);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const [catCount, setCatCount] = useState([]);
    const [dogCount, setDogCount] = useState([]);
    const [petLostCount, setPetLostCount] = useState([]);
    const [contributionCount, setContributionCount] = useState([]);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result1 = await axios.get('http://localhost:5000/pet_adopt');
                const dogData2 = result1.data.data.filter(item => item.Account_id === AccountID && item.Pet_type_id === 1);
                const catData = result1.data.data.filter(item => item.Account_id === AccountID && item.Pet_type_id === 2);
                setCatCount(catData.length);
                setDogCount(dogData2.length);

                const result2 = await axios.get('http://localhost:5000/pet_lost');
                const allData2 = result2.data.data.filter(item => item.Account_id === AccountID);
                setPetLostCount(allData2.length);

                const result3 = await axios.get('http://localhost:5000/contribution');
                const allData3 = result3.data.data.filter(item => item.Account_id === AccountID);
                setContributionCount(allData3.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [AccountID]);

    return (
        <div class="bg-white p-3 shadow-md shadow-[#e9e9e9] rounded-lg">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
                        <div class="font-semibold mb-3">
                            <i class="fa-solid fa-list mr-3"></i>
                            <span class="tracking-wide">Pet Delivery List</span>
                        </div>

                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                                            <div className="flex flex-wrap items-center">
                                                <i className="fa-solid fa-arrow-left text-[20px] cursor-pointer" onClick={() => setActiveTab("ProfileAdopt")}></i>
                                                <div className="relative flex-grow flex-1 text-right">
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search Name" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search Breed" value={searchBreed} onChange={(e) => setSearchBreed(e.target.value)}/>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                        {petDeliveryList.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-5">
                                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[25px] py-6"></i>
                                                <p className="text-[15px] mb-8 text-gray-500 dark:text-gray-400">Post not found . . .</p>
                                            </div>
                                        ) : (
                                            <div class="px-5 py-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                                                {currentPageData.map((row, index) => (
                                                    <div key={index} class="rounded overflow-hidden border">
                                                        <img class="w-full h-48" src={row.PetImage} alt="Pet Image"/>
                                                        <div class="px-6 py-4">
                                                            <div className="flex flex-wrap items-center">
                                                                <div class="font-bold text-[15px] mb-2">{row.Pet_name}</div>
                                                                <div className="relative flex-grow flex-1 text-right">
                                                                    <i className="fa-solid fa-trash-can text-[13px] text-[#FF202B] cursor-pointer" onClick={() => handleDelete(row.User_adopt_list_id)}></i>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap items-center">
                                                                <div class="text-[10px] mt-3 my-1">Breed : {row.Breed}</div>
                                                                <div className="relative flex-grow flex-1 text-right">
                                                                    <div class="text-[10px] my-1">Age : {row.Age}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap items-center">
                                                                <div class="text-[10px]">Color : {row.Color}</div>
                                                                <div className="relative flex-grow flex-1 text-right">
                                                                    <div class="text-[10px]">Province : {row.Province}</div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center mt-4 bg-[#eef1f6] cursor-pointer text-gray-700 rounded-full" onClick={() => openModal(row.Account_id)}>
                                                                <div className="flex-shrink-0 sm:pr-1 py-1 px-1">
                                                                    <img className="w-7 h-7 rounded-full" src={row.UserImage} alt="User Image"/>
                                                                </div>
                                                                <div className="flex-1 min-w-0 ms-2">
                                                                    <p className="text-[10px] sm:text-[10px] font-medium truncate">
                                                                        {row.Name} {row.Surname}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {isModalOpen && (
                                                                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                                                                    <div className="fixed inset-0 transition-opacity">
                                                                        <div className="absolute inset-0 bg-black opacity-50"></div>
                                                                    </div>

                                                                    <div className="bg-white p-5 rounded shadow-lg max-w-md w-full mx-auto z-50">
                                                                        <div className="flex items-center justify-end">
                                                                            <i className="fa-solid fa-xmark text-gray-500 hover:text-gray-700 cursor-pointer" onClick={closeModal}></i>
                                                                        </div>
                                                                        <div className="flex items-center justify-center mt-5 mb-4">
                                                                            <img
                                                                                className={`inline-block h-[120px] w-[120px] rounded-full ${
                                                                                    row.Status === "ใช้งาน" ? "border-4 border-green-500" : ""
                                                                                }`}
                                                                                src={row.UserImage}
                                                                                alt="Account User"
                                                                            />
                                                                        </div>
                                                                        <a className="flex items-center justify-center text-gray-700 text-[20px] font-bold">{row.Name} {row.Surname}</a>
                                                                        <div className="rounded-md overflow-hidden border bg-[#ffffff] mt-3">
                                                                            <div className="px-6 py-4">
                                                                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                                                                    <i class="fa-regular fa-user"></i>
                                                                                    <span class="tracking-wide">About</span>
                                                                                </div>
                                                                                <div class="my-2">Email : {row.Email}</div>
                                                                                <div class="my-2">Telephone : {row.Telephone}</div>
                                                                                <div class="my-2">Province : {row.UserProvince}</div>
                                                                            </div>
                                                                            <div class="px-6 py-4 grid grid-cols-2 gap-2">
                                                                                <div>
                                                                                    <div className="font-bold flex items-center justify-center">
                                                                                        <img className="w-[27px] h-[17px]" src="/img/cat_icon.png" alt="Cat Icon"/> Cat Adopt
                                                                                    </div>
                                                                                    <div className="flex items-center justify-center">
                                                                                        {catCount} Post
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <div className="font-bold flex items-center justify-center">
                                                                                        <img className="w-[30px] h-[20px]" src="/img/dog_icon.png" alt="dog Icon"/>  Dog Adopt
                                                                                    </div>
                                                                                    <div className="flex items-center justify-center">
                                                                                        {dogCount} Post
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-5 mb-2">
                                                                                    <div className="font-bold flex items-center justify-center">
                                                                                        <img className="w-[30px] h-[20px]" src="/img/dog_icon.png" alt="dog Icon"/> Pet Lost
                                                                                    </div>
                                                                                    <div className="flex items-center justify-center">
                                                                                        {petLostCount} Post
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-5 mb-2">
                                                                                    <div className="font-bold flex items-center justify-center">
                                                                                        <img className="w-[27px] h-[17px]" src="/img/cat_icon.png" alt="Cat Icon"/> Contribution
                                                                                    </div>
                                                                                    <div className="flex items-center justify-center">
                                                                                        {contributionCount} Post
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            
                                                            {row.Owner_status === 1 ? (
                                                                <div className="flex items-center justify-center mt-3 my-2">
                                                                    <button class="bg-[#e02424] hover:bg-[#c81e1e] text-white text-[12px] font-bold py-2 px-3 rounded" onClick={() => handleConfirm(0, row.User_adopt_list_id)}>
                                                                        Cancel Confirm
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center justify-center mt-3 my-2">
                                                                    <button class="bg-[#28a745] hover:bg-[#218838] text-white text-[12px] font-bold py-2 px-3 rounded" onClick={() => handleConfirm(1, row.User_adopt_list_id)}>
                                                                        Confirm
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                        {petDeliveryList.length === 0 ? (
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
            </div>

        </div>
    )
}
export default UserDeliveryList