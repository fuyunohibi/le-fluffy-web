/*
  Warnings:

  - Added the required column `age` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "age" INTEGER NOT NULL;
