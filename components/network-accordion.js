import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons'

export default function NetworkAccordion({ copy }) {

    const [isShowing, setIsShowing] = useState(false)

    const toggle = () => {
        setIsShowing(!isShowing)
    }

    return (
        <div
            className={
                isShowing ? 
                    'container w-fit mx-auto p-6 lg:p-12 rounded-2xl bg-white' 
                : 
                    'container w-fit mx-auto p-6 lg:p-12 rounded-2xl'
            }
        >
            <div className='font-serif text-justice-stone text-5xl w-full text-center underline decoration-1 underline-offset-[12px] mb-12'>
                {copy.title}
            </div>
            <div className='text-3xl text-center text-justice-stone mb-12'>
                {copy.subheading}
            </div>
            <div className={`grid lg:grid-cols-3 gap-x-12 transition-all ease-in-out duration-300 ${isShowing ? 'h-full' : 'h-0'}`}>
                {copy.partner.map((partner, index) => (
                    <div className='col-span-1' key={partner.blurb}>
                        <div className={`relative h-28 mx-auto mb-6 ${isShowing ? 'block' : 'hidden'} ${partner.name === 'JusticePoint' ? 'w-3/5 xl:w-5/12' : 'w-1/2 xl:w-1/4'}`}>
                            <img
                                className={`absolute  ${partner.name === 'JusticePoint' ? '-bottom-4' : 'bottom-0'}`}
                                src={partner.logo.sourceUrl}
                            />
                        </div>
                        <div className={`block text-justice-stone text-sm text-center mb-12 lg:mb-4 mx-auto ${isShowing ? 'block' : 'hidden'}`}>
                            {partner.blurb}
                        </div>
                    </div>
                ))}
            </div>
            <div className={isShowing ? 'hidden justify-center' : 'flex justify-center'}>
                <div
                    onClick={() => toggle()} 
                    className='text-base text-justice-blue cursor-pointer'
                >
                    MORE
                    <div className='flex justify-center text-2xl text-justice-blue'>
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </div>
                </div>
            </div>
            <div className={isShowing ? 'flex justify-center' : 'hidden justify-center'}>
                <div
                    onClick={() => toggle()} 
                    className='text-base text-justice-blue cursor-pointer'
                >
                    LESS
                    <div className='flex justify-center text-2xl text-justice-blue'>
                        <FontAwesomeIcon icon={faCaretUp}/>
                    </div>
                </div>
            </div>
        </div>
    )
}