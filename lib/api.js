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
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
    const data = await fetchAPI(
        `
        query PreviewPost($id: ID!, $idType: PostIdType!) {
            post(id: $id, idType: $idType) {
                databaseId
                slug
                status
            }
        }`,
        {
            variables: { id, idType },
        }
        )
        return data.post
    }

export async function getPrimaryMenu() {
    const data = await fetchAPI(`
    {
        menus(where: {location: PRIMARY}) {
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
        menus(where: {location: FOOTER}) {
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

export async function getAllPostsForHome(preview) {
    const data = await fetchAPI(
        `
        query AllPosts {
            posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
                edges {
                    node {
                        title
                        excerpt
                        slug
                        date
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                        author {
                            node {
                                name
                                firstName
                                lastName
                                avatar {
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
        `,
        {
            variables: {
                onlyEnabled: !preview,
                preview,
            },
        }
        )
        return data?.posts
    }

export async function getPostAndMorePosts(slug, preview, previewData) {
    const postPreview = preview && previewData?.post
    // The slug may be the id of an unpublished post
    const isId = Number.isInteger(Number(slug))

    const isSamePost = isId ?
        Number(slug) === postPreview.id
    : 
        slug === postPreview.slug

    const isDraft = isSamePost && postPreview?.status === 'draft'
    const isRevision = isSamePost && postPreview?.status === 'publish'
    const data = await fetchAPI(
        `
        fragment AuthorFields on User {
            name
            firstName
            lastName
            avatar {
                url
            }
        }
        fragment PostFields on Post {
            title
            excerpt
            slug
            date
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
            author {
                node {
                    ...AuthorFields
                }
            }
            categories {
                edges {
                    node {
                        name
                    }
                }
            }
            tags {
                edges {
                    node {
                        name
                        slug
                    }
                }
            }
        }
        query PostBySlug($id: ID!, $idType: PostIdType!) {
            post(id: $id, idType: $idType) {
                ...PostFields
                content
                ${
                    // Only some of the fields of a revision are considered as there are some inconsistencies
                    isRevision
                    ? `
                    revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
                        edges {
                            node {
                                title
                                excerpt
                                content
                                author {
                                    node {
                                        ...AuthorFields
                                    }
                                }
                            }
                        }
                    }
                    `
                    : ''
                }
            }
            posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
                edges {
                    node {
                        ...PostFields
                    }
                }
            }
        }
        `,
        {
            variables: {
                id: isDraft ? postPreview.id : slug,
                idType: isDraft ? 'DATABASE_ID' : 'SLUG',
            },
        }
    )
        
    // Draft posts may not have an slug
    if (isDraft) data.post.slug = postPreview.id
    // Apply a revision (changes in a published post)
    if (isRevision && data.post.revisions) {
        const revision = data.post.revisions.edges[0]?.node
        
        if (revision) Object.assign(data.post, revision)
        delete data.post.revisions
    }
        
    // Filter out the main post
    data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
    // If there are still 3 posts, remove the last one
    if (data.posts.edges.length > 2) data.posts.edges.pop()
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
                            leadInBgImage {
                                sourceUrl(size: GB_BLOCK_POST_GRID_LANDSCAPE)
                            }
                        }
                    }
                    networkHighlights {
                        ... on Page_Homepagefields_NetworkHighlights_NetworkHighlights {
                            link
                            title
                        }
                    }
                    richHero {
                        ... on Page_Homepagefields_RichHero_RichHero {
                            copy
                            heading
                            link
                            overlayImage {
                                sourceUrl(size: GB_BLOCK_POST_GRID_LANDSCAPE)
                                altText
                            }
                            backgroundImage {
                                sourceUrl(size: _2048X2048)
                                altText
                            }
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
                                    email
                                    image {
                                        altText
                                        sourceUrl(size: MEDIUM_LARGE)
                                    }
                                    name
                                    title
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
            nodes {
                ...NewsItemFields
            }
        }
    }
    
    fragment NewsItemFields on NewsItem {
        featured
        externalSource
        headline
        source
        blurb
        body
        uRL
        published
    }`
    )
    return data
}

export async function getServicesItems() {
    const res = await fetchAPI(`
        {
            services(first: 100) {
                nodes {
                    ...ServiceFields
                }
            }
        }
        
        fragment ServiceFields on Service {
            name
            shortDescription
            description
            responsibilities
            id
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
                    'name': service.name
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
            }
        }
    `)
    return data.openings
}

export async function getJobOpeningBySlug() {
    const data = await fetchCareersAPI(`
        {
            openings {
                nodes {
                    id
                    slug
                    openingFields {
                        agency
                        applicationDeadline
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
            }
        }
    `)
    return data.openings
}