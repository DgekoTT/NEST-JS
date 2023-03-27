import {Body, Controller, Delete, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/role.guard";
import {ProfileService} from "./profile.service"


@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {
    }

    @Roles("admin")
    @UseGuards(RolesGuard) // проверка на роли, получить доступ сможет только админ
    @Put('/:id')
    updateProfile(@Body() dto: UpdateProfileDto) {
        return this.profileService.updateProfile(dto);
    }

    @Roles("admin")
    @UseGuards(RolesGuard) // проверка на роли, получить доступ сможет только админ
    @Delete('/:id')
    deleteProfile(@Param("id") id: number) {
        return this.profileService.deleteProfile(id);
    }

}