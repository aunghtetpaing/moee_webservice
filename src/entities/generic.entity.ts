import { AfterInsert, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class GenericEntity {
    @CreateDateColumn({ default: null, type:'timestamp', nullable: true })
    created_at: string;

    @UpdateDateColumn({ default: null, type: 'timestamp', nullable: true })
    updated_at: string;

    @DeleteDateColumn({ default: null, type: 'timestamp', nullable: true })
    deleted_at: string;

    @AfterInsert()
    async afterInsert(): Promise<void> {
        delete this.created_at;
        delete this.updated_at;
        delete this.deleted_at;
    }
}