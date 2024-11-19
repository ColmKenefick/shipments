import * as React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { transformShipmentsForPieChart } from "../../utils/transforms";

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

const ShipmentsPie = ({ shipments, error, isLoading }) => {
    // @TO DO - we should handle error here
    return (
        <>
            {shipments.length && !isLoading && (
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
        </>
    );
};

export default ShipmentsPie;
