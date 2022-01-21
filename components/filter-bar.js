import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/pro-light-svg-icons'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'

export default function FilterBar({ chips, onAddChip, onRemoveChip, selectItems }) {
    
    const [shownDropdown, setShownDropdown] = useState({})
    
    function toggleSelect(id) {
        setShownDropdown(prev => Boolean(!prev[id]) ? {...prev, [id]: true} : {...prev, [id]: false})
    }

    return (
        <div className='container my-12 px-6 lg:px-0'>
            <div className='flex flex-wrap gap-3 my-6 min-h-[32px]'>
                {chips.length > 0 &&
                    chips.map((chip) => (
                        <div className='flex flex-wrap justify-between items-center gap-2 rounded-2xl bg-stone-200 text-sm text-justice-blue font-bold py-1 px-3 w-fit' key={chip}>
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
            <div className='flex flex-wrap text-justice-stone text-base gap-8'>
                <div className='font-semibold'>
                    Filter:
                </div>
                {selectItems.map((select, index) => (
                    <div className='relative' key={select.id}>
                        <div
                            className='flex items-center px-3 cursor-pointer gap-2' 
                            onClick={() => toggleSelect(select.id)}
                        >
                            <div className='align-baseline'>
                                {select.label}
                            </div>
                            <FontAwesomeIcon icon={faCaretDown}/>
                        </div>
                        {shownDropdown[select.id] &&
                            <div className={`absolute bg-white w-max top-6 left-0 p-3 z-50`}>
                                {select.items.map((el, index) => (
                                    <div className='cursor-pointer mb-3' onClick={() => {toggleSelect(select.id), onAddChip(el)}} key={el}>
                                        {el}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                ))}
                {/*
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
                        {programTypes.map((el) => (
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
                 */}
            </div>
        </div>
    )
}