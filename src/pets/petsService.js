import http from "../http";

class PetsService {
    getAll() {
        return http.get("/api/pets");
    }

    getAllFoods() {
        return http.get("/api/foods");
    }

    get(id) {
        return http.get(`/api/pets/${id}?populate=*`);
    }

    create(data) {
        
        var objdata ={
            "data": {
               ...data
            }
        };
        return http.post("/api/pets", objdata);
    }

    update(id, data) {
        var objdata ={
            "data": {
               ...data
            }
        };
        console.log('petservice.js- update()',objdata);
        return http.put(`/api/pets/${id}`, objdata);
    }

    delete(id) {
        return http.delete(`/api/pets/${id}`);
    }
}

export default new PetsService();