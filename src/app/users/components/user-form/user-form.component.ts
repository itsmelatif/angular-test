import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConstant } from 'src/app/shared/constant/app.constant';
import { UsersService } from '../../services/users.service';
import { getErrorValidation } from '../../utils/error-handler';
import { FormatterInput } from '../../utils/formatter-input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();

  subscription: Subscription[] = [];
  userForm!: FormGroup;
  listLanguages = AppConstant.LANGUAGE;
  isSubmitted = false;
  isEdit = false;
  getError = getErrorValidation;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.generateForm();
    this.selectedUser();
  }

  ngOnDestroy(): void {
      this.subscription.forEach(el => el.unsubscribe());
  }

  generateForm(){
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      qualification: ['', Validators.required],
      image: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      language: this.fb.array([], Validators.required),
      otherLanguage: [''],
      specialization: ['', Validators.required],
      contact: ['', [Validators.required, Validators.minLength(9)]]
    })
  }

  selectedUser(){
   const subsSelect = this.usersService.selectedUser$.subscribe({
      next: (res) => {
        this.isEdit = true;

        this.userForm.patchValue({
          firstName: res.firstName,
          gender: res.gender,
          address: res.address,
          qualification: res.qualification,
          image: res.image,
          lastName: res.lastName,
          dateOfBirth: res.dateOfBirth,
          otherLanguge: res.otherLanguage,
          specialization: res.specialization,
          contact: res.contact
        })
      },
      error: (err) => {
        alert(err);
      }
    })

    this.subscription.push(subsSelect);
  }

  validateName(fcName: string){
    const value = FormatterInput.alphabetAndSpace(this.userForm.controls[fcName].value);
    this.patchValue(fcName, value);
  }

  validateContact(){
    const value = FormatterInput.limitInput(FormatterInput.numberOnly(this.userForm.controls['contact'].value), 15);
    this.patchValue('contact', value);
  }

  patchValue(fcName: string, value: string | number){
    this.userForm.controls[fcName].patchValue(value);
  }

  onFileSelected(event: Event){
    const fReader = new FileReader();
    const file = (event.target as HTMLInputElement).files![0];
    fReader.readAsDataURL(file);
    fReader.onloadend = (el) => {
      const nameFile = el.target?.result;
      this.userForm.patchValue({image: nameFile});
    };
  }

  get language() : FormArray{
    return this.userForm.get('language') as FormArray;
  }

  onSelectLanguage(i: number){
    const value = this.listLanguages[i];
    const indexValue = this.userForm.value.language.findIndex((el: string) => el === value);
    if(indexValue >= 0){
      this.language.removeAt(indexValue);
    }else{
      this.language.push(new FormControl(value));
    }
  }

  get otherLanguages(): boolean{
    return this.userForm.value.language.includes(AppConstant.SHOW_OTHER_LANGUAGE);
  }

  get imagePath(): string {
    return this.userForm.value.image;
  }

  selectedCheckbox(item: string): boolean | null {
    return this.userForm.value.language.includes(item) ? true : null;
  }

  onInvalid(fcName: string): boolean{
    return (this.userForm.controls[fcName].touched && this.userForm.controls[fcName].invalid) || (this.userForm.controls[fcName].untouched && this.isSubmitted);
  }

  showError(fcName: string){
    return this.getError(this.userForm.controls[fcName]);
  }

  onSubmit(){
    this.isSubmitted = true;

    if(this.userForm.valid){
      if(this.isEdit){
        this.updateData();
      }else{
        this.saveData();
      }
    }

  }


  saveData(){
    const subsSave = this.usersService.addUser$(this.userForm.value).subscribe({
      next: (res) => {
        this.userForm.reset();
        this.language.reset();
        this.save.emit(true);
        alert('Success save new user');
      },
      error: (e) => {
        alert(e);
      },
      complete: () => {
        this.isSubmitted = false;
      }
    });

    this.subscription.push(subsSave);
  }

  updateData(){
    const subsUpdate = this.usersService.updateUser$(this.userForm.value).subscribe({
      next: (res) => {
        this.userForm.reset();
        this.language.reset();
        this.save.emit(true);
        alert('Success save new user');
      },
      error: (e) => {
        alert(e);
      },
      complete: () => {
        this.isSubmitted = false;
      }
    });

    this.subscription.push(subsUpdate);
  }

  onCancel(){
    this.isEdit = false
    this.userForm.reset();
    this.language.reset();
  }

}
