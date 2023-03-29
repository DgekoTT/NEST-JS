import { Column, DataType, Model, Table} from "sequelize-typescript";


interface BlockCreationAttrs {
    id: number;
    uniqueTitle: string;
    title: string;
    content: string;
    image: string;
    group: string;

}

@Table({tableName: 'blocks'})//появится таблица с именем blocks
export class Block extends Model<BlockCreationAttrs> {

    // появятся указю колонки
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        //получим id как число, уникальное автозаполненеие 1..2..3
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    uniqueTitle: string;

    //allowNull: false не должен быть пустым
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.STRING})
    group: string;

}