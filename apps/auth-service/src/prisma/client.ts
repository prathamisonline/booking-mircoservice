import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { config } from "@repo/config";

const pool = new Pool({ connectionString: config.dbUrl });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });