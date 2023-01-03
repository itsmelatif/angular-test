import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorPageComponent } from './components/text-editor-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { HeaderTextAreaComponent } from './components/header-text-area/header-text-area.component';


const routes: Routes = [
  {
    path: '',
    component: TextEditorPageComponent
  }
];

@NgModule({
  declarations: [
    TextEditorPageComponent,
    TextAreaComponent,
    HeaderTextAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TextEditorModule { }
