import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";

function AddProduct() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedPostStart, setSelectedPostStart] = useState(null);
    const [selectedPostEnd, setSelectedPostEnd] = useState(null);
    const [inputs, setInputs] = useState({
        ProductName: '',
        SupplierId: '',
        ProductTypeId: '',
        Price: '',
        ProductQuantity: '',
        ProductImage: '',
        ProductDetails: '',
        PostStart: '',
        PostEnd: ''
    })

    // แสดงรูปช่อง Upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            const fileName = file.name;
            const imagePath = `/img/Product/${fileName}`;
            setInputs({ ...inputs, ProductImage: imagePath });
        }
    };

    // Fetch Data supplier
    const [supplierData, setSupplierData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/supplier'
                );
                setSupplierData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Fetch Data supplier
    const [productTypeData, setProductTypeData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/product_type'
                );
                setProductTypeData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // ตรวจสอบ Form
    const validateForm = () => {
        const errors = {};
        if (!inputs.ProductName) {
            errors.ProductName = "Product Name is required";
        }
        if (!inputs.SupplierId) {
            errors.SupplierId = "Supplier is required";
        }
        if (!inputs.ProductTypeId) {
            errors.ProductTypeId = "Product Type is required";
        }
        if (!inputs.Price) {
            errors.Price = "Price is required";
        }
        if (!inputs.ProductQuantity) {
            errors.ProductQuantity = "Quantity is required";
        }
        if (!inputs.ProductImage) {
            errors.ProductImage = "Product Image is required";
        }
        if (!inputs.ProductDetails) {
            errors.ProductDetails = "Details is required";
        }
        if (!inputs.PostStart) {
            errors.PostStart = "Post Start is required";
        }
        if (!inputs.PostEnd) {
            errors.PostEnd = "Post End is required";
        }
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    };

    // Insert Data to Database
    const handleSubmit = (e) => {
        e.preventDefault();
        const incrementedStart = new Date(selectedPostStart);
        incrementedStart.setDate(incrementedStart.getDate() + 1);
        const incrementedEnd = new Date(selectedPostEnd);
        incrementedEnd.setDate(incrementedEnd.getDate() + 1);
        if (validateForm()) {
            axios.post('http://localhost:5000/add_shop_post', { ...inputs,
            PostStart: incrementedStart.toISOString(),
            PostEnd: incrementedEnd.toISOString(),
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
    };

    return (
        <main className="bg-white-300 flex-1 p-3 overflow-hidden bg-[#f0f2f5]">
            <div className="flex flex-col">
                <div className="flex flex-1 py-4 text-[20px] font-bold ml-4">Add Product</div>
                <section className="py-1 bg-blueGray-50">
                    <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                            <form className="px-5 py-5" onSubmit={handleSubmit}>                              
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Product Name
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="ProductName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                        onChange={e => setInputs({...inputs, ProductName: e.target.value})}/>
                                        {formErrors.ProductName && (
                                            <p className="text-red-500 text-xs">{formErrors.ProductName}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Supplier
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select onChange={e => setInputs({...inputs, SupplierId: e.target.options[e.target.selectedIndex].value})} name="Supplier" className="shadow border rounded w-full py-2 px-3 block">
                                            <option value="" disabled selected>Select an option</option>
                                            {supplierData && supplierData.data && supplierData.data.map((profile, index) => (
                                                <option key={index} value={profile.Supplier_id}>{profile.Supplier_name}</option>
                                            ))}
                                        </select>
                                        {formErrors.SupplierId && (
                                            <p className="text-red-500 text-xs">{formErrors.SupplierId}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Product Type
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select onChange={e => setInputs({...inputs, ProductTypeId: e.target.options[e.target.selectedIndex].value})} name="productType" className="shadow border rounded w-full py-2 px-3 block">
                                            <option value="" disabled selected>Select an option</option>
                                            {productTypeData && productTypeData.data && productTypeData.data.map((profile, index) => (
                                                <option key={index} value={profile.Product_type_id}>{profile.Product_type_name}{profile.Pet_type_name}</option>
                                            ))}
                                        </select>
                                        {formErrors.ProductTypeId && (
                                            <p className="text-red-500 text-xs">{formErrors.ProductTypeId}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Price
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="Price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"
                                        onChange={e => setInputs({...inputs, Price: e.target.value})}/>
                                        {formErrors.Price && (
                                            <p className="text-red-500 text-xs">{formErrors.Price}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Quantity
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input name="Quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"
                                        onChange={e => setInputs({...inputs, ProductQuantity: e.target.value})}/>
                                        {formErrors.ProductQuantity && (
                                            <p className="text-red-500 text-xs">{formErrors.ProductQuantity}</p>
                                        )}
                                    </div>
                                </div>
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
                                                    <div>
                                                        <img id="uploaded-image" src={uploadedImage} alt="Uploaded Image" className="absolute inset-0 w-full h-full object-cover"/>
                                                    </div>
                                                )}                 
                                                {!uploadedImage && (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded images will be processed (PNG or JPG)</p>
                                                    </div>
                                                )}
                                                <input name="image" id="dropzone-file" type="file" className="hidden" onChange={(e) => {
                                                    handleImageUpload(e);
                                                }} />
                                            </label>
                                        </div>
                                        {formErrors.ProductImage && (
                                            <p className="text-red-500 text-xs">{formErrors.ProductImage}</p>
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
                                        <textarea onChange={e => setInputs({...inputs, ProductDetails: e.target.value})} name="Details" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder=". . ." rows="8"></textarea>
                                        {formErrors.ProductDetails && (
                                            <p className="text-red-500 text-xs">{formErrors.ProductDetails}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Post Start
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <DatePicker
                                            selected={selectedPostStart}
                                            onChange={(date) => {
                                                setSelectedPostStart(date);
                                                setInputs({ ...inputs, PostStart: date });
                                            }}
                                            isClearable
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="Select a date"
                                            name="PostStart" 
                                            className="shadow border rounded w-full py-2 px-3 block"
                                        />
                                        {formErrors.PostStart && (
                                            <p className="text-red-500 text-xs">{formErrors.PostStart}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Post End
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <DatePicker
                                            selected={selectedPostEnd}
                                            onChange={(date) => {
                                                setSelectedPostEnd(date);
                                                setInputs({ ...inputs, PostEnd: date });
                                            }}
                                            isClearable
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="เลือกวันที่"
                                            name="PostEnd" 
                                            className="shadow border rounded w-full py-2 px-3 block"
                                        />
                                        {formErrors.PostEnd && (
                                            <p className="text-red-500 text-xs">{formErrors.PostEnd}</p>
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
    
export default AddProduct;