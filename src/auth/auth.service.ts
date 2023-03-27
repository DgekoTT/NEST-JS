//nest generate service auth создано командой

import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/user.model";
import {ProfileService} from "../profile/profile.service";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private profileService: ProfileService) {}

    async login(userDto: CreateUserDto ) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(`Пользователь с таким ${userDto.email} 
            уже существует`, HttpStatus.BAD_REQUEST)
        }
        // получаем закодированный пароль
        const hasPassword = await bcrypt.hash(userDto.password, 5);
        //создаем пользователя
        const user = await this.userService.createUser({...userDto, password: hasPassword})
        const profile = await this.profileService.createProfile(userDto, user.id)
        const token = await this.generateToken(user);// возрашает токен на основе данных пользователя
        return {token, profile};
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        //находим пользователя по емайл
        const candidate = await this.userService.getUserByEmail(userDto.email);
        // сравниваем пароли из бд и отправленный пользователем
        const passwordEquals = await bcrypt.compare(userDto.password, candidate.password);
        if (candidate && passwordEquals) {
            return candidate;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
}
