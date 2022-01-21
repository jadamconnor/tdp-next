import { useState } from 'react'
import { getServicesPageFields, getRichCTAS, getPrimaryMenu, getFooterMenu, getServicesItems } from '../lib/api'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/footer'
import Header from '../components/header'
import ServicesAccordion from '../components/services-accordion'
import RichCta from '../components/rich-cta'

export async function getStaticProps() {
    const servicesFields = await getServicesPageFields()
    const richCTAS = await getRichCTAS()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    return {
        props: {
            servicesFields: servicesFields.pageBy.servicesPageFields,
            richCTAS: richCTAS.richCTAS.nodes,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services
        },
        revalidate: 1
    }
}

export default function Services({ servicesFields, richCTAS, primaryNav, footerNav, services }) {

    const joinCTA = richCTAS.filter((el) => el.heading === 'Join the Network')

    const [ expand, setExpand ] = useState(false)

    const toggleExpand = () => {
        setExpand(!expand)
    }

    return (
        <div>

            <Head>
                <title>Services - The Difference Principle</title>
                <meta name='description' content='The Difference Principle provides all of the services needed to run business so you can focus on accomplishing your mission.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header myMenu={primaryNav}/>
            {/* Intro */}
            <div className='container px-6 lg:px-0'>
                <div className='w-full lg:w-1/2 my-28'>
                    <div className='text-5xl text-justice-stone font-serif mb-3'>
                        {servicesFields.intro[0].heading}
                    </div>
                    <div className='text-justice-stone text-3xl'>
                        {servicesFields.intro[0].body}
                    </div>
                </div>
            </div>
            {/* Hero */}
            <div className='relative w-full h-[400px]'>
                <Image
                    src={servicesFields.heroImage.sourceUrl}
                    alt={servicesFields.heroImage.altText}
                    objectFit='cover'
                    layout='fill'
                    quality={100}
                    priority
                    placeholder='blur'
                    // Work-around for no out-of-box dataUrl
                    blurDataURL={`/_next/image?url=${servicesFields.heroImage.sourceUrl}&w=16&q=1`}
                />
            </div>
            {/* Services */}
            <div className='container  my-28'>
                {services.map((service) => (
                    <ServicesAccordion service={service} key={service.id}/>
                ))}
            </div>
            {/* CTA */}
            {/* V2?
                <RichCta myFields={joinCTA}/>
            */}
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}