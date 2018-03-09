import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class VehicleService {

    constructor(private http: Http) {}

    getMakes() {
        return this.http.get('/api/makes')
        .map(res => res.json());
    }

    getFeatures() {
        return this.http.get('/api/features')
            .map(res => res.json());
    }

    create(vehicle) {
        return this.http.post('/api/vehicles', vehicle)
            .map(res => res.json());
    }

    getVehicle(id) {
        return this.http.get('/api/vehicles/' + id)
            .map(res => res.json());
    }

    getVehicles(filter) {
        return this.http.get('/api/vehicles?' + this.toQueryString(filter))
            .map(res => res.json());
    }

    toQueryString(obj) {
        var parts: string[]  = [];

        for(var property in obj) {
            var value = obj[property];
            if(value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
        }
        return parts.join('&');
    }

    update(vehicle) {
        return this.http.put('/api/vehicles/' + vehicle.id, vehicle)
            .map(res => res.json());
    }

    delete(id) {
        return this.http.delete('/api/vehicles/' + id)
        .map(res => res.json());
    }
}