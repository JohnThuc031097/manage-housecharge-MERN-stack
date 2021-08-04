import axios from "axios";

const HttpHouseCharge = axios.create({
    baseURL: 'http://localhost:8081/api/housecharge',
    headers: {
        "Content-type": "application/json"
    }
});

const Bill = {
    get() {
        return HttpHouseCharge.get('/bill');
    },
    add(data) {
        return HttpHouseCharge.post('/bill/add', data);
    },
    uploadFile(data) {
        return HttpHouseCharge.post('/bill/upload-file', data);
    }
}

const Year = {
    get() {
        return HttpHouseCharge.get('/year');
    },
    add(data) {
        return HttpHouseCharge.post('/year/add', data);
    }
}

export {
    Bill,
    Year,
}