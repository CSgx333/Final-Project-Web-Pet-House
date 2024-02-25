import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

function Admin() {
    const [adminData, setAdminData] = useState({ users: [] });
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        Username: '',
        Password: '',
    });

    // Fetch Data admin_login
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/admin_login'
                );
                setAdminData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!inputs.Username) {
            errors.Username = "Username is required";
        }
        if (!inputs.Password) {
            errors.Password = "Password is required";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()){
            try {
                const isUsernameValid = adminData.data.some(admin => admin.Username === inputs.Username);
                if (isUsernameValid) {
                    const matchingAdmin = adminData.data.find(admin => admin.Username === inputs.Username);
                    if (matchingAdmin && matchingAdmin.Password === inputs.Password) {
                        localStorage.setItem('AdminId', matchingAdmin.Admin_id);
                        localStorage.setItem('AdminName', matchingAdmin.Admin_name);
                        const swal1 = Swal.fire({
                            title: 'Success',
                            text: 'Login Successful !',
                            icon: 'success',
                        });
                        setTimeout(() => {
                            swal1.close();
                        }, 700);
                        swal1.then(() => {
                            navigate('/Dashboard');
                        })
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Invalid Username or Password !',
                            icon: 'error',
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Invalid Username or Password !',
                        icon: 'error',
                    });
                }
            } catch (err) {
                console.error(err);
            }
    
        }
    };

    return (
        <section className="bg-[#f3f4f6]">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img class="w-8 h-8 mr-3 rounded-lg" src="/public/logo.png" alt="logo"/>
                    PET HOUSE    
                </div>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="flex items-center justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Admin Login
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <input onChange={e => setInputs({...inputs, Username: e.target.value})} type="text" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter a Username"/>
                                {formErrors.Username && (
                                    <p className="text-red-500 text-xs">{formErrors.Username}</p>
                                )}
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input onChange={e => setInputs({...inputs, Password: e.target.value})} type="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
                                {formErrors.Password && (
                                    <p className="text-red-500 text-xs">{formErrors.Password}</p>
                                )}
                            </div>
                            <div className="flex items-center justify-center pb-2">
                                <button className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit" value="Submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Admin