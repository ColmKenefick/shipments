const API_BASE_URL = "http://localhost:8080/colmapi.php";

export const fetchShipments = async (delay = 1000) => {
    // use a delay to simulate loading state
    await new Promise((resolve) => setTimeout(resolve, delay));

    const response = await fetch(API_BASE_URL, { method: "GET" });

    if (!response.ok) {
        throw new Error("ooops, something going on with our backend");
    }

    return await response.json();
};
