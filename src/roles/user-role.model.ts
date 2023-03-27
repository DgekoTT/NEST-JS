import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";
import {Role} from "./roles.model";



@Table({tableName: 'UserRoles', createdAt: false, updatedAt: false})//появится таблица с именем UserRoles
export class UserRoles extends Model<UserRoles> {

    // появятся указю колонки
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        //получим id как число, уникальное автозаполненеие 1..2..3
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;


}