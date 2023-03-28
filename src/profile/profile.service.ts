import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UpdateProfileDto} from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {
    }

    async createProfile(dto: CreateUserDto, userId) {
        dto.userId = userId
        const profile = await this.profileRepository.create(dto);

        return profile;
    }

    async updateProfile(dto: UpdateProfileDto) {
        const candidate = await this.getProfileById(dto.id)
        this.checkerProfile(candidate);

        const success = await this.profileRepository.update({...dto},{
            where: {
                id: `${dto.id}`
            }
        })
        return success;
    }

    async deleteProfile(id: number) {
        const candidate = await this.getProfileById(id);
        this.checkerProfile(candidate);

        const success = await this.profileRepository.destroy({
            where: {
                id: `${id}`
            }
        });
        return success;

    }

    async getProfileById(id: number) {
        const ourProfile = await this.profileRepository.findOne({where: {id}});
        return ourProfile;
    }

    checkerProfile(candidate:any) {
        if (!candidate) {
            throw new HttpException('Профиль с данным id не найден', HttpStatus.NOT_FOUND)
        }
    }
}