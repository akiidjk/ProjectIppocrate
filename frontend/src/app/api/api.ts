
// const BASE_ENDPOINT = "http://localhost:8000";
const BASE_ENDPOINT = "http://backend:8000";

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
            name: "",
            password: "",
            id:"",
            token: await res.json(),
        },
        success: res.ok
    }
}