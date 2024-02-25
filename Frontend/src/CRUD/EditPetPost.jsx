import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditPetPost({data}) {
    const [uploadedImage, setUploadedImage] = useState(data.Image || null);
    const [formErrors, setFormErrors] = useState({});
    const [userData, setUser] = useState({ users: [] });
    const [isFormValid, setIsFormValid] = useState(false);
    const datePetLost = data.Date_pet_lost ? new Date(data.Date_pet_lost) : null;
    const [selectedDate, setSelectedDate] = useState(datePetLost);
    const [inputs, setInputs] = useState({
        Address_id: data.Address_id,
        Pet_Name: data.Pet_name,
        Pet_Type: data.Pet_type_id,
        Breed: data.Breed,
        Gender: data.Gender,
        Age: data.Age,
        Color: data.Color,
        Province: data.Province,
        Vaccine: data.Vaccine,
        Castrate: data.Castrate,
        Details: data.Details,
        image: data.Image,
        DateLost: selectedDate,
        Status: data.Post_status,
        Prompt_Pay: data.Prompt_Pay
    });
    console.log(data)
    // แสดงรูปช่อง Upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            const fileName = file.name;
            const imagePath = `/img/pet/${fileName}`;
            setInputs({ ...inputs, image: imagePath });
        }
    };

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

    // ตรวจสอบ Form
    const validateForm = () => {
        const errors = {};
        if (!inputs.Pet_Type) {
            errors.Pet_Type = "Pet Type is required";
        }
        if (!inputs.Gender) {
            errors.Gender = "Gender is required";
        }
        if (!inputs.Castrate) {
            errors.Castrate = "Castrate is required";
        }
        if (!inputs.Pet_Name) {
            errors.Pet_Name = "Pet Name is required";
        }
        if (!inputs.Breed) {
            errors.Breed = "Breed is required";
        }
        if (!inputs.Age) {
            errors.Age = "Age is required";
        }
        if (!inputs.Color) {
            errors.Color = "Color is required";
        }
        if (!inputs.Province) {
            errors.Province = "Province is required";
        }
        if (!inputs.Vaccine) {
            errors.Vaccine = "Vaccine is required";
        }
        if (!inputs.Castrate) {
            errors.Castrate = "Castrate is required";
        }
        if (!inputs.image) {
            errors.Image = "Image is required";
        }
        if (!inputs.Details) {
            errors.Details = "Details is required";
        }
        if (!inputs.Status) {
            errors.Status = "Status is required";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    // Update Data to Database
    const handleSubmit = (e) => {
        e.preventDefault();
        const incrementedDate = new Date(selectedDate);
        incrementedDate.setDate(incrementedDate.getDate() + 1);
        if (validateForm()) {
            axios.post('http://localhost:5000/update_pet_post', { ...inputs,
            Pet_id: data.Pet_id,
            PetLost_id: data.Pet_lost_id,
            PetAdopt_id: data.Pet_adopt_id,
            Contribution_id: data.Contribution_id,
            DateLost: incrementedDate.toISOString(),
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
            .then(res => console.error(res))
            .catch(error => console.error(error));
        }
    };

    return (
        <main className="bg-white-300 flex-1 p-3 overflow-hidden bg-[#f0f2f5]">
            <div className="flex flex-col">
                <div className="flex flex-1 py-4 text-[20px] font-bold ml-4">Edit Pet Post</div>
                <section className="py-1 bg-blueGray-50">
                    <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                            <form className="px-5 py-5" onSubmit={handleSubmit}>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            User Account
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select value={data.Address_id} disabled onChange={e => setInputs({...inputs, Account: e.target.options[e.target.selectedIndex].value})} name="Account" className="shadow border rounded w-full py-2 px-3 block">
                                            <option value="" disabled selected>Select an option</option>
                                            {userData && userData.data && userData.data.map((profile, index) => (
                                                <option key={index} value={profile.Account_id}>{profile.Name} {profile.Surname}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Status
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select value={inputs.Status} onChange={e => setInputs({...inputs, Status: e.target.options[e.target.selectedIndex].value})} name="Status" className="shadow border rounded w-full py-2 px-3 block">
                                            <option value="" disabled selected>Select an option</option>
                                            <option value="1">เปิดโพสต์</option>
                                            <option value="2">ปิดโพสต์</option>
                                        </select>
                                        {formErrors.Status && (
                                            <p className="text-red-500 text-xs">{formErrors.Status}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Pet Name
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="Pet_Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        value={inputs.Pet_Name} onChange={e => setInputs({...inputs, Pet_Name: e.target.value})}/>
                                        {formErrors.Pet_Name && (
                                            <p className="text-red-500 text-xs">{formErrors.Pet_Name}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Pet Type
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select value={inputs.Pet_Type} disabled onChange={e => setInputs({...inputs, Pet_Type: e.target.options[e.target.selectedIndex].value})} name="Pet_Type" className="shadow border rounded w-full py-2 px-3 block">
                                            <option value="" disabled selected>Select an option</option>
                                            <option value="1">หมา</option>
                                            <option value="2">แมว</option>
                                        </select>
                                        {formErrors.Pet_Type && (
                                            <p className="text-red-500 text-xs">{formErrors.Pet_Type}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Breed
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="Breed" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        value={inputs.Breed} onChange={e => setInputs({...inputs, Breed: e.target.value})}/>
                                        {formErrors.Breed && (
                                            <p className="text-red-500 text-xs">{formErrors.Breed}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Gender
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select value={inputs.Gender} onChange={e => setInputs({...inputs, Gender: e.target.options[e.target.selectedIndex].value})} name="Gender" className="shadow border rounded w-full py-2 px-3 block">
                                            <option value="" disabled selected>Select an option</option>
                                            <option value="ชาย">ชาย</option>
                                            <option value="หญิง">หญิง</option>
                                            <option value="ชายหญิง">ชายหญิง</option>
                                        </select>
                                        {formErrors.Gender && (
                                            <p className="text-red-500 text-xs">{formErrors.Gender}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Age
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="Age" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        value={inputs.Age} onChange={e => setInputs({...inputs, Age: e.target.value})}/>
                                        {formErrors.Age && (
                                            <p className="text-red-500 text-xs">{formErrors.Age}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Color
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="Color" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        value={inputs.Color} onChange={e => setInputs({...inputs, Color: e.target.value})}/>
                                        {formErrors.Color && (
                                            <p className="text-red-500 text-xs">{formErrors.Color}</p>
                                        )}
                                    </div>
                                </div>
                                {data.Prompt_Pay && (
                                    <div className="md:flex mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                                Prompt Pay
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input name="Prompt_Pay" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="text"
                                            value={inputs.Prompt_Pay} disabled onChange={e => setInputs({...inputs, Prompt_Pay: e.target.value})}/>
                                        </div>
                                    </div>
                                )}
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Province
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="Province" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        value={inputs.Province} onChange={e => setInputs({...inputs, Province: e.target.value})}/>
                                        {formErrors.Province && (
                                            <p className="text-red-500 text-xs">{formErrors.Province}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Vaccine
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="Vaccine" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        value={inputs.Vaccine} onChange={e => setInputs({...inputs, Vaccine: e.target.value})}/>
                                        {formErrors.Vaccine && (
                                            <p className="text-red-500 text-xs">{formErrors.Vaccine}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Castrate
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select value={inputs.Castrate} onChange={e => setInputs({...inputs, Castrate: e.target.options[e.target.selectedIndex].value})} name="Castrate" className="shadow border rounded w-full py-2 px-3 block">
                                            <option value="" disabled selected>Select an option</option>
                                            <option value="1">ยังไม่ทำหมัน</option>
                                            <option value="2">ทำหมัน</option>
                                        </select>
                                        {formErrors.Castrate && (
                                            <p className="text-red-500 text-xs">{formErrors.Castrate}</p>
                                        )}
                                    </div>
                                </div>
                                {data.Date_pet_lost && (
                                    <div className="md:flex mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                                Date
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => {
                                                    setSelectedDate(date);
                                                    setInputs({ ...inputs, DateLost: date });
                                                }}
                                                isClearable
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="Select a date"
                                                name="DateLost" 
                                                className="shadow border rounded w-full py-2 px-3 block"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Image
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer" style={{ overflow: 'hidden', position: 'relative' }}>
                                                {uploadedImage && (
                                                    <img src={uploadedImage} alt="Uploaded Image" className="absolute inset-0 w-full h-full object-cover"/>
                                                )}
                                                {!uploadedImage && (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 1920x1080px)</p>
                                                    </div>
                                                )}
                                                <input name="image" id="dropzone-file" type="file" className="hidden" onChange={(e) => {
                                                    handleImageUpload(e);
                                                }} />
                                            </label>
                                        </div>
                                        {formErrors.Image && (
                                            <p className="text-red-500 text-xs">{formErrors.Image}</p>
                                        )} 
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Details
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <textarea value={inputs.Details}  onChange={e => setInputs({...inputs, Details: e.target.value})} name="Details" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder=". . ." rows="8"></textarea>
                                        {formErrors.Details && (
                                            <p className="text-red-500 text-xs">{formErrors.Details}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex md:items-center">
                                    <div className="md:w-1/3"></div>
                                    <div className="md:w-2/3">
                                        <button type="submit" value="Submit" className="shadow bg-[#007bff] hover:bg-[#0069d9] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                            Submit
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
    
export default EditPetPost;