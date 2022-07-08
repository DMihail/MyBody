import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";

@Entity("chats")
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Index({ unique: true })
  chat_id: number;
  @Column()
  title: string;
  @Column()
  is_bot: boolean;
  @Column()
  language_code: string;
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
