import {Component, OnInit, Inject, PLATFORM_ID, Injector, ContentChild, TemplateRef, ViewChild} from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../_models';

@Component({
  selector: 'ngbd-user-modal',
  templateUrl: './user-modal.html'
})
export class NgbdUserModalComponent implements OnInit {
  closeResult: string;

  userForm: FormGroup;

  openForUpdate: boolean;

  private modalRef: NgbModalRef;

  submitted = false;

  model = {
    left: true,
    middle: true,
    right: false
  };

  @ViewChild('content')
  content: TemplateRef<any>;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roles: [''],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  open(user: User, callback: (para: User) => void) {
    this.openForUpdate = user.username ? true : false;

    this.userForm.reset(user);
    this.submitted = false;

    this.modalRef = this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});

    this.modalRef.result.then((result) => {
      const userToSave: User = this.userForm.value;
      callback(userToSave);
    }, (reason) => {
    });

  }



  private save() {
    this.onSubmit();
    if (!this.userForm.valid) {
      return false;
    }


    this.modalRef.close('');

  }

  onSubmit() {
    this.submitted = true;
  }
}
