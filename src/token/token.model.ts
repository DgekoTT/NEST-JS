import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";

interface TokenCreationAttrs {
    id: number;
    userId: number;
    refreshToken: string;
}

@Table({tableName: "Token"})
export class Token extends Model<User, TokenCreationAttrs> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.TEXT})
    refreshToken: string;

    @BelongsTo(() => User)
    user:User;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}