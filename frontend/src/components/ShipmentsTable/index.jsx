import * as React from "react";
import {
    Table,
    TableContainer,
    Thead,
    Th,
    Tr,
    Td,
    Tbody,
} from "@chakra-ui/react";

const ShipmentsTable = ({ shipments }) => {
    return (
        <TableContainer w={"full"}>
            {shipments.length && (
                <Table variant="simple" colorScheme="purple" size="sm">
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
                                <Td>{item.name}</Td>
                                <Td>{item.status}</Td>
                                <Td>{item.timestamp}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </TableContainer>
    );
};

export default ShipmentsTable;
