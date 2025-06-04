import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShippingInfoToOrders1717481172000 implements MigrationInterface {
    name = 'AddShippingInfoToOrders1717481172000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE orders ADD COLUMN user_name VARCHAR(255)`);
        await queryRunner.query(`ALTER TABLE orders ADD COLUMN phone_number VARCHAR(255)`);
        await queryRunner.query(`ALTER TABLE orders ADD COLUMN address VARCHAR(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE orders DROP COLUMN address`);
        await queryRunner.query(`ALTER TABLE orders DROP COLUMN phone_number`);
        await queryRunner.query(`ALTER TABLE orders DROP COLUMN user_name`);
    }
} 