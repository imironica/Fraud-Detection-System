/**
* DevExtreme (ui/color_box.d.ts)
* Version: 16.2.5
* Build date: Mon Feb 27 2017
*
* Copyright (c) 2012 - 2017 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: https://www.devexpress.com/Support/EULAs/DevExtreme.xml
*/
import DevExpress from '../bundles/dx.all';

declare global {
interface JQuery {
    dxColorBox(): JQuery;
    dxColorBox(options: "instance"): DevExpress.ui.dxColorBox;
    dxColorBox(options: string): any;
    dxColorBox(options: string, ...params: any[]): any;
    dxColorBox(options: DevExpress.ui.dxColorBoxOptions): JQuery;
}
}
export default DevExpress.ui.dxColorBox;