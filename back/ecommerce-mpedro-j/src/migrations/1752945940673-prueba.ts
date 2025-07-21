// src/migrations/1752945940673-prueba.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Prueba1752945940673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users ADD COLUMN age varchar(3);');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users DROP COLUMN age;');
  }
}
