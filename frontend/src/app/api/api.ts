import {Page} from "@/context/page_provider";

// const BASE_ENDPOINT = "http://localhost:8000";
// const BASE_ENDPOINT = "http://backend:8000
const BASE_ENDPOINT = "https://backend-production-99ba.up.railway.app";

export type FileStringTuple = [File, string];

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

export async function create_page(token:string,page:Page): Promise<number>{

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(page),
        redirect: "follow"
    };

    try {
        const response = await fetch(BASE_ENDPOINT + `/admin/create_page`, requestOptions);
        return response.status;
    } catch (error) {
        console.error(error);
        return -1;
    }
}


export async function get_page(id_pages:string){

    const requestOptions:RequestInit = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch(BASE_ENDPOINT + `/api/get_page/${id_pages}`, requestOptions);
        if(response.status == 200){
            return response.json()
        }else {
            return response.status;
        }
    } catch (error) {
        console.error(error);
        return -1;
    }

}


export async function get_pages(){

    const requestOptions:RequestInit = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch(BASE_ENDPOINT + "/api/get_pages", requestOptions);

        if(response.status == 200){
            return response.json()
        }else {
            return response.status;
        }

    } catch (error) {
        console.error(error);
        return -1;
    }

}


export async function get_keys(){

    const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch(BASE_ENDPOINT + "/admin/get_keys", requestOptions);
        if(response.status == 200){
            return response.json()
        }else {
            return response.status;
        }
    } catch (error) {
        console.error(error);
        return -1;
    }
}


export async function remove_page(token:string,page_name:string){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(BASE_ENDPOINT + `/admin/remove_page/${page_name}`, requestOptions);
        return response.status;
    } catch (error) {
        console.error(error);
        return -1;
    }

}

export async function upload_image(token:string, images:FileStringTuple[]): Promise<number>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const formdata = new FormData();

    for(let i = 0;i<images.length;i++){
        formdata.append(images[i][1], images[i][0], "-.jpg");
    }

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

    try {
        const response = await fetch(BASE_ENDPOINT + "/admin/upload_image", requestOptions);
        return response.status;
    } catch (error) {
        console.error(error);
        return -1;
    }
}