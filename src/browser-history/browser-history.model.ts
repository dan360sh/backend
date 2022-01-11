import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

export interface BrowserHistoryCreationAttrs {
    userId: number;
    history: string;
    domen: string;
    browser: string;
    browserVersion: string;
    os: string;
    width: number;
    height: number;
}

@Table({tableName: 'browser-history'})
export class BrowserHistory extends Model<BrowserHistory, BrowserHistoryCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.TEXT, allowNull: false})
    history: string;

    @Column({type: DataType.STRING, allowNull: false})
    domen: string;

    @Column({type: DataType.STRING, allowNull: false})
    browser: string;

    @Column({type: DataType.STRING, allowNull: false})
    browserVersion: string;

    @Column({type: DataType.STRING, allowNull: false})
    os: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    width: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    height: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

}