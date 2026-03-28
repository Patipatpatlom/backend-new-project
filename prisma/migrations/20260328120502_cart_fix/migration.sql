/*
  Warnings:

  - You are about to drop the column `userId` on the `CartItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId,cakeId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_userId_fkey`;

-- DropIndex
DROP INDEX `CartItem_userId_cakeId_key` ON `CartItem`;

-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `userId`,
    ADD COLUMN `cartId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cart_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CartItem_cartId_cakeId_key` ON `CartItem`(`cartId`, `cakeId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
