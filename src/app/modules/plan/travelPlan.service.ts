import { prisma } from "../../shared/prisma";


const createTravelPlan = async (payload: any) => {
  const result = await prisma.travelPlan.create({
    data: {
      userId: payload.userId,
      title:payload.title,
      destination: payload.destination,
      startDate: payload.startDate,
      endDate: payload.endDate,
      budgetRange: payload.budgetRange,
      travelType: payload.travelType,
      description: payload.description || null,
    },
  });

  return result;
};

const getAllTravelPlans = async () => {
  const result = await prisma.travelPlan.findMany({
    include: {
      user: {
        include: {
          traveller: true
        }
      },
      reviews: true,
      matchRequests: true,
 
    },
  });

  return result;
};

const getSingleTravelPlan = async (id: string) => {
  const result = await prisma.travelPlan.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
      reviews: true,
      matchRequests: true,
     
    },
  });

  return result;
};

const updateTravelPlan = async (id: string, payload: any) => {
  const result = await prisma.travelPlan.update({
    where: { id: Number(id) },
    data: payload,
  });

  return result;
};

const deleteTravelPlan = async (id: string) => {
  const result = await prisma.travelPlan.delete({
    where: { id: Number(id) },
  });

  return result;
};

export const TravelPlanService = {
  createTravelPlan,
  getAllTravelPlans,
  getSingleTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
};
