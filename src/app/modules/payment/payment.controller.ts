import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { PaymentService } from "./payment.service";
import sendResponse from "../../shared/sendResponse";


const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createPayment(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Payment created successfully!",
    data: result,
  });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayments();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payments fetched successfully!",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getSinglePayment(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment fetched successfully!",
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.updatePayment(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment updated successfully!",
    data: result,
  });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.deletePayment(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment deleted successfully!",
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
