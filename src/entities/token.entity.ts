
import { AuthTokenDto } from "src/dtos/auth.dto";
import { LoginType } from "src/interface/auth.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./generic.entity";


@Entity()
export class TokenEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'uuid', nullable: false })
    uuid: string;

    @Column({ type: 'text', nullable: false })
    token: string;
}