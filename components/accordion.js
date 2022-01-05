import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons'

export default function Accordion({ service }) {

    const [isShowing, setIsShowing] = useState(false)

    const toggle = () => {
        setIsShowing(!isShowing)
    }

    return (
        <div
            className={
                isShowing ? 
                    'w-fit bg-stone-100 mx-auto mb-12 p-12 rounded-2xl transition-colors ease-in-out duration-500' 
                : 
                    'w-fit mx-auto mb-12 p-12 rounded-2xl transition-colors ease-in-out duration-500'
            } 
            key={service.id}
        >
            <div className='flex justify-center'>
                <div className='text-3xl text-justice-stone font-serif w-fit border-b border-b-justice-stone pb-1 mb-6'>
                    {service.name}
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-12 h-12 bg-justice-blue rounded-full mb-6'>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='text-center text-xl text-justice-stone mb-6'>
                    {service.description}
                </div>
            </div>
            <div 
                className={
                    isShowing ? 
                        'grid grid-cols-2 w-full text-justice-stone col-span-1 items-center gap-x-16 mb-12 h-fit transition-all ease-in-out duration-600' 
                    : 
                        'grid grid-cols-2 w-full text-justice-stone col-span-1 items-center gap-x-16 h-0 transition-all ease-in-out duration-600'
                }
            >
                {service.responsibilities.map((el) => (
                    <div className={isShowing ? 'flex flex-wrap items-center text-lg uppercase border-b border-b-justice-blue h-full py-2' : 'hidden'} key={el.label}>
                        <div className='w-full text-center'>
                            {el.label}
                        </div>
                        {el.subItems &&
                            <div className='font-light w-full text-center '>
                                {el.subItems.map((e, index) => (
                                    <span key={e + index}>
                                        {index === el.subItems.length - 1 ?
                                            <span>{e}</span>
                                            :
                                            <span>{e} / </span>
                                        }
                                    </span>
                                ))}
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className='flex justify-center'>
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
        </div>
    )
}
