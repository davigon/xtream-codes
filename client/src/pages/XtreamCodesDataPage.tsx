import React, { useEffect, useState } from "react"
import { Page } from "./Page"
import { LoadingPage } from "./LoadingPage"
import {
  VStack,
  Container,
  Card,
  CardBody,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  GridItem,
  CardHeader,
  Heading,
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
} from "@chakra-ui/react"
import { TbSearch } from "react-icons/tb"
import { useSearchParams } from "react-router-dom"
import { useXtreamCodes } from "../hooks/useXtreamCodes"
import { CategoryFilter } from "../components/CategoryFilter"
import { Channels } from "../components/Channels"

export const XtreamCodesDataPage = () => {
  const [searchParams] = useSearchParams()
  const { data, isLoading, isError, error } = useXtreamCodes({
    host: searchParams.get("host") || undefined,
    port: searchParams.get("port") || undefined,
    username: searchParams.get("username") || undefined,
    password: searchParams.get("password") || undefined,
  })
  const [name, setName] = useState("")
  const [checkedSubcategories, setCheckedSubcategories] = useState<string[]>([])

  useEffect(() => {
    if (data && Object.keys(data.categories).length > 0)
      setCheckedSubcategories(
        data.categories[Object.keys(data.categories)[0]].map(
          (subcategory) => subcategory.category_name
        )
      )
  }, [data])

  if (isLoading) return <LoadingPage />

  if (isError || data === undefined) return <>{error?.message}</>

  return (
    <Page>
      <VStack py={4} spacing={2}>
        <Container
          as={Grid}
          maxW="container.xl"
          gap={2}
          gridTemplateColumns={"repeat(auto-fill, minmax(12rem, 1fr))"}
        >
          <Card
            as={Stat}
            bgColor={
              data.user_info.status.toLowerCase() === "active"
                ? "green.300"
                : "red.300"
            }
            color={"black"}
          >
            <CardBody>
              <StatLabel fontWeight={"medium"} isTruncated>
                Estado
              </StatLabel>
              <StatNumber fontSize={"xl"} fontWeight={"medium"}>
                {data.user_info.status}
              </StatNumber>
            </CardBody>
          </Card>
          <Card
            as={Stat}
            bgColor={
              Number(data.user_info.active_cons) <
              Number(data.user_info.max_connections)
                ? "blue.300"
                : Number(data.user_info.active_cons) ===
                  Number(data.user_info.max_connections)
                ? "orange.300"
                : "red.300"
            }
            color={"black"}
          >
            <CardBody>
              <StatLabel fontWeight={"medium"} isTruncated>
                Conexiones
              </StatLabel>
              <StatNumber fontSize={"xl"} fontWeight={"medium"}>
                {data.user_info.active_cons}
                {" de "}
                {data.user_info.max_connections}
              </StatNumber>
            </CardBody>
          </Card>
          <Card as={Stat}>
            <CardBody>
              <StatLabel fontWeight={"medium"} isTruncated>
                Fecha de creación
              </StatLabel>
              <StatNumber fontSize={"xl"} fontWeight={"medium"}>
                {new Date(
                  Number(data.user_info.created_at) * 1000
                ).toLocaleDateString()}
              </StatNumber>
            </CardBody>
          </Card>
          <Card as={Stat}>
            <CardBody>
              <StatLabel fontWeight={"medium"} isTruncated>
                Fecha de expiración
              </StatLabel>
              <StatNumber fontSize={"xl"} fontWeight={"medium"}>
                {new Date(
                  Number(data.user_info.exp_date) * 1000
                ).toLocaleDateString()}
              </StatNumber>
            </CardBody>
          </Card>
          <Card as={Stat}>
            <CardBody>
              <StatLabel fontWeight={"medium"} isTruncated>
                Canales de TV
              </StatLabel>
              <StatNumber fontSize={"xl"} fontWeight={"medium"}>
                {
                  Object.keys(data.available_channels).filter(
                    (key) => data.available_channels[key].stream_type === "live"
                  ).length
                }
              </StatNumber>
            </CardBody>
          </Card>
          <Card as={Stat}>
            <CardBody>
              <StatLabel fontWeight={"medium"} isTruncated>
                Canales totales
              </StatLabel>
              <StatNumber fontSize={"xl"} fontWeight={"medium"}>
                {Object.keys(data.available_channels).length}
              </StatNumber>
            </CardBody>
          </Card>
        </Container>
        <Container
          as={Grid}
          maxW={"container.xl"}
          gridTemplateColumns={{ base: "1", md: "15rem auto" }}
          gap={2}
        >
          <Card as={GridItem}>
            <CardHeader>
              <Heading size={"md"}>Filtros</Heading>
            </CardHeader>
            <CardBody as={VStack} gap={2} alignItems={"start"}>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={TbSearch} />
                </InputLeftElement>
                <Input
                  type={"text"}
                  placeholder="Introduce canal"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </InputGroup>
              <CategoryFilter
                categories={Object.fromEntries(
                  Object.keys(data.categories).map((category) => {
                    return [
                      category,
                      data.categories[category].map(
                        (subcategory) => subcategory.category_name
                      ),
                    ]
                  })
                )}
                checkedSubcategories={checkedSubcategories}
                setCheckedSubcategories={setCheckedSubcategories}
              />
            </CardBody>
          </Card>
          <Card as={GridItem}>
            <CardHeader>
              <Heading size={"md"}>Canales</Heading>
            </CardHeader>
            <CardBody>
              <Channels
                channels={Object.keys(data.available_channels).map(
                  (c) => data.available_channels[c]
                )}
                selectedSubcategories={checkedSubcategories}
                name={name}
              />
            </CardBody>
          </Card>
        </Container>
      </VStack>
    </Page>
  )
}
