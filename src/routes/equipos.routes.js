import { Router } from "express";
import { methods as equiposController } from "../controllers/equipos.controller";
//import multer from "multer";

const router = Router()
//const upload = multer({dest:'static/'});

router.get("/",equiposController.getEquipos);
router.get("/ordenar",equiposController.getEquiposOrdenados);
router.get("/:id",equiposController.getEquipo);
router.get("/liga/:liga",equiposController.getEquiposPorLiga);
router.delete("/:id",equiposController.deleteEquipo);
router.post("/",/*upload.single('foto'),*/equiposController.addEquipo);
router.put("/:id",/*upload.single('foto'),*/equiposController.updateEquipo);

export default router;