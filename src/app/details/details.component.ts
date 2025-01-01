import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { SearchDetailsService } from '../service/search-details-service.component';
import { NavigationService } from '../service/navigation.service.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  selectedId: number;
  detailsData: any;
  name: string;
  favoriteColor: string
  quotes: any
  quotesArr = []
  quoteObj = {}
  returnQuoteArr = []

  constructor(private route: ActivatedRoute,
              private searchDetails: SearchDetailsService,
              private router: Router,
              private navigationService: NavigationService
  ) { 
  }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));

    this.searchDetails.getDetailsData(this.selectedId).subscribe(data => {
      this.detailsData = data

      this.name = this.detailsData.name
      this.favoriteColor = this.detailsData.favorite_color
      this.quotes = this.detailsData.quotes

     this.quotesArr = Object.keys(this.quotes).map((key) => {
        return {
          likes: key, 
          quotes: [...new Set(this.quotes[key])] //removing duplicate quotes
        }
     })

     this.quotesArr.forEach(element => {
        let quotes = element.quotes

        quotes.forEach(quote => {
          this.quoteObj = {
            likes: element.likes,
            quote: quote
          }

          this.returnQuoteArr.push(this.quoteObj)
        });
     });

     this.returnQuoteArr.sort((a, b) => b.likes - a.likes) //sorted descending by the number of likes
     this.returnQuoteArr.sort((a,b) => a.quote.localeCompare(b.quote)) //sorted ascending alphabetically
    })

  }

  goBack() {
    this.router.navigate(['/'])
    this.navigationService.goBack()
  }

}
