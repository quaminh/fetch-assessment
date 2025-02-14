const url = "https://frontend-take-home-service.fetch.com";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function login() {
    try {
        const response = await fetch(url + "/auth/login", {
            method: "POST",
            body: JSON.stringify({
                name: "Joy Boy",
                email: "joyboy@gmail.com"
            }),
            headers: headers,
            credentials: "include"
        });
        console.log(response);
    }
    catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        const response = await fetch(url + "/auth/logout", {
            method: "POST",
            headers: headers,
            credentials: "include"
        })
        console.log(response);
    }
    catch (error) {
        console.error(error);
    }
}

// function getDogBreeds() {

// }

// function searchDogs() {

// }

// function getDogs() {

// }

// function matchDog() {

// }

// function getLocations() {

// }

// function searchLocations() {

// }