import data2018 from "../data/2018.json";
import data2019 from "../data/2019.json";
import data2020 from "../data/2020.json";

export const getDataByYear = async (year) => {    
    switch(year){
        case "2018":
            return data2018;
        case "2019":
            return data2019;
        case "2020":
            return data2020;
        default:
            return ""
    }
}