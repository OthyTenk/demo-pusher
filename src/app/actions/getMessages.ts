import prisma from "../../../libs/prismadb";

export const getMessages = async () => {
  return prisma.message.findMany({
    select: {
      message: true,
      id: true,
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 50,
  });
};
