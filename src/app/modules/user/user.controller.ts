import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.services";
import pick from "../../helper/pick";
import httpStatus from "http-status";
import { IJWTPayload } from "../../types/common";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters= pick(req.query, ["status", "role", "email", "searchTerm"])
    const option= pick(req.query, ["page", "limit", "sortBy","sortOrder"])
 
    const result = await UserService.getAllFromDB(filters, option);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrive successfully",
        meta:result.meta,
        data: result.data
    })
})


const createTravaller = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createTravaller(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Travaller create successfully",
        data: result
    })
})
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin create successfully",
        data: result
    })
})

const getMyProfile = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

    const user = req.user;

    const result = await UserService.getMyProfile(user as IJWTPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile data fetched!",
        data: result
    })
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await UserService.changeProfileStatus(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});

const updateMyProfie = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
console.log(req.user);
    const user = req.user;

    const result = await UserService.updateMyProfie(user as IJWTPayload, req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile updated!",
        data: result
    })
});
export const UserController = {
    createTravaller, getAllFromDB, createAdmin, getMyProfile, changeProfileStatus,updateMyProfie
}