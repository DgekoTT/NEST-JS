//nest generate service files
//npm install --save @nestjs/serve-static
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from "fs";
import * as path from "path"
import * as uuid from "uuid"
import {InjectModel} from "@nestjs/sequelize";
import {Files} from "./files.model";
import {Op} from "sequelize";

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
        const delOk = await this.filesRepository.destroy({
            where: {
                essenceId: `${essenceId}`,
                essenceTable: `${essenceTable}`
            }
        });
        return delOk;
    }

     async deleteUnUseFiles() {
        const { Op } = require("sequelize");
        const delFiles = await this.filesRepository.destroy({
            where: {
                [Op.or]: [
                    { essenceId: null },
                    { essenceTable:  null },
                ],
            },

        });

         const delFiles2 = await this.filesRepository.destroy({
             where: {
                 // @ts-ignore
                 createdAt: {
                 [Op.lt] : +new Date() - 3600000
                 }
             }
        })
     return delFiles2;
    }
}
