import { Controller, Post, Body, UseGuards, Get, Param, Query, Delete, Put } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { httpResponseException } from '../../utilites';
import { sortObject } from '../../utilites';

import { UserRoles } from '../../interface/user.interface';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserDto, userFilterDto, DeleteUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { hasRoles } from '../../dtos/roles.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

@Post()
async createUser(@Body() requestUser: CreateUserDto): Promise<any> {
  const getUser: UserEntity = await this.userService.create(requestUser);

  if(getUser) {
    const { verifycode_ , ...userInfo } = getUser;
    return httpResponseException('000', 'new user is successfully created!', sortObject({ ...userInfo, ...verifycode_ }));
  }

  return httpResponseException('055','services not found');
}

// @UseGuards(JwtAuthGuard, RolesGuard)
// @hasRoles(UserRoles.USER)
@Put()
async updateOne(@Body() updateUserInfo: UpdateUserDto): Promise<any> {
  let responseResult: any = {}

  const { phoneNumber, password, ...userInfo } = updateUserInfo;
  const updated = await this.userService.updateUserInfo(userInfo);
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRoles.USER)
  @Get()
  async getAllUser(@Query() filter?: userFilterDto): Promise<any> {
    let responseResult: any = {};
    const getUserList = await this.userService.getAll(filter);

    responseResult.list = getUserList;

    Object.keys(filter).length > 0 ?
    responseResult.metadata = { total: getUserList.length + '', ...filter } :
    responseResult.metadata = { total: getUserList.length + '' }
    
    return httpResponseException('000', 'successful', sortObject(responseResult));
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRoles.USER)
  @Get('/:email')
  async getUser(@Param('email') email: string): Promise<any> {
    let responseResult: any = {};

    const getUser: UserEntity = await this.userService.findOneByEmail(email);
    const { verifycode_ , ...userInfo } = getUser;
    const { password, roles, active, ...userInfoResult } = userInfo;
    const { created_at, updated_at, id, ...accountInfoResult } = verifycode_;

    responseResult.userInfo =  sortObject({ ...userInfoResult });
    responseResult.accountInfo = sortObject({ roles: roles, active: active, ...accountInfoResult });

    return httpResponseException('000', 'successful', sortObject(responseResult));
  }
  

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRoles.USER)
  @Delete()
  async deleteOne(@Body() deleteUserDto: DeleteUserDto): Promise<any> {
    await this.userService.deleteOne(deleteUserDto.email);
  }
}