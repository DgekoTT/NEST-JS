//nest generate controller auth создано командой

import {Body, Controller, Post, Req, Res, UsePipes} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Response} from "express";
import {Request} from  "express";
import {ValidationPipe} from "../pipes/validation.pipe";
import {AuthUserDto} from "../users/dto/auth-user.dto";

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Body() userDto: AuthUserDto,
          @Res({ passthrough: true }) res: Response) {
        const userInfo =  await this.authService.login(userDto);

        console.log(userInfo)

        res.cookie('refreshToken', userInfo.refreshToken, {maxAge: 30 * 24 * 60 *60 *1000, httpOnly: true})
        return userInfo;
    }


    @Post("/registration")
    async registration(@Body() userDto: CreateUserDto,
                 @Res({ passthrough: true }) res: Response) {
        const userInfo =  await this.authService.registration(userDto);
        // @ts-ignore
        res.cookie('refreshToken', userInfo.refreshToken, {maxAge: 30 * 24 * 60 *60 *1000, httpOnly: true})
        return userInfo;
    }

    @Post('/logout')
    logout( @Req() request: Request,
        @Res({ passthrough: true }) response: Response) {
        const {refreshToken} = request.cookies;
        console.log(request)
        const token = this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        return token;

    }

    @UsePipes(ValidationPipe)
    @Post('/refresh')
    async refresh(@Body() userDto: AuthUserDto,
                  @Req() request: Request,
                  @Res({ passthrough: true }) response: Response) {
        const {refreshToken} = request.cookies;
        const userInfo =  await this.authService.login(userDto);

        console.log(userInfo)

        response.cookie('refreshToken', userInfo.refreshToken, {maxAge: 30 * 24 * 60 *60 *1000, httpOnly: true})
        return userInfo;
    }


}
