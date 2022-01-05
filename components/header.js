import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
                <div className='container flex justify-between items-center py-6'>
                    <div className='relative w-48 h-24'>
                        <Image
                            src={'/TDPLogo.webp'}
                            objectFit='contain'
                            layout='fill'
                            quality={100}
                        />
                    </div>
                    <div className='flex w-fit text-justice-gray gap-5 h-fit'>
                        {myMenu.menuItems.nodes.map((el) => (
                            <Link href={el.path} key={el.id}>
                                <a className='uppercase text-lg tracking-widest cursor-pointer'>
                                    {el.label}
                                </a>
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