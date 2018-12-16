import {
  Directive,
  Input,
  ElementRef,
  Renderer,
  HostListener
} from "@angular/core";
import { DomController } from "ionic-angular";
import { adjustRendered } from "ionic-angular/umd/components/virtual-scroll/virtual-util";

/**
 * Generated class for the AbsoluteDragDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: "[absolute-drag]" // Attribute selector
})
export class AbsoluteDragDirective {
  @Input("startLeft") startLeft: any;
  @Input("startTop") startTop: any;
  @Input("absolute-drag-enable") enable: any;
  @Input("adjust")
  @Input("absolute-drag-scale")
  inputScale: number;
  @Input("absolute-drag-translateX") inputTranslateX: number;
  @Input("absolute-drag-translateY") inputTranslateY: number;
  @Input("absolute-drag-rotation") inputRotation: number;

  adjust: {
    scale: number;
    translateX: number;
    translateY: number;
    rotation: number;
  };

  checkStartDirective = false;
  oldzindex = null;

  adjustScale = 1;
  currentScale = 1;
  currentRotation = 1;
  adjustRotation = 0;

  adjustDeltaX = 0;
  adjustDeltaY = 0;
  currentDeltaX = 0;
  currentDeltaY = 0;

  rotationStart = 0;

  startScaleOnPan = 1;

  checkRotationStart = false;

  checkPanStart = false;

  hammer: any = null;

  constructor(
    public element: ElementRef,
    public renderer: Renderer,
    public domCtrl: DomController
  ) {
    // console.log("Hello AbsoluteDragDirective Directive");
  }

  @HostListener("change")
  ngOnChanges() {
    console.log(this.inputScale);
    console.log(this.inputTranslateX);
    console.log(this.inputTranslateY);
    console.log(this.inputRotation);
    this.adjustScale = Number(this.inputScale);
    this.currentScale = Number(this.inputScale)
    this.adjustDeltaX = Number(this.inputTranslateX);
    this.currentDeltaX = Number(this.inputTranslateX)
    this.adjustDeltaY = Number(this.inputTranslateY);
    this.currentDeltaY = Number(this.inputTranslateY)
    this.adjustRotation = Number(this.inputRotation);
    this.currentRotation = Number(this.inputRotation)

  }

  ngAfterViewInit() {
    if (this.enable == "true") {
      if (this.hammer == null) {
        // console.log("not null now");
        this.hammer = new window["Hammer"].Manager(this.element.nativeElement);
        let rotate = new window["Hammer"].Rotate();
        let pinch = new window["Hammer"].Pinch();
        let pan = new window["Hammer"].Pan();



        rotate.recognizeWith([pan]);
        pinch.recognizeWith([pan, rotate]);




        this.hammer.add([pan, rotate, pinch]);

        // this.hammer
        //   .get("pan")
        //   .set({ direction: window["Hammer"].DIRECTION_ALL, pointers: 0 });
        this.hammer.get("pinch").set({ enable: true });
        this.hammer.get("rotate").set({ enable: true });

        // this.hammer.on("pan pinch rotate", ev => {
        //   this.handle(ev);
        // });

        // this.hammer.on("panend pinchend rotateend", ev => {
        //   this.handleEnd(ev);
        // });

        this.hammer.on("panmove", ev => {
          // console.log("panmove")
          // console.log(ev)
          this.currentRotation = this.adjustRotation;
          // this.currentScale = this.adjustScale;
          this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale);
          this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale);

          this.domCtrl.write(() => {
            this.renderer.setElementStyle(
              this.element.nativeElement,
              "transform",
              " scale(" +
                this.currentScale +
                ") translate(" +
                this.currentDeltaX +
                "px," +
                this.currentDeltaY +
                "px) rotate(" +
                this.currentRotation +
                "deg) "
            );
          });
        });

        this.hammer.on("panend", ev => {
          // console.log("panend");
          this.adjustDeltaX = this.currentDeltaX;
          this.adjustDeltaY = this.currentDeltaY;
        });



        this.hammer.on("pinchmove", ev => {
          // console.log("pinchmove")
          this.currentScale = this.adjustScale * ev.scale 
          // this.currentRotation = this.adjustRotation
          this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale);
          this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale);
          

          this.domCtrl.write(() => {
            this.renderer.setElementStyle(
              this.element.nativeElement,
              "transform",
              " scale(" +
              this.currentScale +
                ") translate(" +
                this.currentDeltaX +
                "px," +
                this.currentDeltaY +
                "px) rotate(" +
                this.currentRotation +
                "deg) "
            );
          });
        })

        this.hammer.on("pinchend", ev => {
          // console.log("pinchend")
          this.adjustScale = this.currentScale
        })


        this.hammer.on("rotatestart", ev => {
          // console.log("rotatestart")
          this.rotationStart = Math.round(ev.rotation)
        })

        this.hammer.on("rotatemove", ev => {
          // console.log("rotatemove")
          var diffRotation = this.rotationStart - Math.round(ev.rotation)
          this.currentRotation = this.adjustRotation - diffRotation
          // this.currentScale = this.adjustScale;
          this.currentDeltaX =
            this.adjustDeltaX + ev.deltaX / this.currentScale;
          this.currentDeltaY =
            this.adjustDeltaY + ev.deltaY / this.currentScale;

          this.domCtrl.write(() => {
            this.renderer.setElementStyle(
              this.element.nativeElement,
              "transform",
              " scale(" +
                this.currentScale +
                ") translate(" +
                this.currentDeltaX +
                "px," +
                this.currentDeltaY +
                "px) rotate(" +
                this.currentRotation +
                "deg) "
            );
          });
        })

        this.hammer.on("rotateend", ev => {
          // console.log("rotateend")
          this.adjustRotation = this.currentRotation
        })

        // this.hammer.on("pinchstart", ev => {
        //   this.adjustDeltaX = this.currentDeltaX
        //   this.adjustDeltaY = this.currentDeltaY
        // })


        



      }
    }

    // console.log("test")
    // // console.log(this.enable)

    // if (this.checkStartDirective == false) {
    //   this.currentDeltaX = this.adjustDeltaX - this.startLeft;
    //   this.adjustDeltaX = this.currentDeltaX;
    //   this.currentDeltaY = this.adjustDeltaY - this.startTop;
    //   this.adjustDeltaY = this.currentDeltaY;

    //   this.domCtrl.write(() => {
    //     this.renderer.setElementStyle(
    //       this.element.nativeElement,
    //       "transform",
    //       " scale(1) translate(" +
    //       this.currentDeltaX +
    //       "px," +
    //       this.currentDeltaY +
    //       "px) rotate(0deg) "
    //     );

    //     // this.renderer.setElementStyle(
    //     //   this.element.nativeElement,
    //     //   "style.transform",
    //     //   transform + "rotate(" + ev.rotation + "deg)"
    //     // );
    //   });
    //   this.checkStartDirective = true;
    // }

    //   // this.renderer.setElementStyle(
    //   //   this.element.nativeElement,
    //   //   "position",
    //   //   "absolute"
    //   // );

    // this.renderer.setElementStyle(
    //   this.element.nativeElement,
    //   "left",
    //   this.startLeft + "px"
    // );
    // this.renderer.setElementStyle(
    //   this.element.nativeElement,
    //   "top",
    //   this.startTop + "px"
    // );
  }

  // // handlePan(ev) {
  // //   console.log(ev);
  // //   // console.log(this.element.nativeElement)
  // //   this.element.nativeElement.name = ev.type;
  // //   this.domCtrl.write(() => {
  // //     this.renderer.setElementStyle(
  // //       this.element.nativeElement,
  // //       "left",
  // //       ev.center.x - ev.target.width / 2 + "px"
  // //     );
  // //     this.renderer.setElementStyle(
  // //       this.element.nativeElement,
  // //       "top",
  // //       ev.center.y - ev.target.height / 2 + "px"
  // //     );
  // //   });
  // // }

  handle(ev) {
    // console.log(ev);
    if (ev.maxPointers > 1) {
      if (this.checkRotationStart == false) {
        this.rotationStart = ev.rotation;
        this.checkRotationStart = true;
      }
    } else {
      // this.checkRotationStart = false
      // this.rotationStart = 0
      // this.adjustRotation = this.currentRotation;
      // this.adjustScale = this.currentScale;
    }

    this.currentRotation =
      this.adjustRotation + Math.round(ev.rotation) - this.rotationStart;
    this.currentScale = this.adjustScale * ev.scale;
    this.currentDeltaX = this.adjustDeltaX + ev.deltaX / this.currentScale;
    this.currentDeltaY = this.adjustDeltaY + ev.deltaY / this.currentScale;

    // console.log(ev)
    // let newLeft = ev.center.x - (ev.target.clientWidth/2);
    // let newTop = ev.center.y - (ev.target.clientHeight/2);
    // console.log(ev.target.style.transform)
    // let transform = ev.target.style.transform + ' ';
    // this.element.nativeElement.name = " scale(" +
    // this.currentScale +
    // ") rotate(" +
    // this.currentRotation +
    // "deg) translate(" +
    // this.currentDeltaX +
    // "px," +
    // this.currentDeltaY +
    // "px) "

    // this.element.nativeElement.name = " rotationstart = " + this.rotationStart + " adjustRotation = " + this.adjustRotation + " currentRotation = " + this.currentRotation

    this.domCtrl.write(() => {
      this.renderer.setElementStyle(
        this.element.nativeElement,
        "transform",
        " scale(" +
          this.currentScale +
          ") translate(" +
          this.currentDeltaX +
          "px," +
          this.currentDeltaY +
          "px) rotate(" +
          this.currentRotation +
          "deg) "
      );

      // this.renderer.setElementStyle(
      //   this.element.nativeElement,
      //   "style.transform",
      //   transform + "rotate(" + ev.rotation + "deg)"
      // );
    });

    // this.adjustScale = this.currentScale;
    // this.adjustRotation = this.currentRotation;
    // this.adjustDeltaX = this.currentDeltaX;
    // this.adjustDeltaY = this.currentDeltaY;
  }

  handleEnd(ev) {
    this.adjustScale = this.currentScale;
    this.adjustRotation = this.currentRotation;

    if (ev.isFinal == true) {
      this.adjustDeltaX = this.currentDeltaX;
      this.adjustDeltaY = this.currentDeltaY;
    }
    this.checkRotationStart = false;
    this.rotationStart = 0;
  }

  ionViewDidLeave() {
    // console.log("bye");
  }
}
