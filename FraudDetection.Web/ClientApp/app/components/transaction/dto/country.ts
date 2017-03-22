import { Merchant } from './Merchant';
import { Latitude } from './Latitude';
import { Longitude } from './Longitude';
export class Country
{
	id:Number;
    name: string;
    probability: Number;
    merchants: Array<Merchant>;
    latitude: Latitude;
    longitude: Longitude;
}