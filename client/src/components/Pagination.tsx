import React, { useState } from "react"
import {
  ButtonGroup,
  Button,
  IconButton,
  Icon,
  Text,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  HStack,
  Flex,
} from "@chakra-ui/react"
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onChange: (nextPage: number) => void
  loading: boolean
}

export const Pagination = (props: PaginationProps) => {
  const [numberInputValue, setNumberInputValue] = useState("1")

  if (props.totalPages <= 1) {
    return <></>
  }

  return (
    <Flex justifyContent="center">
      <ButtonGroup size="sm" isAttached>
        <Button
          aria-label="prev-page"
          variant="ghost"
          isDisabled={props.currentPage === 0 || props.loading}
          onClick={() => props.onChange(props.currentPage - 1)}
        >
          <HStack>
            <Icon as={FiArrowLeft} />
            <Text>Anterior</Text>
          </HStack>
        </Button>
        {props.currentPage > 0 && (
          <Button
            aria-label="first-page"
            variant="ghost"
            isDisabled={props.loading}
            onClick={() => props.onChange(0)}
          >
            1
          </Button>
        )}
        {Array.from(Array(2)).map((_, i) => {
          const index: number = props.currentPage - (props.currentPage + i - 1)
          return (
            props.currentPage > index + 1 && (
              <Button
                key={`current-page-minus-${index - 1}`}
                aria-label={`current-page-minus-${index - 1}`}
                variant="ghost"
                isDisabled={props.loading}
                onClick={() => props.onChange(props.currentPage - index - 1)}
              >
                {props.currentPage - index}
              </Button>
            )
          )
        })}
        <Button
          aria-label="current-page"
          variant="solid"
          isLoading={props.loading}
        >
          {props.currentPage + 1}
        </Button>
        {Array.from(Array(2)).map((_, i) => {
          return (
            props.currentPage + i + 2 < props.totalPages && (
              <Button
                key={`current-page-plus-${i + 1}`}
                aria-label={`current-page-plus-${i + 1}`}
                variant="ghost"
                isDisabled={props.loading}
                onClick={() => props.onChange(props.currentPage + i + 1)}
              >
                {props.currentPage + i + 2}
              </Button>
            )
          )
        })}
        {props.currentPage < props.totalPages - 1 && (
          <Button
            aria-label="last-page"
            variant="ghost"
            isDisabled={props.loading}
            onClick={() => props.onChange(props.totalPages - 1)}
          >
            {props.totalPages}
          </Button>
        )}
        <Button
          aria-label="next-page"
          variant="ghost"
          isDisabled={
            props.currentPage === props.totalPages - 1 || props.loading
          }
          onClick={() => props.onChange(props.currentPage + 1)}
        >
          <HStack>
            <Text>Siguiente</Text>
            <Icon as={FiArrowRight} />
          </HStack>
        </Button>
      </ButtonGroup>
      <InputGroup size="sm" width="6rem">
        <NumberInput
          min={1}
          max={props.totalPages}
          value={numberInputValue}
          isDisabled={props.totalPages === 1 || props.loading}
          onChange={(valueAsString, _) => setNumberInputValue(valueAsString)}
        >
          <NumberInputField rounded="md" />
        </NumberInput>
        <InputRightElement>
          <IconButton
            aria-label="search"
            icon={<Icon as={FiSearch} />}
            size="sm"
            variant="ghost"
            isDisabled={props.totalPages === 1 || props.loading}
            onClick={() =>
              numberInputValue.trim() !== ""
                ? props.onChange(Number(numberInputValue) - 1)
                : undefined
            }
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}
