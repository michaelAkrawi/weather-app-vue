import { api } from "./axios";
import AppConfig from "../AppConfig";


export function fetchLoacations(query) {
    return api.get(`/locations/v1/cities/autocomplete?apikey=${AppConfig.appKey}&q=${query}`);
}

export function getLocationWeather(locationKey) {
    return api.get(`/currentconditions/v1/${locationKey}?apikey=${AppConfig.appKey}`);
}

export function getWeeklyForecast(locationKey, celsius = false) {
    return api.get(`/forecasts/v1/daily/5day/${locationKey}?apikey=${AppConfig.appKey}&metric=${celsius}`);
}