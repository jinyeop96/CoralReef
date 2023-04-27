export class Weather{
    temperature: any[];
    precipitation: any[];
    precipitation_probability: any[];
    windspeed: any[];

    constructor( temp: any[], prec: any[], prec_prob: any[], winds: any[]){
        this.temperature = temp;
        this.precipitation = prec;
        this.precipitation_probability = prec_prob;
        this.windspeed = winds;
    }

    getTemperature(){
        return this.temperature
    }

    getPrecipitation(){
        return this.precipitation
    }

    getPrecipitationProbability(){
        return this.precipitation_probability
    }

    getWindspeed(){
        return this.windspeed
    }

}