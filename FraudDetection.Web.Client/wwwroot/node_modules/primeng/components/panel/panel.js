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
var shared_1 = require("../common/shared");
var Panel = (function () {
    function Panel(el) {
        this.el = el;
        this.collapsed = false;
        this.collapsedChange = new core_1.EventEmitter();
        this.onBeforeToggle = new core_1.EventEmitter();
        this.onAfterToggle = new core_1.EventEmitter();
    }
    Panel.prototype.toggle = function (event) {
        var _this = this;
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        //TODO: Use onDone of animate callback instead with RC6
        setTimeout(function () {
            _this.animating = false;
        }, 400);
        event.preventDefault();
    };
    Panel.prototype.expand = function (event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.collapse = function (event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    return Panel;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Panel.prototype, "toggleable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Panel.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Panel.prototype, "collapsed", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Panel.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Panel.prototype, "styleClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Panel.prototype, "collapsedChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Panel.prototype, "onBeforeToggle", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Panel.prototype, "onAfterToggle", void 0);
Panel = __decorate([
    core_1.Component({
        selector: 'p-panel',
        template: "\n        <div [ngClass]=\"'ui-panel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all\">\n                <span class=\"ui-panel-title\" *ngIf=\"header\">{{header}}</span>\n                <ng-content select=\"p-header\"></ng-content>\n                <a *ngIf=\"toggleable\" class=\"ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default\" href=\"#\"\n                    (click)=\"toggle($event)\">\n                    <span class=\"fa fa-fw\" [ngClass]=\"{'fa-minus': !collapsed,'fa-plus':collapsed}\"></span>\n                </a>\n            </div>\n            <div class=\"ui-panel-content-wrapper\" [@panelContent]=\"collapsed ? 'hidden' : 'visible'\" \n                [ngClass]=\"{'ui-panel-content-wrapper-overflown': collapsed||animating}\">\n                <div class=\"ui-panel-content ui-widget-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </div>\n    ",
        animations: [
            core_1.trigger('panelContent', [
                core_1.state('hidden', core_1.style({
                    height: '0px'
                })),
                core_1.state('visible', core_1.style({
                    height: '*'
                })),
                core_1.transition('visible => hidden', core_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                core_1.transition('hidden => visible', core_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], Panel);
exports.Panel = Panel;
var PanelModule = (function () {
    function PanelModule() {
    }
    return PanelModule;
}());
PanelModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Panel, shared_1.SharedModule],
        declarations: [Panel]
    })
], PanelModule);
exports.PanelModule = PanelModule;
//# sourceMappingURL=panel.js.map