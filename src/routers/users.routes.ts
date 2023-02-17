import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  editUsersControllers,
  getLoggedUserProfileController,
  gettAllUsersController,
  recoverUserControllers,
} from "../controllers/users.controllers";
import { verifyUsersExistMiddleware } from "../middlewares/verifyUserExists.middlewares";
import verifyDataIsValid from "../middlewares/verifyDateIsValid";
import { createUserSchema, editUserSchema } from "../schemas/users.schemas";
import verifyTokenIsValid from "../middlewares/verifyTokenIsValid.middleware";
import verifyUserIsAdminMiddleware from "../middlewares/verifyUserIsAdmin.middleware";
import verifyUserPermissions from "../middlewares/verifyUserPermissions";

const userRoutes: Router = Router();

userRoutes.post("", verifyDataIsValid(createUserSchema), createUsersController);
userRoutes.get(
  "",
  verifyTokenIsValid,
  verifyUserIsAdminMiddleware,
  gettAllUsersController
);
userRoutes.get("/profile", verifyTokenIsValid, getLoggedUserProfileController);
userRoutes.patch(
  "/:id",
  verifyTokenIsValid,
  verifyUsersExistMiddleware,
  verifyDataIsValid(editUserSchema),
  verifyUserPermissions,
  editUsersControllers
);
userRoutes.put(
  "/:id/recover",
  verifyTokenIsValid,
  verifyUsersExistMiddleware,
  verifyUserIsAdminMiddleware,
  recoverUserControllers
);
userRoutes.delete(
  "/:id",
  verifyTokenIsValid,
  verifyUsersExistMiddleware,
  verifyUserPermissions,
  deleteUsersController
);

userRoutes.post("/login");

export default userRoutes;
