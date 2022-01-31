import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'

export default function Footer({ myMenu, services }) {
    
    return (
        <div className='bg-justice-gray w-full py-32 px-6 xl:px-20 2xl:px-0'>
            <div className='container grid md:grid-cols-5 gap-5'>
                <div className='mb-6 md:mb-0'>
                    <div className='text-xs text-justice-blue font-bold tracking-widest border-b border-b-justice-brown pb-3 mb-3'>
                        CONTENT
                    </div>
                    {myMenu.menuItems.nodes.map((el) => (
                        <div className='relative text-2xl uppercase text-white/50 mb-1' key={el.id}>
                            {el.label !== 'Donate' ?
                                <Link href={el.path}>
                                    <a>
                                        {el.label}
                                    </a>
                                </Link>
                            :
                                <a href={el.path} target='_blank' rel='noreferrer'>
                                    {el.label}
                                </a>
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
                            <a href='https://www.facebook.com/TheDifferencePrinciple' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faFacebook}/>
                            </a>
                            <a href='https://twitter.com/DiffPrinciple' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faTwitter}/>
                            </a>
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
                        <a href='https://sironarecovery.org' target='_blank' rel='noreferrer'>
                            <div className='mb-3'>Sirona Recovery Inc.</div>
                        </a>
                        <a href='https://justicepoint.org' target='_blank' rel='noreferrer'>
                            <div className='mb-3'>JusticePoint</div>
                        </a>
                        <a href='https://www.jiinstitute.org/' target='_blank' rel='noreferrer'>
                            <div className='mb-3'>Justice Initiatives Institute</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}