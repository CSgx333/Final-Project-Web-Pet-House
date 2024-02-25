import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function ShowHelpPost({data}) {
    const [inputs, setInputs] = useState({
        Name: data.Name,
        Surname: data.Surname,
        TopicName: data.Topic_name,
        HelpDetails: data.Help_details,
        HelpImage: data.Help_image
    })

    const openImageModal = () => {
        Swal.fire({
            imageUrl: inputs.HelpImage,
            imageAlt: "Help Image",
            showConfirmButton: false,
            customClass: {
                image: 'w-full h-full',
                popup: 'bg-transparent'
            },
        });
    };

    return (
        <main className="bg-white-300 flex-1 p-3 overflow-hidden bg-[#f0f2f5]">
            <div className="flex flex-col">
                <div className="flex flex-1 py-4 text-[20px] font-bold ml-4">Help Message Details</div>
                <section className="py-1 bg-blueGray-50">
                    <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border">
                            <div className="px-5 py-5">                              
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            User Name
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input value={inputs.Name + " " + inputs.Surname} readOnly name="UserName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Topic Name
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input value={inputs.TopicName} name="TopicName" readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
                                    </div>
                                </div>
                                <div className="md:flex mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                            Details
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <textarea value={inputs.HelpDetails} readOnly name="Details" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder=". . ." rows="8"></textarea>
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
                                                <label
                                                    htmlFor="dropzone-file"
                                                    className="flex flex-col items-center justify-center w-full h-[500px] border-2 border-gray-300 border-dashed rounded-lg"
                                                    style={{ overflow: 'hidden', position: 'relative' }}
                                                    onClick={openImageModal}
                                                >
                                                    <div>
                                                        <img
                                                            id="uploaded-image"
                                                            src={inputs.HelpImage}
                                                            alt="Help Image"
                                                            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                                                        />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
    
export default ShowHelpPost;