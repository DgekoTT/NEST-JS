import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";

interface ProfileCreationAttrs {
    fullName: string;
    phone: number;
    age: number;
    city: string;
}

@Table({tableName: 'Profile'})
export class Profile extends Model<User, ProfileCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: true})

    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    fullName: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    phone: number;

    @Column({type: DataType.INTEGER})
    age: number;

    @Column({type: DataType.STRING, allowNull: false})
    city: string;

    @BelongsTo(() => User)
    user:User;

    @ForeignKey(() => User) //столбец с ключем ид юзера
    @Column({type: DataType.INTEGER, allowNull: true})
    userId: number;


}