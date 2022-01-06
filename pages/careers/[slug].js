import { getJobOpenings, getServicesItems, getPrimaryMenu, getFooterMenu } from '../../lib/api'
import Header from '../../components/header'
import Footer from '../../components/footer'

export async function getStaticProps(params) {
    const data = await getJobOpenings()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()

    return {
        props: {
            openingFields: data.nodes,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
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

export default function JobOpening({ openingFields, primaryNav, footerNav }) {
    
    return (
        <div>
            {openingFields.map((el) => (
                <div key={el.id}>
                    {el.openingFields.jobTitle}
                </div>
            ))}
        </div>
    )
}