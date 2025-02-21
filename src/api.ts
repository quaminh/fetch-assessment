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
            endpoint += breeds.reduce((prev, curr) => prev + '&breeds[]=' + encodeURIComponent(curr), "");
        }
        if (zipCodes && zipCodes.length !== 0) {
            endpoint += zipCodes.reduce((prev, curr) => prev + '&zipCodes[]=' + encodeURIComponent(curr), "");
        }
        if (ageMin) {
            endpoint += '&ageMin=' + encodeURIComponent(ageMin);
        }
        if (ageMax) {
            endpoint += '&ageMax=' + encodeURIComponent(ageMax);
        }
    }
    try {
        const response = await fetch(url + endpoint, {
            method: "GET",
            headers: headers,
            credentials: "include"
        })
        if (response.status !== 200) {
            throw new Error(`Error Code ${response.status}: ${response.statusText}`);
        }
        const parsed = await response.json();
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
        return parsed;
    }
    catch (error) {
        console.error(error);
    }
}