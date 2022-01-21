
import { useState, useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'

// Hook
function useLockBodyScroll() {
    useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
    }, []); // Empty array ensures effect is only run on mount and unmount
}

export default function BioModal({onClose, content}) {
    useLockBodyScroll()

    return (
        <div className='fixed flex md:items-center justify-center w-screen h-screen -mt-28 bg-black/50 z-50 overflow-scroll'>
            <div className='relative h-fit text-xl text-smart-blue bg-white m-6 p-8 w-full lg:w-3/4 rounded-xl'>
                <FontAwesomeIcon icon={faTimes}
                    className='cursor-pointer absolute top-4 right-4'
                    onClick={onClose}
                />
                <div className='font-serif text-justice-blue text-xl mb-1 tracking-wider font-bold'>
                    {content.name}
                </div>
                <div className='text-base md:text-lg mb-5'>
                    {content.title}
                </div>
                <div className='modal' dangerouslySetInnerHTML={{__html: content.bio}}>
                </div>
            </div>
        </div>
    )
}