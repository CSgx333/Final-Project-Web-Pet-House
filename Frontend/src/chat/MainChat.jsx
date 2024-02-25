import React, { useState, useEffect, useRef } from 'react';
import Message from '../chat/Message.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';

const MainChat = ({ onClose, data }) => {
    const UserId = localStorage.getItem('UserId');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState(8);
    const [inputs, setInputs] = useState({
        MessagesText: null,
        MessagesImage: null
    });

    const handleUserPlusClick = () => {
        setShowSearchInput(true);
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        if (searchTerm === '') {
            setSearchResults([]);
            return;
        }
        const results = user.filter(
            (userData) =>
                userData.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                userData.Surname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/user_account');
                const allData = result.data.data;
                setUser(allData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Fetch Data user_account
    const [filteredChatRooms, setFilteredChatRooms] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/chat_room');
                const allData = result.data.data;
                setFilteredChatRooms(allData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const SearchResult = ({ results, onItemClick }) => {
        if (!results.length) {
            return null;
        }

        const filteredResults = results.slice(0, 6).filter(result => {
            const isAdded = filteredChatRooms.some(room =>
                (room.Account1_id === parseInt(UserId) && room.Account2_id === result.Account_id) ||
                (room.Account1_id === result.Account_id && room.Account2_id === parseInt(UserId))
            );
            return !isAdded && result.Account_id !== parseInt(UserId);
        });
    
        if (!filteredResults.length) {
            return null; 
        }
    
        return (
            <div className="absolute bg-white border border-gray-300 text-[#000000] rounded mt-1 p-2">
                {filteredResults.map((result, index) => (
                    <div key={index} className="cursor-pointer" onClick={() => onItemClick(result.Account_id)}>
                        <img className="inline-block h-4 w-4 rounded-full mr-2 cursor-pointer" src={result.Image} alt="Account User" />
                        <a className="text-gray-700 text-[9px] cursor-pointer">{result.Name} {result.Surname}</a>
                    </div>
                ))}
            </div>
        );
    };

    const [addRoom, setAddRoom] = useState({})
    const handleItemClick = (Account2Id) => {
        Swal.fire({
            title: 'Do you want to add friends?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:5000/chat_room',{ ...addRoom,
                    Account1_id: parseInt(UserId),
                    Account2_id: Account2Id
                })
                const swal1 = Swal.fire({
                    title: 'Success',
                    text: 'Add Friend successfully !',
                    icon: 'success',
                });
                setTimeout(() => {
                    swal1.close();
                }, 700);
                swal1.then(() => {
                    window.location.reload();
                })
            }
        });
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;
        const imagePath = `/img/MainChat/${fileName}`;
        setSelectedImage(imagePath);
        setInputs({ ...inputs, MessagesImage: imagePath });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputs.MessagesText !== null || inputs.MessagesImage !== null) {
            axios.post('http://localhost:5000/user_messages', {
                ...inputs,
                ChatRoomId: data.ChatRoomId,
                MessagesUserId: UserId,
            });

            if (messagesRef.current) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            }

            let inputElement = document.getElementById("textInput");
            inputElement.value = null;
            setSelectedImage(null);
            setInputs({ ...inputs, MessagesText: null, MessagesImage: null });
        }
    }

    useEffect(() => {
    }, [selectedImage, inputs]);

    const messagesRef = useRef(null);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (messagesRef.current) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            }
        }, 20);
        return () => clearTimeout(timeoutId);
    }, [data]);

    const handleScroll = () => {
        const scrollContainer = messagesRef.current;
        const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop === scrollContainer.clientHeight;
        if (scrollContainer.scrollTop === 0) {
            const prevScrollHeight = scrollContainer.scrollHeight;
            setVisibleMessages((prevVisibleMessages) => prevVisibleMessages + 4);
            if (!isAtBottom) {
                setTimeout(() => {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight - prevScrollHeight;
                }, 0);
            }
        }
    };
    
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleSubmit(event);
            }
        };
    
        document.addEventListener('keydown', handleKeyPress);
    
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleSubmit]);

    const inputRef = useRef(null);
    const handleFormClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const [updateData, setUpdateData] = useState({});
    useEffect(() => {
        if (data.ChatRoomId && data.accountId) {
            setUpdateData({
                isRead: 2,
                ChatRoomId: data.ChatRoomId,
                AccountId: data.accountId
            });
        }
    }, [data.ChatRoomId, data.accountId]);

    useEffect(() => {
        if (updateData.ChatRoomId) {
            axios.post('http://localhost:5000/update_messages', updateData)
        }
    }, [updateData.isRead]);
    
    return (
        <div className="flex-2">
            <div className="bg-[#ffffff] flex items-center justify-between p-4 text-[#7e839b] border-b-[1.5px] border-[#ededed]">
                {data.name ? (
                    <span>{data.name}</span>
                ) : (
                    <span>&nbsp;</span>
                )}
                <div className="flex gap-4 items-center">
                    {showSearchInput ? (
                        <div className="relative">
                        <input
                            className="border-1 text-[#000000] bg-white h-[25px] px-2 rounded text-[11px] focus:outline-none"
                            type="search"
                            name="search"
                            placeholder="Search . . ."
                            onChange={handleSearchChange}
                            value={searchTerm}
                        />
                        <SearchResult results={searchResults} onItemClick={handleItemClick} />
                    </div>
                    ) : (
                        <i className="fa-solid fa-user-plus text-[#7e839b] text-[12px] cursor-pointer" onClick={handleUserPlusClick}></i>
                    )}
                    <i className="fa-solid fa-xmark text-[#7e839b] cursor-pointer" onClick={onClose}></i>
                </div>
            </div>
            <div className="bg-[#f2f2f6] flex-grow sm:h-[400px] sm:w-[500px] h-[300px] w-[250px] overflow-y-auto z-0" ref={messagesRef} onScroll={handleScroll}>
                <Message data={data}  visibleMessages={visibleMessages}/>
            </div>
            <div className="relative border-t-[1.5px] border-[#ededed]">
                {data.name ? (
                    <form className="h-16 bg-[#ffffff] p-2 flex items-center justify-between" onClick={handleFormClick}>
                        <input
                            type="text"
                            ref={inputRef}
                            id="textInput"
                            placeholder="Type something..."
                            className="w-full border-none outline-none text-gray-800 sm:text-[15px] text-[12px]"
                            onChange={e => setInputs({...inputs, MessagesText: e.target.value})}
                            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                        />
                        {selectedImage && (
                            <img src={selectedImage} alt="Main Image" className="h-6 sm:mr-5 mr-1 rounded" />
                        )}
                        <div className="send flex items-center gap-3">
                            <label htmlFor="imageInput" className="fa-regular fa-image text-[15px] px-2 text-[#7e839b] cursor-pointer"></label>
                            <input
                                type="file"
                                id="imageInput"
                                style={{ display: 'none' }}
                                onChange={(e) => {handleImageChange(e)}}
                            />
                            <div type="submit" onClick={handleSubmit} className="cursor-pointer">
                                <i className="fa-solid fa-caret-right px-2 mr-2 text-[20px] text-[#7e839b]"></i>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form className="h-16 bg-[#ffffff] p-2 flex items-center justify-between">
                    </form>
                )}
            </div>
        </div>
    )
}

export default MainChat