import { DOCUMENT } from '@angular/common';
import { Directive, Inject, Output, AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { fromEvent, filter, Subscription } from 'rxjs';


@Directive({
  selector: '[appHandleClickOutside]',
})
export class HandleClickOutsideDirective implements AfterViewInit {
  @Output() appHandleClickOutside = new EventEmitter<void>();
  documentClickSubscription: Subscription | undefined;
  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click').pipe(filter((event) => {
      return !this.isInside(event.target as HTMLElement)
    })).subscribe(() => {
      this.appHandleClickOutside.emit();
    });
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck)
    );
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
}
