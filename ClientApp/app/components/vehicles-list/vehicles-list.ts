import { Router } from '@angular/router';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vehicles-list',
    templateUrl: 'vehicles-list.html'
})
export class VehiclesList implements OnInit{
    private readonly PAGE_SIZE = 3;

    queryResult: any = {};
    allVehicles: Vehicle[] = [];
    makes: KeyValuePair[] = [];
    query: any = {
        pageSize: 3
    };
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
            .subscribe(v => this.allVehicles = v.items);
    }
    
    private populateVehicles() {
        this.vehicleService.getVehicles(this.query)
            .subscribe(result => {
                this.queryResult = result;
            });
        
    }
    
    onRowClick(id) {
        this.router.navigate(['/vehicle/'+id]);
    }

    onFilterChange() {
        this.query.page = 1;
        this.populateVehicles();
    }

    onResetFilters() {
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };
        this.populateVehicles();
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

    onPageChange(page) {
        this.query.page = page;
        this.populateVehicles();
    }
}