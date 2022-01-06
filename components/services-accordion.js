import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons'

export default function ServicesAccordion({ service }) {

    const [isShowing, setIsShowing] = useState(false)

    const toggle = () => {
        setIsShowing(!isShowing)
    }

    return (
        <div
            className={`w-fit mx-auto mb-12 p-12 rounded-2xl transition-colors ease-in-out duration-500 ${isShowing && 'bg-stone-100'}`}
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
                className={`grid lg:grid-cols-2 w-full text-justice-stone col-span-1 items-center gap-x-16 transition-height ease-in-out duration-300 ${isShowing ? 'h-fit mb-12' : 'h-0'}`}
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