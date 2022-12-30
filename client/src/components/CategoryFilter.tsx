import React, { Dispatch, SetStateAction } from "react"
import { Box, Checkbox, VStack } from "@chakra-ui/react"

export const CategoryFilter = ({
  categories,
  checkedSubcategories,
  setCheckedSubcategories,
}: {
  categories: { [category: string]: string[] }
  checkedSubcategories: string[]
  setCheckedSubcategories: Dispatch<SetStateAction<string[]>>
}) => {
  const isChecked = (subcategory: string) => {
    return checkedSubcategories.includes(subcategory)
  }

  const allChecked = (category: string) => {
    return categories[category].every((subcategory) =>
      checkedSubcategories.includes(subcategory)
    )
  }

  const isIndeterminate = (category: string) => {
    return (
      categories[category].some((subcategory) =>
        checkedSubcategories.includes(subcategory)
      ) && !allChecked(category)
    )
  }

  const addSubcategories = (subcategories: string[]) => {
    setCheckedSubcategories((prevCheckedSubcategories) => [
      ...prevCheckedSubcategories,
      ...subcategories,
    ])
  }

  const removeSubcategories = (subcategories: string[]) => {
    setCheckedSubcategories(
      checkedSubcategories.filter((i) => !subcategories.includes(i))
    )
  }

  const onChangeSubcategory = (subcategory: string, checked: boolean) => {
    if (!checkedSubcategories.includes(subcategory) && checked)
      addSubcategories([subcategory])
    else if (checkedSubcategories.includes(subcategory) && !checked)
      removeSubcategories([subcategory])
  }

  const onChangeCategory = (category: string, checked: boolean) => {
    if (checked)
      addSubcategories(
        categories[category].filter((i) => !checkedSubcategories.includes(i))
      )
    else
      removeSubcategories(
        categories[category].filter((i) => checkedSubcategories.includes(i))
      )
  }

  return (
    <>
      {Object.keys(categories).map((category) => {
        return (
          <Box key={category}>
            <Checkbox
              key={category}
              isChecked={allChecked(category)}
              isIndeterminate={isIndeterminate(category)}
              onChange={(e) => onChangeCategory(category, e.target.checked)}
            >
              {category}
            </Checkbox>
            <VStack spacing={1} pl={6} alignItems={"start"}>
              {categories[category].map((subcategory) => {
                return (
                  <Checkbox
                    key={subcategory}
                    isChecked={isChecked(subcategory)}
                    onChange={(e) =>
                      onChangeSubcategory(subcategory, e.target.checked)
                    }
                  >
                    {subcategory}
                  </Checkbox>
                )
              })}
            </VStack>
          </Box>
        )
      })}
    </>
  )
}
