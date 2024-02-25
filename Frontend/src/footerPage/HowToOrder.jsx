import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import { motion } from "framer-motion";

function HowToOrder() {
    const UserId = localStorage.getItem('UserId');
    return (
        <div className="font-Sarabun">
            <Navbar/>
            <main className="py-[50px]">

                <div>
                    <div style={{ backgroundImage: `url(/img/hero9.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                        <div class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                            <div class="text-center">
                                <div class="container px-4 mx-auto">
                                    <div class="max-w-4xl mx-auto text-center">
                                        <motion.h2 class="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            How To Order
                                        </motion.h2>
                                        <motion.p class="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; How To Order
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
                            <h2>Step 1 How to place an order</h2>
                            <p style={{ textAlign: 'justify' }}>
                                1.1. You can place an order at “ Pet Product ”
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                1.2. Choose the product you want.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                1.3. Select “ ADD TO CART ” to add to cart.
                            </p>
                            <h2>Step 2 How to check out order</h2>
                            <p style={{ textAlign: 'justify' }}>
                                2.1. Select the shopping cart icon.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                2.2. Select shipping information.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                - &nbsp; If you already have the information, select “ Existing Address ” to use available shipping information.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                - &nbsp; If you need other information, select “ Add New Address ” to fill in new shipping information.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                2.3. Fill out Payment Details.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                2.4. Press the “ Checkout ” button to make payment.
                            </p>
                            <h2>Step 3 How to check Transport</h2>
                            <p style={{ textAlign: 'justify' }}>
                                3.1. Select “ Transport ”
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                - &nbsp; On the left is the List of goods being transported.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                - &nbsp; On the right is the List of products that have been shipped.
                            </p>
                            <img src="/img/dogCat2.jpg" className="mx-auto w-[250px] sm:w-[350px]" alt="image"/>
                        </article>
                    </div>
                </motion.div>

            </main>
            <Footer/>
        </div>
    )
}

export default HowToOrder
