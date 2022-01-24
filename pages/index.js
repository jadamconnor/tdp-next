import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import RichCta from '../components/rich-cta'
import { Fade } from 'react-awesome-reveal'
import Header from '../components/header'
import Footer from '../components/footer'
import NetworkAccordion from '../components/network-accordion'
import { getHomePageFields, getRichCTAS, getNewsItems, getPrimaryMenu, getFooterMenu, getServicesItems } from '../lib/api'

export async function getStaticProps() {
    const homeFields = await getHomePageFields()
    const richCTAS = await getRichCTAS()
    const newsItems = await getNewsItems()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    return {
        props: {
            homeFields: homeFields.pageBy.homePageFields,
            richCTAS: richCTAS.richCTAS.nodes,
            newsItems: newsItems.newsItems.edges,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services
        },
        revalidate: 20
    }
}

export default function Home({ homeFields, richCTAS, newsItems, primaryNav, footerNav, services }) {

    const richHeroImage = homeFields?.richHero[0].backgroundImage.sourceUrl
    const overlayImage = homeFields?.richHero[0].overlayImage.sourceUrl
    const richHeroHeading = homeFields?.richHero[0].heading
    const richHeroCopy = homeFields?.richHero[0].copy
    const contactCTA = richCTAS.filter((el) => el.heading === 'Who We Are')
    const employmentCTA = richCTAS.filter((el) => el.heading === 'Pursue Your Passion')
    const featNews = newsItems.filter((newsItem) => newsItem.node.newsItemFields.featured === true)
    const news = newsItems.filter((newsItem) => newsItem.node.newsItemFields.featured === null)

    return (
        <div>
            <Head>
                <title>The Difference Principle</title>
                <meta name='description' content='We at The Difference Principle have one goal -- to provide evidence-backed management and administrative services to social justice nonprofit organizations.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header myMenu={primaryNav}/>
            {/* Rich Hero */}
            <div className='relative w-full h-[600px] xl:h-[750px]'>
                <Image
                    src={richHeroImage}
                    alt={homeFields?.richHero[0].backgroundImage.altText}
                    objectFit='cover'
                    layout='fill'
                    quality={100}
                    priority
                />
                <Fade duration={1500} triggerOnce={true}>
                    <Image
                        src={overlayImage}
                        alt={homeFields?.richHero[0].overlayImage.altText}
                        objectFit='cover'
                        layout='fill'
                        quality={100}
                        priority
                    />
                </Fade>
                    <div className='absolute flex flex-wrap items-center w-full h-full'>
                        <div className='container px-6 lg:px-0'>
                                <div className='lg:w-1/2'>
                                    <div className='font-serif text-white text-5xl mb-6'>
                                        {richHeroHeading}
                                    </div>
                                    <div className='text-white text-3xl mb-6'>
                                        {richHeroCopy}
                                    </div>
                                    <div className='text-white font-semibold text-xl tracking-wider underline underline-offset-8 decoration-1'>
                                        <Link href={homeFields?.richHero[0].link}>
                                            <a>
                                                EXPLORE OUR SERVICES
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>
            {/* Lead-in */}
            <div className='bg-[url("/FullWidthImage1.jpg")] bg-center bg-cover lg:bg-contain bg-no-repeat bg-justice-blue'>
                <div className='container flex items-center w-full h-full'>
                    <div className='h-fit text-white text-3xl lg:text-5xl font-serif text-center leading-snug lg:leading-snug py-32 px-6 lg:px-0'>
                        {homeFields.leadIn[0].leadInText}
                    </div>
                </div>
            </div>
            {/* Contact CTA */}
            <div className='bg-justice-stone'>
                <div className='flex justify-center text-white text-xl py-5 px-6 lg:px-0'>
                    <div className='unreset' dangerouslySetInnerHTML={{__html: homeFields.contactCta}} />
                </div>
            </div>
            {/* Services */}
            <div className='container grid grid-cols-1 gap-x-20 sm:grid-cols-2 lg:grid-cols-3 my-16 px-6 lg:px-0'>
                {services.map((el) => (
                    <div className='text-center justify-center py-8' key={el.id}>
                        <div className='relative w-12 h-12 mb-4 mx-auto'>
                            <Image
                                src={el.icon.sourceUrl}
                                alt={el.icon.altText}
                                objectFit='cover'
                                layout='fill'
                                quality={100}
                                priority
                            />
                        </div>
                        <div className='font-serif text-justice-blue text-2xl mb-3 w-full text-center'>
                            {el.name}
                        </div>
                        <div className='text-sm text-justice-stone text-center mb-3'>
                            {el.shortDescription}
                        </div>
                        <Link href={'/services'}>
                            <a>
                                <div className='text-justice-blue text-base font-semibold tracking-wider underline underline-offset-8 decoration-1'>
                                    MORE
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
            {/* Network */}
            <div className='flex flex-wrap justify-center items-center bg-justice-blue-100 py-14'>
                <NetworkAccordion copy={homeFields.network[0]}/>
            </div>
            {/* About CTA */}
            <RichCta myFields={contactCTA}/>
            {/* News Preview */}
            <div className='container my-14 px-6 lg:px-0'>
                <div className='font-serif text-justice-stone text-4xl w-fit border-b border-b-black pb-3 mb-5'>
                    Recent News
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-4 py-8 gap-12'>
                    <div className='lg:col-span-2'>
                        <div className='font-serif text-justice-blue text-4xl lg:text-6xl mb-3'>
                            {featNews[0].node.newsItemFields.title}
                        </div>
                        <div className='italic'>
                            {featNews[0].node.newsItemFields.author}
                        </div>
                        <div>
                            {featNews[0].node.newsItemFields.published}
                        </div>
                    </div>
                    {news.slice(0,2).map((el) => (
                        <div className='lg:col-span-1' key={el.node.newsItemFields.blurb}>
                            <div className='text-justice-blue text-2xl font-serif mb-2'>
                                {el.node.newsItemFields.title}
                            </div>
                            <div className='mb-3'>
                                {el.node.newsItemFields.blurb}
                            </div>
                            <div className='italic'>
                                {el.node.newsItemFields.author}
                            </div>
                            <div>
                                {el.node.newsItemFields.published}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Employment CTA */}
            <RichCta myFields={employmentCTA}/>
            <Footer myMenu={footerNav} services={services}/>
        </div>
        )
    }
