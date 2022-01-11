import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";
import {HistoryСrystal} from "../history/history.model";
import {BrowserHistory} from "../browser-history/browser-history.model";

interface UserCreationAttrs {
    userCode: string;
    userFlag?: number;
    emailCode?: number;
}

@Table({tableName: 'users_test'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true})
    email: string;
    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column({type: DataType.STRING})
    password: string;

    @Column({type: DataType.STRING, allowNull: false,unique: true })
    userCode: string;

    @Column({type: DataType.INTEGER})
    emailCode: number;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    userFlag: number;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];

    @HasMany(() => HistoryСrystal)
    historyСrystal: HistoryСrystal[];

    @HasMany(() => HistoryСrystal)
    browserHistory: BrowserHistory[];

}
