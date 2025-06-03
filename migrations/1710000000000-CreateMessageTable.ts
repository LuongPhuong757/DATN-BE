import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessageTable1710000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "message",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "userId",
                        type: "varchar",
                    },
                    {
                        name: "room",
                        type: "varchar",
                    },
                    {
                        name: "content",
                        type: "text",
                    },
                    {
                        name: "timestamp",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("message");
    }
} 