import { getServicesItems, getPrimaryMenu, getFooterMenu, getNewsItems, getNewsItemBySlug } from '../../lib/api'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/pro-light-svg-icons'

export async function getStaticProps({ params }) {
    const data = await getNewsItemBySlug(params.slug)
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    if (!data.newsItemBy) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            newsItem: data.newsItemBy, 
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services,
            slug: params.slug
        },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    const data = await getNewsItems()
	
	return {
		paths: data.newsItems.edges.map((el) => `/news/${el.node.slug}`) || [],
		fallback: 'blocking'
	}
}

export default function NewsItem({ newsItem, primaryNav, footerNav, slug, services }) {
    
    return (
        <div>
            <Header myMenu={primaryNav}/>
            <div className='container text-justice-blue text-lg mt-28 px-6  xl:px-20 2xl:px-0'>
                <Link href={'/news'}>
                    <a>
                        <FontAwesomeIcon className='mr-2' icon={faCaretLeft}/>
                        BACK TO NEWS
                    </a>
                </Link>
            </div>
            <div className='container px-6  xl:px-20 2xl:px-0'>
                <div className='lg:w-3/4'>
                    <div className='font-serif text-4xl mt-12'>
                        {newsItem.newsItemFields.title}
                    </div>
                    <div className='mt-3'>
                        {newsItem.newsItemFields.published}
                    </div>
                    <div className='news mt-6' dangerouslySetInnerHTML={{__html: newsItem.newsItemFields.content}}>
                    </div>
                </div>
            </div>
            <div className='container text-justice-blue text-lg my-28 px-6  xl:px-20 2xl:px-0'>
                <Link href={'/news'}>
                    <a>
                        <FontAwesomeIcon className='mr-2' icon={faCaretLeft}/>
                        BACK TO NEWS
                    </a>
                </Link>
            </div>
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}