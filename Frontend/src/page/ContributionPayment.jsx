import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

function ContributionPayment() {
    const navigate = useNavigate();
    const location = useLocation();
    const profileData = location.state && location.state.profileData;
    const [authenticated, setAuthenticated] = useState(false);
    const UserId = localStorage.getItem('UserId');
    const [paymentType, setPaymentType] = useState("creditCard");
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputs, setInputs] = useState({});
    const [creditCard, setCreditCard] = useState({
        NameCard: '',
        CardNumber: '',
        Expiration: '',
        Security: '',
        Money: '',
    })
    const [trueWallet, setTrueWallet] = useState({
        Telephone: '',
        Money: '',
    })
    const [promptPay, setPromptPay] = useState({
        Money: '',
    })

    // Fetch Data contribution
    const [contributionData, setContributionData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/contribution');
                const setProfileID = result.data.data.find(item => item.Contribution_id === parseInt(profileData));
                setContributionData(setProfileID);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [profileData]);

    // ตรวจสอบ Form
    const validateForm1 = () => {
        const errors = {};
        if (!creditCard.NameCard) {
            errors.NameCard = "Name Card is required";
        }
        if (!creditCard.CardNumber || !/^\d{16}$/.test(creditCard.CardNumber)) {
            errors.CardNumber = "Card Number is required and must be 16 digits";
        }
        if (!creditCard.Expiration || !/^\d{2}\/\d{2}$/.test(creditCard.Expiration)) {
            errors.Expiration = "Expiration is required and must be in MM / YY format";
        }
        if (!creditCard.Security || !/^\d{3}$/.test(creditCard.Security)) {
            errors.Security = "Security is required and must be 3 digits";
        }
        if (!creditCard.Money || isNaN(creditCard.Money) || creditCard.Money < 1 || creditCard.Money > 10000) {
            errors.Money = "Money is required and must be between 1 and 10000";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    const validateForm2 = () => {
        const errors = {};
        if (!trueWallet.Telephone) {
            errors.Telephone = "Telephone is required";
        }
        if (!trueWallet.Money || isNaN(trueWallet.Money) || trueWallet.Money < 1 || trueWallet.Money > 10000) {
            errors.Money = "Money is required and must be between 1 and 10000";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    const validateForm3 = () => {
        const errors = {};
        if (!promptPay.Money || isNaN(promptPay.Money) || promptPay.Money < 1 || promptPay.Money > 10000) {
            errors.Money = "Money is required and must be between 1 and 10000";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    // Insert Data to Database
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (paymentType == "creditCard"){
            if (validateForm1()) {
                const TotalMoney = contributionData.Total_money + parseFloat(creditCard.Money);
                axios.post('http://localhost:5000/add_contribution_details', { ...inputs,
                ContributionId: contributionData.Contribution_id,
                AccountId: UserId,
                Money: parseFloat(creditCard.Money),
                TotalMoney: TotalMoney
                })
                const swal1 = Swal.fire({
                    title: 'Success',
                    text: 'Your data has been saved successfully !',
                    icon: 'success',
                });
                setTimeout(() => {
                    swal1.close();
                }, 700);
                swal1.then(() => {
                    window.location.reload();
                })
                .then(res => console.error(res))
                .catch(error => console.error(error));
            }
        } else if (paymentType == "trueWallet"){
            if (validateForm2()) {
                const TotalMoney = contributionData.Total_money + parseFloat(trueWallet.Money);
                axios.post('http://localhost:5000/add_contribution_details', { ...inputs,
                ContributionId: contributionData.Contribution_id,
                AccountId: UserId,
                Money: parseFloat(trueWallet.Money),
                TotalMoney: TotalMoney
                })
                const swal1 = Swal.fire({
                    title: 'Success',
                    text: 'Your data has been saved successfully !',
                    icon: 'success',
                });
                setTimeout(() => {
                    swal1.close();
                }, 700);
                swal1.then(() => {
                    window.location.reload();
                })
                .then(res => console.error(res))
                .catch(error => console.error(error));
            }
        } else {
            if (validateForm3()) {
                const response = await axios.post('http://localhost:5000/generateQR', {
                    Money: parseFloat(promptPay.Money),
                    promptPay: contributionData.Prompt_Pay,
                    page: 1
                });
                setQrCodeUrl(response.data.Result);
                document.body.style.overflow = 'hidden';
            }
        }
    };

    const closeModal = () => {
        const TotalMoney = contributionData.Total_money + parseFloat(promptPay.Money);
        axios.post('http://localhost:5000/add_contribution_details', { ...inputs,
            ContributionId: contributionData.Contribution_id,
            AccountId: UserId,
            Money: parseFloat(promptPay.Money),
            TotalMoney: TotalMoney
        })
        setQrCodeUrl('');
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        if (!profileData) {
            navigate('/');
            window.scrollTo(0, 0);
        }
    }, [profileData, navigate]);
    
    useEffect(() => {
        const UserId = localStorage.getItem('UserId');
        if (UserId) {
            setAuthenticated(true);
        } else {
            navigate('/Login');
            window.scrollTo(0, 0);
        }
    }, [navigate]);

    return (
        <>
            {authenticated && (
                <div className="font-Sarabun">
                    <Navbar/>
                    <main className="py-[50px] bg-[#f1f5f9]">

                        <div>
                            <div style={{ backgroundImage: `url(/img/hero4.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                                <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                                    <div className="text-center">
                                        <div className="container px-4 mx-auto">
                                            <div className="max-w-4xl mx-auto text-center">
                                                <motion.h2 className="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                                    initial={{ opacity: 0, y: 50 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    Contribution Payment
                                                </motion.h2>
                                                <motion.p className="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; Contribution &nbsp;&nbsp;&gt;&nbsp;&nbsp; Profile &nbsp;&nbsp;&gt;&nbsp;&nbsp; Payment
                                                </motion.p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <MiniMenu/>

                            {qrCodeUrl && (
                                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                                    <div className="fixed inset-0 transition-opacity">
                                        <div className="absolute inset-0 bg-black opacity-50"></div>
                                    </div>
                                    <div className="bg-white p-5 rounded shadow-lg max-w-[380px] w-full z-50">
                                        <div className="flex items-center justify-between text-[20px]">
                                            <div></div>
                                            <i className="fa-solid fa-xmark text-gray-500 hover:text-gray-700 cursor-pointer" onClick={closeModal}></i>
                                        </div>
                                        <div className="flex items-center justify-center font-bold mt-[35px] text-[18px] text-[#303030]">Scan with your bank app</div>
                                        <div className="flex items-center justify-center font-bold text-[18px] text-[#303030]">or payment app</div>
                                        <div className="flex items-center justify-center my-4">
                                            <div className="bg-[#003d6a] p-3 rounded-lg">
                                                <div>
                                                    <img src={qrCodeUrl} alt="Generated QR Code" className="rounded-lg" id="imgqr" />
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <img src="/img/promptPay.png" alt="promptPay" className="h-4 mt-3 mb-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center mt-1 text-[10px] text-[#a3a3a3]">PromptPay is supported by bank apps and</div>
                                        <div className="flex items-center justify-center text-[10px] text-[#a3a3a3]">payment apps such as KBank, SCB, Bangkok</div>
                                        <div className="flex items-center justify-center text-[10px] text-[#a3a3a3]">Bank, Krunthai Bank and Krungsri.</div>
                                        <div className="flex items-center justify-center mb-4">
                                            <img src="/img/Bank.png" alt="Bank" style={{ transform: 'scale(0.35)' }} />
                                        </div>
                                    </div>
                                </div>                    
                            )}

                            <div>
                                <div className="min-w-screen min-h-screen flex items-center justify-center px-5 pb-10 pt-16 ">
                                    <div className="w-full mx-auto rounded-lg border p-5 text-gray-700 max-w-screen-md bg-[#f7fbff]">
                                        <div className="w-full pt-1 pb-5">
                                            <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto flex justify-center items-center">
                                                <i className="fa-regular fa-credit-card text-[20px]"></i>
                                            </div>
                                        </div>
                                        <div className="mb-10">
                                            <h1 className="text-center font-bold text-xl uppercase tracking-widest">Contribution Info</h1>
                                        </div>
                                        <div className="mb-7">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-shrink-0 sm:pr-2">
                                                    <img className="w-20 h-15 rounded-lg" src={contributionData.Image} alt="Cat Adopt Image"/>
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-[14px] sm:text-[16px] font-medium truncate text-gray-700">
                                                        {contributionData.Breed}
                                                    </p>
                                                    <p className="text-[10px] sm:text-[12px] text-gray-500 truncate">
                                                        {contributionData.Pet_name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 flex -mx-2">
                                            <div className="px-2">
                                                <label for="type1" className="flex items-center cursor-pointer">
                                                    <input type="radio" className="form-radio h-5 w-5" name="type" id="type1" onClick={() => setPaymentType("creditCard")} checked={paymentType === "creditCard"}/>
                                                    <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" alt="Card"/>
                                                </label>
                                            </div>
                                            <div className="px-2">
                                                <label for="type2" className="flex items-center cursor-pointer">
                                                    <input type="radio" className="form-radio h-5 w-5" name="type" id="type2" onClick={() => setPaymentType("trueWallet")} checked={paymentType === "trueWallet"}/>
                                                    <img src="https://play-lh.googleusercontent.com/eOzvk-ekluYaeLuvDkLb5RJ0KqfFQpodZDnppxPfpEfqEqbNo5erEkmwLBgqP-k-e2kQ" class="h-8 ml-3" alt="True Wallet"/>
                                                </label>
                                            </div>
                                            <div className="px-2">
                                                <label for="type3" className="flex items-center cursor-pointer">
                                                    <input type="radio" className="form-radio h-5 w-5" name="type" id="type3" onClick={() => setPaymentType("promptPay")} checked={paymentType === "promptPay"}/>
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png" class="h-8 ml-3" alt="Prompt Pay"/>
                                                </label>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            {paymentType === "creditCard" && (
                                                <>
                                                    <div className="mb-3">
                                                        <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                                                        <div>
                                                            <input onChange={e => setCreditCard({...creditCard, NameCard: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Name" type="text"/>
                                                        </div>
                                                        {formErrors.NameCard && (
                                                            <p className="text-red-500 text-xs">{formErrors.NameCard}</p>
                                                        )}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                                                        <div>
                                                            <input onChange={e => setCreditCard({...creditCard, CardNumber: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="xxxx xxxx xxxx xxxx" type="text"/>
                                                        </div>
                                                        {formErrors.CardNumber && (
                                                            <p className="text-red-500 text-xs">{formErrors.CardNumber}</p>
                                                        )}
                                                    </div>
                                                    <div class="mb-3 -mx-2 flex items-end">
                                                        <div class="px-2 w-2/3">
                                                            <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
                                                            <div>
                                                                <input onChange={e => setCreditCard({...creditCard, Expiration: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="MM / YY" type="text"/>
                                                            </div>
                                                            {formErrors.Expiration && (
                                                                <p className="text-red-500 text-xs">{formErrors.Expiration}</p>
                                                            )}
                                                        </div>
                                                        <div className="px-2 w-2/3">
                                                            <label className="font-bold text-sm mb-2 ml-1">Security</label>
                                                            <div>
                                                                <input onChange={e => setCreditCard({...creditCard, Security: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="CVC" type="text"/>
                                                            </div>
                                                            {formErrors.Security && (
                                                                <p className="text-red-500 text-xs">{formErrors.Security}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="font-bold text-sm mb-2 ml-1">Money</label>
                                                        <div>
                                                            <input onChange={e => setCreditCard({...creditCard, Money: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="1 - 10000" type="text"/>
                                                        </div>
                                                        {formErrors.Money && (
                                                            <p className="text-red-500 text-xs">{formErrors.Money}</p>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                            {paymentType === "trueWallet" && (
                                                <>
                                                    <div className="mb-3">
                                                        <label className="font-bold text-sm mb-2 ml-1">Telephone</label>
                                                        <div>
                                                            <input onChange={e => setTrueWallet({...trueWallet, Telephone: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Phone Number" type="text"/>
                                                        </div>
                                                        {formErrors.Telephone && (
                                                            <p className="text-red-500 text-xs">{formErrors.Telephone}</p>
                                                        )}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="font-bold text-sm mb-2 ml-1">Money</label>
                                                        <div>
                                                            <input onChange={e => setTrueWallet({...trueWallet, Money: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="1 - 10000" type="text"/>
                                                        </div>
                                                        {formErrors.Money && (
                                                            <p className="text-red-500 text-xs">{formErrors.Money}</p>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                            {paymentType === "promptPay" && (
                                                <>
                                                    <div className="mb-3">
                                                        <label className="font-bold text-sm mb-2 ml-1">Money</label>
                                                        <div>
                                                            <input onChange={e => setPromptPay({...promptPay, Money: e.target.value})} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="1 - 10000" type="text"/>
                                                        </div>
                                                        {formErrors.Money && (
                                                            <p className="text-red-500 text-xs">{formErrors.Money}</p>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                            <div className="my-5">
                                                <button type="submit" value="Submit" class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">PAY NOW</button>
                                            </div>
                                        </form>
                                        
                                    </div>
                                </div>

                            </div>

                        </main>
                    <Footer/>
                </div>
            )}
        </>
    );
};

export default ContributionPayment;