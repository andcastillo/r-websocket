'use strict';define(['modules/default/defaultview','src/util/typerenderer','src/util/api','src/util/util'],function(a,b,c,d){'use strict';function f(){}function g(h){for(var k=h.length,l=h[0].length,n=Array(k*l),o=0;o<k;o++)for(var p=0;p<l;p++)n[o*l+p]=h[o][p];return new DataArray(n)}return $.extend(!0,f.prototype,a,{init:function(){this.dom=$('<div class="ci-displaylist-list-2d-fast"></div>'),this.module.getDomContent().html(this.dom),this.rendererOptions=d.evalOptions(this.module.getConfiguration('rendererOptions'))||{};var k=this.module.getConfiguration('forceType');k&&(this.rendererOptions.forceType=k)},blank:{list:function(){this.list=null,c.killHighlight(this.module.getId()),this.dom.empty()},showList:function(){this.showList=null}},inDom:function(){var k=this;this.dom.on('mouseenter mouseleave click','> div',function(l){var o,m=$(this).index(),n=k.list[m];if(1===k.dim)o=[m];else{var p=Math.floor(m/k.dimWidth),q=m%k.dimWidth;o=[p,q]}'mouseenter'===l.type?(k.module.controller.setVarFromEvent('onHover','cell','list',o),c.highlight(n,1)):'mouseleave'===l.type?c.highlight(n,0):'click'===l.type&&(k.module.controller.setVarFromEvent('onClick','cell','list',o),k.module.controller.sendActionFromEvent('onClick','cell',n))}),this.resolveReady()},update:{list:function(k){var l=k.get();this.setDim(l);var n,h,o,m=this.module.getConfiguration;if(1===this.dim)n=100/(m('colnumber',4)||4)+'%',h=l,o=l.length;else{var p=l[0].length;n=100/l[0].length+'%',o=l.length*p,h=g(l)}this.dataReady=Array(o),this.dataDivs=Array(o),this.list=h;var q=m('colorjpath',!1),r=m('valjpath',''),s={width:n},t=m('height');t&&(s.height=t+'px');for(var v,u=0;u<o;u++)v=this.renderElement(this.list.getChildSync([u]),s,q,r),this.dataReady[u]=v[0],this.dataDivs[u]=v[1];this.updateVisibility()},showList:function(k){var l=k.get();this.setDim(l),this.showList=1===this.dim?l:g(l),this.updateVisibility()}},updateVisibility:function(){if(this.showList&&this.list){var k=this;Promise.all(this.dataReady).then(function(){for(var l=k.showList,m=0;m<l.length;m++)l[m]?k.dataDivs[m].show():k.dataDivs[m].hide()})}},renderElement:function(k,l,m,n){var o=$('<div>').css(l).appendTo(this.dom);return m&&k.getChild(m,!0).then(function(p){o.css('background-color',p.get())}),c.listenHighlight(k,function(p){p?o.css('border-color','black'):o.css('border-color','')},!1,this.module.getId()),[b.render(o,k,n,this.rendererOptions),o]},setDim:function(k){var l=this.dim,m=Array.isArray(k[0])?2:1;m!==l&&(this.dim=m,this.list=null,this.showList=null),2===this.dim&&(this.dimWidth=k[0].length,this.dimHeight=k.length)}}),f});