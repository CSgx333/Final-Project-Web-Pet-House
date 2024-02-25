import React, { useState, useEffect } from "react";
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MiniMenu from '../component/MiniMenu';
import { motion } from "framer-motion";

function About() {
    const UserId = localStorage.getItem('UserId');
    return (
        <div className="font-Sarabun">
            <Navbar/>
            <main className="py-[50px]">

                <div>
                    <div style={{ backgroundImage: `url(/img/hero8.jpg)` }} className="w-full h-[300px] bg-center bg-cover">
                        <div class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                            <div class="text-center">
                                <div class="container px-4 mx-auto">
                                    <div class="max-w-4xl mx-auto text-center">
                                        <motion.h2 class="mt-10 mb-6 text-4xl lg:text-5xl font-bold text-gray-100 font-semibold uppercase tracking-widest"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            About
                                        </motion.h2>
                                        <motion.p class="max-w-3xl mx-auto mb-10 text-lg text-gray-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Home &nbsp;&nbsp;&gt;&nbsp;&nbsp; About
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
                    <img src="/img/dogCat.jpg" className="mx-auto w-3/4 sm:w-1/3" alt="image"/>
                    <div className="flex items-center justify-center">
                        <article class="prose prose-slate px-8 py-8 rounded-md shadow-lg">
                            <h1>The beginning of “ PET HOUSE ”</h1>
                            <p style={{ textAlign: 'justify' }}>
                                “We all thought it would be great if one day there would be an online center for helping animals in Thailand.
                                that everyone can come in and request or provide assistance to animals From this idea, I decided to make a website.
                                “PET HOUSE” came up, which is considered an important step in helping poor children.
                                It is an online channel where all animal lovers can come and help the little ones.
                                Whether asking for blood
                                Sick animals looking for a home or lost animals can post to ask for help. You can help here and also have products for pets.
                                Also for sale so that children who want to find a home can find a home that is ready to take care of them. We therefore developed the system to be safe in order to
                                You have a home or someone who really wants to take care of you.”
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                “Helping one animal does not help the world. But that animal's life will be changed forever. If you won't help him, don't do anything to him.”
                            </p>
                        </article>
                    </div>
                </motion.div>

            </main>
            <Footer/>
        </div>
    )
}

export default About
