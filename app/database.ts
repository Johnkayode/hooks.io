import prisma from "../prisma/client";

export default async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('DB connected')
  } catch (error) {
    // logger.error('Could not connect to database.');
    // logger.error(error);
    console.log(error)
    process.exit(1);
  }
}