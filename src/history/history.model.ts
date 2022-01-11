import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

export interface HistoryCreationAttrs {
    content: string;
    userId: number;
    plusСrystal: number;
}

@Table({tableName: 'history_crystal'})
export class HistoryСrystal extends Model<HistoryСrystal, HistoryCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    plusСrystal: number;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    read: boolean;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}