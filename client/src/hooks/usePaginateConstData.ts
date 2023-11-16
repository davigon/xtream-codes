import { useEffect, useState } from "react"

export const usePaginateConstData = <T>(
  constData: T[],
  pageSize: number,
  filterFn: (data: T[]) => T[]
) => {
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [filteredData, setFilteredData] = useState<T[]>([])
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    const filteredData = filterFn(constData)
    setPage(0)
    setTotalElements(filteredData.length)
    setTotalPages(Math.ceil(filteredData.length / pageSize))
    setFilteredData(filteredData)
    setData(filteredData.slice(0, pageSize))
  }, [constData])

  const changePage = (nextPage: number) => {
    if (nextPage < 0 || nextPage >= totalPages) {
      return
    }
    setPage(nextPage)
    const start = nextPage * pageSize
    const end = start + pageSize
    setData(filteredData.slice(start, end))
  }

  return {
    data,
    page,
    totalPages,
    changePage,
  }
}
