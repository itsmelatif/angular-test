
export interface ITextEditor {
  bold?: boolean;
  italic?: boolean;
  fontSize?: number;
  underline?: boolean;
  textAlign ?: 'right' | 'left' | 'justify';
  textAlignRight ?: boolean;
  textAlignLeft ?: boolean;
  textAlignJustify ?: boolean;
  indentLeft?: boolean;
  indentRight?: boolean;
  color?: string;
  cut?: boolean;
  copy?: boolean;
  paste?: boolean;
  tag ?: 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  orderedList?: boolean;
  unOrderedList?: boolean;
  lineThrough?: boolean;
}
