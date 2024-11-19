import * as React from "react";
import InventoryManager from "./modules/InventoryManager";
import { Flex, Container, Heading } from "@chakra-ui/react";

function App() {
    return (
        <Container w="full" maxW={"90%"}>
            <Heading>{"Shipments"}</Heading>
            <Flex mt={4}>
                <InventoryManager />
            </Flex>
        </Container>
    );
}

export default App;
