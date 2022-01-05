import { useState } from 'react'
import { getServicesPageFields, getRichCTAS, getPrimaryMenu, getFooterMenu, getServicesItems } from '../lib/api'
import Image from 'next/image'
import Footer from '../components/footer'
import Header from '../components/header'
import Accordion from '../components/accordion'
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
        }
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
            <Header myMenu={primaryNav}/>
            <div className='container'>
                <div className='w-1/2 my-28'>
                    <div className='text-5xl text-justice-stone font-serif mb-3'>
                        {servicesFields.pageLeadIn[0].heading}
                    </div>
                    <div className='text-justice-stone text-3xl'>
                        {servicesFields.pageLeadIn[0].body}
                    </div>
                </div>
            </div>
            <div className='relative w-full h-[400px]'>
                <Image
                    src={servicesFields.heroImage.sourceUrl}
                    alt={servicesFields.heroImage.altText}
                    objectFit='cover'
                    layout='fill'
                    quality={100}
                    priority
                />
            </div>
            <div className='container my-28'>
                {services.map((service) => (
                    <Accordion service={service} key={service.id}/>
                ))}
            </div>
            <RichCta myFields={joinCTA}/>
            <Footer myMenu={footerNav} services={services}/>
        </div>
    )
}