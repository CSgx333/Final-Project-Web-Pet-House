import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function CatAdoptCRUD({ setActiveTab, setEditData }) {
    const [catData, setCatData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBreed, setSearchBreed] = useState('');
    const [searchId, setSearchId] = useState('');
    const [filterGender, setFilterGender] = useState(''); 
    const itemsPerPage = 7;
    
    // Fetch Data pet_adopt
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/pet_adopt');
                const allData = result.data.data;
                const catData = allData.filter(item => item.Pet_type_id === 2);
                
                // กรองจากสายพันธุ๋
                const filteredBySearch = catData.filter(item =>
                    item.Breed.toLowerCase().includes(searchBreed.toLowerCase())
                );

                // กรองจาก ID
                const filteredById = filteredBySearch.filter((item) =>
                    item.Pet_adopt_id.toString().includes(searchId.toLowerCase())
                );

                // กรองจากเพศ
                const filteredByGender = filterGender ? filteredById.filter(item => item.Gender === filterGender) : filteredById;
                
                setCatData(filteredByGender);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchBreed, searchId, filterGender]);

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
    
    const handleEditClick = (data) => {
        setActiveTab("EditPetPost");
        setEditData(data);
        window.scrollTo(0, 0);
    };

    return (
        <main className="bg-white-300 flex-1 p-3 overflow-hidden bg-[#f0f2f5]">
            <div className="flex flex-col">
                <div className="flex flex-1 py-4 text-[20px] font-bold ml-4">Cat Adopt</div>
                            <section className="py-1 bg-blueGray-50 ">
                                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                                            <div className="flex flex-wrap items-center">
                                                <div>
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search Breed" value={searchBreed} onChange={(e) => setSearchBreed(e.target.value)}/>
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search ID" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
                                                    <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} className="border rounded py-2 px-2 text-xs">
                                                        <option value="">เพศ</option>
                                                        <option value="ชาย">ชาย</option>
                                                        <option value="หญิง">หญิง</option>
                                                        <option value="ชายหญิง">ชายหญิง</option>
                                                    </select>
                                                </div>
                                                
                                                <div className="relative flex-grow flex-1 text-right">
                                                    <button onClick={() => {
                                                            setActiveTab("AddPetAdopt");
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }} 
                                                        class="box-border z-30 inline-flex items-center justify-center w-auto px-4 py-1 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                                                        <span class="relative z-20 flex items-center text-sm">
                                                            <div className="text-[12px]">Add Post</div>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="block w-full overflow-x-auto">
                                            <table className="items-center bg-transparent w-full border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Image
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Pet Name
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Status
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Account Name
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Breed
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Gender
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Color
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Age
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Province
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Vaccine
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Castrate
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                
                                                <tbody>
                                                    {currentPageData.map((row, index) => (
                                                        <tr key={index} className={`border-b border-light-border ${index % 2 === 0 ? '' : "bg-[#f9f9f9]" }`}>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                                <img className="w-[120px]" src={row.Image} alt="Pet Image" />
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Pet_name}
                                                            </td>
                                                            {row.Post_status === 1 ? (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#22c55e] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        กำลังหาบ้าน
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#dc2626] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        ได้บ้านแล้ว
                                                                    </div>
                                                                </td>
                                                            )}
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Name} {row.Surname}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Breed}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Gender}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Color}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Age}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Province}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Vaccine}
                                                            </td>
                                                            {row.Castrate == 2 && (
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    ทำหมัน
                                                                </td>
                                                            )}
                                                            {row.Castrate == 1 && (
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    ยังไม่ทำหมัน
                                                                </td>
                                                            )}
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                <i className="fa-solid fa-pen-to-square text-[15px] text-[#317bb8] pr-4 cursor-pointer" onClick={() => handleEditClick(row)}></i>
                                                                <i className="fa-solid fa-trash-can text-[15px] text-[#FF202B] cursor-pointer" onClick={() => handleDelete(row.Pet_adopt_id, row.Pet_id)}></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

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
                            </section>
            </div>
        </main>
    )
}

export default CatAdoptCRUD;