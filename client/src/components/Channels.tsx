import React from "react"
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  StackDivider,
  Tag,
  Text,
  useClipboard,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useSearchParams } from "react-router-dom"
import { Channel } from "../types/types"
import { TbClipboard } from "react-icons/tb"
import InfiniteScroll from "react-infinite-scroller"
import { useScrollConstData } from "../hooks/useScrollConstData"

export const Channels = ({
  channels,
  selectedSubcategories,
  name,
}: {
  channels: Channel[]
  selectedSubcategories: string[]
  name: string
}) => {
  const applyFilters = (channels: Channel[]) => {
    return channels
      .filter((c) => selectedSubcategories.includes(c.category_name))
      .filter((c) =>
        name.trim() !== ""
          ? c.name.toLowerCase().includes(name.toLowerCase())
          : c
      )
  }

  const { data, hasMore, loadMoreData } = useScrollConstData(channels)

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loader={
        <Center my={4}>
          <Spinner thickness="4px" speed="0.65s" color="blue.500" size="lg" />
        </Center>
      }
      loadMore={loadMoreData}
    >
      <Grid templateColumns="repeat(auto-fill, minmax(12rem, 1fr))" gap={4}>
        {applyFilters(data).map((c) => {
          return <ChannelCard key={c.stream_id} channel={c} />
        })}
      </Grid>
    </InfiniteScroll>
  )
}

const ChannelCard = ({ channel }: { channel: Channel }) => {
  const [urlSearchParams] = useSearchParams()
  const host = urlSearchParams.get("host")
  const port = urlSearchParams.get("port")
  const username = urlSearchParams.get("username")
  const password = urlSearchParams.get("password")

  const toast = useToast()
  const { onCopy, hasCopied } = useClipboard(
    `http://${host}:${port}/${username}/${password}/${channel.stream_id}`
  )

  const handleOnClick = () => {
    toast.closeAll()
    onCopy()
    toast({
      title: "Enlace copiado",
      description: `Se ha copiado el enlace de ${channel.name} al portapapeles.`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    })
  }

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Card
          _hover={{
            bg: useColorModeValue("gray.100", "gray.600"),
            cursor: "pointer",
            transitionProperty: "common",
            transitionDuration: "normal",
          }}
          boxShadow={useColorModeValue("lg", "dark-lg")}
        >
          <CardBody>
            <HStack align="start">
              {channel.stream_icon != null ? (
                <Image
                  w="30%"
                  src={channel.stream_icon}
                  alt={"icon"}
                  loading={"lazy"}
                />
              ) : null}
              <Text>
                <Tag mr={1}>{channel.stream_id}</Tag>
                {channel.name}
              </Text>
            </HStack>
          </CardBody>
          <CardFooter as={Center}>
            <Tag>{channel.category_name}</Tag>
          </CardFooter>
        </Card>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="bold" border={0}>
          <Text>
            <Tag mr={1}>{channel.stream_id}</Tag>
            {channel.name}
          </Text>
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody
          as={VStack}
          alignItems={"start"}
          divider={<StackDivider />}
          gap={2}
          pt={4}
        >
          {channel.epg_channel_id != null ? (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Epg ID
              </Heading>
              <Text pt={1} fontSize="sm">
                {channel.epg_channel_id}
              </Text>
            </Box>
          ) : null}
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Fecha de adición
            </Heading>
            <Text pt={1} fontSize="sm">
              {new Date(Number(channel.added) * 1000).toLocaleDateString()}
            </Text>
          </Box>
        </PopoverBody>
        <PopoverFooter
          border={0}
          as={Flex}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Tag>{channel.category_name}</Tag>
          <Button
            size={"sm"}
            leftIcon={<Icon as={TbClipboard} boxSize={5} />}
            onClick={handleOnClick}
          >
            {hasCopied ? "¡Copiado!" : "Copiar"}
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
