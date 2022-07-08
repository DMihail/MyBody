import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Chat } from "./Chat";

@Entity("messages")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message_id: number;
  @Column()
  date: number;
  @Column()
  text: string;
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
