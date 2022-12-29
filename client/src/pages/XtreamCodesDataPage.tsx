import React from "react"
import { useSearchParams } from "react-router-dom"
import { useXtreamCodes } from "../hooks/useXtreamCodes"

export const XtreamCodesDataPage = () => {
  const [searchParams] = useSearchParams()
  const { data, isLoading, isError, error } = useXtreamCodes({
    host: searchParams.get("host") || undefined,
    port: searchParams.get("port") || undefined,
    username: searchParams.get("username") || undefined,
    password: searchParams.get("password") || undefined,
  })

  if (isLoading) return <>cargando</>

  if (isError || data === undefined) return <>{error?.message}</>

  return (
    <>
      <h1>Data</h1>
      <p>{data.user_info.username}</p>
    </>
  )
}
