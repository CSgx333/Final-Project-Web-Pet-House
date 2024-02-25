import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

const Message = ({ data, visibleMessages }) => {
    const UserId = localStorage.getItem('UserId');

    // Fetch Data user_account
    const [userData, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/user_account'
                );
                const currentUser = result.data.data.find(user => user.Account_id === data.accountId);
                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [data.accountId]);

    // Fetch Data user_messages
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/user_messages'
                );
                const roomMessages = result.data.data.filter(room => room.Chat_room_id === data.ChatRoomId);
                roomMessages.forEach((item) => {
                    if (item.Sent_dateTime) {
                        const sentDateTime = new Date(item.Sent_dateTime);
                        const today = new Date();
                        const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };

                        if (
                            sentDateTime.getDate() === today.getDate() &&
                            sentDateTime.getMonth() === today.getMonth() &&
                            sentDateTime.getFullYear() === today.getFullYear()
                        ) {
                            item.Sent_dateTime = "วันนี้ " + sentDateTime.toLocaleString('th-TH', { hour: 'numeric', minute: 'numeric' });
                        } else {
                            const yesterday = new Date(today);
                            yesterday.setDate(today.getDate() - 1);
                            if (
                                sentDateTime.getDate() === yesterday.getDate() &&
                                sentDateTime.getMonth() === yesterday.getMonth() &&
                                sentDateTime.getFullYear() === yesterday.getFullYear()
                            ) {
                                item.Sent_dateTime = "เมื่อวาน " + sentDateTime.toLocaleString('th-TH', { hour: 'numeric', minute: 'numeric' });
                            } else {
                                item.Sent_dateTime = sentDateTime.toLocaleString('th-TH', options);
                            }
                        }
                    }
                });
                setMessages(roomMessages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [messages]);
    
    return (
        <div className="p-5">

            {messages.slice(-visibleMessages).map((message, index) => (
                message.Messages_userId === data.accountId ? (
                    <div key={index}>
                        <div> 
                            <div className="mb-4">
                                {message.Messages_text !== undefined && message.Messages_text !== null && (
                                    <>
                                        <img className="inline-block h-8 w-8 rounded-full mr-3" src={userData.Image} alt="Account User"/>
                                        <p className="text-[12px] p-2 px-4 inline-block rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-lg bg-[#ffffff]">
                                            {message.Messages_text}
                                        </p>
                                        <div className="text-[6px] text-gray-500 mt-1 ml-[45px]">
                                            {message.Sent_dateTime}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="mb-4 ml-[45px]">
                                {message.Messages_image !== undefined && message.Messages_image !== null && (
                                    <>
                                        <img className="sm:max-w-[200px] sm:max-h-[100px] max-w-[100px] max-h-[50px] rounded" src={message.Messages_image} alt="Main Image" />
                                        <div className="text-[6px] text-gray-500 mt-1">
                                            {message.Sent_dateTime}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div key={index}>
                        {message.Messages_text !== undefined && message.Messages_text !== null && (
                            <div className="mb-4 flex flex-row-reverse">
                                <div>
                                    <p className="text-[12px] p-2 px-4 inline-block rounded-tl-lg rounded-bl-lg rounded-br-lg text-white bg-[#0094f7]">
                                        {message.Messages_text}
                                    </p>
                                    <div className="text-[6px] text-gray-500 mt-1 flex flex-row-reverse">
                                        {message.Sent_dateTime}
                                        {message.isRead === 2 && (
                                            <span className="pr-1">อ่านแล้ว</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {message.Messages_image !== undefined && message.Messages_image !== null && (
                            <div className="mb-4 flex flex-row-reverse">
                                <div>
                                    <img className="sm:max-w-[200px] sm:max-h-[100px] max-w-[100px] max-h-[50px] rounded" src={message.Messages_image} alt="Main Image" />
                                    <div className="text-[6px] text-gray-500 mt-1 flex flex-row-reverse">
                                        {message.Sent_dateTime}
                                        {message.isRead === 2 && (
                                            <span className="pr-1">อ่านแล้ว</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )

                
            ))}
        </div>

    );
};

export default Message;
