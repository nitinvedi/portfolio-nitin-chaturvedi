import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-serif pb-32 transition-colors duration-300">
            <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 py-6">
                <Header />
                <main className="flex-grow">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
