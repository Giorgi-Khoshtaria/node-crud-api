import { Request, Response } from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser } from "../db";
import { validateUserId, validateUserPayload } from "../Utils/validation";

export const getAllUsers = (req: Request, res: Response) => {
  const users = getUsers();
  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!validateUserId(userId))
    return res.status(400).json({ message: "Invalid userId" });

  const user = getUser(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};

export const createUserController = (req: Request, res: Response) => {
  const { isValid, message } = validateUserPayload(req.body);
  if (!isValid) return res.status(400).json({ message });

  const newUser = createUser(req.body);
  res.status(201).json(newUser);
};

export const updateUserController = (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!validateUserId(userId))
    return res.status(400).json({ message: "Invalid userId" });

  const updatedUser = updateUser(userId, req.body);
  if (!updatedUser) return res.status(404).json({ message: "User not found" });

  res.status(200).json(updatedUser);
};

export const deleteUserController = (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!validateUserId(userId))
    return res.status(400).json({ message: "Invalid userId" });

  const success = deleteUser(userId);
  if (!success) return res.status(404).json({ message: "User not found" });

  res.status(204).send();
};
