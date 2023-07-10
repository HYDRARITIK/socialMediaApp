import express from "express";
import { getUser , updateUser,
    followUser,unfollowUser
} from "../controllers/user";

const router = express.Router()

router.get("/profile", getUser)
router.put("/", updateUser)


router.post("/follow",followUser);
router.post("/unfollow",unfollowUser)


export default router