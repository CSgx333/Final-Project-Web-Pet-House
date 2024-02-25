import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function AddSupplier() {
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputs, setInputs] = useState({
        SupplierName: '',
        ContactUs: '',
    })

    // ตรวจสอบ Form
    const validateForm = () => {
        const errors = {};
        if (!inputs.SupplierName) {
            errors.SupplierName = "Supplier Name is required";
        }
        if (!inputs.ContactUs) {
            errors.ContactUs = "Contact Us is required";
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
            axios.post('http://localhost:5000/add_supplier', inputs)
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
    };

    return (
        <main className="bg-white-300 flex-1 p-3 overflow-hidden bg-[#f0f2f5]">
            <div className="flex flex-col">
                <div className="flex flex-1 py-4 text-[20px] font-bold ml-4">Add Supplier</div>
                <section className="py-1 bg-blueGray-50">
                    <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                            <form className="px-5 py-5" onSubmit={handleSubmit}>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Supplier Name
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="supplier" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        onChange={e => setInputs({...inputs, SupplierName: e.target.value})}/>
                                        {formErrors.SupplierName && (
                                            <p className="text-red-500 text-xs">{formErrors.SupplierName}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Contact Us
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="ContactUs" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        onChange={e => setInputs({...inputs, ContactUs: e.target.value})}/>
                                        {formErrors.ContactUs && (
                                            <p className="text-red-500 text-xs">{formErrors.ContactUs}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex md:items-center">
                                    <div className="md:w-1/3"></div>
                                    <div className="md:w-2/3">
                                        <button type="submit" value="Submit" class="text-[16px] relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                                            <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                            <span class="relative">Submit</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
    
export default AddSupplier;