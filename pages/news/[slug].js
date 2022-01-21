import { getJobOpenings, getServicesItems, getPrimaryMenu, getFooterMenu, getNewsItems } from '../../lib/api'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Link from 'next/link'

export async function getStaticProps({ params }) {
    const data = await getNewsItems()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    return {
        props: {
            newsItems: data.newsItems.edges, 
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services,
            slug: params.slug
        },
        revalidate: 1
    }
}

export async function getStaticPaths() {
    const data = await getNewsItems()
	
	return {
		paths: data.newsItems.edges.map((el) => `/news/${el.node.slug}`) || [],
		fallback: 'blocking'
	}
}

export default function NewsItem({ newsItems, primaryNav, footerNav, slug, services }) {
    const newsItem = newsItems.filter((el) => el.node.slug === slug)
    console.log(newsItem)
    
    return (
        <div>
            <Header myMenu={primaryNav}/>
            <div className='container text-justice-blue text-lg mt-28 px-6 lg:px-0'>
                <Link href={'/news'}>
                    <a>
                        BACK TO NEWS
                    </a>
                </Link>
            </div>
            <div className='container px-6 lg:px-0'>
                <div className='font-serif text-4xl mt-12'>
                    {newsItem[0].node.newsItemFields.title}
                </div>
                <div className='mt-3'>
                    {newsItem[0].node.newsItemFields.published}
                </div>
                <div className='news mt-6' dangerouslySetInnerHTML={{__html: newsItem[0].node.newsItemFields.content}}>
                </div>
            </div>
            <div className='container text-justice-blue text-lg mt-28 px-6 lg:px-0'>
                <Link href={'/news'}>
                    <a>
                        BACK TO NEWS
                    </a>
                </Link>
            </div>
            
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}