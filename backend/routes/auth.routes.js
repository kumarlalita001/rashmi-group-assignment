import { Router } from "express";
import { checkAuth } from "../middlewares/check.auth.middleware.js";
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth, getMe);

export default router;
