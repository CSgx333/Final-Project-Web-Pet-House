import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import { motion } from "framer-motion";

function Query() {
    const UserId = localStorage.getItem('UserId');
    return (
        <div className="font-Sarabun">
            <Navbar/>
            <main className="py-[50px]">

                <div>
                    <div style={{ backgroundImage: `url(/img/hero12.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                        <div class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                            <div class="text-center">
                                <div class="container px-4 mx-auto">
                                    <div class="max-w-4xl mx-auto text-center">
                                        <motion.h2 class="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            Questions
                                        </motion.h2>
                                        <motion.p class="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; Questions
                                        </motion.p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <MiniMenu/>

                <motion.div className="mt-[50px] my-5"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex items-center justify-center">
                        <article class="prose prose-slate px-8 pt-5 rounded-md shadow-lg">
                            <h2>Delivery of pets What are the steps ?</h2>
                            <p style={{ textAlign: 'justify' }}>
                                Delivery of pets The recipient and delivery person 
                                will have an agreement in chat. and make an appointment
                                for a location for delivery
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                When the pet is delivered The deliverer must periodically 
                                inquire about the status of the pet after receiving it.
                                Until you can be sure that the pet is well cared for.
                            </p>
                            <h2>How do i list a pet adopt ?</h2>
                            <p style={{ textAlign: 'justify' }}>
                                1. On the “ Cat Adopt ” or “ Dog Adopt ” page, select the “ Add Pet ” button.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                2. Complete important information.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                3. Verify the information and then press the “ Submit ” button.
                            </p>
                            <h4>Note</h4>
                            <p style={{ textAlign: 'justify' }}>
                                - &nbsp; Always check your pet's readiness, such as vaccines, blood tests for disease.
                                before posting home or delivering
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                - &nbsp; Admin can always delete a post if they determine that the post is inappropriate.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                - &nbsp; Do not impersonate or mistreat your pet. If found, legal action will be taken.
                            </p>
                            <img src="/img/dogCat3.jpg" className="mx-auto w-[300px] sm:w-[400px]" alt="image"/>
                        </article>
                    </div>
                </motion.div>

            </main>
            <Footer/>
        </div>
    )
}

export default Query
