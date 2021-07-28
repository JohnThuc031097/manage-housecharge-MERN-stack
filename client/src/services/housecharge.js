import axios from "axios";

const HttpHouseCharge = axios.create({
    baseURL: 'http://localhost:8081/api/housecharge',
});

const HouseChargeServices = {
    get() {
        return HttpHouseCharge.get('/');
    },
    add(data) {
        return HttpHouseCharge.post('/add', data, {
            headers: {
                "Content-type": "application/json"
            }
        });
    },
    uploadFile(data) {
        return HttpHouseCharge.post('/upload-file', data);
    }
}

export default HouseChargeServices;