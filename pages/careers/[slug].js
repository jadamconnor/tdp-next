import { getJobOpenings, getJobOpeningBySlug, getServicesItems, getPrimaryMenu, getFooterMenu } from '../../lib/api'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Link from 'next/link'

export async function getStaticProps({ params }) {
    const data = await getJobOpeningBySlug(params.slug)
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    if (!data.openingBy) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            openingFields: data.openingBy,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            slug: params.slug,
            services: services
        },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    const data = await getJobOpenings()
	
	return {
		paths: data?.nodes.map((node) => `/careers/${node.slug}`) || [],
		fallback: 'blocking'
	}
}

export default function JobOpening({ openingFields, primaryNav, footerNav, slug, services }) {
    
    return (
        <div>
            <Header myMenu={primaryNav}/>
            <div className='container my-28 px-6  xl:px-20 2xl:px-0' key={openingFields.id}>
                <div className='flex flex-wrap justify-between'>
                    <div className='w-full lg:w-1/2 mb-6'>
                        <div className='text-justice-stone text-5xl font-serif mb-8'>
                            {openingFields.title}
                        </div>
                        <div className='unreset text-justice-stone' dangerouslySetInnerHTML={{__html: openingFields.openingFields.positionSummary}}/>
                        <div className='unreset text-justice-stone' dangerouslySetInnerHTML={{__html: openingFields.openingFields.fullDescription}}/>
                    </div>
                    <div className='grid grid-cols-4 gap-y-1 bg-stone-100 rounded-xl p-5 w-96 h-fit top-56 sticky'>
                        <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                            Salary:
                        </div>
                        <div className='col-span-3 text-justice-stone text-sm'>
                            {openingFields.openingFields.salary}
                        </div>
                        <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                            Deadline:
                        </div>
                        <div className='col-span-3 text-justice-stone text-sm'>
                            {openingFields.openingFields.applicationDeadline ? 
                                openingFields.openingFields.applicationDeadline
                            :
                                'Until Filled'
                            }
                        </div>
                        <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                            Agency:
                        </div>
                        {openingFields.openingFields.agency === 'The Difference Principle' &&
                            <div className='col-span-3 text-justice-blue text-sm'>
                                {openingFields.openingFields.agency}
                            </div>
                        }
                        {openingFields.openingFields.agency === 'JusticePoint' &&
                            <div className='col-span-3 text-justice-orange text-sm'>
                                {openingFields.openingFields.agency}
                            </div>
                        }
                        {openingFields.openingFields.agency === 'Sirona Recovery' &&
                            <div className='col-span-3 text-justice-green text-sm'>
                                {openingFields.openingFields.agency}
                            </div>
                        }
                        <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                            Program:
                        </div>
                        {openingFields.openingFields.agency === 'The Difference Principle' &&
                            <div className='col-span-3 text-justice-blue text-sm cursor-pointer'>
                                {openingFields.openingFields.programTypes.map((e, index) => (
                                    <div onClick={() => onAddChip(e.programType)} key={Object.keys(e)}>
                                        {index !== openingFields.openingFields.programTypes.length - 1 ?
                                            <span>{e.programType}, </span>
                                        :
                                            <span>{e.programType}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                        {openingFields.openingFields.agency === 'JusticePoint' &&
                            <div className='col-span-3 text-justice-orange text-sm cursor-pointer'>
                                {openingFields.openingFields.programTypes.map((e, index) => (
                                    <div onClick={() => onAddChip(e.programType)} key={Object.keys(e)}>
                                        {index !== openingFields.openingFields.programTypes.length - 1 ?
                                            <span>{e.programType}, </span>
                                        :
                                            <span>{e.programType}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                        {openingFields.openingFields.agency === 'Sirona Recovery' &&
                            <div className='col-span-3 text-justice-green text-sm cursor-pointer'>
                                {openingFields.openingFields.programTypes.map((e, index) => (
                                    <div onClick={() => onAddChip(e.programType)} key={Object.keys(e)}>
                                        {index !== openingFields.openingFields.programTypes.length - 1 ?
                                            <span>{e.programType}, </span>
                                        :
                                            <span>{e.programType}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                        <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                            Location:
                        </div>
                        {openingFields.openingFields.agency === 'The Difference Principle' &&
                            <div className='col-span-3 text-justice-blue text-sm cursor-pointer'>
                                {openingFields.openingFields.location.map((e, index) => (
                                    <div onClick={() => onAddChip(e.location)} key={Object.keys(e)}>
                                        {index !== openingFields.openingFields.location.length - 1 ?
                                            <span>{e.location}, </span>
                                        :
                                            <span>{e.location}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                        {openingFields.openingFields.agency === 'JusticePoint' &&
                            <div className='col-span-3 text-justice-orange text-sm cursor-pointer'>
                                {openingFields.openingFields.location.map((e, index) => (
                                    <div onClick={() => onAddChip(e.location)} key={Object.keys(e)}>
                                        {index !== openingFields.openingFields.location.length - 1 ?
                                            <span>{e.location}, </span>
                                        :
                                            <span>{e.location}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                        {openingFields.openingFields.agency === 'Sirona Recovery' &&
                            <div className='col-span-3 text-justice-green text-sm cursor-pointer'>
                                {openingFields.openingFields.location.map((e, index) => (
                                    <div onClick={() => onAddChip(e.location)} key={Object.keys(e)}>
                                        {index !== openingFields.openingFields.location.length - 1 ?
                                            <span>{e.location}, </span>
                                        :
                                            <span>{e.location}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                        <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                            Terms:
                        </div>
                        <div className='col-span-3 text-justice-stone text-sm'>
                            {openingFields.openingFields.positionTerms}
                        </div>
                    </div>
                </div>
                <div className='flex my-8'>
                    {openingFields.openingFields.agency === 'The Difference Principle' &&
                        <Link href={`/apply/${openingFields.slug}`}>
                            <a>
                                <div className='bg-justice-blue text-white text-sm font-bold rounded-lg p-3 tracking-wider'>
                                    APPLY
                                </div>
                            </a>
                        </Link>
                    }
                    {openingFields.openingFields.agency === 'JusticePoint' &&
                        <Link href={`/apply/${openingFields.slug}`}>
                            <a>
                                <div className='bg-justice-orange text-white text-sm font-bold rounded-lg p-3 tracking-wider'>
                                    APPLY
                                </div>
                            </a>
                        </Link>
                    }
                    {openingFields.openingFields.agency === 'Sirona Recovery' &&
                        <Link href={`/apply/${openingFields.slug}`}>
                            <a>
                                <div className='bg-justice-green text-white text-sm font-bold rounded-lg p-3 tracking-wider'>
                                    APPLY
                                </div>
                            </a>
                        </Link>
                    }
                </div>
            </div>
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}