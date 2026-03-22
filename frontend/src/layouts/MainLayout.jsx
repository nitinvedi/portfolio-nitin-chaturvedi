import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import Header from '../components/layout/Header';
import PageTransition from '../components/common/PageTransition';
import BackToTop from '../components/common/BackToTop';

const MainLayout = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // https://www.desmos.com/calculator/brs54l4xou
        });

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

// ... inside return
    return (
        <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-serif pb-32 transition-colors duration-300">
            <BackToTop />
            <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 py-6">
                <Header />
                <main className="flex-grow">
                    <PageTransition>
                        <Outlet />
                    </PageTransition>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
