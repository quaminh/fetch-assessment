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

export async function getDogBreeds() {
    try {
        const response = await fetch(url + "/dogs/breeds", {
            method: "GET",
            headers: headers,
            credentials: "include"
        })
        console.log(await response.json());
    }
    catch (error) {
        console.error(error);
    }
}

export async function searchDogs() {
    try {
        const response = await fetch(url + "/dogs/search", {
            method: "GET",
            headers: headers,
            credentials: "include"
        })
        console.log(await response.json());
    }
    catch (error) {
        console.error(error);
    }
}

export async function getDogs() {
    try {
        const response = await fetch(url + "/dogs", {
            method: "POST",
            body: JSON.stringify([
                "VXGFTIcBOvEgQ5OCx40W",
                "V3GFTIcBOvEgQ5OCx40W",
                "WHGFTIcBOvEgQ5OCx40W"
            ]),
            headers: headers,
            credentials: "include"
        })
        console.log(await response.json());
    }
    catch (error) {
        console.error(error);
    }
}

export async function matchDog() {
    try {
        const response = await fetch(url + "/dogs/match", {
            method: "POST",
            body: JSON.stringify([
                "VXGFTIcBOvEgQ5OCx40W",
                "V3GFTIcBOvEgQ5OCx40W",
                "WHGFTIcBOvEgQ5OCx40W"
            ]),
            headers: headers,
            credentials: "include"
        })
        console.log(await response.json());
    }
    catch (error) {
        console.error(error);
    }
}

export async function getLocations() {
    try {
        const response = await fetch(url + "/locations", {
            method: "POST",
            body: JSON.stringify([
                "48333",
                "25275",
                "11962"
            ]),
            headers: headers,
            credentials: "include"
        })
        console.log(await response.json());
    }
    catch (error) {
        console.error(error);
    }
}

export async function searchLocations() {
    try {
        const response = await fetch(url + "/locations/search", {
            method: "POST",
            body: JSON.stringify({
                // nothing yet lol
            }),
            headers: headers,
            credentials: "include"
        })
        console.log(await response.json());
    }
    catch (error) {
        console.error(error);
    }
}