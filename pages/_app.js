import '../styles/globals.scss'
import '@fontsource/source-sans-pro'
import '@fontsource/source-sans-pro/300.css'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'
import '@fontsource/domine'
import '@fontsource/domine/400.css'
import '@fontsource/domine/600.css'
import '@fontsource/domine/700.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import AuthContextProvider from '../contexts/auth-context'

function MyApp({ Component, pageProps }) {

    const router = useRouter()
    
    useEffect(() => {
        
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
        
    }, [router.events])
    
    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy='afterInteractive'
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id='gtag-init'
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    });
                `,
                }}
            />
            <Script strategy='afterInteractive' src='https://seal-wisconsin.bbb.org/inc/legacy.js'/>
            <AuthContextProvider>
                <Component {...pageProps} />
            </AuthContextProvider>
        </>
        )
    }
    
    export default MyApp
