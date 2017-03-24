import { Merchant } from './Merchant';
import { Latitude } from './Latitude';
import { Longitude } from './Longitude';
export class Country
{
	countryId:Number;
    name: string;
    probability: Number;
    merchants: Array<Merchant>;
    latitude: Latitude;
    longitude: Longitude;
}