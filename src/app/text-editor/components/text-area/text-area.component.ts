import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TextEditorService } from '../../services/text-editor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('textarea') textarea !: ElementRef<HTMLInputElement>;
  valueText!: string;
  previousLength = 0;
  subscription: Subscription = new Subscription;

  constructor(
    private renderer: Renderer2,
    private textEditorService: TextEditorService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.rendererText();
  }

  rendererText(){
    this.subscription =  this.subscription =  this.textEditorService.configuratoinTextEditor$.subscribe(res => {
      if(res.bold){
        this.renderer.setStyle(this.textarea.nativeElement, 'font-weight', 'bold');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'font-weight', 'normal');
      }

      if(res.italic){
        this.renderer.setStyle(this.textarea.nativeElement, 'font-style', 'italic');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'font-style', 'normal');
      }

      if(res.underline){
        this.renderer.setStyle(this.textarea.nativeElement, 'text-decoration', 'underline');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'font-decoration', 'none');
      }

      if(res.lineThrough){
        this.renderer.setStyle(this.textarea.nativeElement, 'text-decoration', 'line-through');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'font-decoration', 'none');
      }

      if(res.indentLeft){
        this.renderer.setStyle(this.textarea.nativeElement, 'text-indent', '15%');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'text-indent', '0');
      }

      if(res.indentRight){
        this.renderer.setStyle(this.textarea.nativeElement, 'text-indent', '-15%');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'text-indent', '0');
      }

      if(res.textAlignRight){
        this.renderer.setStyle(this.textarea.nativeElement, 'text-align', 'right');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'text-align', 'left');
      }

      if(res.textAlignLeft){
        this.renderer.setStyle(this.textarea.nativeElement, 'text-align', 'left');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'text-align', 'left');
      }

      if(res.textAlignJustify){
        this.renderer.setStyle(this.textarea.nativeElement, 'text-align', 'justify');
      }else{
        this.renderer.setStyle(this.textarea.nativeElement, 'text-align', 'left');
      }


      if(res.copy){
        navigator.clipboard.writeText(this.textarea.nativeElement.value).then(() => {
          alert('Copied text');
        });
      }

      if(res.paste){
        navigator.clipboard.readText().then(cliptext => {
          this.valueText = cliptext;
        })
      }

      if(res.cut){
        navigator.clipboard.writeText(this.textarea.nativeElement.value).then(() => {
          alert('Cut text');
        });

        this.valueText = '';
      }

      this.renderer.setStyle(this.textarea.nativeElement, 'font-size', res.fontSize+"px");
      this.renderer.setStyle(this.textarea.nativeElement, 'color', res.color);
      this.renderer.setStyle(this.textarea.nativeElement, 'text-align', res.textAlign);
    })
  }

  // onInput(){
  //   const bullet = "\u2022";
  //   const newLength = this.valueText.length;
  //   const characterCode = this.valueText.substr(-1).charCodeAt(0);

  //   if (newLength > this.previousLength) {
  //     if (characterCode === 10) {
  //       this.valueText = `${this.valueText}${bullet} `;
  //     } else if (newLength === 1) {
  //       this.valueText = `${bullet} ${this.valueText}`;
  //     }
  //   }

  //   this.previousLength = newLength;
  // }
}
