import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Wallet, Settings, AlertCircle, MessageSquare } from 'lucide-react';

const Sidebar = () => (
    <div className="w-64 bg-dark text-white h-screen fixed left-0 top-0 flex flex-col">
        <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-primary">ADLgo Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <Link to="/" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition">
                <LayoutDashboard size={20} />
                <span>Overview</span>
            </Link>
            <Link to="/users" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition">
                <Users size={20} />
                <span>User Management</span>
            </Link>
            <Link to="/finance" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition">
                <Wallet size={20} />
                <span>Finance</span>
            </Link>
            <Link to="/disputes" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition">
                <AlertCircle size={20} />
                <span>Disputes</span>
            </Link>
            <Link to="/support" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition">
                <MessageSquare size={20} />
                <span>Support Chat</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition">
                <Settings size={20} />
                <span>Settings</span>
            </Link>
        </nav>
    </div>
);

const Dashboard = () => (
    <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                <p className="text-3xl font-bold mt-2">1,234</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm font-medium">Active Drivers</h3>
                <p className="text-3xl font-bold mt-2 text-primary">56</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                <p className="text-3xl font-bold mt-2">₦ 450,000</p>
            </div>
        </div>
    </div>
);

const UsersPage = () => <div className="p-8"><h2 className="text-3xl font-bold">User Management</h2></div>;
const FinancePage = () => <div className="p-8"><h2 className="text-3xl font-bold">Finance & Commissions</h2></div>;
const DisputesPage = () => <div className="p-8"><h2 className="text-3xl font-bold">Dispute Resolution Center</h2></div>;
const SupportPage = () => <div className="p-8"><h2 className="text-3xl font-bold">Customer Support Chat</h2></div>;
const SettingsPage = () => <div className="p-8"><h2 className="text-3xl font-bold">System Settings</h2></div>;

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 min-h-screen">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/finance" element={<FinancePage />} />
                    <Route path="/disputes" element={<DisputesPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
