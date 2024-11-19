import * as React from "react";
import { fetchShipments } from "../../apiService";
import { Flex } from "@chakra-ui/react";
import ShipmentsTable from "../../components/ShipmentsTable";
import ShipmentsPie from "../../components/ShipmentsPie";

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

const Shipments = () => {
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
                <ShipmentsTable
                    error={error}
                    isLoading={loading}
                    shipments={shipments}
                />
            </Flex>
            <Flex>
                <ShipmentsPie
                    error={error}
                    isLoading={loading}
                    shipments={shipments}
                />
            </Flex>
        </Flex>
    );
};

export default Shipments;
