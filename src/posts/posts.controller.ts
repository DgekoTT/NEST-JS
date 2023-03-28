//nest generate controller posts

import {CreatePostDto} from "./dto/create-post.dto";
import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {

    // что бы был доступ к постсервис через зис
    constructor(private postService: PostsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))//для работы с файлами
    createPost(@Body() dto: CreatePostDto,
               //получить файл
               @UploadedFile() image){
        return this.postService.createPo(dto, image)
    }
}
