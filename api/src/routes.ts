import { Router } from "express"
import xtreamCodesRoutes from "./controllers/XtreamCodesController"

const router = Router()

router.use("/xtream-codes", xtreamCodesRoutes)

export default router
