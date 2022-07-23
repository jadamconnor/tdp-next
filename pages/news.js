import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Header from '../components/header'
import Footer from '../components/footer'
import FilterBar from '../components/filter-bar'
import NewsItems from '../components/news-items'
import { getNewsItems, getPrimaryMenu, getFooterMenu, getServicesItems } from '../lib/api'

export async function getStaticProps() {
    const newsItems = await getNewsItems()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    return {
        props: {
            newsItems: newsItems.newsItems.edges,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services
        },
        revalidate: 60
    }
}

let chipsArr = []

export default function News({ newsItems, primaryNav, footerNav, services, loggedIn, user, onLogin, onLogout  }) {
    
    const featNews = newsItems.filter((newsItem) => newsItem.node.newsItemFields.featured === true)

    const [ filteredNews, setFilteredNews ] = useState(null)
    const [ chips, setChips ] = useState([])

    useEffect(() => {
        setFilteredNews(newsItems)
    }, [])

    let newsCategories = []
    newsItems.forEach((item) => {
        item.node.categories.nodes.map((el) => {
            !newsCategories.includes(el.name) && newsCategories.push(el.name)
        })
    })

    let filterSelects = [
        {
            label: 'Category',
            items: newsCategories,
            id: 'categories'
        }
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
    const filter = () => {
        let arr = []
        if (chipsArr.length > 0) {
            chipsArr.map((chip) => arr.push(...newsItems.filter((newsItem) => newsItem.node.categories.nodes.some((el) => el.name === chip))))
            setFilteredNews(arr)
        } else {
            setFilteredNews(newsItems)
        }
    }
    return (
        <>
            <Head>
                <title>News - The Difference Principle</title>
                <meta name='description' content='The Difference Principle Network operates under one primary objective – to provide evidence-backed management and administrative services to nonprofit organizations.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header myMenu={primaryNav} loggedIn={loggedIn} user={user} onLogin={onLogin} onLogout={onLogout}/>
            <div className='container mt-36 px-6  xl:px-20 2xl:px-0'>
                <div className='font-serif text-4xl text-justice-stone w-fit underline underline-offset-[12px] leading-10 decoration-1 mb-5'>
                    Featured News
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-4 py-8 gap-5'>
                    <div className='lg:col-span-2'>
                        <div className='font-serif text-justice-blue text-4xl lg:text-6xl mb-3'>
                            <Link href={`/news/${featNews[0].node.slug}`}>
                                <a>
                                    {featNews[0].node.newsItemFields.title}
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className='text-lg mb-6'>
                            {featNews[0].node.newsItemFields.blurb}
                        </div>
                        <div className='italic'>
                            {featNews[0].node.newsItemFields.author}
                        </div>
                        <div>
                            {featNews[0].node.newsItemFields.published}
                        </div>
                    </div>
                </div>
            </div>
            <FilterBar chips={chips} onAddChip={addChip} onRemoveChip={removeChip} selectItems={filterSelects} />
            <div className='container my-14 px-6  xl:px-20 2xl:px-0'>
                <div className='font-serif text-4xl text-justice-stone w-fit underline underline-offset-[12px] leading-10 decoration-1 -mb-5'>
                    More News
                </div>
            </div>
            <NewsItems newsItems={filteredNews || newsItems} onAddChip={addChip}/>
            <Footer myMenu={footerNav} services={services}/>
        </>
    )
}