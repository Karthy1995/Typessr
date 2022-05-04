import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  setofWords=["He looked down at the ground knowing that she would not like his answer","There was a time when he would have embraced the change that was coming","He hesitated, knowing that the truth would only hurt","please take your dog, Cali, out for a walk he really needs some exercise!"];
  public innerText:any;
 
  timeLeft: number = 60;
  public interval:any;
  textCount: any;
  Intext: any;
  words: any;
  typeWord: any;
  input_text :any;
  errorCount=0;
  accurateCount : number  = 0;
  accuracyPercent : any = 0;
  textWrapper: any;
  public query:any;
  total_errors = 0;
  error=0;
  totalwords=0;
  userobj={};
  level:any;
  
  newwpm:any;
  user:any;
  randomWord = 0;
  characterTyped = 0;
  typedChar:any; typedChar1:any;
  innChar:any;
  current_quote = "";
  cuy:any;
  cuy1:any;
  curr_input:any;
  curr_input_array=[];
  curr_quote_array=[];
  curr_input_array1=[];
  quoteSpanArray:any;
  SpanArray:any;
  quoteSpanArray1:any;
  timeElapsed = 0;
  str:any;
  oldwpm:any;
  public notmatch:any;
  quote_text = document.querySelector("p");
  isStart : boolean =false;
  constructor(private router:Router) { }
  

  ngOnInit(): void {
    
    this.startTest();
    localStorage.clear();
  }
  startTest(){
 
  this.updatequote();
  }

updatequote(){ 
 
  this.current_quote = this.setofWords[this.randomWord];
  this.current_quote.split('').forEach((char:any) => {
   
    this.innerText = this.setofWords[this.randomWord];
   
  })
  if (this.randomWord < this.setofWords.length - 1){
  
   
  this.randomWord++;
}
else{
  this.randomWord = 0;
}
}
processCurrentText(e:any){
  this.curr_input = e.target.value;
  let temp = this.innerText;
  let typedWordTemp =temp.substr(0,length);
  console.log("temp");
  console.log(temp);
  
  
  console.log("this.curr_input");
  console.log(this.curr_input);
  this.curr_quote_array =  this.innerText.split('')
  this.SpanArray=this.innerText.split('')
  this.SpanArray.forEach((char:any, index:any) => {
    this.innChar = this.curr_quote_array[index];
    console.log("innChar");
    console.log(this.innChar);
  });
  //for quote split char 
  this.curr_input_array = this.curr_input.split('');
  this.characterTyped++;
  
  
  this.quoteSpanArray=this.curr_input.split('');
 
  this.quoteSpanArray.forEach((char:any, index:any) => {
    this.typedChar = this.curr_input_array[index];
    console.log("typedChar");
    console.log(this.typedChar);
  
    let text = e.target.value;
  this.input_text = text;
  let length =  this.input_text.length;
    let temp = this.innerText;
   let typedWordTemp =temp.substr(0,length);
  console.log("typedwrd")
   console.log(typedWordTemp);
 
    
  
  if(text!== typedWordTemp ){
  
   
    this.errorCount++;
    
   text = text.substr(0,length - 1);
   this.input_text = this.input_text + text.substr(length-1 ,1)
  e.target.value = text;
  

  
  } 
  
  });

var re = /at/gi; 
  var re1 = /a/gi;
  var re2 = /the/gi;
  var re3=/an/gi;
  var str = this.input_text;
  if ((str.search(re) == -1 )||(str.search(re1) == -1 )||(str.search(re2) == -1 )||(str.search(re3) == -1 )) { 
     console.log("Does not contain at" ); 
  } else { 
     console.log("Contains at" ); 
     this.characterTyped=this.characterTyped-1;
    

  } 

  
 
  this.error= this.total_errors +this.errorCount;
  let correctCharacters = (this.characterTyped -(this.total_errors + this.errorCount));
let accuracyVal = ((correctCharacters / this.characterTyped) * 100);
 this.accuracyPercent = Math.round(accuracyVal) +"%";
 this.oldwpm =  this.curr_input.split('');
 

  if (this.curr_input.length == this.current_quote.length) {
    this.updatequote();
    this.errorCount += this.error;
    e.target.value ="";

   localStorage.setItem("wpm",this.words);
   
  }


}
   setTimer(){
    let timer = 60;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        timer = timer-1;
        this.timeElapsed++;
        this.timeLeft = timer;
       
      }
      else{
       
        
        this.stopTimer();
       
      }
    },1000)
    console.log(this.interval)
  }

  stopTimer(){
   
  this.level="Easy"
  this.userobj={WPM:this.words,Accuracy:this.accuracyPercent,Error:this.errorCount,Level:this.level};
  localStorage.setItem("TestDetails",JSON.stringify(this.userobj));
  console.log("LOcal StORAGE");
  console.log(this.userobj);
    clearInterval(this.interval);
    
   
    this.words =  Math.round((((this.characterTyped/ 5) /this.timeElapsed) * 60))+"Wpm";
        
   
   
  
    this.isStart = false;
   
  } 

 
     highlight(){
      if(!this.input_text) 
      
     {  return this.innerText ; 
       
    
     }
     
   
     
    return this.innerText.replace(new RegExp(this.input_text,"i") , (match:any) => {
     console.log(match);
     console.log("unmatch");
     console.log(this.curr_input.substring(match.length));
     console.log("matchlen");
     console.log(match.length);
        return '<span class="highlightText">' + match  +'</span>'+'<span class="incorrect_char">'+this.curr_input.substring(match.length)+'</span>';
     
    });     
    
   
        
      //  '<span class="incorrect_char"">'+this.curr_input.substring(match.length)+'</span>';
       
     
    
   
     }
   
  reloadPage(){
    location.reload();
  }

  onClick(){
    this.isStart = true;
    this.timeLeft =60;
     this.setTimer();
  }

ChangeLevel(){
  this.router.navigate([''])
}
}

