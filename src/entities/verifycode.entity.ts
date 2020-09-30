import { IsNumber, Length } from "class-validator";
import { AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./generic.entity";


@Entity('verify_code')
export class VerifyCodeEntity extends GenericEntity {
    
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', nullable: false, default: () => Math.floor(100000 + Math.random() * 900000) })
    @Length(6,6, { message: 'verifycode is required'})
    code: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    @IsNumber()
    resend_times: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    @IsNumber()
    attempt: number;

    @Column({ type: 'boolean', nullable: false, default: 0 })
    is_verify: boolean;

    @Column({ type: 'boolean', nullable: false, default: false })
    is_block: boolean;

    @AfterInsert()
    async deleteColumn(): Promise<void> {
        delete this.id;
        delete this.created_at;
        delete this.updated_at;
        delete this.deleted_at;
    }

    @AfterUpdate()
    async afterUpdate(): Promise<void> {
        delete this.created_at;
        delete this.updated_at;
        delete this.deleted_at;
    }

}