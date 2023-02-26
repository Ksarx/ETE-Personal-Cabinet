import { CdkPortal, DomPortalHost } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(CdkPortal) portal: CdkPortal;

  private externalWindow: Window | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.externalWindow = window.open(
      '',
      '',
      'width=1080,height=900,left=0,top=0'
    );

    if (this.externalWindow != null) {
      const host = new DomPortalHost(
        this.externalWindow.document.body,
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      );
      document.querySelectorAll('link, style').forEach((htmlElement) => {
        if (this.externalWindow)
          this.externalWindow.document.head.appendChild(
            htmlElement.cloneNode(true)
          );
      });

      host.attach(this.portal);
    }
  }

  ngOnDestroy() {
    if (this.externalWindow) {
      this.externalWindow.close();
    }
  }
}
