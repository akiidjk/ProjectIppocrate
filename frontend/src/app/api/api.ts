import {Page} from "@/context/page_provider";

const BASE_ENDPOINT = "http://localhost:8000";
// const BASE_ENDPOINT = "http://backend:8000";

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

export async function create_page(token:string,page:Page){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    console.log(myHeaders.get("Authorization"));

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(page),
        redirect: "follow"
    };

    console.log(requestOptions);

    fetch("http://localhost:8000/admin/create_page",
        requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}


export async function get_page(id_pages:string){

    const requestOptions:RequestInit = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://localhost:8000/api/get_page/${id_pages}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}


export async function get_pages(){

    const requestOptions:RequestInit = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch(`http://localhost:8000/api/get_pages`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }

}


export async function get_keys(){;

    const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://localhost:8000/admin/get_keys`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}


export async function remove_page(token:string,page_name:string){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    console.log(myHeaders.get("Authorization"));

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`http://localhost:8000/admin/remove_page/${page_name}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}