export async function avoidRateLimit() {
    if (process.env.NODE_ENV === 'production') {
        await sleep()
    }
}

function sleep(ms = 1000) {
    return new Promise((res) => setTimeout(res, ms))
}