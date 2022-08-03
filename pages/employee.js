
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth-context'
import Header from '../components/header'
import Footer from '../components/footer'
import { getPrimaryMenu, getFooterMenu, getServicesItems, getEmployeeResourceFields } from '../lib/api'

export async function getStaticProps() {
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()
    const resources = await getEmployeeResourceFields()

    return {
        props: {
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services,
            resources: resources
        },
        revalidate: 60
    }
}

export default function Employee({ footerNav, primaryNav, services, resources }) {
    const { user, login, logout } = useContext(AuthContext)
    console.log(user)
    console.log(resources)


    return (
        <>
            <Header myMenu={primaryNav}/>
            {!user?.app_metadata?.roles?.length &&
            <div className='container px-6 xl:px-20 2xl:px-0 my-24'>
                You do not have permission to view this page.
            </div>
            }
            {user?.app_metadata?.roles.includes('Level 1') &&
            <div className='container px-6 xl:px-20 2xl:px-0 my-24'>
                <div className='unreset' dangerouslySetInnerHTML={{__html: resources.employeeResourceFields.employeeResources}}/>
            </div>
            }
            <Footer myMenu={footerNav} services={services}/>
        </>
    )
}