import { getJobOpenings, getServicesItems, getPrimaryMenu, getFooterMenu } from '../../lib/api'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Link from 'next/link'

export async function getStaticProps({ params }) {
    const data = await getJobOpenings()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()

    return {
        props: {
            openingFields: data.nodes,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            slug: params.slug
        }
    }
}

export async function getStaticPaths() {
    const data = await getJobOpenings()
	
	return {
		paths: data?.nodes.map((node) => `/careers/${node.slug}`) || [],
		fallback: 'blocking'
	}
}

export default function JobOpening({ openingFields, primaryNav, footerNav, slug }) {
    openingFields = openingFields.filter((el) => el.slug === slug)
    
    return (
        <div>
            <Header myMenu={primaryNav}/>
            {openingFields.map((el) => (
                <div className='container my-28 px-6 xl:px-0' key={el.id}>
                    <div className='flex flex-wrap justify-between'>
                        <div className='w-1/2'>
                            <div className='text-justice-stone text-5xl font-serif'>
                                {el.openingFields.jobTitle}
                            </div>
                            <div className='unreset text-justice-stone' dangerouslySetInnerHTML={{__html: el.openingFields.positionSummary}}/>
                            <div className='unreset text-justice-stone' dangerouslySetInnerHTML={{__html: el.openingFields.fullDescription}}/>
                        </div>
                        <div className='grid grid-cols-4 gap-y-1 bg-stone-100 rounded-xl p-5 w-96 h-fit top-56 sticky'>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Salary:
                            </div>
                            <div className='col-span-3 text-justice-stone text-sm'>
                                {el.openingFields.salary}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Deadline:
                            </div>
                            <div className='col-span-3 text-justice-stone text-sm'>
                                {el.openingFields.applicationDeadline}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Agency:
                            </div>
                            <div className='col-span-3 text-justice-stone text-sm'>
                                {el.openingFields.agency}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Program:
                            </div>
                            <div className='col-span-3 text-justice-blue text-sm cursor-pointer'>
                                {el.openingFields.programTypes.map((e, index) => (
                                    <div onClick={() => onAddChip(e.programType)} key={Object.keys(e)}>
                                        {index !== el.openingFields.programTypes.length - 1 ?
                                            <span>{e.programType}, </span>
                                        :
                                            <span>{e.programType}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Location:
                            </div>
                            <div className='col-span-3 text-justice-blue text-sm cursor-pointer'>
                                {el.openingFields.location.map((e, index) => (
                                    <div onClick={() => onAddChip(e.location)} key={Object.keys(e)}>
                                        {index !== el.openingFields.location.length - 1 ?
                                            <span>{e.location}, </span>
                                        :
                                            <span>{e.location}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className='col-span-1 text-justice-stone text-sm font-semibold mr-2'>
                                Terms:
                            </div>
                            <div className='col-span-3 text-justice-stone text-sm'>
                                {el.openingFields.positionTerms}
                            </div>
                        </div>
                    </div>
                    <div className='flex my-8'>
                    <Link href={`/apply/${el.slug}`}>
                            <a>
                                <div className='bg-justice-blue text-white text-sm font-bold rounded-lg p-3 tracking-wider'>
                                    APPLY
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}