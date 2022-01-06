import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons'

export default function AboutAccordion({ copy }) {

    const [isShowing, setIsShowing] = useState(false)

    const toggle = () => {
        setIsShowing(!isShowing)
    }

    return (
        <div
            className={
                isShowing ? 
                    'w-fitmx-auto mb-12 p-12 rounded-2xl' 
                : 
                    'w-fit mx-auto mb-12 p-12 rounded-2xl'
            }
        >
            <div className='flex justify-center'>
                <div className='text-3xl text-justice-stone font-serif w-fit border-b border-b-justice-stone pb-1 mb-6'>
                    {copy.heading}
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='text-center text-xl text-justice-stone mb-6'>
                    {copy.bodyCollapsed}
                </div>
            </div>
            <div className={`flex flex-col transition-height ease-in-out duration-300 ${isShowing ? 'h-full' : 'h-0'}`}>
                <div className={`text-center text-xl text-justice-stone mb-6 transition-all ease-in-out duration-500 ${isShowing || 'text-justice-stone/0'}`}>
                    {copy.bodyExpanded}
                </div>
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
