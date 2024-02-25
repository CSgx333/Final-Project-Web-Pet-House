import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

function UserCatPost({ setActiveTab }) {
    const UserId = localStorage.getItem('UserId');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [filterGender, setFilterGender] = useState(''); 
    const itemsPerPage = 6;

    // Fetch Data pet_adopt
    const [catData, setCatData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/pet_adopt');
                const allData = result.data.data;
                const catData = allData.filter(item => item.Pet_type_id === 2 && item.Account_id === parseInt(UserId));

                // กรองจากชื่อ
                const catName = catData.filter(item =>
                    item.Pet_name.toLowerCase().includes(searchName.toLowerCase())
                );

                // กรองจากสายเพศ
                const catGender = filterGender ? catName.filter(item => item.Gender === filterGender) : catName;
                
                // กรอง Status
                const catStatus = catGender.filter(item => item.Post_status === 1);
                setCatData(catStatus);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchName, filterGender]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = catData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(catData.length / itemsPerPage);
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

    const handleDelete = (petAdoptId, PetId) => {
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
                    petAdoptId: petAdoptId,
                    PetId: PetId
                };
                axios.delete('http://localhost:5000/pet_adopt', { data: data })
                const updatedCatData = catData.filter((item) => item.Pet_adopt_id !== petAdoptId);
                setCatData(updatedCatData);
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

    return (
        <div class="bg-white p-3 shadow-md shadow-[#e9e9e9] rounded-lg">

                                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
                                    <div class="font-semibold mb-3">
                                        <i class="far fa-solid fa-cat mr-3"></i>
                                        <span class="tracking-wide">Cat Adopt Post</span>
                                    </div>
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                                            <div className="flex flex-wrap items-center">
                                                <i className="fa-solid fa-arrow-left text-[20px] cursor-pointer" onClick={() => setActiveTab("ProfilePost")}></i>
                                                <div className="relative flex-grow flex-1 text-right">
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search Name" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
                                                    <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} className="border rounded py-2 px-2 text-xs">
                                                        <option value="">เพศ</option>
                                                        <option value="ชาย">ชาย</option>
                                                        <option value="หญิง">หญิง</option>
                                                        <option value="ชายหญิง">ชายหญิง</option>
                                                    </select>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                        {catData.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-5">
                                                <i class="fa-regular fa-circle-xmark text-gray-500 text-[25px] py-6"></i>
                                                <p className="text-[15px] mb-8 text-gray-500 dark:text-gray-400">Post not found . . .</p>
                                            </div>
                                        ) : (
                                            <div class="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                                                {currentPageData.map((row, index) => (
                                                        <div key={index} class="rounded overflow-hidden border">
                                                            <img class="w-full h-48" src={row.Image} alt="Pet Image"/>
                                                            <div class="px-6 py-4">
                                                                <div className="flex flex-wrap items-center">
                                                                    <div class="font-bold text-[15px] mb-2">{row.Pet_name}</div>
                                                                    <div className="relative flex-grow flex-1 text-right">
                                                                        <i className="fa-solid fa-trash-can text-[13px] text-[#FF202B] cursor-pointer" onClick={() => handleDelete(row.Pet_adopt_id, row.Pet_id)}></i>
                                                                    </div>
                                                                </div>
                                                                <p class="text-gray-700 text-[10px]">
                                                                    {row.Details}
                                                                </p>
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
                                                            </div>
                                                            <div class="px-6 pt-4 pb-2">
                                                                {row.Vaccine !== "ไม่มี" && (
                                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                                                        {row.Vaccine}
                                                                    </span>
                                                                )}
                                                                {row.Castrate == 2 && (
                                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                                                        ทำหมัน
                                                                    </span>
                                                                )}
                                                                {row.Castrate == 1 && (
                                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-[11px] font-semibold text-gray-700 mr-2 mb-2">
                                                                        ยังไม่ทำหมัน
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                ))}
                                            </div>
                                        )}

                                        {catData.length === 0 ? (
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
export default UserCatPost