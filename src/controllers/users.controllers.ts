import { Request, Response } from "express";
import { createUsersServices } from "../services/users/createUser.service";
import {
  IUser,
  IUserRequest,
  UserWithoutPassword,
} from "../interfaces/users.interface";
import getAllUsersServices from "../services/users/getAllUsers.services";
import deleteUsersServices from "../services/users/deleteUser.services";
import { editUserService } from "../services/users/editUser.service";
import getUserLoggedService from "../services/users/getLoggedUser.service";
import recoverUserService from "../services/users/recoverUser.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;

  const newUser = await createUsersServices(userData);
  return res.status(201).json(newUser);
};

const gettAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await getAllUsersServices();
  return res.status(200).json(users);
};

const getLoggedUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.user.id;

  const getLoggedUser = await getUserLoggedService(userId);

  return res.json(getLoggedUser);
};

const editUsersControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const userData: IUser = req.body;

  const editUser = await editUserService(id, userData);

  return res.status(200).json(editUser);
};

const recoverUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const updatedUser: UserWithoutPassword = await recoverUserService(userId);
  return res.json(updatedUser);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);
  await deleteUsersServices(userId);
  return res.status(204).json();
};

export {
  createUsersController,
  gettAllUsersController,
  editUsersControllers,
  deleteUsersController,
  getLoggedUserProfileController,
  recoverUserControllers,
};
