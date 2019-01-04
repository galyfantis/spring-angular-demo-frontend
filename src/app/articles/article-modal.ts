import {Component, OnInit, Inject, PLATFORM_ID, Injector, ContentChild, TemplateRef, ViewChild} from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Article } from '../_models';

@Component({
  selector: 'ngbd-article-modal',
  templateUrl: './article-modal.html'
})
export class NgbdArticleModalComponent implements OnInit {
  closeResult: string;

  articleForm: FormGroup;

  private modalRef: NgbModalRef;

  submitted = false;
  // private modalService: NgbModal;
  // private formBuilder: FormBuilder;

  @ViewChild('content')
  content: TemplateRef<any>;

  // constructor(
  //   @Inject(PLATFORM_ID) private platformId: Object,
  //   private injector: Injector
  // ) {
  //   console.log('????' + platformId);
  //   if (isPlatformBrowser(platformId)) {
  //     console.log('!!!!!!!!!');
  //     this.modalService = this.injector.get(NgbModal);
  //     this.formBuilder = this.injector.get(FormBuilder);
  //   }
  // }

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      // dateOfBirth: ['', Validators.required]
      id: [],
      title: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  get f() {
    return this.articleForm.controls;
  }

  open(article: Article, callback: (para: Article) => void) {
    console.log(article);
    this.articleForm.reset(article);
    this.submitted = false;

    // this.articleForm.reset({dateOfBirth: {year: 1900, month: 2, day: 3}});

    this.modalRef = this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});

    this.modalRef.result.then((result) => {
      const articleToSave: Article = this.articleForm.value;
      callback(articleToSave);
    }, (reason) => {
    });

  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}, ${this.articleForm.value.dateOfBirth.year}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  private save() {
    this.onSubmit();
    if (!this.articleForm.valid) {
      return false;
    }

    // this.modalService.dismissAll();
    // this.activeModal.close('');
    this.modalRef.close('');

    // if (this.articleForm.valid) {
    //   console.log('valid');
    // } else {
    //   console.log('invalid');
    // }
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.articleForm.controls
    // console.log('!!!!');
    // console.log(this.modalService);
  }
}
