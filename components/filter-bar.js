import { useState, useEffect } from 'react'
import Openings from './openings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/pro-light-svg-icons'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'

let chipsArr = []

export default function FilterBar({ jobOpenings }) {

    const [ showPrograms, setShowPrograms ] = useState(false)
    const [ showLocations, setShowLocations ] = useState(false)
    const [ chips, setChips ] = useState([])
    const [ openings, setOpenings ] = useState(null)

    useEffect(() => {
        setOpenings(jobOpenings)
    }, [])

    const filter = (arr) => {
        setOpenings(arr)
    }

    const toggleShowPrograms = () => {
        setShowPrograms(!showPrograms)
    }
    const toggleShowLocations = () => {
        setShowLocations(!showLocations)
    }

    let locations = []
    jobOpenings.forEach((opening) => {
        opening.openingFields.location.map((el) => {
            !locations.includes(el.location) && locations.push(el.location)
        })
    })

    let programTypes = []
    jobOpenings.forEach((opening) => {
        opening.openingFields.programTypes.map((el) => {
            !programTypes.includes(el.programType) && programTypes.push(el.programType)
        })
    })

    const addChip = (term) => {
        !chipsArr.some((el) => el === term) && chipsArr.push(term)
        setChips(chipsArr)
        filter()
    }

    const removeChip = (term) => {
        chipsArr = chipsArr.filter((chip) => chip !== term)
        setChips(chipsArr)
        filter()
    }
    
    const filter = () => {
        let arr = []
        if (chipsArr.length > 0) {
            // We're iterating over chips and filtering out job openings whose locations or program types match those chips' terms,
            // then we're storing those openings in an array and finally setting openings state to the array
            chipsArr.map((chip) => arr.push(...jobOpenings.filter((opening) => opening.openingFields.programTypes.some((el) => el.programType === chip))
            .concat(jobOpenings.filter((opening) => opening.openingFields.location.some((el) => el.location === chip)))))
            // Now we remove duplicate openings from array
            arr = [...new Map(arr.map(v => [v.id, v])).values()]
            setOpenings(arr)
        } else {
            setOpenings(jobOpenings)
        }
    }

    return (
        <div>
        <div className='container px-6 xl:px-0 my-12'>
            <div className='flex gap-3 my-6 h-8'>
                {chips.length > 0 &&
                    chips.map((chip) => (
                        <div className='flex justify-between items-center gap-2 rounded-2xl bg-stone-200 text-sm text-justice-blue font-bold py-1 px-3 w-fit' key={chip}>
                            <div>
                                {chip}
                            </div>
                            <div className='text-gray-500 text-xs font-bold cursor-pointer' onClick={() => removeChip(chip)}>
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
                        {programTypes.map((el) => (
                            <div className='cursor-pointer mb-3' onClick={() => {setShowPrograms(false), addChip(el)}} key={el}>
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
                            <div className='cursor-pointer mb-3' onClick={() => {setShowLocations(false), addChip(el)}} key={el}>
                                {el}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='text-5xl text-justice-stone font-serif w-fit border-b border-b-justice-stone pb-1 mb-8'>
                Current Positions
            </div>
        </div>
        <Openings openings={openings || jobOpenings} onAddChip={addChip}/>
        </div>
    )
}