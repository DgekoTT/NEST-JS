//nest generate service auth создано командой

import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {ProfileService} from "../profile/profile.service";
import {TokenService} from "../token/token.service";
import {AuthUserDto} from "../users/dto/auth-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private profileService: ProfileService,
                private tokenService: TokenService) {}

    async login(userDto: AuthUserDto ) {
        const user = await this.validateUser(userDto);
        const tokens =  await this.tokenService.generateToken(user);
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        console.log(tokens)
        return {...tokens};
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(`Пользователь с таким ${userDto.email} 
            уже существует`, HttpStatus.BAD_REQUEST)
        }
        // получаем закодированный пароль
        const hasPassword = await bcrypt.hash(userDto.password, 6);
        //создаем пользователя
        const user = await this.userService.createUser({...userDto, password: hasPassword})
        const profile = await this.profileService.createProfile(userDto, user.id)
        const tokens = await this.tokenService.generateToken(user);// возрашает токен на основе данных пользователя
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, profile};
    }


    private async validateUser(userDto: AuthUserDto) {
        //находим пользователя по емайл
        const candidate = await this.userService.getUserByEmail(userDto.email);
        // сравниваем пароли из бд и отправленный пользователем
        const passwordEquals = await bcrypt.compare(userDto.password, candidate.password);
        if (candidate && passwordEquals) {
            return candidate;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }

    async logout(refreshToken) {
        const token = await this.tokenService.removeToken(refreshToken);
        return token;
    }
}
