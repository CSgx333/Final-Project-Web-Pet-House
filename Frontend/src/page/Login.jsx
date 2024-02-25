import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [userData, setUser] = useState({ users: [] });
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputs, setInputs] = useState({
        Email: '',
        Password: ''
    })

    // Fetch Data user_account
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/user_account'
                );
                setUser(result.data);
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
        if (!inputs.Password) {
            errors.Password = "Password is required";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
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

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const isEmailValid = userData.data.some(user => user.Email === inputs.Email);
                if (isEmailValid) {
                    const matchingUser = userData.data.find(user => user.Email === inputs.Email);
                    if (matchingUser && matchingUser.Password === inputs.Password) {
                        if (matchingUser.Status === "ระงับใช้งาน") {
                            Swal.fire({
                                title: 'Login Failed',
                                text: 'Account is suspended. Please contact support.',
                                icon: 'error',
                            });
                        } else {
                            localStorage.setItem('UserId', matchingUser.Account_id);
                            const swal = Swal.fire({
                                title: 'Success',
                                text: 'Login Successful !',
                                icon: 'success',
                            });
                            setTimeout(() => {
                                swal.close();
                            }, 700);
                            swal.then(() => {
                                navigate('/');
                            });
                        }
                    } else {
                        Swal.fire({
                            title: 'Login Failed',
                            text: 'Invalid Username or Password !',
                            icon: 'error',
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Login Failed',
                        text: 'Invalid Username or Password !',
                        icon: 'error',
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const linkLogin = () => {
        navigate('/Register', { replace: true });
        window.scrollTo(0, 0);
    }
    const linkForgotPassword = () => {
        navigate('/ForgotPassword', { replace: true });
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
                                                    src="/img/image_login.jpg"
                                                    alt="Login Image"
                                                    className="w-full h-full object-cover absolute inset-0"
                                                />
                                            </div>
                                            <div className="w-full lg:w-6/12">
                                                <div className="p-10">
                                                    <div className="text-center">
                                                        <h1 className="text-4xl text-gray-900 mb-4">Login</h1>
                                                    </div>
                                                    <form onSubmit={handleLogin}>
                                                        <div className="mb-4">
                                                            <input
                                                                type="email"
                                                                className="w-full px-3 py-3 border rounded-full border-2 font-semibold text-[14px]"
                                                                placeholder="Enter a Email Address" onChange={e => setInputs({...inputs, Email: e.target.value})}
                                                            />
                                                            {formErrors.Email && (
                                                                <p className="text-red-500 text-[10px]">{formErrors.Email}</p>
                                                            )}
                                                        </div>
                                                        <div className="mb-4">
                                                            <input
                                                                type="password"
                                                                className="w-full px-3 py-3 border rounded-full border-2 font-semibold text-[14px]"
                                                                placeholder="Enter a Password" onChange={e => setInputs({...inputs, Password: e.target.value})}
                                                            />
                                                            {formErrors.Password && (
                                                                <p className="text-red-500 text-[10px]">{formErrors.Password}</p>
                                                            )}
                                                        </div>
                                                        
                                                        <button type="submit" value="Submit" className="w-full bg-[#4e73df] hover:bg-[#2e59d9] text-white text-[12px] font-semibold py-3 px-6 rounded-full mb-6 flex items-center justify-center focus:outline-none focus:ring focus:border-blue-300">
                                                            Login
                                                        </button>
                                                        <hr class="h-px my-4"></hr>
                                                        <a href="index.html" className="bg-[#b03227] hover:bg-[#e12717] text-white text-[14px] font-semibold py-3 px-4 rounded-full block mb-2 flex items-center justify-center pointer-events-none">
                                                            <i className="fab fa-google fa-fw mr-2"></i> Login with Google
                                                        </a>
                                                        <a href="index.html" className="bg-[#283c66] hover:bg-[#30497c] text-white text-[14px] font-semibold py-3 px-4 rounded-full block mb-4 flex items-center justify-center pointer-events-none">
                                                            <i className="fab fa-facebook-f fa-fw mr-2"></i> Login with Facebook
                                                        </a>
                                                    </form>
                                                    <hr class="h-px my-4"></hr>
                                                    <div className="text-center">
                                                        <a onClick={linkForgotPassword} className="text-[12px] text-[#5475e4] font-semibold cursor-pointer">Forgot Password?</a>
                                                    </div>
                                                    <div className="text-center">
                                                        <a onClick={linkLogin} className="text-[12px] text-[#5475e4] font-semibold cursor-pointer">Create an Account!</a>
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
    )
}

export default Login;