import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/pro-light-svg-icons'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'

export default function FilterBar({ programs, locations, chips, onAddChip, onRemoveChip }) {

    const [ showPrograms, setShowPrograms ] = useState(false)
    const [ showLocations, setShowLocations ] = useState(false)

    const toggleShowPrograms = () => {
        setShowPrograms(!showPrograms)
    }
    const toggleShowLocations = () => {
        setShowLocations(!showLocations)
    }

    return (
        <div className='container px-6 xl:px-0 my-12'>
            <div className='flex gap-3 my-6 h-8'>
                {chips.length > 0 &&
                    chips.map((chip) => (
                        <div className='flex justify-between items-center gap-2 rounded-2xl bg-stone-200 text-sm text-justice-blue font-bold py-1 px-3 w-fit' key={chip}>
                            <div>
                                {chip}
                            </div>
                            <div className='text-gray-500 text-xs font-bold cursor-pointer' onClick={() => onRemoveChip(chip)}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex text-justice-stone text-base gap-8'>
                <div className='font-semibold'>
                    Filter:
                </div>
                <div className='relative'>
                    <div
                        className='flex items-center px-3 cursor-pointer gap-2' 
                        onClick={() => {toggleShowPrograms(), setShowLocations(false)}}
                    >
                        <div className='align-baseline'>
                            Programs
                        </div>
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </div>
                    <div className={`absolute bg-white w-max top-6 left-0 p-3 ${!showPrograms && 'hidden'}`}>
                        {programs.map((el) => (
                            <div className='cursor-pointer mb-3' onClick={() => {setShowPrograms(false), onAddChip(el)}} key={el}>
                                {el}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='relative'>
                    <div
                        className='flex items-center px-3 cursor-pointer gap-2' 
                        onClick={() => {toggleShowLocations(), setShowPrograms(false)}}
                    >
                        <div className='align-baseline'>
                            Locations
                        </div>
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </div>
                    <div className={`absolute bg-white w-max top-6 left-0 p-3 ${!showLocations && 'hidden'}`}>
                        {locations.map((el) => (
                            <div className='cursor-pointer mb-3' onClick={() => {setShowLocations(false), onAddChip(el)}} key={el}>
                                {el}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}