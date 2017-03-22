import { ElementRef } from '@angular/core';
export declare class InputText {
    el: ElementRef;
    constructor(el: ElementRef);
    readonly filled: boolean;
    onBlur(e: any): void;
}
export declare class InputTextModule {
}
