import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const Room = () => {
    const [roomCode, setRoomCode] = useState('');
    const [createdRoom, setCreatedRoom] = useState(null);
    const socket = useSocket();
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        // In real app: POST /api/room/create
        // Mock response
        const newCode = "SKY-" + Math.random().toString(36).substring(2, 6).toUpperCase();
        setCreatedRoom(newCode);

        // Join room via socket
        socket?.emit('join-room', newCode);
    };

    const handleJoinRoom = () => {
        if (!roomCode) return;
        socket?.emit('join-room', roomCode);
        navigate(`/room/${roomCode}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
                <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Multiplayer Lobby</h2>

                <div className="space-y-6">
                    {/* Create Room */}
                    <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 border-dashed text-center">
                        <h3 className="text-lg font-semibold text-gray-200 mb-2">Host a Game</h3>
                        {createdRoom ? (
                            <div className="animate-fade-in">
                                <p className="text-gray-400 text-sm mb-2">Share this code:</p>
                                <div className="text-4xl font-mono font-bold text-green-400 mb-4 tracking-wider select-all cursor-pointer bg-gray-900 p-2 rounded-lg">{createdRoom}</div>
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                    Start Game
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleCreateRoom}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform active:scale-95"
                            >
                                Generate Room Code
                            </button>
                        )}
                    </div>

                    <div className="relative flex items-center justify-center">
                        <hr className="w-full border-gray-600" />
                        <span className="absolute bg-gray-800 px-3 text-gray-400 text-sm">OR</span>
                    </div>

                    {/* Join Room */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-3">Join a Friend</h3>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                placeholder="ENTER CODE"
                                className="flex-1 bg-gray-900 border border-gray-600 text-white text-center text-lg font-mono rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase tracking-wider p-3"
                            />
                            <button
                                onClick={handleJoinRoom}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 rounded-lg transition-colors"
                            >
                                JOIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
