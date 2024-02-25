import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainChat from '../chat/MainChat.jsx';

const ChatRoom = ({ closeModal }) =>  {
        const UserId = localStorage.getItem('UserId');
        const [authenticated, setAuthenticated] = useState(false);
        const [searchProfile, setSearchProfile] = useState('');
        const navigate = useNavigate();
        const itemsPerPage = 6;

        // Fetch Data user_account
        const [user, setUser] = useState([]);
        const [mainUser, setMainUser] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const chatRoom = await axios.get(
                        'http://localhost:5000/chat_room'
                    );
                    const result = await axios.get(
                        'http://localhost:5000/user_account'
                    );
                    const currentUser = result.data.data.find(user => user.Account_id === parseInt(UserId));

                    const allData = chatRoom.data.data;
                    const search = allData.filter(room =>
                        (room.Account1_id === parseInt(UserId) &&
                            (room.Name2.toLowerCase().includes(searchProfile.toLowerCase()) ||
                                room.Surname2.toLowerCase().includes(searchProfile.toLowerCase()))) ||
                        (room.Account2_id === parseInt(UserId) &&
                            (room.Name1.toLowerCase().includes(searchProfile.toLowerCase()) ||
                                room.Surname1.toLowerCase().includes(searchProfile.toLowerCase())))
                    );
                    setUser(search);
                    setMainUser(currentUser);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }, [searchProfile]);
        
        useEffect(() => {
            const UserId = localStorage.getItem('UserId');
            if (UserId) {
                setAuthenticated(true);
            } else {
                navigate('/Login');
                window.scrollTo(0, 0);
            }
        }, [navigate]);

        const [isModalOpen, setIsModalOpen] = useState(false);
        useEffect(() => {
        }, [isModalOpen]);
        
        const [addRoom, setAddRoom] = useState({});
        const handleChatItemClick = (ChatRoomId, AccountId, Name, Surname) => {
            const dataToSend = {
                ChatRoomId: ChatRoomId, 
                accountId: AccountId,
                name: Name,
                surname: Surname
            };
            setAddRoom(dataToSend);
        };

    // Fetch Data user_messages
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:5000/user_messages'
                );
                const allData = result.data.data;
                setMessages(allData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [messages]);

    const getLastMessageText = (chatRoomId, userId) => {
        const userMessages = messages.filter(
            (message) => message.Chat_room_id === chatRoomId && message.Messages_userId === userId
        );
        const lastMessage = userMessages[userMessages.length - 1];
        return lastMessage ? lastMessage.Messages_text : '';
    };
    const getLastMessageDateTime = (chatRoomId, userId) => {
        const userMessages = messages.filter(
            (message) => message.Chat_room_id === chatRoomId && message.Messages_userId === userId
        );
        const lastMessage = userMessages[userMessages.length - 1];
        return lastMessage ? new Date(lastMessage.Sent_dateTime) : null;
    };

    return (
        <>
            {authenticated && (
                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                    </div>
                    
                    <div className="border-solid border-white rounded w-65 h-90 flex overflow-hidden sm:w-90">
                        <div className="flex-1 bg-[#f6f6f9] sm:w-[270px] w-[170px] relative border-r-[1.5px] border-[#ededed]">
                            <div className="flex items-center bg-[#6d75c5] h-16 px-4 justify-between text-[#d1d7ed]">
                                <span className="font-bold sm:text-[16px] text-[12px]">Lama Chat</span>
                                <div className="flex items-center gap-10 ml-12">
                                    <div className="flex items-center">
                                        <img
                                            src={mainUser.Image}
                                            alt="User Image"
                                            className="bg-[#dad9ef] h-5 w-5 rounded-full object-cover"
                                        />
                                        <span className="text-[10px] ml-2">{mainUser.Name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#ffffff] border-b-[1.5px] border-[#ededed]">
                                <div className="px-3 py-2">
                                    <input
                                        type="text"
                                        placeholder="Search Name"
                                        value={searchProfile}
                                        onChange={(e) => setSearchProfile(e.target.value)}
                                        className="bg-transparent border-none text-[#383838] text-[12px] outline-none placeholder-light-gray"
                                    />
                                </div>
                            </div>

                            <div className="">
                                {user
                                    .slice(0, itemsPerPage)
                                    .sort((roomA, roomB) => {
                                        const dateTimeA = getLastMessageDateTime(roomA.Chat_room_id, roomA.Account1_id);
                                        const dateTimeB = getLastMessageDateTime(roomB.Chat_room_id, roomB.Account1_id);
                                        return dateTimeB - dateTimeA;
                                    })
                                    .map((room, index) => ( 
                                    <div key={index} className="px-1 hover:bg-[#e9e9f3]">
                                        {room.Account1_id === parseInt(UserId) ? (
                                            <div className="userChat p-2 flex items-center gap-2 text-white cursor-pointer" onClick={() => handleChatItemClick(room.Chat_room_id, room.Account2_id, room.Name2, room.Surname2)}>
                                                <img src={room.Image2} alt="User Image" className="w-12 h-12 rounded-full object-cover"/>
                                                <div className="text-[#424242] px-1">
                                                    <span className="text-[15px]">
                                                        {room.Name2} {room.Surname2}
                                                    </span>
                                                    <p className="text-[10px]">
                                                        {getLastMessageText(room.Chat_room_id, room.Account2_id)}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="userChat p-2 flex items-center gap-2 text-white cursor-pointer" onClick={() => handleChatItemClick(room.Chat_room_id, room.Account1_id, room.Name1, room.Surname1)}>
                                                <img src={room.Image1} alt="User Image" className="w-12 h-12 rounded-full object-cover"/>
                                                <div className="text-[#424242] px-1">
                                                    <span className="text-[15px]">
                                                        {room.Name1} {room.Surname1}
                                                    </span>
                                                    <p className="text-[10px]">
                                                        {getLastMessageText(room.Chat_room_id, room.Account1_id)}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                        </div>

                        <div className="relative bg-black flex-1">
                            <MainChat onClose={closeModal} data={addRoom} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatRoom