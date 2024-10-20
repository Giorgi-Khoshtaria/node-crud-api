import { Request, Response, NextFunction } from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser } from "../db";
import { validateUserId, validateUserPayload } from "../Utils/validation";

// GET all users
export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET user by ID
export const getUserById = async (
  req: Request<{ userId: string }>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  if (!validateUserId(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }

  const user = getUser(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user);
};

// POST create new user
export const createUserController = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { isValid, message } = validateUserPayload(req.body);
  if (!isValid) {
    res.status(400).json({ message });
    return;
  }

  const newUser = createUser(req.body);
  res.status(201).json(newUser);
};

// PUT update existing user
export const updateUserController = async (
  req: Request<{ userId: string }>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  if (!validateUserId(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }

  const updatedUser = updateUser(userId, req.body);
  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(updatedUser);
};

// DELETE user by ID
export const deleteUserController = async (
  req: Request<{ userId: string }>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  if (!validateUserId(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }

  const success = deleteUser(userId);
  if (!success) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(204).send();
};
