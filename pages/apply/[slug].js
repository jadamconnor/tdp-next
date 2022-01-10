import EmploymentApp from '../../src/employment-app'
import { getJobOpenings, getServicesItems, getPrimaryMenu, getFooterMenu } from '../../lib/api'
import Header from '../../components/header'
import Footer from '../../components/footer'

export async function getStaticProps({ params }) {
    const data = await getJobOpenings()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    return {
        props: {
            openingFields: data.nodes,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            slug: params.slug,
            services: services
        },
        revalidate: 1
    }
}

export async function getStaticPaths() {
    const data = await getJobOpenings()
	
	return {
		paths: data?.nodes.map((node) => `/apply/${node.slug}`) || [],
		fallback: 'blocking'
	}
}

export default function Apply({ openingFields, primaryNav, footerNav, services, slug }) {
    openingFields = openingFields.filter((el) => el.slug === slug)

    return (
        <div>
            <Header myMenu={primaryNav}/>
            {/* Intro */}
            {openingFields.map((el) => (
                <div className='container ' key={el.id}>
                    <div className='w-full lg:w-1/2 my-28'>
                        <div className='text-5xl text-justice-stone font-serif mb-3'>
                            {el.openingFields.jobTitle}
                        </div>
                        <div className='text-justice-stone text-3xl'>
                            Please fill out the application below
                        </div>
                    </div>
                </div>
            ))}
            <EmploymentApp jobOpening={openingFields}/>
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}