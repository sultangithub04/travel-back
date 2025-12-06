import express, { NextFunction, Request, Response } from "express"
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { fileUploader } from "../../helper/fileuploder";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router()

router.get(
    '/me',
    auth(UserRole.ADMIN, UserRole.TRAVELLER),
    UserController.getMyProfile
)
router.post("/create-traveler", fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createTravallerValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createTravaller(req, res, next)
    }
)
router.post("/create-admin",auth(UserRole.ADMIN), fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createAdmin(req, res, next)
    }
)

router.get("/", auth(UserRole.ADMIN), UserController.getAllFromDB)

router.get( '/:id', UserController.changeProfileStatus);//3
router.patch('/:id',  UserController.changeProfileStatus);//4


router.patch(
    '/:id/status',
    auth(UserRole.ADMIN),
    UserController.changeProfileStatus
);

router.patch(
    "/update-my-profile",
    auth(UserRole.ADMIN, UserRole.TRAVELLER),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        return UserController.updateMyProfie(req, res, next)
    }
);
export const userRoute = router;