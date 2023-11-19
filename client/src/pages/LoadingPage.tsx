import React from "react"
import { useColorModeValue, Flex, Heading, Spinner } from "@chakra-ui/react"

export const LoadingPage = () => {
  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.900")}
      h={"calc(100vh - 8rem)"}
      flexDirection={"column"}
      align={"center"}
      justify={"center"}
      gap={4}
    >
      <Heading as="h1" size="lg">
        Cargando...
      </Heading>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  )
}
