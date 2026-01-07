import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        gameUrl: '',
        thumbnail: null,
        thumbnailUrl: '',
        previewGif: null,
        previewGifUrl: '',
        description: ''
    });
    const [status, setStatus] = useState('');
    const [games, setGames] = useState([]);
    const [gamesLoading, setGamesLoading] = useState(true);
    const [gamesError, setGamesError] = useState('');
    const [editingGameId, setEditingGameId] = useState(null);

    const fetchGames = async () => {
        try {
            setGamesLoading(true);
            setGamesError('');
            const res = await axios.get('http://localhost:5000/api/games');
            setGames(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            setGames([]);
            setGamesError(e?.response?.data?.message || e.message || 'Failed to load games');
        } finally {
            setGamesLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'previewGif' || e.target.name === 'thumbnail') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const startEdit = (game) => {
        setEditingGameId(game._id);
        setFormData({
            title: game.title || '',
            category: game.category || '',
            gameUrl: game.gameUrl || '',
            thumbnail: null,
            thumbnailUrl: '',
            previewGif: null,
            previewGifUrl: '',
            description: game.description || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingGameId(null);
        setFormData({
            title: '',
            category: '',
            gameUrl: '',
            thumbnail: null,
            thumbnailUrl: '',
            previewGif: null,
            previewGifUrl: '',
            description: ''
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Delete this game?');
        if (!confirmed) return;
        try {
            await axios.delete(`http://localhost:5000/api/games/${id}`);
            if (editingGameId === id) {
                cancelEdit();
            }
            await fetchGames();
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || 'Failed to delete game');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('gameUrl', formData.gameUrl);
        data.append('description', formData.description);

        if (formData.thumbnail) {
            data.append('thumbnail', formData.thumbnail);
        } else if (formData.thumbnailUrl) {
            data.append('thumbnail', formData.thumbnailUrl);
        }

        if (formData.previewGif) {
            data.append('previewGif', formData.previewGif);
        } else if (formData.previewGifUrl) {
            data.append('previewGif', formData.previewGifUrl);
        }

        try {
            if (editingGameId) {
                await axios.put(`http://localhost:5000/api/games/${editingGameId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:5000/api/games', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setStatus('success');
            setFormData({
                title: '',
                category: '',
                gameUrl: '',
                thumbnail: null,
                thumbnailUrl: '',
                previewGif: null,
                previewGifUrl: '',
                description: ''
            });
            // Reset file input manually if needed, or rely on form reset
            e.target.reset();
            setEditingGameId(null);
            await fetchGames();
            alert(editingGameId ? "Game Updated Successfully!" : "Game Published Successfully!");
        } catch (error) {
            console.error(error);
            setStatus('error');
            alert(editingGameId ? "Failed to update game" : "Failed to publish game");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">Admin Dashboard</h1>

                <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        {editingGameId ? 'Edit Game' : 'Add New Game'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Game Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 max-w-full" placeholder="e.g. Subway Surfers" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Category...</option>
                                    <option value="Simulation">Simulation Games</option>
                                    <option value="Adventure">Adventure Games</option>
                                    <option value="Multiplayer">Multiplayer Games</option>
                                    <option value="Platform">Platform Games</option>
                                    <option value="Mobile">Mobile Games</option>
                                    <option value="Skill">Skill Games</option>
                                    <option value="Cool">Cool Games</option>
                                    <option value="Co-op">Co-Op Games</option>
                                    <option value="Stickman">Stickman Games</option>
                                    <option value="Boys">Games For Boys</option>
                                    <option value="Action">Action Games</option>
                                    <option value="3D">3D Games</option>
                                    <option value="Cozy">Cozy Games</option>
                                    <option value="Parkour">Parkour Games</option>
                                    <option value="Escape">Escape Games</option>
                                    <option value="Dress Up">Dress Up Games</option>
                                    <option value="War">War Games</option>
                                    <option value="Funny">Funny Games</option>
                                    <option value="Block">Block Games</option>
                                    <option value="Gun">Gun Games</option>
                                    <option value="Arcade">Arcade Games</option>
                                    <option value="Crazy">Crazy Games</option>
                                    <option value="Racing">Racing Games</option>
                                    <option value="Brain">Brain Games</option>
                                    <option value="Driving">Driving Games</option>
                                    <option value="Mouse">Mouse Games</option>
                                    <option value="IO">IO Games</option>
                                    <option value="Flash">Flash Games</option>
                                    <option value="Watermelon">Watermelon Games</option>
                                    <option value="Dinosaur">Dinosaur Games</option>
                                    <option value="Tycoon">Tycoon Games</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Game URL (Source)</label>
                                <input name="gameUrl" value={formData.gameUrl} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500" placeholder="https://" required />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Thumbnail File</label>
                                <input type="file" name="thumbnail" onChange={handleChange} accept="image/*" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Thumbnail URL (Online Image)</label>
                                <input name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Preview GIF File</label>
                                <input type="file" name="previewGif" onChange={handleChange} accept="image/gif, video/*" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Preview GIF URL (Online)</label>
                                <input name="previewGifUrl" value={formData.previewGifUrl} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500" placeholder="Game description..." />
                            </div>

                        </div>

                    <div className="md:col-span-2 pt-4">
                        <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform active:scale-95 shadow-lg">
                            {editingGameId ? 'Update Game' : 'Publish Game'}
                        </button>
                    </div>

                    {editingGameId && (
                        <div className="md:col-span-2">
                            <button type="button" onClick={cancelEdit} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                                Cancel Edit
                            </button>
                        </div>
                    )}
                </form>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-6">Published Games</h2>

                {gamesLoading && (
                    <div className="text-gray-400">Loading games...</div>
                )}

                {!gamesLoading && gamesError && (
                    <div className="text-red-400">{gamesError}</div>
                )}

                {!gamesLoading && !gamesError && games.length === 0 && (
                    <div className="text-gray-400">No games found.</div>
                )}

                <div className="space-y-4">
                    {games.map((game) => (
                        <div key={game._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-900 border border-gray-700 rounded-xl p-4">
                            <div className="flex items-center gap-4">
                                <img src={game.thumbnail} alt={game.title} className="w-20 h-14 object-cover rounded-lg border border-gray-700" />
                                <div>
                                    <div className="font-semibold text-white">{game.title}</div>
                                    <div className="text-sm text-gray-400">{game.category}</div>
                                    <div className="text-xs text-gray-500 break-all">{game.slug}</div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => startEdit(game)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                                    Edit
                                </button>
                                <button type="button" onClick={() => handleDelete(game._id)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div >
    );
};

export default Admin;
