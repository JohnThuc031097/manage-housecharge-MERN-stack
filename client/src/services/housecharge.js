import axios from "axios";

const HttpHouseCharge = axios.create({
    baseURL: 'http://localhost:8081/api/housecharge',
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        "Content-type": "application/json"
    }
});

const HouseChargeServices = {
    get() {
        return HttpHouseCharge.get('/');
    },
    upload(data) {
        return HttpHouseCharge.post('/upload', data);
    }
}

export default HouseChargeServices;