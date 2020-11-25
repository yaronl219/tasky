export const httpService = {
    get,
    post,
    put
}


const baseUrl = process.env.NODE_ENV === 'production'
    ? '/api'
    : '//localhost:3030/api'

async function get(url) {
    
    try {
        const res = await fetch(`${baseUrl}/${url}`)
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

async function post(url,dataToPost) {
    try {
        const res = await fetch(`${baseUrl}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToPost)
        })
        const data = await res.text()
        
        return data
    } catch (err) {
        console.log(err)
    }
}

async function put(url,dataToPost) {
    try {
        const res = await fetch(`${baseUrl}/${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToPost)
        })
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}