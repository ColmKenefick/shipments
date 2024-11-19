import * as React from "react";
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
} from "@chakra-ui/react";

const ShipmentsTable = ({ shipments, error, isLoading }) => {
    return (
        <TableContainer w={"full"}>
            {shipments.length && !isLoading ? (
                <Table
                    variant="simple"
                    colorScheme="purple"
                    size="sm"
                    setIsLoading={isLoading}
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
                    <Skeleton height="40px" isLoaded={!isLoading}></Skeleton>
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                </Stack>
            )}
        </TableContainer>
    );
};

export default ShipmentsTable;
