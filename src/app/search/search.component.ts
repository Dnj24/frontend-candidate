import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchDetailsService } from '../service/search-details-service.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service.component';
import { NavigationService } from '../service/navigation.service.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isNavigatedBack: boolean = false
  name = new FormControl('')
  favoriteColor = new FormControl('')
  searchData: any
  matches: any
  names: any = []
  searched: boolean = false;
  selectedName: string;
  selectedFavoriteColor: string;

  constructor(private searchDetailsService: SearchDetailsService,
              private router: Router,
              private localStorage: LocalStorageService,
              private navigationService: NavigationService
  ) {

    this.navigationService.isNavigateBack$.subscribe(value => {
      this.isNavigatedBack = value
    })

    this.selectedName = this.localStorage.getItem("name")
    this.selectedFavoriteColor = this.localStorage.getItem("favoriteColor")

   }
  
  ngOnInit(): void {
      if(this.isNavigatedBack){
        this.getSearchData(this.selectedName, this.selectedFavoriteColor)
      }
  }

  search() {
    this.getSearchData(this.name.value, this.favoriteColor.value)

    //using local storage to store inputted name and selected favorite color to pass back to service when navigated back from details screen
    this.localStorage.setItem("name", this.name.value)
    this.localStorage.setItem("favoriteColor", this.favoriteColor.value)
  }

  getSearchData(name, color) {
    this.searched = true
    this.names = []
    this.searchDetailsService.getSearchData(name, color).subscribe(data => {
      this.searchData = data
      this.matches = this.searchData.matches

      this.matches.forEach(element => {
          this.names.push(element.name)
      });
    })
  }

  callSearch($event) {
    if($event.code === "Enter"){
      this.search()
    }
  }

  routeToDetails(name) {
    let id: number
    this.matches.forEach(element => {
      if(name === element.name){
        id = element.id
      }
    });

    this.router.navigate([`./details/${id}`])
  }

}
