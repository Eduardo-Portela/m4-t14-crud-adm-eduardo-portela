import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import verifyDataIsValid from "../middlewares/verifyDateIsValid";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  verifyDataIsValid(createLoginSchema),
  createLoginController
);

export default loginRoutes;
