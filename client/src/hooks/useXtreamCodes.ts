import { useQuery, UseQueryResult } from "react-query"
import { XtreamCodesData } from "../types/types"

export type UseXtreamCodesParams = {
  host?: string
  port?: string
  username?: string
  password?: string
}

export const useXtreamCodes = (params: UseXtreamCodesParams) => {
  const { host, port, username, password } = params

  const xtreamCodesFetch = async () => {
    if (
      host === undefined ||
      port === undefined ||
      username === undefined ||
      password === undefined
    ) {
      throw Error(
        "Falta alguno de los siguientes parámetros: host, port, username, password."
      )
    }

    const response = await fetch(
      `/api/xtream-codes?host=${host}&port=${port}&username=${username}&password=${password}`
    )

    if (response.status === 400)
      throw Error(
        "Los datos especificados no corresponden a una cuenta de IPTV."
      )

    return response.json()
  }

  const xtreamCodesQuery: UseQueryResult<XtreamCodesData, Error> = useQuery(
    ["xtreamCodes"],
    xtreamCodesFetch
  )

  return {
    data: xtreamCodesQuery.data,
    isLoading: xtreamCodesQuery.isLoading,
    isError: xtreamCodesQuery.isError,
    error: xtreamCodesQuery.error,
  }
}
