const API_BASE_URL = "http://localhost:8080/index.php";

export const fetchShipments = async (delay = 1000) => {
    // use a delay to simulate loading state
    await new Promise((resolve) => setTimeout(resolve, delay));

    const response = await fetch(API_BASE_URL, { method: "GET" });

    // return all responses - we catch and handle errors in FE
    return await response.json();
};
