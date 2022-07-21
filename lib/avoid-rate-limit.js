let lastFetch = new Date()

export async function avoidRateLimit() {
    let sinceLastFetch = new Date().getTime() - lastFetch.getTime()
    if (sinceLastFetch < 1000) {
        await sleep()
    }
    lastFetch = new Date()
}

function sleep(ms = 1000) {
    return new Promise((res) => setTimeout(res, ms))
}