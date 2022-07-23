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
import netlifyAuth from '../netlifyAuth'

function MyApp({ Component, pageProps }) {
    let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
    let [user, setUser] = useState(null)

    const router = useRouter()

    let login = () => {
        netlifyAuth.authenticate((user) => {
            setLoggedIn(!!user)
            setUser(user)
            netlifyAuth.closeModal()
        })
    }

    let logout = () => {
        netlifyAuth.signout(() => {
            setLoggedIn(false)
            setUser(null)
        })
    }
    
    useEffect(() => {
        netlifyAuth.initialize((user) => {
            console.log(user)
            setLoggedIn(!!user)
            setUser(user)
        })
        
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
        
    }, [router.events, loggedIn])
    
    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
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
            <Script strategy='afterInteractive' src="https://seal-wisconsin.bbb.org/inc/legacy.js"/>
            <Component onLogin={login} onLogout={logout} loggedIn={loggedIn} user={user} {...pageProps} />
        </>
        )
    }
    
    export default MyApp
