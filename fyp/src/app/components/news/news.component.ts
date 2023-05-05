import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/global/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  allActicles: INews[] = [];
  articles: INews[] = [];
  articlesLoaded: number = 0;
  showMoreButton: boolean = false;
  showSortingButton:boolean = false;
  showLoadingBar: boolean = true;
  rows: number = 2
  cols: number = 3


  numOfWordsForDescription: number = 30;

  constructor(private apiService: ApiService, private globalService: GlobalService) { }


  ngOnInit(): void {

    // Get the latest ocean news upon loading this page.
    this.apiService.getCoralNews().subscribe(res => {

      // let tempDate = new Date()

      res.articles.forEach(article => {
        // 1. Pre-process description to have maximum length
        // Split the description by space 
        const splitWords = article.description.split(" ", this.numOfWordsForDescription);
        if (this.numOfWordsForDescription <= splitWords.length) {
          splitWords.push('...')
        }

        article.description = splitWords.join(' ')

        // 2. Preprocess the published date.
        const articleDate = new Date(article.publishedAt);
        article.publishedAt = this.globalService.getDateInDDMMMYYYY(articleDate);
        
      })

      // Set to all articles
      this.allActicles = res.articles;


      // Upon loading the page, distibute the first a few news
      this.onClickMore();
      this.showLoadingBar = false;
      this.showMoreButton = true;
      this.showSortingButton = true;
    })
  }

  /**
   * number of rows * cols news are shown at a time.
   * If this is invoked, next rows * cols of news will be displayed.
   */
  onClickMore() {
    const from = this.articlesLoaded
    const to = this.articlesLoaded + (this.cols * this.rows)

    this.allActicles.slice(from, to).forEach((article: INews) => {
      this.articles.push(article)
    })
    this.articlesLoaded = to

    // If all articles loaded, disable the button
    if (this.allActicles.length <= to){
      this.showMoreButton = false
    }
  }
}
