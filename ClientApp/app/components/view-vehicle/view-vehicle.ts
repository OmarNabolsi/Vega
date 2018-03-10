import { ToastyService } from 'ng2-toasty';
import { KeyValuePair, Vehicle } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'view-vehicle',
    templateUrl: 'view-vehicle.html'
}) 
export class ViewVehicle implements OnInit {
    vehicleId: number;
    vehicle: Vehicle = {
        id: 0,
        model: { id: 0, name: ''},
        make: { id: 0, name: ''},
        isRegistered: false,
        features: [],
        contact: { name: '', email: '', phone:'' },
        lastUpdate: ''   
    };

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private vehicleService: VehicleService, 
        private toastyService: ToastyService) {
        
        this.vehicleId = 0;
        route.params.subscribe(p =>{
            this.vehicleId = +p['id'];
        });
    }

    ngOnInit() {
        this.vehicleService.getVehicle(this.vehicleId)
            .subscribe(v => 
                this.vehicle = v
            );
    }

    onDelete() {
        if(confirm("Are you sure?")) {
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(x => {
                    this.toastyService.info({
                        title: 'Success',
                        msg: 'The vehicle was successfully deleted.',
                        theme: 'bootstrap',
                        showClose: true,
                        timeout: 5000
                    });
                    this.router.navigate(['/vehicle']);
                });
        }
    }
}