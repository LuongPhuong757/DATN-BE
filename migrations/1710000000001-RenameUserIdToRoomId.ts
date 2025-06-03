import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserIdToRoomId1710000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('messages', 'user_id', 'room_id');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('messages', 'room_id', 'user_id');
    }
} 