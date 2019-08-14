'use strict';var _Mathabs=Math.abs;define(['jquery','modules/default/defaultview','src/util/datatraversing','lib/gcms/gcms','jcampconverter','src/util/color'],function(b,c,d,e,f,g){'use strict';function h(){}return b.extend(!0,h.prototype,c,{init:function(){var j=document.createElement('div'),k=document.createElement('div'),l=document.createElement('div');l.appendChild(j),l.appendChild(k),k.style.width='100%',k.style.height='100px',j.style.width='100%',j.style.height='250px',this.div1=j,this.div2=k,this.dom=l,this.module.getDomContent().html(l),this.resolveReady()},inDom:function(){var j=this,k=(n)=>{var o=this.module.getConfiguration(n);return g.array2rgba(o)},l=k('auccolor'),m=l.replace(/,[^,]+\)$/,', 0.3)');this.gcmsInstance=new e(this.div1,this.div2,{gcSize:this.module.getConfiguration('gcsize'),mainColor:k('maincolor'),roColor:k('rocolor'),aucColor:l,aucColorT:m,onMsFromAUCChange:function(o){j.module.controller.createDataFromEvent('onMSChange','ms',o)},MZChange:function(o){j.module.controller.sendActionFromEvent('onMZSelectionChange','mzList',o)},MSChangeIndex:function(o,p){j.module.controller.sendActionFromEvent('onMSIndexChanged','msIndex',o),j.module.controller.createDataFromEvent('onMSIndexChanged','msMouse',p)},onZoomGC:function(o,p){j.module.controller.sendActionFromEvent('onZoomGCChange','fromtoGC',[o,p]),j.module.controller.sendActionFromEvent('onZoomGCChange','centerGC',(p+o)/2)},onlyOneMS:!0})},unload:function(){this.dom.remove()},onResize:function(){this.gcmsInstance.resize(this.width,this.height)},blank:{jcamp(){this.gcmsInstance.blank()},jcampRO(){this.gcmsInstance.blankRO()}},update:{jcamp:function(j){j=j.get()+'',f.convert(j,{chromatogram:!0},!0).then((k)=>{k.chromatogram&&k.chromatogram.series.ms&&(this.gcmsInstance.setGC(k.chromatogram),this.gcmsInstance.setMS(k.chromatogram.series.ms.data),this.module.controller.createDataFromEvent('onJCampParsed','msdata',k.chromatogram.series.ms.data),this.module.controller.createDataFromEvent('onJCampParsed','gcdata',k.chromatogram),this.jcamp=k.chromatogram)})},jcampRO:function(j){j=j.get()+'',f.convert(j,{chromatogram:!0},!0).then((k)=>{k.chromatogram&&k.chromatogram.series.ms&&(this.gcmsInstance.setGCRO(k.chromatogram),this.gcmsInstance.setMSRO(k.chromatogram.series.ms.data))})},annotationgc:function(j){j&&(this.resetAnnotationsGC(),this.addAnnotations(j))}},getDom:function(){return this.dom},resetAnnotationsGC:function(){this.gcmsInstance&&this.gcmsInstance.killAllAUC()},addAnnotations:function(j){var k=this;j.map(function(l){var m=k.gcmsInstance.addAUC(l.from,l.to,l);m._originalSource=l}),this.annotations=j},onActionReceive:{fromtoGC:function(j){var k=j.from-0.1*_Mathabs(j.to-j.from),l=j.to+0.1*_Mathabs(j.to-j.from);this.gcmsInstance.getGC().getBottomAxis()._doZoomVal(k,l,!0),this.gcmsInstance.getGC().redraw(!0,!0,!1),this.gcmsInstance.getGC().drawSeries(),this.module.controller.sendActionFromEvent('onZoomGCChange','centerGC',(l+k)/2),this.gcmsInstance.updateIngredientPeaks()},fromtoMS:function(j){this.gcmsInstance.getMS().getBottomAxis()._doZoomVal(j.from,j.to,!0)},zoomOnAnnotation:function(j){(j.pos||j.pos2)&&(this.gcmsInstance.zoomOn(j.pos.x,j.pos2.x,j._max||!1),this.module.controller.sendActionFromEvent('onZoomGCChange','centerGC',(j.pos.x+j.pos2.x)/2),this.gcmsInstance.updateIngredientPeaks())},centerGC:function(j){var k=this.gcmsInstance.getGC().getBottomAxis(),l=k.getCurrentMin(),m=k.getCurrentMax(),n=_Mathabs(m-l)/2;k._doZoomVal(j-n,j+n,!0),this.gcmsInstance.getGC().redraw(!0,!0,!1),this.gcmsInstance.getGC().drawSeries()},setMSIndexData:function(j){this.gcmsInstance.setMSIndexData(j)}}}),h});
