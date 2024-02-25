import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function ContributionDetails({ contributionData }) {
    const [contribution, setContributionData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchId, setSearchId] = useState('');
    const itemsPerPage = 7;

    // Fetch Data contribution_details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/contribution_details');
                const setContributionID = result.data.data.filter((item) => item.Contribution_id == contributionData);

                // กรองจาก ID
                const filteredById = setContributionID.filter((item) =>
                    item.Contribution_details_id.toString().includes(searchId.toLowerCase())
                );

                setContributionData(filteredById);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchId]);

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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = contribution.slice(startIndex, endIndex);
    const totalPages = Math.ceil(contribution.length / itemsPerPage);
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
        <main className="bg-white-300 flex-1 p-3 overflow-hidden bg-[#f0f2f5]">
            <div className="flex flex-col">
                <div className="flex flex-1 py-4 text-[20px] font-bold ml-4">Contribution Details</div>
                            <section className="py-1 bg-blueGray-50">
                                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-4">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                                            <div className="flex flex-wrap items-center">
                                                <div>
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search ID" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="block w-full overflow-x-auto">
                                            <table className="items-center bg-transparent w-full border-collapse ">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Contribution Image
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Pet Name {'('}ID{')'}
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Account Image
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Account Name {'('}ID{')'}
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Money
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
                                                                {row.Pet_name} {'('}{row.Contribution_id}{')'}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                                <img className="w-[120px]" src={row.UserImage} alt="Account Image" />
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Name} {row.Surname} {'('}{row.Contribution_id}{')'}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Money}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {contribution.length === 0 ? (
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

export default ContributionDetails;