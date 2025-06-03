import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMessageTable1710000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "messages",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "sender_id",
                        type: "int",
                    },
                    {
                        name: "is_admin",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "content",
                        type: "text",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        // Add foreign keys
        await queryRunner.createForeignKey(
            "messages",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "messages",
            new TableForeignKey({
                columnNames: ["sender_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("messages");
        const foreignKeys = table.foreignKeys;

        // Drop foreign keys first
        for (const foreignKey of foreignKeys) {
            await queryRunner.dropForeignKey("messages", foreignKey);
        }

        await queryRunner.dropTable("messages");
    }
} 