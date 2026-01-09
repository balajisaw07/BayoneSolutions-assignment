// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import LogoutButton from '../components/LogoutButton';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // New State for interactivity
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('team'); // 'overview', 'team', 'analytics'
    const [showNotification, setShowNotification] = useState(false);

    // Mock stats data
    const stats = {
        total: data.length,
        active: data.filter((_, i) => i % 2 === 0).length, // Fake "active" logic
        pending: data.length > 0 ? Math.floor(data.length / 3) : 0
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/users');
            await new Promise(resolve => setTimeout(resolve, 800));
            setData(response.data);
        } catch (err) {
            console.warn('API call failed, switching to mock data:', err);
            const mockUsers = [
                { id: 1, name: 'Alex Rivera', username: 'arivera', email: 'alex@design.co', city: 'Berlin' },
                { id: 2, name: 'Sarah Chen', username: 'schen', email: 'sarah@tech.io', city: 'Tokyo' },
                { id: 3, name: 'Mike Ross', username: 'mross', email: 'mike@legal.net', city: 'New York' },
                { id: 4, name: 'Isabella Silva', username: 'bella', email: 'isa@art.br', city: 'Rio' },
                { id: 5, name: 'David Kim', username: 'dkim', email: 'david@code.kr', city: 'Seoul' },
                { id: 6, name: 'Emma Watson', username: 'emma', email: 'emma@act.uk', city: 'London' },
            ];
            setData(mockUsers);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter users based on search
    const filteredUsers = data.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
        setTimeout(() => setShowNotification(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 sticky top-0 h-screen transition-all">
                <div className="p-6">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md cursor-default">
                        A
                    </div>
                </div>
                <nav className="flex-1 px-4 space-y-1 mt-6">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${activeTab === 'overview' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('team')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${activeTab === 'team' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Team Members
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${activeTab === 'analytics' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Analytics
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">ME</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Demo User</p>
                            <p className="text-xs text-gray-500 truncate">admin@demo.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
                {/* Notification Toast */}
                {showNotification && (
                    <div className="absolute top-20 right-8 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
                        <span>✨</span> No new notifications
                    </div>
                )}

                {/* Topbar */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20 px-8 flex items-center justify-between">
                    <div className="md:hidden w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">A</div>

                    {/* Active Tab Title for Mobile / Breadcrumb */}
                    <div className="md:hidden font-bold capitalize">{activeTab}</div>

                    <div className="hidden md:block w-96 relative">
                        <input
                            type="text"
                            placeholder="Search team members..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                // Auto-switch to team view if searching
                                if (e.target.value && activeTab !== 'team') setActiveTab('team');
                            }}
                            className="w-full bg-gray-50 border-none rounded-lg h-10 pl-10 pr-4 text-sm text-gray-600 focus:ring-2 focus:ring-black/5 transition-all outline-none"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleNotificationClick}
                            className="p-2 text-gray-400 hover:text-black transition-colors relative"
                        >
                            <span className="sr-only">Notifications</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.670 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <LogoutButton />
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto w-full flex-1">

                    {/* --- OVERVIEW VIEW --- */}
                    {activeTab === 'overview' && (
                        <div className="animate-fade-in space-y-10">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                                <p className="text-gray-500 mt-2">Welcome back, get a high level view of your organization.</p>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <p className="text-sm font-medium text-gray-500 relative z-10">Total Team Size</p>
                                    <p className="text-5xl font-bold text-gray-900 mt-2 relative z-10 tracking-tight">{stats.total}</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <p className="text-sm font-medium text-green-600 relative z-10">● Active Now</p>
                                    <p className="text-5xl font-bold text-gray-900 mt-2 relative z-10 tracking-tight">{stats.active}</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <p className="text-sm font-medium text-gray-500 relative z-10">Pending Invites</p>
                                    <p className="text-5xl font-bold text-gray-900 mt-2 relative z-10 tracking-tight">{stats.pending}</p>
                                </div>
                            </div>

                            <div className="bg-white border boundary-gray-100 p-8 rounded-2xl text-center py-20">
                                <h3 className="text-lg font-medium text-gray-900">Activity Functionality</h3>
                                <p className="text-gray-500 max-w-md mx-auto mt-2">The overview chart visualization is connected to real-time events. (Placeholder)</p>
                            </div>
                        </div>
                    )}

                    {/* --- TEAM VIEW --- */}
                    {activeTab === 'team' && (
                        <div className="animate-fade-in">
                            <div className="mb-10 flex justify-between items-end">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Team Members</h1>
                                    <p className="text-gray-500 mt-2">Manage your team members and their access permissions.</p>
                                </div>
                                <div className="hidden md:block text-sm text-gray-400">
                                    Showing {filteredUsers.length} results
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                                    <p className="text-gray-400 mt-4 text-sm font-medium">Loading data...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredUsers.map((user, i) => (
                                        <div key={user.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 ${['bg-orange-100 text-orange-600', 'bg-blue-100 text-blue-600', 'bg-pink-100 text-pink-600', 'bg-green-100 text-green-600'][user.id % 4]
                                                    }`}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <button className="text-gray-300 hover:text-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50">•••</button>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{user.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1 truncate">@{user.username}</p>
                                                <p className="text-xs text-gray-400 mt-1 truncate">{user.email}</p>
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-sm">
                                                <span className="text-gray-500 flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                                    {user.city || user.address?.city || 'Remote'}
                                                </span>
                                                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">Member</span>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredUsers.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-gray-500">
                                            No members found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- ANALYTICS VIEW --- */}
                    {activeTab === 'analytics' && (
                        <div className="animate-fade-in flex flex-col items-center justify-center h-96 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl">
                                📊
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Analytics Module</h2>
                            <p className="text-gray-500 mt-2 max-w-md"> Detailed insights and charts would appear here. The structure is ready for implementation.</p>
                            <button onClick={() => setActiveTab('team')} className="mt-6 text-indigo-600 hover:underline">
                                Go back to team
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
