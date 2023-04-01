
import {
    Controller,
    Delete, Get, Param,
    UseGuards,
} from '@nestjs/common';

import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/role.guard";
import {FilesService} from "./files.service";

@Controller('files')
export class FilesController {


    constructor(private fileService: FilesService) {
    }

    @Roles("admin")
    @UseGuards(RolesGuard) // проверка на роли, получить доступ сможет только админ
    @Delete("/del")
    deleteUnUseFiles() {
        return this.fileService.deleteUnUseFiles();
    }

    @Get("/str")//передаем значение таблица + _ + ид(Bloks_1)
    //получаем все файлы пользователя из определенной категории
    getFilesByIdTable(@Param('Table_id') param: string) {
        const [table, id]= param.split('_');
        return this.fileService.getAllFilesByIdAndTable(table, +id)
    }
}
