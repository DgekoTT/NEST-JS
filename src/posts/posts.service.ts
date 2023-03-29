//nest generate service posts


import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {
    //что бы иметь доступ к базе, инжектим модель бд
    constructor(@InjectModel(Post) private postRepository: typeof Post,
                //для работы с файлами
                private fileService: FilesService) {
    }


    async createPo(dto: CreatePostDto, image: any) {

        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({...dto, image: fileName})
        //записываем файл в бд
        const newFile = await this.fileService.createFileToDb(fileName, "Film", post.id)
        return post;

    }

    async deleteBlock(id: number) {
        await this.checkerPost(id);
        //удаляем файлы относящиеся к фильму
        await this.fileService.deleteFile("Film", id)


        const success = await this.postRepository.destroy({
            where: {
                id: `${id}`
            }
        })
        return success;
    }

    async getPostById(id: number) {
        const block = await this.postRepository.findOne({where: {id}});
        return block;

    }

    async checkerPost(id ) {
        const isPost = await this.getPostById(id);
        if (!isPost) {
            throw new HttpException('Пост с данным id не найден', HttpStatus.NOT_FOUND)
        }
    }

}
