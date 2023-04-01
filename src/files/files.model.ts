import { Column, DataType, Model, Table} from "sequelize-typescript";


interface FilesCreationAttrs {
    essenceTable: string;
    essenceId: number;
    image: string;
}

@Table({tableName: 'Files'})//появится таблица с именем blocks
export class Files extends Model<FilesCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        //получим id как число, уникальное автозаполненеие 1..2..3
    id: number;

    @Column({type: DataType.STRING})
    essenceTable: string;

    @Column({type: DataType.STRING})
    essenceId: string;

    @Column({type: DataType.STRING})
    image: string;

}