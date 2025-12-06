import { prisma } from "../../shared/prisma";


const createPayment = async (payload: any) => {
  return prisma.payment.create({
    data: {
      userId: payload.userId,
      subscriptionType: payload.subscriptionType,
      amount: payload.amount,
      status: payload.status,
    },
  });
};

const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: { user: true },
  });
};

const getSinglePayment = async (id: string) => {
  return prisma.payment.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
};

const updatePayment = async (id: string, payload: any) => {
  return prisma.payment.update({
    where: { id: Number(id) },
    data: payload,
  });
};

const deletePayment = async (id: string) => {
  return prisma.payment.delete({
    where: { id: Number(id) },
  });
};

export const PaymentService = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
