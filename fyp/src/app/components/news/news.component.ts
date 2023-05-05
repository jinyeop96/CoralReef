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
  showFilterButton: boolean = false;
  showLoadingBar: boolean = true;
  rows: number = 2
  cols: number = 3
  filterButtonName: string = "Papular"


  numOfWordsForDescription: number = 30;

  constructor(private apiService: ApiService, private globalService: GlobalService) { }


  ngOnInit(): void {

    // Get the latest ocean news upon loading this page.
    this.apiService.getCoralNews().subscribe(res => {

      // let tempDate = new Date()

      res.articles.forEach((article, i) => {
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

        // 3. Save the papularity in acsending order
        article.papularity = i
      })

      // Set to all articles
      this.allActicles = res.articles;


      // Upon loading the page, distibute the first a few news
      this.onClickMore();
      this.showLoadingBar = false;
      this.showMoreButton = true;
      this.showFilterButton = true;
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
    if (this.allActicles.length <= to) {
      this.showMoreButton = false
    }
  }

  onFilterClicked(filterBy: string) {
    this.filterButtonName = filterBy

    this.articles = []
    this.articlesLoaded = 0

    if (filterBy == 'popular') {
      this.allActicles.sort((a: INews, b: INews) => {
        return a.papularity - b.papularity
      });
    }

    if (filterBy == 'random') {
      this.shuffleArray(this.allActicles)
    }

    if (filterBy == 'oldest') {
      this.allActicles.sort((a: INews, b: INews) => {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      });
    }

    if (filterBy == 'newest') {
      this.allActicles.sort((a: INews, b: INews) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      });
    }

    this.onClickMore()

  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  shuffleArray(array: INews[]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

}
