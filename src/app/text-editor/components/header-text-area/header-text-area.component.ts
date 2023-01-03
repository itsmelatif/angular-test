import { Component, OnDestroy, OnInit } from '@angular/core';
import { TextEditorService } from '../../services/text-editor.service';
import { ITextEditor } from '../../interface/text-editor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-text-area',
  templateUrl: './header-text-area.component.html',
  styleUrls: ['./header-text-area.component.scss']
})
export class HeaderTextAreaComponent implements OnInit, OnDestroy {

  defaultTextEditor !: ITextEditor;
  subscription: Subscription = new Subscription;

  configuration = [
    { label: 'heading', icon: 'heading' },
    { label: 'bold', icon: 'bold' },
    { label: 'italic', icon: 'italic' },
    { label: 'underline', icon: 'underline' },
    { label: 'cut', icon: 'cut' },
    { label: 'copy', icon: 'copy' },
    { label: 'paste', icon: 'paste' },
    { label: 'text-align-right', icon: 'text-align-right' },
    { label: 'text-align-left', icon: 'text-align-left' },
    { label: 'text-align-justify', icon: 'text-align-justify' },
    { label: 'text-indent-left', icon: 'text-indent-left' },
    { label: 'text-indent-right', icon: 'text-indent-right' },
  ]
  constructor(
    private textEditorService: TextEditorService
  ) { }

  ngOnInit(): void {
    this.loadTextEditorConf();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadTextEditorConf(){
   this.subscription =  this.textEditorService.configuratoinTextEditor$.subscribe(res => {
      this.defaultTextEditor = res;
    })
  }

  onChangeStyle(value: string){
    switch(value){
      case 'bold':
        this.textEditorService.configuratoinTextEditor$.next({bold: !this.defaultTextEditor.bold});
        break;
        case 'italic':
          this.textEditorService.configuratoinTextEditor$.next({italic: !this.defaultTextEditor.italic});
          break;
        case 'underline':
          this.textEditorService.configuratoinTextEditor$.next({underline: !this.defaultTextEditor.underline});
          break;
        case 'text-align-right':
          this.textEditorService.configuratoinTextEditor$.next({textAlignRight: !this.defaultTextEditor.textAlignRight});
          break;
        case 'text-align-left':
          this.textEditorService.configuratoinTextEditor$.next({textAlignLeft: !this.defaultTextEditor.textAlignLeft});
          break;
        case 'text-align-justify':
          this.textEditorService.configuratoinTextEditor$.next({textAlignJustify: !this.defaultTextEditor.textAlignJustify});
          break;
        case 'text-indent-left':
          this.textEditorService.configuratoinTextEditor$.next({indentLeft: true});
          this.textEditorService.configuratoinTextEditor$.next({indentRight: false});
          break;
        case 'text-indent-right':
          this.textEditorService.configuratoinTextEditor$.next({indentRight: true});
          this.textEditorService.configuratoinTextEditor$.next({indentLeft: false});
          break;
        case 'copy':
          this.textEditorService.configuratoinTextEditor$.next({copy: true});
          this.textEditorService.configuratoinTextEditor$.next({cut: false});
          this.textEditorService.configuratoinTextEditor$.next({paste: false});
          break;
        case 'paste':
          this.textEditorService.configuratoinTextEditor$.next({copy: false});
          this.textEditorService.configuratoinTextEditor$.next({cut: false});
          this.textEditorService.configuratoinTextEditor$.next({paste: true});
          break;
        case 'cut':
          this.textEditorService.configuratoinTextEditor$.next({copy: false});
          this.textEditorService.configuratoinTextEditor$.next({cut: true});
          this.textEditorService.configuratoinTextEditor$.next({paste: false});
          break;

    }
  }

  changeFont(e: Event){
    const value = (e.target as HTMLInputElement).value;
    this.textEditorService.configuratoinTextEditor$.next({fontSize: parseInt(value)});
  }

  changeColor(e: Event){
    const value = (e.target as HTMLInputElement).value;
    this.textEditorService.configuratoinTextEditor$.next({color: value});
  }

}
