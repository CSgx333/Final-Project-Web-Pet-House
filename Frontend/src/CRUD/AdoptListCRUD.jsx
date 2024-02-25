import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function AdoptListCRUD() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBreed, setSearchBreed] = useState('');
    const [searchId, setSearchId] = useState('');
    const [inputs, setInputs] = useState({});
    const itemsPerPage = 7;
    
    // Fetch Data user_adopt_list
    const [petListPost, setPetListPost] = useState([]);
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
                const filteredBySearch = allData.filter(item =>
                    item.Breed.toLowerCase().includes(searchBreed.toLowerCase())
                );
                const filteredById = filteredBySearch.filter((item) =>
                    item.User_adopt_list_id.toString().includes(searchId.toLowerCase())
                );
                setPetListPost(filteredById);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchBreed, searchId]);

    // Fetch Data pet_adopt
    const [ownerData, setOwnerData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/pet_adopt');
                const allData = result.data.data;
                setOwnerData(allData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = petListPost.slice(startIndex, endIndex);
    const totalPages = Math.ceil(petListPost.length / itemsPerPage);
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
    
    const handleEdit = (EditStatus, AdoptListId, PetAdopt_id) => {
        Swal.fire({
            title: 'Are you sure ?',
            text: 'You will be able to return this !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (EditStatus == 0){
                    axios.post('http://localhost:5000/update_adopt_list', { ...inputs,
                        ListPetStatus: 2,
                        AdoptDate: null,
                        Status: 1,
                        PetAdopt_id: PetAdopt_id,
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
                    const AdoptDate = new Date();
                    axios.post('http://localhost:5000/update_adopt_list', { ...inputs,
                        ListPetStatus: 1,
                        AdoptDate: AdoptDate,
                        Status: 2,
                        PetAdopt_id: PetAdopt_id,
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
                const updatedAdoptList = petListPost.filter((item) => item.User_adopt_list_id !== AdoptListId);
                setPetListPost(updatedAdoptList);
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
        <main className="bg-white-300 flex-1 p-3 overflow-hidden bg-[#f0f2f5]">
            <div className="flex flex-col">
                <div className="flex flex-1 py-4 text-[20px] font-bold ml-4">Adopt List</div>
                            <section className="py-1 bg-blueGray-50 ">
                                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                                            <div className="flex flex-wrap items-center">
                                                <div>
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search Breed" value={searchBreed} onChange={(e) => setSearchBreed(e.target.value)}/>
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search ID" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="block w-full overflow-x-auto">
                                            <table className="items-center bg-transparent w-full border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Pet Image
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Pet Name
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Breed
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            List Status
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            User Name {'('}ID{')'}
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Owner Name {'('}ID{')'}
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            User Status
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Owner Status
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Edit Status
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
                                                                <img className="w-[120px]" src={row.PetImage} alt="Pet Image" />
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Pet_name}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Breed}
                                                            </td>
                                                            {row.List_pet_status === 1 ? (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#22c55e] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        ยืนยันแล้ว
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#dc2626] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        รอยืนยัน
                                                                    </div>
                                                                </td>
                                                            )}
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Name} {row.Surname} {'('}{row.Account_id}{')'}
                                                            </td>
                                                            {ownerData.map((owner) => (
                                                                owner.Account_id === row.OwnerId && owner.Pet_adopt_id === row.Pet_adopt_id && (
                                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                        {owner.Name} {owner.Surname} {'('}{row.OwnerId}{')'}
                                                                    </td>
                                                                )
                                                            ))}
                                                            {row.User_status === 1 ? (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#22c55e] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        ได้รับสัตว์เลี้ยง
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#dc2626] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        ยังไม่ได้รับสัตว์เลี้ยง
                                                                    </div>
                                                                </td>
                                                            )}
                                                            {row.Owner_status === 1 ? (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#22c55e] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        ส่งสัตว์เลี้ยง
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#dc2626] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        ยังไม่ส่งสัตว์เลี้ยง
                                                                    </div>
                                                                </td>
                                                            )}
                                                            {row.List_pet_status === 1 ? (
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <i className="fa-solid fa-pen-to-square text-[15px] text-[#317bb8] pr-4 cursor-pointer" onClick={() => handleEdit(0, row.User_adopt_list_id, row.Pet_adopt_id)}></i>
                                                                </td>
                                                            ) : (
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <i className="fa-solid fa-pen-to-square text-[15px] text-[#317bb8] pr-4 cursor-pointer" onClick={() => handleEdit(1, row.User_adopt_list_id, row.Pet_adopt_id)}></i>
                                                                </td>
                                                            )} 
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                <i className="fa-solid fa-trash-can text-[13px] text-[#FF202B] cursor-pointer" onClick={() => handleDelete(row.User_adopt_list_id)}></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {petListPost.length === 0 ? (
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

export default AdoptListCRUD;