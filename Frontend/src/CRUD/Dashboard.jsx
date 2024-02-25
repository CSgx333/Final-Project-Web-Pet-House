import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { LineChart, CartesianGrid, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell  } from 'recharts'

function Dashboard() {
    const [AccountData, setAccountData] = useState([]);
    const [catCount, setCatCount] = useState([]);
    const [dogCount, setDogCount] = useState([]);
    const [petLostCount, setPetLostCount] = useState([]);
    const [contributionCount, setContributionCount] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [searchId, setSearchId] = useState('');
    const [inputs, setInputs] = useState({});
    const [petFoundCount, setPetFoundCount] = useState([]);
    const [chartData, setChartData] = useState([]);
    const itemsPerPage = 7;

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result1 = await axios.get('http://localhost:5000/pet_adopt');
                const allData1 = result1.data.data;
                const dogData = allData1.filter(item => item.Pet_type_id === 1);
                const catData = allData1.filter(item => item.Pet_type_id === 2);
                const dogStatus = dogData.filter(item => item.Post_status === 1);
                const catStatus = catData.filter(item => item.Post_status === 1);
                setCatCount(catStatus.length);
                setDogCount(dogStatus.length);

                const result2 = await axios.get('http://localhost:5000/pet_lost');
                const allData2 = result2.data.data;
                const petLostStatus = allData2.filter(item => item.Post_status === 1);
                setPetLostCount(petLostStatus.length);

                const result3 = await axios.get('http://localhost:5000/contribution');
                const allData3 = result3.data.data;
                const contributionStatus = allData3.filter(item => item.Post_status === 1);
                setContributionCount(contributionStatus.length);

                const petFoundStatus = allData2.filter(item => item.Post_status === 2);
                setPetFoundCount(petFoundStatus.length);

                const filteredData = allData1.filter(item => {
                    const postYear = new Date(item.Post_dateTime).getFullYear();
                    return postYear === 2023;
                });
                const groupedData = filteredData.reduce((acc, item) => {
                    const postMonth = new Date(item.Post_dateTime).getMonth();
                    const monthKey = new Date(0, postMonth).toLocaleString('en-us', { month: 'short' });
                    acc[monthKey] = acc[monthKey] || { month: monthKey, catCount: 0, dogCount: 0 };
                    if (item.Pet_type_id === 1) {
                        acc[monthKey].catCount++;
                    } else if (item.Pet_type_id === 2) {
                        acc[monthKey].dogCount++;
                    }
                    return acc;
                }, {});
                const dataArray = Object.values(groupedData);
                setChartData(dataArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Fetch Data Account
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/user_account');
                const allData = result.data.data;

                // กรองจากชื่อ
                const filteredByName = allData.filter(item =>
                    item.Name.toLowerCase().includes(searchName.toLowerCase()) ||
                    item.Surname.toLowerCase().includes(searchName.toLowerCase())
                );
                
                // กรองจาก ID
                const filteredById = filteredByName.filter((item) =>
                    item.Account_id.toString().includes(searchId.toLowerCase())
                );

                setAccountData(filteredById);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchName, searchId]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = AccountData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(AccountData.length / itemsPerPage);
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

    const handleDelete = (AccountId, LoginId, RegisterId, AddressId, CartId) => {
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
                    AccountId: AccountId,
                    LoginId: LoginId,
                    RegisterId: RegisterId,
                    AddressId: AddressId,
                    CartId: CartId
                };
                axios.delete('http://localhost:5000/user_account', { data: data })
                const updatedAccountData = AccountData.filter((item) => item.Account_id !== AccountId);
                setAccountData(updatedAccountData);
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

    const handleEditStatus = (EditStatus, AccountId) => {
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
                    axios.post('http://localhost:5000/update_user_account', { ...inputs,
                        Status: "ระงับใช้งาน",
                        AccountId: AccountId
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
                    axios.post('http://localhost:5000/update_user_account', { ...inputs,
                        Status: "ใช้งาน",
                        AccountId: AccountId
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

    return (
                    <main className="flex-1 p-3 overflow-hidden bg-[#f0f2f5]">
                        <div className="flex flex-col">
                            <div className="flex flex-1 py-4 text-[20px] font-bold ml-4">Dashboard</div>
                            <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                                <div className="bg-[#f5515f] border-l-8 border-[#b83a45] mb-2 p-2 md:w-1/4 mx-2">
                                    <div className="p-4 flex flex-col">
                                        <div className="no-underline text-white text-2xl">
                                            {catCount}
                                        </div>
                                        <div className="no-underline text-white text-lg">
                                            Cat Adopt Post
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#fbb040] border-l-8 border-[#c98828] mb-2 p-2 md:w-1/4 mx-2">
                                    <div className="p-4 flex flex-col">
                                        <div className="no-underline text-white text-2xl">
                                            {dogCount}
                                        </div>
                                        <div className="no-underline text-white text-lg">
                                            Dog Adopt Post
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#16ca40] border-l-8 border-[#12a134] mb-2 p-2 md:w-1/4 mx-2">
                                    <div className="p-4 flex flex-col">
                                        <div className="no-underline text-white text-2xl">
                                            {petLostCount}
                                        </div>
                                        <div className="no-underline text-white text-lg">
                                            Pet Lost Post
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#00a1ff] border-l-8 border-[#096fab] mb-2 p-2 md:w-1/4 mx-2">
                                    <div className="p-4 flex flex-col">
                                        <div className="no-underline text-white text-2xl">
                                            {contributionCount}
                                        </div>
                                        <div className="no-underline text-white text-lg">
                                            Contribution Post
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid lg:grid-cols-2">
                                <div className="border mx-4 mt-3">
                                    <div className="bg-white font-bold rounded border-l-[5px] border-blue-500">
                                        <div className="p-4 flex flex-col">
                                            <div className="text-[16px] mb-6">Pets that get monthly homes</div>
                                            <ResponsiveContainer width="90%" height={250}>
                                                <LineChart
                                                    width={500}
                                                    height={300}
                                                    data={chartData}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#898989' }} axisLine={{ stroke: '#898989' }} tickLine={{ stroke: '#898989' }} />
                                                    <YAxis tick={{ fontSize: 10, fill: '#898989' }} axisLine={{ stroke: '#898989' }} tickLine={{ stroke: '#898989' }}/>
                                                    <Tooltip />
                                                    <Legend wrapperStyle={{ fontSize: 10, color: '#898989' }} />
                                                    <Line type="monotone" dataKey="catCount" stroke="#f5515f" strokeWidth={2} dot={{ fill: '#f5515f', r: 2 }} activeDot={{ r: 8 }} name="Cats" />
                                                    <Line type="monotone" dataKey="dogCount" stroke="#fbb040" strokeWidth={2} dot={{ fill: '#fbb040', r: 2 }} activeDot={{ r: 8 }} name="Dogs" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mx-4 mt-3">
                                    <div className="bg-white font-bold rounded border-l-[5px] border-blue-500">
                                        <div className="p-4 flex flex-col">
                                            <div className="text-[16px] mb-2">Lost pets of the month</div>
                                            <ResponsiveContainer width="90%" height={250} className="mb-4">
                                                <PieChart>
                                                    <Pie
                                                        data={[
                                                            { name: 'Pet Lost', value: petLostCount },
                                                            { name: 'Pet Found', value: petFoundCount },
                                                        ]}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={0}
                                                        startAngle={60} 
                                                        endAngle={480}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        <Cell fill="#16ca40" />
                                                        <Cell fill="#00a1ff" />
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend
                                                        wrapperStyle={{ fontSize: 10 }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <section className="py-1 bg-blueGray-50">
                                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                                        <div className="rounded mb-0 px-4 py-3 border-0">
                                            <div className="flex flex-wrap items-center">
                                                <div>
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search Name" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
                                                    <input type="text" className="border rounded mr-2 py-2 px-2 w-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" placeholder="Search ID" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="block w-full overflow-x-auto">
                                            <table className="items-center bg-transparent w-full border-collapse ">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Image
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Account ID
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Status
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Name
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Email
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Telephone
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Edit Status
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left">
                                                            Delete
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
                                                                {row.Account_id}
                                                            </td>
                                                            {row.Status === "ใช้งาน" ? (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#22c55e] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        {row.Status}
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="bg-[#dc2626] text-[8px] text-[#ffffff] rounded-full text-center" >
                                                                        {row.Status}
                                                                    </div>
                                                                </td>
                                                            )}
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Name} {row.Surname}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Email}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {row.Telephone}
                                                            </td>
                                                            {row.Status === "ใช้งาน" ? (
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <i className="fa-solid fa-pen-to-square text-[15px] text-[#317bb8] pr-4 cursor-pointer" onClick={() => handleEditStatus(0, row.Account_id)}></i>
                                                                </td>
                                                            ) : (
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <i className="fa-solid fa-pen-to-square text-[15px] text-[#317bb8] pr-4 cursor-pointer" onClick={() => handleEditStatus(1, row.Account_id)}></i>
                                                                </td>
                                                            )} 
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                <i className="fa-solid fa-trash-can text-[15px] text-[#FF202B] cursor-pointer" onClick={() => handleDelete(row.Account_id, row.Login_id, row.Register_id, row.Address_id, row.Cart_id)}></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {AccountData.length === 0 ? (
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

export default Dashboard;