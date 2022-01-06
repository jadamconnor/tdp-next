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

export default function Careers({ careersFields, jobOpenings, primaryNav, footerNav, services }) {

    const [ openings, setOpenings ] = useState(null)

    useEffect(() => {
        setOpenings(jobOpenings)
    }, [])

    const filter = (arr) => {
        setOpenings(arr)
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
            <FilterBar jobOpenings={jobOpenings} onFilter={filter}/>
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