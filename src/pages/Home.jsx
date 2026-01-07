import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';

const Home = () => {
    const [games, setGames] = useState([]);

    // Mock Data for initial view
    useEffect(() => {
        // In real app, fetch from /api/games
        const mockGames = [
            {
                _id: 'sk1',
                title: 'Smash Karts',
                category: 'Action',
                thumbnail: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.png',
                previewGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmV5Z2Z4aHBoZ2Z4aHBoZ2Z4aHBoZ2Z4aHBoZ2Z4aHBoZ2Z4aHBoJmZXcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKrEzvJbsQAqjPM/giphy.gif',
                slug: 'smash-karts'
            },
            {
                _id: '1',
                title: 'Subway Surfers',
                category: 'Running',
                thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=500&h=300&fit=crop', // Placeholder
                previewGif: 'https://media.giphy.com/media/xT9IgDEI1iZyb2wqo8/giphy.gif', // Placeholder
                slug: 'subway-surfers'
            },
            {
                _id: '2',
                title: 'Temple Run',
                category: 'Adventure',
                thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=300&fit=crop',
                previewGif: '',
                slug: 'temple-run'
            },
            // Add more mocks as needed
        ];
        setGames(mockGames);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    SkyGames
                </h1>
                <p className="text-gray-400 mt-2">Play the best online games for free!</p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {games.map(game => (
                    <GameCard key={game._id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default Home;
