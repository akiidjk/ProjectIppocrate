
const BASE_ENDPOINT = "http://localhost:8000";

export async function getAuth(credentials:Record<"username" | "password", string> | undefined){
    let headers = {
        'Authorization': `Basic ${btoa(`${credentials?.username}:${credentials?.password}`)}`
    }

    const res = await fetch(BASE_ENDPOINT + "/admin/auth", {
        method: 'GET',
        headers: headers
    })

    return {
        value: {
            token: res.json(),
        },
        success: res.ok
    }
}