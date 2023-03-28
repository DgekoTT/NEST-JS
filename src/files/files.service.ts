//nest generate service files
//npm install --save @nestjs/serve-static
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from "fs";
import * as path from "path"
import * as uuid from "uuid"

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            //создаем уникальное имя файла
            const fileName = uuid.v4() + '.jpg';
            // получаем путь до файла
            const filePath = path.resolve(__dirname,'static');

            //если по этому пути ничео не существует
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            //записвыаем файл
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)

            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
