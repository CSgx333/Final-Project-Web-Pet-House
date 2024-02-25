import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';


function ResetPassword() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const emailData = location.state && location.state.emailData;
    const [inputs, setInputs] = useState({
        Email: emailData,
        Password: '',
        RepeatPassword: ''
    })

    const validateForm = () => {
        const errors = {};
        if (!inputs.Password) {
            errors.Password = "Password is required";
        } else if (inputs.Password.length < 8) {
            errors.Password = "Password must be at least 8 characters long";
        }
        if (!inputs.RepeatPassword) {
            errors.RepeatPassword = "Repeat Password is required";
        } else if (inputs.RepeatPassword !== inputs.Password) {
            errors.RepeatPassword = "Passwords do not match";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    const handleReset = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:5000/reset_password', inputs)
            const swal = Swal.fire({
                title: 'Success',
                text: 'Password reset successful !',
                icon: 'success',
            });
            setTimeout(() => {
                swal.close();
            }, 700);
            swal.then(() => {
                navigate('/Login');
            });
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
                                                    src="/img/image_forgot2.jpg"
                                                    alt="Forgot Image"
                                                    className="w-full h-full object-cover absolute inset-0"
                                                />
                                            </div>
                                            <div className="w-full lg:w-6/12">
                                                <div className="p-10">
                                                    <div className="text-center py-5">
                                                        <h1 className="text-4xl text-gray-900">Reset Password</h1>
                                                    </div>
                                                    <form onSubmit={handleReset}>
                                                        <div className="mb-4">
                                                            <input
                                                                type="Password"
                                                                className="w-full px-3 py-3 border rounded-full border-2 font-semibold text-[14px]"
                                                                placeholder="Enter a Password" 
                                                                onChange={e => setInputs({...inputs, Password: e.target.value})}
                                                            />
                                                            {formErrors.Password && (
                                                                <p className="text-red-500 text-[10px]">{formErrors.Password}</p>
                                                            )}
                                                        </div>
                                                        <div className="mb-4">
                                                            <input
                                                                type="Password"
                                                                className="w-full px-3 py-3 border rounded-full border-2 font-semibold text-[14px]"
                                                                placeholder="Enter a Repeat Password" 
                                                                onChange={e => setInputs({...inputs, RepeatPassword: e.target.value})}
                                                            />
                                                            {formErrors.RepeatPassword && (
                                                                <p className="text-red-500 text-[10px]">{formErrors.RepeatPassword}</p>
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

export default ResetPassword;