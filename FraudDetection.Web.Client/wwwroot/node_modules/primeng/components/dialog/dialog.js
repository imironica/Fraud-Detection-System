"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var shared_1 = require("../common/shared");
var Dialog = (function () {
    function Dialog(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.draggable = true;
        this.resizable = true;
        this.minWidth = 150;
        this.minHeight = 150;
        this.closeOnEscape = true;
        this.closable = true;
        this.showHeader = true;
        this.onBeforeShow = new core_1.EventEmitter();
        this.onAfterShow = new core_1.EventEmitter();
        this.onBeforeHide = new core_1.EventEmitter();
        this.onAfterHide = new core_1.EventEmitter();
        this.visibleChange = new core_1.EventEmitter();
    }
    Object.defineProperty(Dialog.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (val) {
            this._visible = val;
            if (this._visible) {
                this.onBeforeShow.emit({});
                this.shown = true;
            }
            if (this.modal && !this._visible) {
                this.disableModality();
            }
        },
        enumerable: true,
        configurable: true
    });
    Dialog.prototype.show = function () {
        if (!this.positionInitialized) {
            this.center();
            this.positionInitialized = true;
        }
        this.container.style.zIndex = String(++domhandler_1.DomHandler.zindex);
        if (this.modal) {
            this.enableModality();
        }
    };
    Dialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.containerViewChild.nativeElement;
        this.contentContainer = this.contentViewChild.nativeElement;
        if (this.draggable) {
            this.documentDragListener = this.renderer.listenGlobal('body', 'mousemove', function (event) {
                _this.onDrag(event);
            });
        }
        if (this.resizable) {
            this.documentResizeListener = this.renderer.listenGlobal('body', 'mousemove', function (event) {
                _this.onResize(event);
            });
            this.documentResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', function (event) {
                if (_this.resizing) {
                    _this.resizing = false;
                }
            });
        }
        if (this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', function (event) {
                _this.center();
            });
        }
        if (this.closeOnEscape && this.closable) {
            this.documentEscapeListener = this.renderer.listenGlobal('body', 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.container.style.zIndex) == domhandler_1.DomHandler.zindex) {
                        _this.hide(event);
                    }
                }
            });
        }
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    };
    Dialog.prototype.ngAfterViewChecked = function () {
        if (this.shown) {
            this.show();
            this.onAfterShow.emit({});
            this.shown = false;
        }
    };
    Dialog.prototype.center = function () {
        var elementWidth = this.domHandler.getOuterWidth(this.container);
        var elementHeight = this.domHandler.getOuterHeight(this.container);
        if (elementWidth == 0 && elementHeight == 0) {
            this.container.style.visibility = 'hidden';
            this.container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.container);
            elementHeight = this.domHandler.getOuterHeight(this.container);
            this.container.style.display = 'none';
            this.container.style.visibility = 'visible';
        }
        var viewport = this.domHandler.getViewport();
        var x = Math.max((viewport.width - elementWidth) / 2, 0);
        var y = Math.max((viewport.height - elementHeight) / 2, 0);
        this.container.style.left = x + 'px';
        this.container.style.top = y + 'px';
    };
    Dialog.prototype.enableModality = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            if (this.closable && this.dismissableMask) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                    _this.hide(event);
                });
            }
            document.body.appendChild(this.mask);
        }
    };
    Dialog.prototype.disableModality = function () {
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    };
    Dialog.prototype.hide = function (event) {
        this.onBeforeHide.emit(event);
        this.visibleChange.emit(false);
        this.onAfterHide.emit(event);
        this.unbindMaskClickListener();
        event.preventDefault();
    };
    Dialog.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Dialog.prototype.moveOnTop = function () {
        this.container.style.zIndex = String(++domhandler_1.DomHandler.zindex);
    };
    Dialog.prototype.initDrag = function (event) {
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.onDrag = function (event) {
        if (this.dragging) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var leftPos = parseInt(this.container.style.left);
            var topPos = parseInt(this.container.style.top);
            this.container.style.left = leftPos + deltaX + 'px';
            this.container.style.top = topPos + deltaY + 'px';
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.endDrag = function (event) {
        if (this.draggable) {
            this.dragging = false;
        }
    };
    Dialog.prototype.initResize = function (event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.onResize = function (event) {
        if (this.resizing) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var containerWidth = this.domHandler.getWidth(this.container);
            var contentHeight = this.domHandler.getOuterHeight(this.contentContainer);
            var newWidth = containerWidth + deltaX;
            var newHeight = contentHeight + deltaY;
            if (newWidth > this.minWidth)
                this.container.style.width = newWidth + 'px';
            if (newHeight > this.minHeight)
                this.contentContainer.style.height = newHeight + 'px';
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.ngOnDestroy = function () {
        this.disableModality();
        if (this.documentDragListener) {
            this.documentDragListener();
        }
        if (this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
        }
        if (this.documentResponsiveListener) {
            this.documentResponsiveListener();
        }
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
        this.unbindMaskClickListener();
    };
    return Dialog;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Dialog.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "draggable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "resizable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Dialog.prototype, "minWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Dialog.prototype, "minHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "contentStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "modal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "closeOnEscape", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "dismissableMask", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "rtl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "responsive", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "appendTo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Dialog.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "showHeader", void 0);
__decorate([
    core_1.ContentChild(shared_1.Header),
    __metadata("design:type", Object)
], Dialog.prototype, "headerFacet", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], Dialog.prototype, "containerViewChild", void 0);
__decorate([
    core_1.ViewChild('content'),
    __metadata("design:type", core_1.ElementRef)
], Dialog.prototype, "contentViewChild", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Dialog.prototype, "onBeforeShow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Dialog.prototype, "onAfterShow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Dialog.prototype, "onBeforeHide", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Dialog.prototype, "onAfterHide", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Dialog.prototype, "visibleChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Dialog.prototype, "visible", null);
Dialog = __decorate([
    core_1.Component({
        selector: 'p-dialog',
        template: "\n        <div #container [ngClass]=\"{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            [style.display]=\"visible ? 'block' : 'none'\" [style.width.px]=\"width\" [style.height.px]=\"height\" (mousedown)=\"moveOnTop()\" [@dialogState]=\"visible ? 'visible' : 'hidden'\">\n            <div class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\"\n                (mousedown)=\"initDrag($event)\" (mouseup)=\"endDrag($event)\" *ngIf=\"showHeader\">\n                <span class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                <span class=\"ui-dialog-title\" *ngIf=\"headerFacet\">\n                    <ng-content select=\"p-header\"></ng-content>\n                </span>\n                <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" href=\"#\" role=\"button\" (click)=\"hide($event)\">\n                    <span class=\"fa fa-fw fa-close\"></span>\n                </a>\n            </div>\n            <div #content class=\"ui-dialog-content ui-widget-content\" [ngStyle]=\"contentStyle\">\n                <ng-content></ng-content>\n            </div>\n            <ng-content select=\"p-footer\"></ng-content>\n            <div *ngIf=\"resizable\" class=\"ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\" style=\"z-index: 90;\"\n                (mousedown)=\"initResize($event)\"></div>\n        </div>\n    ",
        animations: [
            core_1.trigger('dialogState', [
                core_1.state('hidden', core_1.style({
                    opacity: 0
                })),
                core_1.state('visible', core_1.style({
                    opacity: 1
                })),
                core_1.transition('visible => hidden', core_1.animate('400ms ease-in')),
                core_1.transition('hidden => visible', core_1.animate('400ms ease-out'))
            ])
        ],
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
], Dialog);
exports.Dialog = Dialog;
var DialogModule = (function () {
    function DialogModule() {
    }
    return DialogModule;
}());
DialogModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Dialog, shared_1.SharedModule],
        declarations: [Dialog]
    })
], DialogModule);
exports.DialogModule = DialogModule;
//# sourceMappingURL=dialog.js.map