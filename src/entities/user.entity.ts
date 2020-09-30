import * as bcrypt from 'bcryptjs';
import { UserRoles } from "src/interface/user.interface";
import { AfterInsert, BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { VerifyCodeEntity } from './verifycode.entity';

@Entity('users')
export class UserEntity extends GenericEntity {
    
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    
    @Column({ type: 'varchar', nullable: false })
    fullName: string;

    @Column({ type: 'varchar', nullable: false,  unique: true  })
    email: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    phoneNumber: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
    roles: UserRoles;

    @OneToOne( () => VerifyCodeEntity, (verifycode: VerifyCodeEntity) => verifycode.code, {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    }, )
    @JoinColumn()
    verifycode_: VerifyCodeEntity;

    @Column({ type: 'boolean', nullable: false, default: false })
    active: boolean;

    @BeforeInsert()
    async hashPassword():Promise<void> {
        this.password =  bcrypt.hashSync(this.password, 10);
    }

    @AfterInsert()
    async afterInsert(): Promise<void> {
        delete this.password;
        delete this.updated_at;
        delete this.created_at;
        delete this.deleted_at;
    }
}