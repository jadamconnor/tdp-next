import Head from 'next/head'

import Header from '../components/header'
import Footer from '../components/footer'
import { getPrimaryMenu, getFooterMenu, getServicesItems } from '../lib/api'

import JotformEmbed from 'react-jotform-embed'

export async function getStaticProps() {
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    return {
        props: {
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services
        },
        revalidate: 60
    }
}

export default function Contact({ primaryNav, footerNav, services, }) {
    
    return (
        <>
            <Head>
                <title>Contact - The Difference Principle</title>
                <meta name='description' content='The Difference Principle Network operates under one primary objective – to provide evidence-backed management and administrative services to nonprofit organizations.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header myMenu={primaryNav}/>
            <div className='container mt-36 px-6  xl:px-20 2xl:px-0'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-28'>
                    <div className='col-span-1'>
                        <div className='font-serif text-4xl text-justice-stone mb-6'>
                            Contact The Difference Principle
                        </div>
                        <div className='text-2xl'>
                            Interested in learning more about our services and how they can benefit you? Contact us here!
                        </div>
                        <div className='mt-6'>
                            For media inquiries, please email <a className='text-justice-blue' href='mailto:dimig@differenceprinciple.org'>dimig@differenceprinciple.org</a>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <JotformEmbed src='https://hipaa.jotform.com/220185881555158'/>
                    </div>
                </div>
            </div>
            <Footer myMenu={footerNav} services={services}/>
        </>
    )
}