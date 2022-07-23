import EmploymentApp from '../../src/employment-app'
import { getJobOpenings, getJobOpeningBySlug, getServicesItems, getPrimaryMenu, getFooterMenu } from '../../lib/api'
import Header from '../../components/header'
import Footer from '../../components/footer'

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
		paths: data?.nodes.map((node) => `/apply/${node.slug}`) || [],
		fallback: 'blocking'
	}
}

export default function Apply({ openingFields, primaryNav, footerNav, services, slug, loggedIn, user, onLogin, onLogout  }) {

    return (
        <div>
            <Header myMenu={primaryNav} loggedIn={loggedIn} user={user} onLogin={onLogin} onLogout={onLogout}/>
            {/* Intro */}
            <div className='container px-6 xl:px-20 2xl:px-0' key={openingFields.id}>
                <div className='w-full lg:w-1/2 my-36'>
                    <div className='text-5xl text-justice-stone font-serif mb-3'>
                        {openingFields.title}
                    </div>
                    <div className='text-justice-stone text-3xl'>
                        Please fill out the application below
                    </div>
                </div>
            </div>
            <EmploymentApp jobOpening={openingFields}/>
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}