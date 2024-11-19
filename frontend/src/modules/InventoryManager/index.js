import * as React from "react";
import { fetchShipments } from "../../apiService";
import {
    Table,
    TableContainer,
    Thead,
    Th,
    Tr,
    Td,
    Skeleton,
    Tbody,
    Stack,
    Flex,
} from "@chakra-ui/react";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const transformShipments = (data) => {
    return data?.reduce((acc, { status, name }) => {
        const key = status.replace(" ", "").toLowerCase();
        if (!acc[key]) {
            acc[key] = { count: 0, names: [] };
        }
        acc[key].count += 1;
        acc[key].names.push(name);
        return acc;
    }, {});
};

const transformShipmentsForPieChart = (data) => {
    const counts = data.reduce((acc, { status }) => {
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

const COLORS = ["#0088FE", "#E53E3E", "#FFBB28"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const InventoryManager = () => {
    const [shipments, setShipments] = React.useState({});
    const [error, setError] = React.useState(false);
    const [loading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        getShipments();
    }, []);

    const getShipments = async () => {
        try {
            const result = await fetchShipments();

            setShipments(result.data);
            setIsLoading(false);
            console.log(result);
        } catch (err) {
            console.log(err);
            setError("error");
        } finally {
            console.log("wtf");
        }
    };

    return (
        <Flex w={"full"}>
            <Flex w="100%">
                <TableContainer w={"full"}>
                    {shipments.length && !loading ? (
                        <Table
                            variant="simple"
                            colorScheme="purple"
                            size="sm"
                            setIsLoading={loading}
                        >
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Status</Th>
                                    <Th>Created On</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {shipments?.map((item) => (
                                    <Tr key={"id"}>
                                        <Td
                                            onClick={(e) =>
                                                // could use for something
                                                console.log(e.target.innerHTML)
                                            }
                                        >
                                            {item.name}
                                        </Td>
                                        <Td>{item.status}</Td>
                                        <Td>{item.timestamp}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : error ? (
                        "errror"
                    ) : (
                        <Stack p={2}>
                            <Skeleton
                                height="40px"
                                isLoaded={!loading}
                            ></Skeleton>
                            <Skeleton height="20px" />
                            <Skeleton height="20px" />
                            <Skeleton height="20px" />
                        </Stack>
                    )}
                </TableContainer>
            </Flex>
            <Flex>
                {shipments.length && !loading && (
                    <ResponsiveContainer width={700} height="80%">
                        <PieChart
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <Pie
                                data={transformShipmentsForPieChart(shipments)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={99}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {transformShipmentsForPieChart(shipments)?.map(
                                    (_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    )
                                )}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </Flex>
        </Flex>
    );
};

export default InventoryManager;
