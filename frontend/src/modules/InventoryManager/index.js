import * as React from "react";
import { fetchShipments } from "../../apiService";
import { For, Stack, Table } from "@chakra-ui/react";

const InventoryManager = () => {
    const [shipments, setShipments] = React.useState({});

    const [loading, setIsLoading] = React.useState(false);

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
        } finally {
            console.log("wtf");
        }
    };

    return (
        <>
            <pre>{JSON.stringify(shipments)}</pre>

            {/* <Stack gap="10">
                <For each={["sm", "md", "lg"]}>
                    {(size) => (
                        <Table.Root key={size} size={size}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader>
                                        Name
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="end">
                                        Status
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {shipments.map((shipment) => (
                                    <Table.Row key={shipment.id}>
                                        <Table.Cell>{shipment.name}</Table.Cell>
                                        <Table.Cell textAlign="end">
                                            {shipment.status}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    )}
                </For>
            </Stack> */}
        </>
    );
};

export default InventoryManager;
