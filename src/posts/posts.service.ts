//nest generate service posts


import { Injectable } from '@nestjs/common';
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
        return post;
    }
}
