import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { ForgetPasswordDto } from 'src/dto//forget-password.dto';
import { ResetPasswordDto } from 'src/dto//reset-password.dto';
import {  } from 'src/dto//forget-password.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
        @Post()
        async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
            try {
                const newUser = await this.userService.createUser(createUserDto);
                return response.status(HttpStatus.CREATED).json({
                    message: 'User has been created successfully',
                    newUser,
                })
            } catch (err) {
                console.log("err ",err)
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: 500,
                    message: 'Error: User not created!',
                    error: 'Bad Request'
                })
            }
        }
        @Post('/login')
        async loginUser(@Res() response, @Body() loginUserDto: LoginUserDto) {
            try {
                const loginUserResponse = await this.userService.login(loginUserDto)
                console.log("loginUserResponse ",loginUserResponse)
                return response.status(HttpStatus.CREATED).json(loginUserResponse)
            } catch (err) {
                console.log("err ",err)
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: 500,
                    message: 'Error: Internal Server Error!',
                    error: 'Bad Request'
                })
            }
        }
        @Post('/forgetpassword')
        async forgetPassword(@Res() response, @Body() forgetPasswordDto: ForgetPasswordDto) {
            try {
                const forgetPasswordResponse = await this.userService.forgetPassword(forgetPasswordDto)
                console.log("forgetPasswordResponse ",forgetPasswordResponse)
                return response.status(HttpStatus.CREATED).json(forgetPasswordResponse)
            } catch (err) {
                console.log("err ",err)
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: 500,
                    message: 'Error: Internal Server Error!',
                    error: 'Bad Request'
                })
            }
        }
        @Post('/setnewpassword')
        async setNewPassword(@Res() response, @Body() resetPasswordDto: ResetPasswordDto) {
            try {
                const forgetPasswordResponse = await this.userService.resetPassword(resetPasswordDto)
                console.log("forgetPasswordResponse ",forgetPasswordResponse)
                return response.status(HttpStatus.CREATED).json(forgetPasswordResponse)
            } catch (err) {
                console.log("err ",err)
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: 500,
                    message: 'Error: Internal Server Error!',
                    error: 'Bad Request'
                })
            }
        }
}