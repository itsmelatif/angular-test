import { Injectable } from '@angular/core';
import { ITextEditor } from '../interface/text-editor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {

  private defaultConfiguration: ITextEditor = {
    bold: false,
    italic: false,
    fontSize: 14,
    underline: false,
    textAlign : 'left',
    textAlignRight : false,
    textAlignLeft : false,
    textAlignJustify : false,
    indentLeft: false,
    indentRight: false,
    color: '#000000',
    cut: false,
    copy: false,
    paste: false,
    tag : 'paragraph' ,
    orderedList: false,
    unOrderedList: false,
    lineThrough: false,
  };

  configuratoinTextEditor$: BehaviorSubject<ITextEditor> = new BehaviorSubject<ITextEditor>(this.defaultConfiguration);

  constructor() { }
}
