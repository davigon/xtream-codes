import { Request, Response, Router } from "express"
import { XtreamCodesService } from "../services/XtreamCodesService"

class XtreamCodesController {
  private xtreamCodesService = new XtreamCodesService()

  get = async (req: Request, res: Response) => {
    const { host, port, username, password } = req.query

    if (
      host === undefined ||
      port === undefined ||
      username === undefined ||
      password === undefined
    ) {
      res.sendStatus(400)
      return
    }

    try {
      const response = await this.xtreamCodesService.get({
        host: String(host),
        port: String(port),
        username: String(username),
        password: String(password)
      })

      res.send(response)
    } catch (error) {
      res.sendStatus(400)
    }
  }
}

const xtreamCodesController = new XtreamCodesController()

const router = Router()

router.get("/", xtreamCodesController.get)

export default router
