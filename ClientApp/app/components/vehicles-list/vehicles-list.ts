import { Router } from '@angular/router';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vehicles-list',
    templateUrl: 'vehicles-list.html'
})
export class VehiclesList implements OnInit{
    vehicles: Vehicle[] = [];
    allVehicles: Vehicle[] = [];
    makes: KeyValuePair[] = [];
    query: any = {};
    columns: any[] = [
        { title: 'Id'},
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model', isSortable: true },
        { title: 'Contact Name', key: 'contactName', isSortable: true }
    ];

    constructor(
        private vehicleService: VehicleService, 
        private router: Router) {}

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(m => {
                this.makes = m;
            });
        this.populateVehicles();
        
        this.vehicleService.getVehicles({})
            .subscribe(v => this.allVehicles = v);
    }
    
    private populateVehicles() {
        this.vehicleService.getVehicles(this.query)
            .subscribe(v => {
                this.vehicles = v;
            });
        
    }
    onRowClick(id) {
        this.router.navigate(['/vehicle/'+id]);
    }

    onFilterChange() {
        this.populateVehicles();
    }

    onResetFilters() {
        this.query = {};
        this.onFilterChange();
    }

    sortBy(columnName) {
        if(this.query.sortBy === columnName) {           
            this.query.isSortAscending = !this.query.isSortAscending;
        } 
        else {            
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();        
    }
}