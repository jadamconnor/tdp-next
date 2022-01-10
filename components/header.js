import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/pro-solid-svg-icons'

export default function Header({ myMenu }) {
    const [scrollY, setScrollY] = useState(0)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset
        
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 80)
        
        setPrevScrollPos(currentScrollPos)
    }
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        
        return () => window.removeEventListener('scroll', handleScroll)
        
    }, [prevScrollPos, visible, handleScroll])

    return (
        <div>
            <div
                className={visible ? 
                    'top-0 bg-white fixed w-full transition-[top] ease-in-out duration-300 z-50 shadow-md' 
                : 
                    'top-[-150px] bg-white fixed w-full transition-[top] ease-in-out duration-300 z-50 shadow-md'}
            >
                <div className='container  flex justify-between items-center py-6'>
                    <Link href={'/'}>
                        <a>
                            <div className='relative w-48 h-24'>
                                <Image
                                    src={'/TDPLogo.webp'}
                                    alt='The Difference Principle Logo'
                                    objectFit='contain'
                                    layout='fill'
                                    quality={100}
                                />
                            </div>
                        </a>
                    </Link>
                    <div className='hidden lg:flex w-fit text-justice-gray gap-5 h-fit'>
                        {myMenu.menuItems.nodes.map((el) => (
                            <Link href={el.path} key={el.id}>
                                <a className='uppercase text-lg tracking-widest cursor-pointer'>
                                    {el.label}
                                </a>
                            </Link>
                        ))}
                    </div>
                    <div className='flex lg:hidden w-fit text-justice-gray text-3xl gap-5 h-fit'>
                        <FontAwesomeIcon icon={faBars}/>
                    </div>
                </div>
            </div>
            <div className='h-36'>
            </div>
        </div>
    )
}