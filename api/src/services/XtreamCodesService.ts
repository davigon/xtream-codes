import fetch from "node-fetch"

export type XtreamCodesGetParams = {
  host: string
  port: string
  username: string
  password: string
}

export class XtreamCodesService {
  get = async (params: XtreamCodesGetParams) => {
    const { host, port, username, password } = params

    try {
      const response = await fetch(
        `http://${host}:${port}/panel_api.php?username=${username}&password=${password}`
      )
      const body = await response.json()

      return body
    } catch (error) {
      if (error instanceof Error) throw error

      throw new Error("unknown error")
    }
  }
}
