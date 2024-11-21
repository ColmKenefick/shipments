import * as React from "react";
import { fetchShipments } from "../../apiService";
import {
    Flex,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Skeleton,
    Stack,
} from "@chakra-ui/react";
import ShipmentsTable from "../../components/ShipmentsTable";
import ShipmentsPie from "../../components/ShipmentsPie";

const SKELETONS_FOR_RENDER = 12;

const renderLoadingSkeletons = (count, el) =>
    Array(count)
        .fill(null)
        .map(() => el);

const Shipments = () => {
    const [shipments, setShipments] = React.useState({});
    const [error, setError] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        getShipments();
    }, []);

    const getShipments = async () => {
        try {
            const result = await fetchShipments();

            result.status !== "success"
                ? setError(result)
                : setShipments(result.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };

    return (
        <Flex w={"full"}>
            {error?.message ? (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>We're sorry!</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            ) : isLoading ? (
                <Stack p={2} w={"full"}>
                    <Skeleton height="40px" isLoaded={!isLoading} />
                    {renderLoadingSkeletons(
                        SKELETONS_FOR_RENDER,
                        <Skeleton height="20px" />
                    )}
                </Stack>
            ) : (
                <>
                    <Flex w="100%">
                        <ShipmentsTable shipments={shipments} />
                    </Flex>
                    <Flex>
                        <ShipmentsPie shipments={shipments} />
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default Shipments;
