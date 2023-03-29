//nest generate service files
//npm install --save @nestjs/serve-static
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from "fs";
import * as path from "path"
import * as uuid from "uuid"
import {InjectModel} from "@nestjs/sequelize";
import {Files} from "./files.model";

@Injectable()
export class FilesService {

    constructor(@InjectModel(Files) private filesRepository: typeof Files) {
    }

    async createFile(file): Promise<string> {
        try {
            //создаем уникальное имя файла
            const fileName = uuid.v4() + '.jpg';
            // получаем путь до файла
            const filePath = path.resolve(__dirname,'static');

            //если по этому пути ничего не существует
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            //записываем файл
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)

            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createFileToDb(fileName: string, essenceTable: string, essenceId: number ) {
        const newFile = await this.filesRepository.create({essenceTable: essenceTable,
            essenceId: essenceId, image: fileName})
    }

    async deleteFile(essenceTable: string, essenceId: number ) {
        const success = await this.filesRepository.destroy({
            where: {
                essenceId: `${essenceId}`,
                essenceTable: `${essenceTable}`
            }
        });
        return success;
    }

    deleteUnUseFiles() {

    }
}
