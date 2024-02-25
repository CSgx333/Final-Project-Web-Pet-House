import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [userData, setUser] = useState({ users: [] });
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputs, setInputs] = useState({
        Name: '',
        Surname: '',
        National_id: '',
        Telephone: '',
        House_id: '',
        Alley: '',
        District: '',
        County: '',
        Province: '',
        Postal_id: '',
        Email: '',
        Password: '',
        RepeatPassword: ''
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

    const isEmailExists = (email) => {
        return userData.data.some(user => user.Email === email);
    };
    
    // ตรวจสอบ Form
    const validateForm = () => {
        const errors = {};

        if (!inputs.Name) {
            errors.Name = "Name is required";
        }
        if (!inputs.Surname) {
            errors.Surname = "Surname is required";
        }
        if (!inputs.National_id) {
            errors.National_id = "National_id is required";
        } else if (inputs.National_id.length !== 13) {
            errors.National_id = "National ID must be exactly 13 characters long";
        }
        if (!inputs.Telephone) {
            errors.Telephone = "Telephone is required";
        } else if (inputs.Telephone.length !== 10) {
            errors.Telephone = "Telephone must must be exactly 10 characters long";
        }
        if (!inputs.House_id) {
            errors.House_id = "House id is required";
        }
        if (!inputs.Alley) {
            errors.Alley = "Alley is required";
        }
        if (!inputs.District) {
            errors.District = "District is required";
        }
        if (!inputs.County) {
            errors.County = "County is required";
        }
        if (!inputs.Province) {
            errors.Province = "Province is required";
        }
        if (!inputs.Postal_id) {
            errors.Postal_id = "Postal_id is required";
        }
        if (!inputs.Email) {
            errors.Email = "Email is required";
        } else if (isEmailExists(inputs.Email)) {
            errors.Email = "Email is already in use";
        }
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

    // Insert Data to Database
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:5000/register', inputs)
            const swal1 = Swal.fire({
                title: 'Success',
                text: 'Register Successful !',
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
    };

    const linkLogin = () => {
        navigate('/Login', { replace: true });
        window.scrollTo(0, 0);
    }
    
    return (
        <main className="font-Nunito bg-[#ea2227] h-screen flex items-center justify-center">
            <div className="container">
                <div className="flex justify-center">
                    <div className="w-full lg:w-10/12 xl:w-9/12">
                        <div className="bg-[#ffffff] o-hidden border-0 rounded shadow-lg my-5">
                            <div className="card-body max-h-[700px] overflow-y-auto">
                                <div className="flex">
                                    <div className="lg:block lg:w-6/12 relative">
                                        <img
                                            src="/img/image_register.jpg"
                                            alt="Login Image"
                                            className="w-full h-full object-cover absolute inset-0"
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12">
                                        <div className="p-10">
                                            <div className="text-center">
                                                <h1 className="text-[25px] text-gray-900 mb-4">Register</h1>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div class="flex flex-wrap mb-3 -mx-3">
                                                    <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="First Name" onChange={e => setInputs({...inputs, Name: e.target.value})}/>
                                                        {formErrors.Name && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.Name}</p>
                                                        )}
                                                    </div>
                                                    <div class="w-full md:w-1/2 px-3">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="Last Name" onChange={e => setInputs({...inputs, Surname: e.target.value})}/>
                                                        {formErrors.Surname && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.Surname}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div class="flex flex-wrap mb-3 -mx-3">
                                                    <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                                                        <input type="Password" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="National ID" onChange={e => setInputs({...inputs, National_id: e.target.value})}/>
                                                        {formErrors.National_id && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.National_id}</p>
                                                        )}
                                                    </div>
                                                    <div class="w-full md:w-1/2 px-3">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="Telephone" onChange={e => setInputs({...inputs, Telephone: e.target.value})}/>
                                                        {formErrors.Telephone && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.Telephone}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div class="flex flex-wrap mb-3 -mx-3">
                                                    <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="House No" onChange={e => setInputs({...inputs, House_id: e.target.value})}/>
                                                        {formErrors.House_id && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.House_id}</p>
                                                        )}
                                                    </div>
                                                    <div class="w-full md:w-1/2 px-3">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="Alley" onChange={e => setInputs({...inputs, Alley: e.target.value})}/>
                                                        {formErrors.Alley && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.Alley}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div class="flex flex-wrap mb-3 -mx-3">
                                                    <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="District" onChange={e => setInputs({...inputs, District: e.target.value})}/>
                                                        {formErrors.District && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.Alley}</p>
                                                        )}
                                                    </div>
                                                    <div class="w-full md:w-1/2 px-3">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="County" onChange={e => setInputs({...inputs, County: e.target.value})}/>
                                                        {formErrors.County && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.County}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div class="flex flex-wrap mb-3 -mx-3">
                                                    <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="Province" onChange={e => setInputs({...inputs, Province: e.target.value})}/>
                                                        {formErrors.Province && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.Province}</p>
                                                        )}
                                                    </div>
                                                    <div class="w-full md:w-1/2 px-3">
                                                        <input type="text" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="Postal Code" onChange={e => setInputs({...inputs, Postal_id: e.target.value})}/>
                                                        {formErrors.Postal_id && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.Postal_id}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="email"
                                                        className="w-full px-3 py-3 border rounded-full border-2 font-semibold text-[12px]"
                                                        placeholder="Email Address" onChange={e => setInputs({...inputs, Email: e.target.value})}
                                                    />
                                                    {formErrors.Email && (
                                                        <p className="text-red-500 text-[10px]">{formErrors.Email}</p>
                                                    )}
                                                </div>
                                                <div class="flex flex-wrap mb-3 -mx-3">
                                                    <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                                                        <input type="Password" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="Password" onChange={e => setInputs({...inputs, Password: e.target.value})}/>
                                                        {formErrors.Password && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.Password}</p>
                                                        )}
                                                    </div>
                                                    <div class="w-full md:w-1/2 px-3">
                                                        <input type="Password" class="w-full px-3 py-3 rounded-full border-2 font-semibold text-[12px]"
                                                            placeholder="Repeat Password" onChange={e => setInputs({...inputs, RepeatPassword: e.target.value})}/>
                                                        {formErrors.RepeatPassword && (
                                                            <p className="text-red-500 text-[10px]">{formErrors.RepeatPassword}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <button type="submit" value="Submit" className="w-full bg-[#4e73df] hover:bg-[#2e59d9] text-white text-[12px] font-semibold py-3 px-6 rounded-full mb-6 flex items-center justify-center focus:outline-none focus:ring focus:border-blue-300">
                                                    Register Account
                                                </button>
                                                <hr class="h-px my-4"></hr>
                                                
                                            </form>
                                            <div className="text-center">
                                                <a onClick={linkLogin} className="text-[12px] text-[#5475e4] font-semibold cursor-pointer">Already have an account ? Login !</a>
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
    )
}

export default Register;