import { Router } from "express";
import { methods as ligasController } from "../controllers/ligas.controller";

const router = Router()

router.get("/",ligasController.getLigas);
router.get("/:id",ligasController.getLiga);
router.delete("/:id",ligasController.deleteLiga);
router.post("/",ligasController.addLiga);


export default router;