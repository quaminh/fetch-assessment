const url = "https://frontend-take-home-service.fetch.com";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function login(formData: FormData) {
    try {
        const response = await fetch(url + "/auth/login", {
            method: "POST",
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email")
            }),
            headers: headers,
            credentials: "include"
        });
        console.log(response.status);
        return response.status;
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
        });
        console.log(response.status);
        return response.status;
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
        if (response.status !== 200) {
            throw new Error(`Error Code ${response.status}: ${response.statusText}`);
        }
        const parsed = await response.json();
        console.log(parsed);
        return parsed;
    }
    catch (error) {
        console.error(error);
    }
}

export async function searchDogs(endpoint?: string, sortOrder: "ascending"|"descending" = "ascending", breeds?: string[], zipCodes?: string[], ageMin?: number, ageMax?: number) {
    if (!endpoint) {
        const n = sortOrder.toLowerCase() === "ascending" ? 3 : 4; // size of substring
        endpoint = `/dogs/search?sort=breed:${sortOrder.toLowerCase().substring(0, n)}`;
        if (breeds && breeds.length !== 0) {
            console.log(breeds);
            endpoint += breeds.reduce((prev, curr) => prev + '&breeds[]=' + encodeURIComponent(curr), "");
        }
        if (zipCodes && zipCodes.length !== 0) {
            console.log(zipCodes);
            endpoint += zipCodes.reduce((prev, curr) => prev + '&zipCodes[]=' + encodeURIComponent(curr), "");
        }
        if (ageMin) {
            console.log(ageMin);
            endpoint += '&ageMin=' + encodeURIComponent(ageMin);
        }
        if (ageMax) {
            console.log(ageMax);
            endpoint += '&ageMax=' + encodeURIComponent(ageMax);
        }
    }
    try {
        console.log(url+endpoint);
        const response = await fetch(url + endpoint, {
            method: "GET",
            headers: headers,
            credentials: "include"
        })
        if (response.status !== 200) {
            throw new Error(`Error Code ${response.status}: ${response.statusText}`);
        }
        const parsed = await response.json();
        console.log(parsed);
        return parsed;
    }
    catch (error) {
        console.error(error);
    }
}

export async function getDogs(dogIds: string[]) {
    try {
        const response = await fetch(url + "/dogs", {
            method: "POST",
            body: JSON.stringify(dogIds),
            headers: headers,
            credentials: "include"
        })
        if (response.status !== 200) {
            throw new Error(`Error Code ${response.status}: ${response.statusText}`);
        }
        const parsed = await response.json();
        console.log(parsed);
        return parsed;
    }
    catch (error) {
        console.error(error);
    }
}

export async function matchDog(dogIds: string[]) {
    try {
        const response = await fetch(url + "/dogs/match", {
            method: "POST",
            body: JSON.stringify(dogIds),
            headers: headers,
            credentials: "include"
        })
        if (response.status !== 200) {
            throw new Error(`Error Code ${response.status}: ${response.statusText}`);
        }
        const parsed = await response.json();
        console.log(parsed);
        return parsed;
    }
    catch (error) {
        console.error(error);
    }
}

export async function getLocations(zipcodes: string[]) {
    try {
        const response = await fetch(url + "/locations", {
            method: "POST",
            body: JSON.stringify(zipcodes),
            headers: headers,
            credentials: "include"
        })
        if (response.status !== 200) {
            throw new Error(`Error Code ${response.status}: ${response.statusText}`);
        }
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
        if (response.status !== 200) {
            throw new Error(`Error Code ${response.status}: ${response.statusText}`);
        }
        console.log(await response.json());
    }
    catch (error) {
        console.error(error);
    }
}