"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import DropdownMenu from '../ui/DropdownMenu';
import type { DropdownSesionItem } from '@/lib/sesionSlides';

type NavbarProps = {
  dropdownItems?: DropdownSesionItem[];
};

const Navbar = ({ dropdownItems }: NavbarProps) => {
  const sesionItems = dropdownItems ?? []
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropDown, setDropdown] = useState(false);
    const [navBar, setNavbar] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 100) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (!menuOpen) {
            setDropdown(false);
        }
    };

    return (
        <div>
            <nav 
                className={`fixed w-full h-[13vh] flex items-center justify-between top-0 left-0 z-[999] transition-all duration-500 ease-in-out px-10 py-2 ${
                    navBar ? 'bg-rosita' : 'bg-black/30'
                }`}
            >
                <div className='h-full relative w-32'>
                    <Link href="/" className="block h-full relative">
                        <Image 
                            src="/Images/Logos/LogoFStranspBlanco.png" 
                            alt="Logo Francesca Santos" 
                            fill
                            className='object-contain object-left'
                            sizes="128px"
                        />
                    </Link>
                </div>
                
                {/* Hamburger Menu Button */}
                <div className="md:hidden flex items-center z-[1000]">
                    <button 
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg 
                            className="w-8 h-8" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                
                {/* Desktop Menu */}
                <ul className="hidden md:flex flex-col md:flex-row w-full md:w-auto transition-all duration-500 ease-in-out text-nowrap gap-10">
                    <li className='w-full text-center border-t-2 border-white md:border-none'>
                        <Link 
                            href="/" 
                            className={`py-2 px-2 rounded-md text-[1.4rem] font-butler-light font-light hover:bg-cafeish cursor-pointer hover:text-black ${
                                pathname === '/' ? 'bg-cafeish text-black' : 'text-white'
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    {/* <li className='w-full text-center border-t-2 border-white md:border-none'>
                        <Link 
                            href='/sobre-mi' 
                            className={`py-2 px-2 rounded-md text-[1.4rem] font-butler-light font-light hover:bg-cafeish cursor-pointer hover:text-black ${
                                pathname === '/sobre-mi' ? 'bg-cafeish text-black' : 'text-white'
                            }`}
                        >
                            Francesca Santos
                        </Link>
                    </li> */}
                    <li className='w-full text-center border-t-2 border-white md:border-none'>
                        <Link 
                            href='/contact' 
                            className={`py-2 px-2 rounded-md text-[1.4rem] font-butler-light font-light hover:bg-cafeish cursor-pointer hover:text-black ${
                                pathname === '/contact' ? 'bg-cafeish text-black' : 'text-white'
                            }`}
                        >
                            Contacto
                        </Link>
                    </li>
                    <li 
                        className='w-full text-center border-t-2 border-white md:border-none relative'
                        onMouseEnter={() => setDropdown(true)}
                        onMouseLeave={() => setDropdown(false)}
                    >
                        <Link 
                            href="/sesiones" 
                            className={`py-2 px-2 rounded-md text-[1.4rem] font-butler-light font-light hover:bg-cafeish hover:text-black ${
                                pathname === '/sesiones' ? 'bg-cafeish text-black' : 'text-white'
                            }`}
                        >
                            Sesiones
                        </Link>
                        {dropDown && <DropdownMenu items={sesionItems} />}
                    </li>
                    <li className='w-full text-center border-t-2 border-white md:border-none'>
                        <Link 
                            href="/ediciones" 
                            className={`py-2 px-2 rounded-md text-[1.4rem] font-butler-light font-light hover:bg-cafeish hover:text-black ${
                                pathname === '/ediciones' ? 'bg-cafeish text-black' : 'text-white'
                            }`}
                        >
                            Ediciones
                        </Link>
                    </li>
                </ul>
                
                {/* Full Screen Mobile Menu */}
                <div className={`md:hidden fixed inset-0 bg-blanquito z-[998] transition-all duration-500 ease-in-out flex flex-col ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="h-[13vh]"></div> {/* Spacer matching navbar height */}
                    <ul className="flex-1 flex flex-col items-center justify-center gap-6">
                        <li className='w-full text-center'>
                            <Link 
                                href="/" 
                                className={`block py-4 px-2 text-[1.8rem] font-butler-light font-light hover:bg-cafeish/30 transition-colors ${
                                    pathname === '/' ? 'bg-verdecito text-white' : ''
                                }`}
                            >
                                Home
                            </Link>
                        </li>
                        {/* <li className='w-full text-center'>
                            <Link 
                                href='/sobre-mi' 
                                className={`block py-4 px-2 text-[1.8rem] font-butler-light font-light hover:bg-cafeish/30 transition-colors ${
                                    pathname === '/sobre-mi' ? 'bg-verdecito text-white' : ''
                                }`}
                            >
                                Francesca Santos
                            </Link>
                        </li> */}
                        <li className='w-full text-center'>
                            <Link 
                                href='/contact' 
                                className={`block py-4 px-2 text-[1.8rem] font-butler-light font-light hover:bg-cafeish/30 transition-colors ${
                                    pathname === '/contact' ? 'bg-verdecito text-white' : ''
                                }`}
                            >
                                Contacto
                            </Link>
                        </li>
                        <li className='w-full text-center'>
                            <Link 
                                href="/sesiones" 
                                className={`block py-4 px-2 text-[1.8rem] font-butler-light font-light hover:bg-cafeish/30 transition-colors ${
                                    pathname === '/sesiones' ? 'bg-verdecito text-white' : ''
                                }`}
                            >
                                Sesiones
                            </Link>
                        </li>
                        <li className='w-full text-center'>
                            <Link 
                                href="/ediciones" 
                                className={`block py-4 px-2 text-[1.8rem] font-butler-light font-light hover:bg-cafeish/30 transition-colors ${
                                    pathname === '/ediciones' ? 'bg-verdecito text-white' : ''
                                }`}
                            >
                                Ediciones
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;