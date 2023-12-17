import { Injectable } from '@nestjs/common';
import { getCountryInfo } from '../utils/googleMaps'
@Injectable()
export class LocationService {
    constructor() { }
    async getLocationInformation(lat: Number, lng: Number) {
        const locationInformation = await getCountryInfo(lat, lng);
        console.log("locationInformation ", locationInformation)
        return locationInformation
    }
}
