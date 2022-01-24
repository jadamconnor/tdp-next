import Image from 'next/image'
import Link from 'next/link'
import { Fade } from 'react-awesome-reveal'

export default function RichCta({ myFields }) {

    return (
        <div className='relative w-full h-[400px] lg:h-[600px]'>
            <Image
                src={myFields[0].backgroundImage.sourceUrl}
                alt={myFields[0].backgroundImage.altText}
                objectFit='cover'
                layout='fill'
                quality={100}
                priority
            />
            <Fade duration={1200} triggerOnce={true}>
                <Image
                    src={myFields[0].overlayImage.sourceUrl}
                    alt={myFields[0].overlayImage.altText}
                    objectFit='cover'
                    layout='fill'
                    quality={100}
                    priority
                />
            </Fade>
            <div className='absolute w-full h-full'>
                <div className='container grid grid-cols-4 h-full items-center gap-5 px-6 2xl:px-0'>
                    <div className={myFields[0].justify[0] === 'right' ? 'col-span-4 lg:col-span-2 lg:col-start-3' : 'col-span-4 lg:col-span-2'}>
                            <div className='font-serif text-white text-4xl w-fit mb-3 underline underline-offset-[12px] leading-[60px] decoration-1'>
                                {myFields[0].heading}
                            </div>
                            <div className='text-white text-lg mb-3'>
                                {myFields[0].body}
                            </div>
                            <Link href={myFields[0].uRL}>
                                <a>
                                    <div className='text-justice-blue font-semibold text-lg tracking-wider underline underline-offset-8 decoration-1'>
                                        {myFields[0].uRLText}
                                    </div>
                                </a>
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}