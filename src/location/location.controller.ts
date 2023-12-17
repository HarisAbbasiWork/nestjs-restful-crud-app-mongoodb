import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }
    @Get("/")
    async getLocationInformation(@Res() response,) {
        try {
            const location = await this.locationService.getLocationInformation(33.673845,73.010421);
            console.log("location ",location)
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Posts has been found successfully.',
                location,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request'
            });
        }
    }
}
