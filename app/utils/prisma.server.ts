import { PrismaClient } from "@prisma/client";
import invariant from "tiny-invariant";

let prisma: PrismaClient;
declare global {
  var __db__: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = getDbClient();
  global.__db__ = prisma;
} else {
  if (!global.__db__) global.__db__ = getDbClient();

  prisma = global.__db__;
}

export { prisma };

function getDbClient() {
  const { DATABASE_URL } = process.env;
  invariant(typeof DATABASE_URL === "string", "DATABASE_URL env var not set");

  const databaseUrl = new URL(DATABASE_URL);

  const client = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });

  // connect eagerly
  // client.$connect();

  return client;
}
