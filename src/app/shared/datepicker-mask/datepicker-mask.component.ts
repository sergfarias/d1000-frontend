import { Component, OnInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { formatDate } from '@angular/common';
//import { BaseInput } from 'app/shared/base-input';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerMaskComponent),
  multi: true
};

const noop = () => {
};

/** @title Basic datepicker */
@Component({
  selector: 'app-datepicker-mask',
  templateUrl: 'datepicker-mask.component.html',
  styleUrls: ['datepicker-mask.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class DatepickerMaskComponent  implements ControlValueAccessor {
  // public mask = {
  //   guide: true,
  //   showMask: true,
  //   // keepCharPositions : true,
  //   mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  // };

  @Input() label:string;
  innerValue: Date = new Date();

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): Date {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: Date) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }
  //Occured value changed from module
  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChange(event) {
    this.value = event;
    this.onBlur();
  }
    
  todate(value){
    this.value = new Date(value);
  }

  onBlur() {
    this.onChangeCallback(this.innerValue);
  }
}
