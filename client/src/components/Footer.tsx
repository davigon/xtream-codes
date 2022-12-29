import React from "react"
import { Center, Text } from "@chakra-ui/react"

export const Footer = () => {
  return (
    <Center py={4} h={"4rem"}>
      <Text fontWeight="semibold">
        {new Date().getFullYear() + "."} Proyecto de{" "}
        <a
          href={"https://github.com/davigon"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          davigon
        </a>
      </Text>
    </Center>
  )
}
