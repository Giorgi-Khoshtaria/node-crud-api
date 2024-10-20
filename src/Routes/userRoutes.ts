import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsers,
  getUserById,
  updateUserController,
} from "../Controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", createUserController);
router.put("/:userId", updateUserController);
router.delete("/:userId", deleteUserController);

export default router;
