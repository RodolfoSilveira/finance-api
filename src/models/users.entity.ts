import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Accounts } from './accounts.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @OneToMany(type => Accounts, account => account.user)
    accounts: Accounts[];
}
