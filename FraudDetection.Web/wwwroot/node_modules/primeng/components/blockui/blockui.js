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
var BlockUI = (function () {
    function BlockUI(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
    }
    Object.defineProperty(BlockUI.prototype, "blocked", {
        get: function () {
            return this._blocked;
        },
        set: function (val) {
            this._blocked = val;
            if (this._mask) {
                if (this._blocked)
                    this.block();
                else
                    this.unblock();
            }
        },
        enumerable: true,
        configurable: true
    });
    BlockUI.prototype.ngAfterViewInit = function () {
        this._mask = this.el.nativeElement.children[0];
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    };
    BlockUI.prototype.block = function () {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this._mask);
            var style = this.target.style || {};
            style.position = 'relative';
            this.target.style = style;
        }
        else {
            document.body.appendChild(this._mask);
        }
        this._mask.style.zIndex = String(++domhandler_1.DomHandler.zindex);
    };
    BlockUI.prototype.unblock = function () {
        this.el.nativeElement.appendChild(this._mask);
    };
    BlockUI.prototype.ngOnDestroy = function () {
    };
    return BlockUI;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BlockUI.prototype, "target", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], BlockUI.prototype, "blocked", null);
BlockUI = __decorate([
    core_1.Component({
        selector: 'p-blockUI',
        template: "\n        <div class=\"ui-blockui ui-widget-overlay\" [ngClass]=\"{'ui-blockui-document':!target}\" [ngStyle]=\"{display: blocked ? 'block' : 'none'}\"></div>\n    ",
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
], BlockUI);
exports.BlockUI = BlockUI;
var BlockUIModule = (function () {
    function BlockUIModule() {
    }
    return BlockUIModule;
}());
BlockUIModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [BlockUI],
        declarations: [BlockUI]
    })
], BlockUIModule);
exports.BlockUIModule = BlockUIModule;
//# sourceMappingURL=blockui.js.map