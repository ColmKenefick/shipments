export const transformShipmentsForPieChart = (data) => {
    const counts = data?.reduce((acc, { status }) => {
        const key = status.toLowerCase(); // Normalize key
        acc[key] = (acc[key] || 0) + 1; // Increment count
        return acc;
    }, {});

    return [
        { name: "Shipped", count: counts["shipped"] || 0 },
        { name: "Not Shipped", count: counts["not shipped"] || 0 },
        { name: "Cancelled", count: counts["cancelled"] || 0 },
    ];
};
