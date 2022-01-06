import { getJobOpenings, getCareersPageFields, getPrimaryMenu, getFooterMenu, getServicesItems } from '../lib/api'
import Openings from '../components/openings'
import Header from '../components/header'
import Footer from '../components/footer'
import FilterBar from '../components/filter-bar'
import { useState, useEffect } from 'react'

export async function getStaticProps() {
    const careersFields = await getCareersPageFields()
    const jobOpenings = await getJobOpenings()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    return {
        props: {
            careersFields: careersFields.pageBy.careersPageFields,
            jobOpenings: jobOpenings.nodes,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services
        }
    }
}

let chipsArr = []

export default function Careers({ careersFields, jobOpenings, primaryNav, footerNav, services }) {
    
    const [ openings, setOpenings ] = useState(null)
    const [ chips, setChips ] = useState([])

    useEffect(() => {
        setOpenings(jobOpenings)
    }, [])

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
            // We're iterating over chips and filtering out job openings whose locations or program types match those chips' terms
            // then we're storing those openings in an array and finally setting openings state to the array
            chipsArr.map((chip) => arr.push(...jobOpenings.filter((opening) => opening.openingFields.programTypes.some((el) => el.programType === chip))
            .concat(jobOpenings.filter((opening) => opening.openingFields.location.some((el) => el.location === chip)))))
            setOpenings(arr)
        } else {
            setOpenings(jobOpenings)
        }
    }

    return (
        <div>
            <Header myMenu={primaryNav}/>
            <div className='container px-6 xl:px-0'>
                <div className='w-full lg:w-1/2 mt-28 mb-16'>
                    <div className='text-5xl text-justice-stone font-serif mb-3'>
                        {careersFields.intro[0].heading}
                    </div>
                    <div className='text-justice-stone text-3xl'>
                        {careersFields.intro[0].body}
                    </div>
                </div>
            </div>
            <FilterBar programs={programTypes} locations={locations} onAddChip={addChip} chips={chips} onRemoveChip={removeChip}/>
            <div className='container'>
                <div className='text-5xl text-justice-stone font-serif w-fit border-b border-b-justice-stone pb-1 mb-8'>
                    Current Positions
                </div>
            </div>
            <Openings openings={openings || jobOpenings}/>
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}