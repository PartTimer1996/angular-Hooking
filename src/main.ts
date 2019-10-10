import { 
    Component, 
    NgModule, 
    Input, 
    EventEmitter, 
    Output, 
    ViewEncapsulation, 
    SimpleChanges, 
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

class Joke { 
  setup: string;
  punchline: string;
  hide:boolean;

  constructor(setup: string, punchline:string){
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

 toggle(){
    this.hide = !this.hide;
  }
}

@Component({
selector: 'joke',
template: `
    <div class = "container">
    <div class="card card-block">
  <div class="card-body">
    <h5 class="card-title">
    <ng-content select =".setup"></ng-content>
    </h5>
  <p class = "card-text" [hidden]=data.hide>
  <ng-content select=".punchline"></ng-content>
  </p>
    <button class="btn btn-danger btn-sm" (click)=data.toggle()>Toggle</button>
  </div>
</div>
</div>
`
})
class JokeComponent implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy { 
  @Input("joke") data: Joke;

   constructor() {
    console.log(`new - data is ${this.data}`);
  }

ngOnChanges(changes: SimpleChanges) {
  console.log(`ngOnChanges - data is ${this.data}`);
  for (let key in changes) {
    console.log(`${key} changed.
    Current: ${changes[key].currentValue}.
    Previous: ${changes[key].previousValue}`);
  }
}

  ngOnInit() {
    console.log(`ngOnInit  - data is ${this.data}`);
  }

  ngDoCheck() {
    console.log("ngDoCheck")
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }

    }

@Component({
  selector: 'joke-form', 
  template: '',
  styles: [
    `
   .card{
    background-color:grey;
   }
   `
  ],
  encapsulation: ViewEncapsulation.None
})

class JokeFormComponent{
 @Output() jokeCreated = new EventEmitter<Joke>();

 createJoke(setup: string, punchline:string){
   this.jokeCreated.emit(new Joke(setup,punchline))
 }
}

@Component({
  selector: 'joke-list',
  template:` 
  <!--<joke-form (jokeCreated)="addJoke($event)"></joke-form> -->
  <joke *ngFor = "let j of jokes" [joke] = "j">
  <span class = "setup">{{j.setup}}?</span>
  <h1 class = "punchline"> {{ j.punchline }}</h1> 
  </joke>
  
  <button type = "button" 
                  class = "btn btn-success"
                  (click) ="addJoke()"> add Joke 
                  </button>

  <button type = "button" 
                  class = "btn btn-danger"
                  (click) ="removeJoke()"> remove Jokes 
                  </button>
  `
})

class JokeListComponent { 
  jokes: Object[];

  constructor(){ 
    this.jokes = [
    //  new Joke("Test 1","Test 2"),
    //  new Joke("Test 3","Test 4"),
    //  new Joke("Test 5","Test 6")
    ]
}

addJoke(joke){
  this.jokes.unshift(new Joke("Test","Test 1"));
}

removeJoke(){
  this.jokes = [];

}


}

@Component({
  selector: 'app',
  template: `<joke-list><joke-list>`
})

class AppComponent{}

@NgModule({
  imports:[BrowserModule],
  declarations:[JokeComponent,JokeFormComponent , JokeListComponent, AppComponent],
  bootstrap:[AppComponent]
})

class AppModule{ }

platformBrowserDynamic().bootstrapModule(AppModule);