import Image from "next/image"

export default function RichCta({ myFields }) {

    return (
        <div className='relative w-full h-[400px]'>
            <Image
                src={myFields[0].backgroundImage.sourceUrl}
                objectFit='cover'
                layout='fill'
                quality={100}
                priority
            />
            <div 
                className={myFields[0].justify[0] === 'right' ?
                    'absolute h-full w-full top-0 bottom-0 bg-gradient-to-r to-yellow-500 from-cyan-500 mix-blend-multiply opacity-40'
                : 
                    'absolute h-full w-full top-0 bottom-0 bg-gradient-to-r from-yellow-500 to-cyan-500 mix-blend-multiply opacity-40'
                }
            >
            </div>
            <div 
                className={myFields[0].justify[0] === 'right' ?
                    'absolute h-full w-full top-0 bottom-0 bg-gradient-to-r to-black from-cyan-200 mix-blend-multiply opacity-80'
                :
                    'absolute h-full w-full top-0 bottom-0 bg-gradient-to-r from-black to-cyan-200 mix-blend-multiply opacity-60'
                }
            >
            </div>
            <div className='absolute w-full h-full'>
                <div className='container grid grid-cols-4 h-full items-center gap-5 px-6 xl:px-0'>
                    <div className={myFields[0].justify[0] === 'right' ? 'col-span-4 lg:col-span-2 lg:col-start-3' : 'col-span-4 lg:col-span-2'}>
                        <div className='font-serif text-white text-3xl w-fit pb-3 mb-3 border-b-white border-b'>
                            {myFields[0].heading}
                        </div>
                        <div className='text-white text-lg mb-3'>
                            {myFields[0].body}
                        </div>
                        <div className='text-justice-blue font-semibold text-lg tracking-wider underline underline-offset-8 decoration-1'>
                            {myFields[0].uRLText}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}