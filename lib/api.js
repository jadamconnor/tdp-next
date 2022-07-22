import { avoidRateLimit } from "./avoid-rate-limit"

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
const CAREERS_ENDPOINT = process.env.NEXT_PUBLIC_CAREERS_ENDPOINT

async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }
    
    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers[
            'Authorization'
        ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    }
    
    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    })
    
    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        console.log(json)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

async function fetchCareersAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    
    const res = await fetch(CAREERS_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    })
    
    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        console.log(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}


export async function getPrimaryMenu() {
    const data = await fetchAPI(`
    {
        menus(where: {location: PRIMARY_MENU}) {
            edges {
                node {
                    id
                    menuItems {
                        nodes {
                            path
                            label
                            id
                        }
                    }
                }
            }
        }
    }`
    )
    return data
}

export async function getFooterMenu() {
    const data = await fetchAPI(`
    {
        menus(where: {location: FOOTER_MENU}) {
            edges {
                node {
                    id
                    menuItems {
                        nodes {
                            path
                            label
                            id
                            parentId
                        }
                    }
                }
            }
        }
    }`
    )
    return data
}

export async function getHomePageFields() {
    const data = await fetchAPI(`
        {
            pageBy(id: "cG9zdDo3") {
                id
                slug
                homePageFields {
                    contactCta
                    leadIn {
                        ... on Page_Homepagefields_LeadIn_LeadIn {
                            leadInText
                        }
                    }
                    richHero {
                        ... on Page_Homepagefields_RichHero_RichHero {
                            copy
                            heading
                            link
                            overlayImage {
                                sourceUrl(size: _2048X2048)
                                altText
                            }
                            backgroundImage {
                                sourceUrl(size: _2048X2048)
                                altText
                            }
                        }
                    }
                    network {
                        ... on Page_Homepagefields_Network_Network {
                            subheading
                            partner {
                                ... on Page_Homepagefields_Network_Network_Partner_Partner {
                                    blurb
                                    logo {
                                        sourceUrl(size: MEDIUM)
                                    }
                                    name
                                }
                            }
                            title
                        }
                    }
                }
            }
        }`
    )
    return data
}

export async function getServicesPageFields() {
    const data = await fetchAPI(`
        {
            pageBy(id: "cG9zdDo2OQ==") {
                id
                servicesPageFields {
                    heroImage {
                        altText
                        sourceUrl(size: _2048X2048)
                    }
                    intro {
                        ... on Page_Servicespagefields_Intro_Intro {
                            body
                            heading
                        }
                    }
                }
                slug
            }
        }`
    )
    return data
}

export async function getCareersPageFields() {
    const data = await fetchAPI(`
        {
            pageBy(id: "cG9zdDoxNDQ=") {
                id
                careersPageFields {
                    intro {
                        ... on Page_Careerspagefields_Intro_Intro {
                            body
                            heading
                        }
                    }
                }
            }
        }`
    )
    return data
}

export async function getAboutPageFields() {
    const data = await fetchAPI(`
        {
            pageBy(id: "cG9zdDoxMDk=") {
                aboutPageFields {
                    executiveTeam {
                        ... on Page_Aboutpagefields_ExecutiveTeam_ExecutiveTeam {
                            heading
                            bioCard {
                                ... on Page_Aboutpagefields_ExecutiveTeam_ExecutiveTeam_BioCard_BioCard {
                                    image {
                                        altText
                                        sourceUrl(size: MEDIUM_LARGE)
                                    }
                                    name
                                    title
                                    bio
                                }
                            }
                        }
                    }
                    heroImage {
                        altText
                        sourceUrl(size: _2048X2048)
                    }
                    intro {
                        ... on Page_Aboutpagefields_Intro_Intro {
                            body
                            heading
                        }
                    }
                    leadIn {
                        ... on Page_Aboutpagefields_LeadIn_LeadIn {
                            leadInText
                            leadInBgImage {
                                altText
                                sourceUrl(size: _2048X2048)
                            }
                        }
                    }
                    motivations {
                        ... on Page_Aboutpagefields_Motivations_Motivations {
                            body
                            heading
                        }
                    }
                    ourHistory {
                        ... on Page_Aboutpagefields_OurHistory_OurHistory {
                            bodyCollapsed
                            bodyExpanded
                            heading
                        }
                    }
                }
            }
        }`
    )
    return data
}

export async function getRichCTAS() {
    const data = await fetchAPI(`
        {
            richCTAS {
                nodes {
                    heading
                    backgroundImage {
                        sourceUrl(size: _2048X2048)
                        altText
                    }
                    overlayImage {
                        sourceUrl(size: _2048X2048)
                        altText
                    } 
                    uRL
                    body
                    justify
                    uRLText
                }
            }
        }`
    )
    return data
}

export async function getNewsItems() {
    const data = await fetchAPI(`
    {
        newsItems(first: 100) {
            edges {
                node {
                    id
                    slug
                    newsItemFields {
                        author
                        blurb
                        content
                        featured
                        published
                        title
                        external
                        url
                    }
                    categories {
                        nodes {
                            name
                            slug
                        }
                    }
                }
            }
        }
    }`
    )
    return data
}

export async function getNewsItemBySlug(slug) {
    const data = await fetchAPI(`
        query($slug: String) {
            newsItemBy(slug: $slug) {
                id
                slug
                newsItemFields {
                    author
                    blurb
                    content
                    featured
                    published
                    title
                    external
                    url
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }`,
        {
            variables: { slug },
        }
    )
    return data
}

export async function getServicesItems() {
    const res = await fetchAPI(`
        {
            services(first: 100) {
                nodes {
                    name
                    shortDescription
                    description
                    responsibilities
                    id
                    icon {
                        sourceUrl(size: MEDIUM)
                        altText
                    }
                }
            }
        }`
    )
    // We have to format this data because Atlas Content Modeler doesn't
    // have arrays, and responsibilities needs to be an array.
    let data = []
    res.services.nodes.forEach((service, index) => {
        let arr = []
        // TODO: More checks for incorrectly formatted responsibilities model
        if (service.responsibilities !== '') {
            let str = service.responsibilities
            str.split('! ').forEach((el, index) => {
                if (el.includes(' /')) {
                    arr.push({'label': el.split(' /')[0]})
                    arr[index].subItems = el.split(' /').slice(1)
                } else {
                    arr.push({'label': el})
                }
            })
            data.push(
                {
                    'id': service.id,
                    'responsibilities': arr,
                    'shortDescription': service.shortDescription,
                    'description': service.description,
                    'name': service.name,
                    'icon': service.icon
                }
            )
        }
    })
    return data
}

export async function getJobOpenings() {
    const data = await fetchCareersAPI(`
        {
            openings(first: 100) {
                nodes {
                    id
                    slug
                    openingFields {
                        agency
                        applicationDeadline
                        applicationAddressee
                        fullDescription
                        jobTitle
                        location {
                            location
                        }
                        positionSummary
                        positionTerms
                        salary
                        programTypes {
                            programType
                        }
                    }
                    title
                }
            }
        }
    `)
    return data.openings
}

export async function getJobOpeningBySlug(slug) {
    const data = await fetchCareersAPI(`
        query($slug: String) {
            openingBy(slug: $slug) {
                id
                slug
                title
                openingFields {
                    agency
                    applicationDeadline
                    applicationAddressee
                    fullDescription
                    jobTitle
                    location {
                        location
                    }
                    positionSummary
                    positionTerms
                    salary
                    programTypes {
                        programType
                    }
                }
            }
        }`,
        {
            variables: { slug },
        }
    )
    return data
}