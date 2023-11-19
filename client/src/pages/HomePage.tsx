import React, { useState } from "react"
import {
  useColorModeValue,
  Container,
  Flex,
  Input,
  Button,
  FormControl,
  Box,
  FormLabel,
  Card,
  NumberInput,
  NumberInputField,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Center,
  SimpleGrid,
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

export const HomePage = () => {
  const [server, setServer] = useState("")
  const [port, setPort] = useState("80")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.900")}
      h={"calc(100vh - 8rem)"}
      p={4}
      flexDirection={"column"}
      align={"center"}
      justify={"center"}
      gap={10}
    >
      <Heading
        fontWeight={700}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
        textAlign={"center"}
      >
        Visualiza la información <br />
        de tu cuenta de
        <Text as={"span"} color={"blue.500"}>
          {" Xtream Codes"}
        </Text>
      </Heading>
      <Card as={Container} maxW={"container.lg"}>
        <CardBody
          as={SimpleGrid}
          columns={{
            base: "1",
            sm: "4",
            md: "8",
          }}
          gap={2}
        >
          <Box gridColumn={"span 2"}>
            <FormControl id="serverInput">
              <FormLabel>Servidor</FormLabel>
              <Input
                type="text"
                variant={"filled"}
                value={server}
                onChange={(e) => setServer(e.currentTarget.value)}
              />
            </FormControl>
          </Box>
          <Box gridColumn={{ base: "span 2", md: "span 1" }}>
            <FormControl id="portInput">
              <FormLabel>Puerto</FormLabel>
              <NumberInput
                value={port}
                min={0}
                max={65535}
                onChange={(valueAsString) => setPort(valueAsString)}
                variant={"filled"}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </Box>
          <Box gridColumn={"span 2"}>
            <FormControl id="usernameInput">
              <FormLabel>Usuario</FormLabel>
              <Input
                type="text"
                variant={"filled"}
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </FormControl>
          </Box>
          <Box gridColumn={"span 2"}>
            <FormControl id="passwordInput">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="text"
                variant={"filled"}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </FormControl>
          </Box>
          <Box gridColumn={{ base: "span 2", md: "span 1" }}>
            <FormControl id="formButton">
              <FormLabel>‎</FormLabel>
              <Button
                as={RouterLink}
                to={`/data?host=${server.trim()}&port=${port.trim()}&username=${username.trim()}&password=${password.trim()}`}
                w={"100%"}
              >
                Enviar
              </Button>
            </FormControl>
          </Box>
        </CardBody>
      </Card>
    </Flex>
  )
}
