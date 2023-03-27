import {BelongsToMany, Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-role.model";
import {Profile} from "../profile/profile.model";

interface USerCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})//появится таблица с именем users
export class User extends Model<User, USerCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный номер'})
    // появятся указю колонки
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    //получим id как число, уникальное автозаполненеие 1..2..3
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'почтовый адрес'})
    //allowNull: false не должен быть пустым
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'false', description: 'Забанен пользователь или нет '})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Мат', description: 'Причина бана'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    /*создаем связь многий ко многим между пользователями и ролями
    содениние FK будет в таблице UserRoles
     */
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasOne(() => Profile)
    userProfile: Profile;
}