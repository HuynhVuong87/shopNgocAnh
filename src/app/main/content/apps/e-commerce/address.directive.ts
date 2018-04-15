import { Directive, Input, OnInit, Output, OnChanges, SimpleChanges, EventEmitter, HostListener } from '@angular/core';
import { startWith, map } from 'rxjs/operators';

import { cities, City, District } from 'app/address/address';
import { Observable } from '@firebase/util';

@Directive({
  selector: '[fuseCity]'
})
export class CityDirective implements OnInit {

  @Input('City') city: any;
  @Output() getCity = new EventEmitter<Object>();

  cities = cities;
  filteredCities: Observable<any[]>;

  filterStates(name, states) {
    return states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  }

  constructor() { }

  ngOnInit() {
      this.filteredCities = this.city.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state, this.cities) : this.cities.slice())
      );
      this.getCity.emit(this.filteredCities);
  }

}

@Directive({
  selector: '[fuseDistrict]'
})
export class DistrictDirective implements OnChanges {

  @Input('District') data: any;
  @Output() getDistrict = new EventEmitter<Object>();

  cities = cities;
  filteredDistrict: Observable<any[]>;

  filterStates(name, states) {
    return states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    this.filteredDistrict = this.data.district.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.cities.filter(stat =>
            stat.name.toLowerCase().indexOf(this.data.city.toLowerCase()) === 0
          ).map(a =>
            this.filterStates(state, a.districts)
          ).reduce((a, b) => a.concat(b, [])) : this.cities.filter(stat =>
            stat.name.toLowerCase().indexOf(this.data.city.toLowerCase()) === 0
          ).map(a => a.districts).reduce((a, b) => a.concat(b, [])).slice())
        );
      this.filteredDistrict.subscribe(data => console.log(data));
      this.getDistrict.emit(this.filteredDistrict);
  }

}
