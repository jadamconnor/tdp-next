import { getJobOpenings, getCareersPageFields, getPrimaryMenu, getFooterMenu, getServicesItems } from '../lib/api'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../components/header'
import Footer from '../components/footer'
import FilterBar from '../components/filter-bar'
import Openings from '../components/openings'
import { useState, useEffect } from 'react'
import TopWorkplaces from '../components/top-workplaces'
import toast, { Toaster } from 'react-hot-toast'

let chipsArr = []

const notify = () => {
    toast.custom(
        <TopWorkplaces onDismiss={dismiss}/>,
        {
            position: 'bottom-right',
            duration: 40000
        }
    )
}

const dismiss = () => {
    toast.dismiss()
}

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
        },
        revalidate: 60
    }
}

export default function Careers({ careersFields, jobOpenings, primaryNav, footerNav, services, }) {
    const router = useRouter()

    const [ openings, setOpenings ] = useState(null)
    const [ chips, setChips ] = useState([])

    useEffect(() => {
        setOpenings(jobOpenings)
        setTimeout(() => {
            notify()
        }, 3000)

        router.events.on('routeChangeStart', dismiss )

        return () => {
            console.log('dismissing toast...')
            router.events.off('routeChangeStart', dismiss)
        }
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

    let filterSelects = [
        {
            label: 'Locations',
            items: locations,
            id: locations
        },
        {
            label: 'Program Type',
            items: programTypes,
            id: programTypes
        },

    ]

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

    // TODO: Program to interface! Not to implementation... This shuould be part of the filter bar interface.
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
            console.log(arr)
        } else {
            setOpenings(jobOpenings)
        }
    }

    return (
        <div>
            <Head>
                <title>Careers - The Difference Principle</title>
                <meta name='description' content='The Difference Principle is an equal opportunity/affirmative action employer.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header myMenu={primaryNav}/>
                <div className='container flex items-center px-6  xl:px-20 2xl:px-0'>
                    <div className='w-full lg:w-2/3 my-36'>
                        <div className='text-5xl text-justice-stone font-serif mb-3'>
                            {careersFields.intro[0].heading}
                        </div>
                        <div className='text-justice-stone text-3xl'>
                            {careersFields.intro[0].body}
                        </div>
                    </div>
                </div>
            <FilterBar chips={chips} onAddChip={addChip} onRemoveChip={removeChip} selectItems={filterSelects} />
            <div className='container px-6  xl:px-20 2xl:px-0'>
                <div className='text-5xl text-justice-stone font-serif w-fit underline underline-offset-[12px] leading-[70px] decoration-1 pb-1 mb-5'>
                    Current Positions
                </div>
            </div>
            <Openings openings={openings || jobOpenings} onAddChip={addChip}/>
            <Toaster />
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}