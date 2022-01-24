import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons'

export default function Footer({ myMenu, services }) {
    const [ networkOpen, setNetworkOpen ] = useState(false)

    const toggleNetworkOpen = () => {
        setNetworkOpen(!networkOpen)
    }
    
    return (
        <div className='bg-justice-gray w-full py-14 px-6 2xl:px-0'>
            <div className='container grid md:grid-cols-5 gap-5'>
                <div className='mb-6 md:mb-0'>
                    <div className='text-xs text-justice-blue font-bold tracking-widest border-b border-b-justice-brown pb-3 mb-3'>
                        CONTENT
                    </div>
                    {myMenu.menuItems.nodes.map((el) => (
                        <div className='relative uppercase text-white/50 mb-1' key={el.id}>
                            {(!el.parentId && el.label !== 'Network') &&
                                <Link href={el.path}>
                                    <a>
                                        {el.label}
                                    </a>
                                </Link>
                            }
                            {!el.parentId && el.label === 'Network' &&
                                <div onClick={() => toggleNetworkOpen()} className={`cursor-pointer`}>
                                    {el.label}
                                    {!networkOpen ?
                                        <FontAwesomeIcon className='ml-1' icon={faCaretDown}/>
                                    :
                                        <FontAwesomeIcon className='ml-1' icon={faCaretUp}/>
                                    }
                                </div>
                            }
                            {networkOpen &&
                                <div className='absolute top-0 -left-1 bg-stone-300 text-justice-stone z-50 px-1'>
                                    {el.parentId &&
                                        myMenu.menuItems.nodes.filter(el => el.parentId).map((el) => (
                                            <div className='mb-1' key={el.path}>
                                                <a href={el.path} target='_blank' rel='noreferrer'>
                                                    {el.label}
                                                </a>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <div className='flex flex-col justify-between mb-6 md:mb-0'>
                    <div className='mb-6 md:mb-0'>
                        <div className='text-xs text-justice-blue font-bold tracking-widest border-b border-b-justice-brown pb-3 mb-3'>
                            FOLLOW US
                        </div>
                        <div className='flex text-white/50 text-2xl gap-2'>
                            <a href='https://www.linkedin.com/company/10448013' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faLinkedin}/>
                            </a>
                        </div>
                    </div>
                    <div className='mb-6 md:mb-0'>
                        <div className='text-xs text-justice-blue font-bold tracking-widest border-b border-b-justice-brown pb-3 mb-3'>
                            ADMINISTRATION
                        </div>
                        <div className='text-xs text-white/50 mb-3'>
                            <p><b>The Difference Principle Inc.</b></p>
                            <p>205 West Highland Avenue, Suite 509</p>
                            <p>Milwaukee, WI 53203</p>
                        </div>
                        <div className='text-xs text-white/50'>
                            <a href='mailto:info@differenceprinciple.org'>
                                info@differenceprinciple.org
                            </a>
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex text-center justify-center h-full mb-6 md:mb-0'>
                    <div className='relative h-full w-14'>
                        <Image
                            src='/FooterTDPIcon.png'
                            alt='The Difference Principle Icon'
                            objectFit='contain'
                            layout='fill'
                            quality={100}
                        />
                    </div>
                </div>
                <div className='mb-6 md:mb-0'>
                    <div className='text-xs text-justice-blue font-bold tracking-widest border-b border-b-justice-brown pb-3 mb-3'>
                        SERVICES
                    </div>
                    <div className='text-white/50'>
                        {services.map((el) => (
                            <div className='text-xs font-bold mb-3' key={el.id}>
                                <Link href={`/services#${el.id}`}>
                                    <a>
                                        {el.name}
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className='text-xs text-justice-blue font-bold tracking-widest border-b border-b-justice-brown pb-3 mb-3'>
                        NETWORK
                    </div>
                    <div className='text-white/50 text-xs font-bold'>
                        <div className='mb-3'>Sirona Recovery Inc.</div>
                        <div className='mb-3'>JusticePoint</div>
                        <div className='mb-3'>Justice Initiatives Institute</div>
                    </div>
                </div>
            </div>
        </div>
    )
}