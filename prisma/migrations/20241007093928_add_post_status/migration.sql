-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('MISSING', 'REPORTED', 'FOUND');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'MISSING';
