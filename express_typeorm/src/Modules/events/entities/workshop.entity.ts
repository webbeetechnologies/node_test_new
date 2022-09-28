import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workshop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    start: string;

    @Column({ type: 'datetime' })
    end: string;

    @Column({ type: 'integer', default: null })
    eventId: number;

    @Column()
    name: string;

    @Column({ type: 'datetime' })
    createdAt: string;
}
