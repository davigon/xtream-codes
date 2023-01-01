import { useEffect, useState } from "react"

export const useScrollConstData = <T>(constData: T[]) => {
  const pag = 20

  const [currentDataLength, setCurrentDataLenght] = useState<number>(0)
  const [data, setData] = useState<T[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)

  useEffect(() => {
    const length = Math.min(constData.length, pag)
    setCurrentDataLenght(length)
    setData(constData.slice(0, length))
    setHasMore(length !== constData.length)
  }, [constData])

  const loadMoreData = () => {
    if (currentDataLength + pag >= constData.length) {
      setData(constData)
      setCurrentDataLenght(constData.length)
      setHasMore(false)
      return
    }

    setData(constData.slice(0, currentDataLength + pag))
    setCurrentDataLenght(currentDataLength + pag)
    setHasMore(true)
  }

  return {
    data,
    hasMore,
    loadMoreData,
  }
}
