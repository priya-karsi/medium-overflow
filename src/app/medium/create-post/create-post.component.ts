import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
  of
} from 'rxjs';
import { Observer, OperatorFunction } from 'rxjs/internal/types';
import { ToasttService } from 'src/app/shared/components/toast/toastt.service';

import { MediumService } from '../medium.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  states = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District Of Columbia',
    'Federated States Of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Islands',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];


  tags = ["tag1","tag2","foo","bar"];
  selectedTags:any=[]
  selectedTags2:any=[]
  tagString=''
  createPostForm!: FormGroup;
  categories: any;
  selectedCategory: any;
  date = faCalendar;
  todayDate!: NgbDateStruct;
  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['formula'],
      ['image', 'code-block'],
    ],
  };

  validSlug = false;
  ngOnInit(): void {
    this.todayDate = this.ngbCalendar.getToday();
    this.getCategories();
    this.createForm();
    // const o = new Observable<number>((o: Observer<number>) => o.next(5));
    // o.subscribe((val: any) => console.warn(val, 'hiii'));

    const ob = of(1,2,3,4,5,6);
    ob.subscribe((value:any)=>console.warn(value))

  }

  constructor(
    private mediumServie: MediumService,
    private ngbCalendar: NgbCalendar,
    private toastService: ToasttService
  ) {}

  createForm() {
    this.createPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      category: new FormControl('',Validators.required),
      tags: new FormControl(''),
      scheduleDate: new FormControl(this.todayDate,Validators.required),
      slug: new FormControl('',Validators.required),
    });
  }
  submitForm() {
    console.warn(this.createPostForm.value)
    
    this.validateSlug();
    console.log(this.createPostForm);
    
  }

  getCategories() {
    this.mediumServie.getCategories().subscribe((data) => {
      this.categories = data;
      console.warn(this.categories);
    });
  }

  selectCategory(category: any) {
    this.createPostForm.patchValue({
      category: category.CategoryID,
    });
    this.selectedCategory = category.CategoryName;
    console.warn(this.createPostForm.value);
  }
  formatInput(value: any) {
    return value.TagID;
  }
  // search: OperatorFunction<string, string[]> = (text$: Observable<string>) =>
  //   text$.pipe(switchMap((value) => this.mediumServie.getTags(value)));


  search : OperatorFunction<string,string[]> =($text: Observable<string>)=> $text.pipe(switchMap((value)=>value==='' ? [] :this.mediumServie.getTags(value)))
  
  
  searchT(value: any): OperatorFunction<string, readonly string[]> {
    const o = new Observable<string>((observer) => observer.next(value));

    return (text$: Observable<string>) =>
      o.pipe(
        map((term: any) => {
          console.warn(term);
          return term.length < 2
            ? []
            : this.states
                .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
                .slice(0, 10);
        })
      );
  }


  select2($event:any){
    $event.preventDefault()
    console.warn($event)
    const selectedTag = $event.item.TagName;

    if(!this.selectedTags2.includes(selectedTag))
    {
      this.selectedTags2.push(selectedTag)
    }
    console.warn(this.selectedTags2)
  
    this.createPostForm.patchValue({tags:''})
  }

  select(event:any):void{
    const selectedTag = event.item ? (event.item.TagName) : event.target?.value;

    if(this.selectedTags.findIndex((value:any)=>value === selectedTag) === -1){
      this.selectedTags.push(selectedTag)
    }

    console.warn(this.selectedTags)
    this.createPostForm.patchValue({tags:''})
  }

  
  validateSlug() {
    const slug = this.createPostForm.get('slug')?.value;
    this.mediumServie
      .validateSlug(slug)
      .subscribe((value: any) => {
        this.validSlug = value.validSlug

        if(this.validSlug)
        {
          // insert logic
          const body = this.generateBody()
          this.mediumServie.addPost(body).subscribe(()=>console.warn("done"))
        }
        else{
          // error
          this.toastService.show({textOrTpl:'invalid slug', classname:'bg-danger', delay:20000})
          alert("error")
        }
      });

      console.warn(this.validSlug)
  }

  

  formatInput2(value:any){
    return value.TagName
  }

  generateBody():any{
    const body={
      ...this.createPostForm.value,
      authorID: 1,
      categoryID: this.createPostForm.get('category')?.value,
      tags: this.selectedTags2.join(","),
      scheduledYN: 0,
    }
    console.warn(body)
    return body;
  }
}
