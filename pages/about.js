import { useState } from 'react'
import { getAboutPageFields, getPrimaryMenu, getFooterMenu, getRichCTAS, getServicesItems  } from '../lib/api'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import Footer from '../components/footer'
import AboutAccordion from '../components/about-accordion'
import RichCta from '../components/rich-cta'
import BioModal from '../components/bio-modal'

export async function getStaticProps() {
    const aboutFields = await getAboutPageFields()
    const richCTAS = await getRichCTAS()
    const primaryNavMenu = await getPrimaryMenu()
    const footerNavMenu = await getFooterMenu()
    const services = await getServicesItems()

    return {
        props: {
            aboutFields: aboutFields.pageBy.aboutPageFields,
            richCTAS: richCTAS.richCTAS.nodes,
            primaryNav: primaryNavMenu.menus.edges[0].node,
            footerNav: footerNavMenu.menus.edges[0].node,
            services: services
        },
        revalidate: 60
    }
}

export default function About({ aboutFields, richCTAS, primaryNav, footerNav, services, loggedIn, user, onLogin, onLogout }) {

    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({})
    const [hideHeader, setHideHeader] = useState(false)

    const openModal = (content) => {
        setHideHeader(true)
        setModalContent(content)
        setModalOpen(true)
    }

    const employmentCTA = richCTAS.filter((el) => el.heading === 'Pursue Your Passion')

    return (
        <>
            {modalOpen &&
                <BioModal
                    content={modalContent}
                    onClose={() => {setModalOpen(false), setHideHeader(false)}}
                />
            }
            <div>
                <Head>
                    <title>About - The Difference Principle</title>
                    <meta name='description' content='The Difference Principle Network operates under one primary objective – to provide evidence-backed management and administrative services to nonprofit organizations.' />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                {!hideHeader &&
                    <Header myMenu={primaryNav}/>
                }
                {/* Intro */}
                <div className='bg-[url("/Spotlogo1.png")] xl:bg-[left_30rem_top_6rem] 2xl:bg-[left_50rem_top_6rem] md:bg-right-top bg-[length:750px_600px] bg-no-repeat h-[500px] lg:h-[400px]'>
                    <div className='container flex items-center px-6 xl:px-20 2xl:px-0'>
                        <div className='w-full lg:w-2/3 py-36'>
                            <div className='text-5xl text-justice-stone font-serif mb-3'>
                                {aboutFields.intro[0].heading}
                            </div>
                            <div className='text-justice-stone text-3xl'>
                                {aboutFields.intro[0].body}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Hero */}
                <div className='relative w-full h-[400px]'>
                    <Image
                        src={aboutFields.heroImage.sourceUrl}
                        alt={aboutFields.heroImage.altText}
                        objectFit='cover'
                        layout='fill'
                        quality={100}
                        priority
                        placeholder='blur'
                        // Work-around for no out-of-box dataUrl
                        blurDataURL={`/_next/image?url=${aboutFields.heroImage.sourceUrl}&w=16&q=1`}
                    />
                </div>
                {/* Lead-in */}
                <div className='bg-justice-stone px-6 xl:px-20 2xl:px-0'>
                    <div className='container flex items-center justify-center '>
                        <div className='h-fit text-white text-3xl lg:text-5xl font-serif text-center leading-snug lg:leading-snug py-32'>
                            {aboutFields.leadIn[0].leadInText}
                        </div>
                    </div>
                </div>
                {/* Motivations */}
                <div className='container my-14 px-6  xl:px-20 2xl:px-0'>
                    <div className='flex justify-center'>
                        <div className='text-4xl text-justice-stone font-serif w-fit underline underline-offset-[12px] leading-10 decoration-1 pb-1 mb-6'>
                            {aboutFields.motivations[0].heading}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='unreset  text-center text-3xl text-justice-stone mb-6' dangerouslySetInnerHTML={{__html: aboutFields.motivations[0].body}}>
                        </div>
                    </div>
                </div>
                {/* Our History */}
                <div className='container my-14 px-6 xl:px-20 2xl:px-0'>
                    <AboutAccordion copy={aboutFields.ourHistory[0]}/>
                </div>
                {/* Bios */}
                <div className='container my-14 px-6 xl:px-20 2xl:px-0'>
                    <div className='flex justify-center'>
                        <div className='text-4xl text-justice-stone font-serif w-fit underline underline-offset-[12px] leading-[60px] decoration-1 pb-1'>
                            {aboutFields.executiveTeam[0].heading}
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-10'>
                        {aboutFields.executiveTeam[0].bioCard.map((el) => (
                            <div className='w-full' key={el.name}>
                                <div className='relative w-full h-80 mb-5'>
                                    <Image
                                        className='rounded-2xl'
                                        src={el.image.sourceUrl}
                                        alt={el.image.altText}
                                        objectFit='cover'
                                        layout='fill'
                                        quality={100}
                                        placeholder='blur'
                                        blurDataURL={`/_next/image?url=${el.image.sourceUrl}&w=16&q=1`}
                                    />
                                </div>
                                <div onClick={() => openModal(el)} className='text-justice-blue text-xl font-serif mb-2 cursor-pointer'>
                                    {el.name}
                                </div>
                                <div className='text-justice-stone text-base mb-2'>
                                    {el.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Employment CTA */}
                <RichCta myFields={employmentCTA}/>
                <Footer myMenu={footerNav} services={services}/>
            </div>
        </>
    )
}