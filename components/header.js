import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faUser, faSignOut } from '@fortawesome/pro-solid-svg-icons'

export default function Header({ myMenu, onLogin, onLogout, loggedIn }) {
    const [scrollY, setScrollY] = useState(0)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const [mobileNav, setMobileNav] = useState(false)

    const toggleMobileNav = () => {
        setMobileNav(!mobileNav)
    }
    
    const handleScroll = () => {

        const currentScrollPos = window.pageYOffset
        
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 80)
        
        setPrevScrollPos(currentScrollPos)
    }
    
    useEffect(() => {
        console.log(loggedIn)

        window.addEventListener('scroll', handleScroll)
        
        return () => window.removeEventListener('scroll', handleScroll)
        
    }, [prevScrollPos, visible, handleScroll, loggedIn])

    return (
        <div>
            <div
                className={visible ? 
                    'top-0 bg-white fixed w-full transition-[top] ease-in-out duration-300 z-50 shadow-md' 
                : 
                    'top-[-150px] bg-white fixed w-full transition-[top] ease-in-out duration-300 z-50 shadow-md'}
            >
                <div className='container py-6 px-6 xl:px-20 2xl:px-0'>
                    {loggedIn ? (
                        <div className='absolute cursor-pointer top-0 xl:right-20 2xl:right-48' onClick={onLogout}>
                            <div className='bg-justice-blue rounded-b-xl pt-1 px-3 pb-2'>
                                <button className='text-white'>
                                    <FontAwesomeIcon icon={faSignOut}/>
                                </button>
                            </div>
                        </div>
                        ) : (
                            <div className='absolute cursor-pointer top-0 xl:right-20 2xl:right-48' onClick={onLogin}>
                                <div className='bg-justice-blue rounded-b-xl pt-1 px-3 pb-2'>
                                    <button className='text-white'>
                                        <FontAwesomeIcon icon={faUser}/>
                                    </button>
                                </div>
                            </div>
                    )}
                    <div className='flex justify-between items-center'>
                        <Link href={'/'}>
                            <a>
                                <div className='relative w-40 h-24'>
                                    <Image
                                        src='/logo.png'
                                        alt='The Difference Principle Logo'
                                        objectFit='contain'
                                        layout='fill'
                                        quality={100}
                                    />
                                </div>
                            </a>
                        </Link>
                        <div className='hidden lg:flex w-fit text-justice-gray gap-5 h-fit mt-8'>
                            {myMenu.menuItems.nodes.map((el) => {
                                return (
                                    el.label !== 'Donate' ?
                                        <Link href={el.path} key={el.id}>
                                            <a className='uppercase text-lg tracking-widest cursor-pointer'>
                                                {el.label}
                                            </a>
                                        </Link>
                                    :
                                        <a href={el.path} key={el.id} target='_blank' rel='noreferrer' className='uppercase text-lg tracking-widest cursor-pointer'>
                                            {el.label}
                                        </a>
                                )
                            })}
                        </div>
                        {!mobileNav &&
                            <div onClick={toggleMobileNav} className='flex lg:hidden w-fit text-justice-gray text-3xl gap-5 h-fit'>
                                <FontAwesomeIcon icon={faBars}/>
                            </div>
                        }
                        {mobileNav &&
                            <div onClick={toggleMobileNav} className='flex lg:hidden w-fit text-justice-gray text-3xl gap-5 h-fit'>
                                <FontAwesomeIcon icon={faTimes}/>
                            </div>
                        }
                    </div>
                </div>
                <div className={`'bg-white transition-all ease-in-out duration-300' ${mobileNav ? 'h-fit py-12' : 'h-0'}`}>
                    <div className={`'h-fit' ${mobileNav ? 'block text-justice-gray' : 'hidden'}`}>
                        {myMenu.menuItems.nodes.map((el) => (
                            <Link href={el.path} key={el.id}>
                                <div className='w-fit h-12 mx-auto'>
                                    <a className='uppercase text-3xl tracking-widest cursor-pointer'>
                                        {el.label}
                                    </a>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='h-36'>
                
            </div>
        </div>
    )
}