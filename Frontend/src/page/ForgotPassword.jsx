import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [userData, setUser] = useState([]);
    const [inputs, setInputs] = useState({
        Email: ''
    })

    // Fetch Data user_account
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/user_account'
                );
                const User = result.data.data;
                setUser(User);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!inputs.Email) {
            errors.Email = "Email is required";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    const handleReset = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const emailExists = userData.some(user => user.Email === inputs.Email);

            if (emailExists) {
                navigate('/ResetPassword', { state: { emailData: inputs.Email } });
                window.scrollTo(0, 0);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Email not found',
                    text: 'The entered email does not exist in our records.',
                });
            }
        }
    };

    useEffect(() => {
        const UserId = localStorage.getItem('UserId');
        if (UserId) {
            navigate('/');
            window.scrollTo(0, 0);
        } else {
            setAuthenticated(true);
        }
    }, [navigate]);

    const linkLogin = () => {
        navigate('/Login', { replace: true });
        window.scrollTo(0, 0);
    }

    return (
        <>
            {authenticated && (
                <main className="font-Nunito bg-[#ea2227] h-screen flex items-center justify-center">
                    <div className="container">
                        <div className="flex justify-center">
                            <div className="w-full lg:w-10/12 xl:w-9/12">
                                <div className="bg-[#ffffff] o-hidden border-0 rounded shadow-lg my-5">
                                    <div className="card-body">
                                        <div className="flex">
                                            <div className="lg:block lg:w-6/12 relative">
                                                <img
                                                    src="/img/image_forgot.jpg"
                                                    alt="Forgot Image"
                                                    className="w-full h-full object-cover absolute inset-0"
                                                />
                                            </div>
                                            <div className="w-full lg:w-6/12">
                                                <div className="p-10">
                                                    <div className="text-center py-5">
                                                        <h1 className="text-4xl text-gray-900">Forgot Password</h1>
                                                    </div>
                                                    <div className="text-[12px] text-center pb-3 text-gray-900">Please enter your email address and we will send you a link code.</div>
                                                    <form onSubmit={handleReset}>
                                                        <div className="mb-4">
                                                            <input
                                                                type="email"
                                                                className="w-full px-3 py-3 border rounded-full border-2 font-semibold text-[14px]"
                                                                placeholder="Enter a Email Address" 
                                                                onChange={e => setInputs({...inputs, Email: e.target.value})}
                                                            />
                                                            {formErrors.Email && (
                                                                <p className="text-red-500 text-[10px]">{formErrors.Email}</p>
                                                            )}
                                                        </div>
                                                        <button type="submit" value="Submit" className="w-full bg-[#4e73df] hover:bg-[#2e59d9] text-white text-[12px] font-semibold py-3 px-6 rounded-full mb-6 flex items-center justify-center focus:outline-none focus:ring focus:border-blue-300">
                                                            Submit
                                                        </button>
                                                    </form>
                                                    <hr class="h-px my-4"></hr>
                                                    <div className="text-center">
                                                        <a onClick={linkLogin} className="text-[12px] text-[#5475e4] font-semibold cursor-pointer">Return to the Login page.</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

export default ForgotPassword;