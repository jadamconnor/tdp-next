import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import RichCta from '../components/rich-cta'
import Moment from 'react-moment'
import Header from '../components/header'
import Footer from '../components/footer'
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
            newsItems: newsItems.newsItems.nodes,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services
        }
    }
}

export default function Home({ homeFields, richCTAS, newsItems, primaryNav, footerNav, services }) {

    const richHeroImage = homeFields?.richHero[0].backgroundImage.sourceUrl
    const richHeroHeading = homeFields?.richHero[0].heading
    const richHeroCopy = homeFields?.richHero[0].copy
    const contactCTA = richCTAS.filter((el) => el.heading === 'Who We Are')
    const employmentCTA = richCTAS.filter((el) => el.heading === 'Pursue Your Passion')
    const featNews = newsItems.filter((el) => el.featured === true)
    const news = newsItems.filter((el) => el.featured === false)

    return (
        <div>
            <Head>
                <title>The Difference Principle</title>
                <meta name='description' content='We at The Difference Principle have one goal -- to provide evidence-backed management and administrative services to social justice nonprofit organizations.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header myMenu={primaryNav}/>
            {/* Rich Hero */}
            <div className='relative w-full h-[500px]'>
                <Image
                    src={richHeroImage}
                    alt={homeFields?.richHero[0].backgroundImage.altText}
                    objectFit='cover'
                    layout='fill'
                    quality={100}
                    placeholder='blur'
                    // Work-around for no out-of-box dataUrl
                    blurDataURL={`/_next/image?url=${richHeroImage}&w=16&q=1`}
                    priority
                />
                <div className='absolute h-full w-full top-0 bottom-0 bg-gradient-to-r from-yellow-500 to-cyan-500 mix-blend-multiply opacity-40'>
                </div>
                <div className='absolute h-full w-full top-0 bottom-0 bg-gradient-to-r from-black to-cyan-200 mix-blend-multiply opacity-60'>
                </div>
                <div className='absolute flex flex-wrap items-center w-full h-full'>
                    <div className='container px-6 xl:px-0px-6 xl:px-0'>
                        <div className='lg:w-1/2'>
                            <div className='font-serif text-white text-5xl mb-6'>
                                {richHeroHeading}
                            </div>
                            <div className='text-white text-3xl mb-6'>
                                {richHeroCopy}
                            </div>
                            <div className='text-white font-semibold text-xl tracking-wider underline underline-offset-8 decoration-1'>
                                EXPLORE OUR SERVICES
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Lead-in */}
            <div className='bg-justice-blue'>
                <div className='container px-6 xl:px-0flex items-center justify-center px-6 xl:px-0'>
                    <div className='h-fit text-white text-3xl lg:text-5xl font-serif text-center leading-snug lg:leading-snug py-32'>
                        {homeFields.leadIn[0].leadInText}
                    </div>
                </div>
            </div>
            {/* Contact CTA */}
            <div className='bg-justice-stone'>
                <div className='flex justify-center text-white text-xl py-5 px-6 xl:px-0'>
                    <div dangerouslySetInnerHTML={{__html: homeFields.contactCta}} />
                </div>
            </div>
            {/* Services */}
            <div className='container px-6 xl:px-0grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3 my-16 px-6 xl:px-0'>
                {services.map((el) => (
                        <div className='flex flex-wrap justify-center py-8' key={el.id}>
                            <div className='w-12 h-12 bg-justice-blue rounded-full mb-4'>
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
            {/* Network Highlights */}
            <div className='flex flex-wrap justify-center items-center bg-justice-blue-100 py-14 h-96'>
                <div>
                    <div className='font-serif text-justice-stone text-5xl w-full text-center mb-6'>
                        {homeFields.networkHighlights[0].title}
                    </div>
                    <div className='text-justice-blue text-xl underline underline-offset-8 decoration-1 w-full text-center tracking-wider'>
                        LINK TO NETWORK PAGE
                    </div>
                </div>
            </div>
            {/* About CTA */}
            <RichCta myFields={contactCTA}/>
            {/* News Preview */}
            <div className='container my-14 px-6 xl:px-0'>
                <div className='font-serif text-3xl w-fit border-b border-b-black pb-3'>
                    Recent News
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-4 py-8 gap-5'>
                    <div className='lg:col-span-2'>
                        <div className='font-serif text-justice-blue text-4xl lg:text-6xl mb-3'>
                            {featNews[0].headline}
                        </div>
                        <div className='italic'>
                            {featNews[0].source}
                        </div>
                        <div>
                        <Moment format={'MMM D, YYYY'}>{featNews[0].published}</Moment>
                        </div>
                    </div>
                    {news.map((el) => (
                        <div className='lg:col-span-1' key={el.headline}>
                            <div className='text-justice-blue text-2xl font-serif mb-2'>
                                {el.headline}
                            </div>
                            <div className='mb-3'>
                                {el.blurb}
                            </div>
                            <div className='italic'>
                                {el.source}
                            </div>
                            <div>
                            <Moment format={'MMM D, YYYY'}>{el.published}</Moment>
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
