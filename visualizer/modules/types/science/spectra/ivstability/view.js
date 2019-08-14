'use strict';define(['modules/default/defaultview','lib/plot/plot','src/util/datatraversing','src/util/urldata'],function(a,b,c,d){'use strict';function f(){}return $.extend(!0,f.prototype,a,{init:function(){var h=[];h.push('<div class="ivstab"><div class="iv"><h2>IV Curve</h2><div class="ivcurve"></div><h2>Legend</h2><div class="ivstablegend"></div></div><div class="stab"><div><h2>Voc</h2><div class="ivstability-voc"></div><h2>Jsc</h2><div class="ivstability-jsc"></div><h2>Fill Factor</h2><div class="ivstability-ff"></div><h2>Efficiency</h2><div class="ivstability-efficiency"></div></div></div></div>'),this.namedSeries={},this.graphs=[],this.series={},this.ivseries={},this.colors=['#0066cc','#cc0033','#cc00cc','#00cccc','#009933','#999966','#cc9900','#669999','#000000'],this.usedColors=[],this.legends=[],this.dom=$(h.join('')),this.legendDom=this.dom.find('.ivstablegend'),this.module.getDomContent().html(this.dom).css('overflow','hidden'),this.resolveReady()},doIv:function(h,j,k,l,m){this.ivseries[j]||(this.ivseries[j]={}),this.ivseries[j][h]||(this.ivseries[j][h]=this.iv.newSerie(j),this.ivseries[j][h].autoAxis()),this.ivseries[j][h].setData(k.data),this.ivseries[j][h].setLineColor(l),this.ivseries[j][h].setLineStyle(m),this.iv.redraw(),this.iv.drawSeries()},inDom:function(){var h=this,j={paddingTop:5,paddingBottom:0,paddingLeft:20,paddingRight:20,close:{left:!0,right:!0,top:!0,bottom:!0},title:'',zoomMode:'xy',defaultMouseAction:'zoom',defaultWheelAction:'none',lineToZero:!1,fontSize:12,fontFamily:'Myriad Pro, Helvetica, Arial',onMouseMoveData:function(){},onVerticalTracking:function(m,n,o){for(var p in h.series)d.get('http://lpidb.epfl.ch/content/ajax/getstabilityiv.ajax.php?id='+p+'&date='+n).done(function(q){for(var r in q)h.doIv(m,r,q[r],h.graphs[0].getSerie(r).getLineColor(),o)})}},k={bottom:[{labelValue:'Time (h)',unitModification:'time',shiftToZero:!0,primaryGrid:!1,nbTicksPrimary:10,secondaryGrid:!1,axisDataSpacing:{min:0,max:0.1}}],left:[{labelValue:'',ticklabelratio:1,primaryGrid:!0,secondaryGrid:!1,nbTicksPrimary:3,forcedMin:0}]};this.graphs.push(new b(this.dom.find('.ivstability-jsc').get(0),j,$.extend(!0,{},k,{left:[{labelValue:'Jsc (mA/cm2)'}]}))),this.graphs.push(new b(this.dom.find('.ivstability-voc').get(0),j,$.extend(!0,{},k,{left:[{labelValue:'Voc (mV)'}]}))),this.graphs.push(new b(this.dom.find('.ivstability-ff').get(0),j,$.extend(!0,{},k,{left:[{labelValue:'FF (-)'}]}))),this.graphs.push(new b(this.dom.find('.ivstability-efficiency').get(0),j,$.extend(!0,{},k,{left:[{labelValue:'Efficiency (%)'}]}))),this.iv=new b(this.dom.find('.ivcurve').get(0),j,{bottom:[{labelValue:'Voc (mv)',unitModification:!1,shiftToZero:!1,primaryGrid:!1,secondaryGrid:!1,axisDataSpacing:{min:0,max:0.1}}],left:[{labelValue:'Jsc (mA)',ticklabelratio:1,primaryGrid:!0,secondaryGrid:!1,forcedMin:0}]})},onResize:function(){for(var h=0;4>h;h++)this.graphs[h].resize(650,175),this.graphs[h].drawSeries();this.iv.resize(500,200),this.iv.drawSeries()},update:{plotdata:function(){},serieSet:function(){}},getNextColor:function(){return this.colors.shift()},editCellComment:function(h,j){$.get('http://lpidb.epfl.ch/content/ajax/setcellcomment.ajax.php',{cellid:h,comment:j})},addLegend:function(h,j,k,l){var m=$('<div />');this.legends[h]=m;var n=this,o='(Insert a comment here)',p=$('<div />').css({width:30,height:30,backgroundColor:l,float:'left',position:'relative',marginTop:'0px',marginBottom:'10px'}),q=$('<div />').css({marginLeft:'35px',fontSize:'1.1em'}).text(j),r=$('<div />').css({marginLeft:'35px',marginTop:'2px'}).attr('contentEditable','true').text(k||o).bind('mousedown',function(){$(this).text()==o&&$(this).text('').css({color:'black',fontStyle:'normal'}).focus()}).bind('keypress',function(t){if(13==t.keyCode)return t.preventDefault(),$(this).trigger('blur'),!1}).bind('blur',function(){var t=$(this).text();''==t||null==t||t==o?$(this).text(o).css({color:'grey',fontStyle:'italic'}):n.editCellComment(h,t)}).trigger('blur'),s=$('<div />').css({clear:'both'});m.append(p).append(q).append(r).append(s),this.legendDom.append(m)},removeLegend:function(h){this.legends[h]&&(this.legends[h].remove(),delete this.legends[h])},onActionReceive:{addSerie:function(h){h=c.getValueIfNeeded(h);var j={trackMouse:!0};this.onActionReceive.removeSerieByName.call(this,h.id);var k=this.getNextColor();this.series[h.id]=[];var l=this.graphs[0].newSerie(h.id,j);l.setLineColor(k),l.autoAxis(),l.setData(h.curves.jsc),this.series[h.id].push(l);var l=this.graphs[1].newSerie(h.id,j);l.setLineColor(k),l.autoAxis(),l.setData(h.curves.voc),this.series[h.id].push(l);var l=this.graphs[2].newSerie(h.id,j);l.setLineColor(k),l.autoAxis(),l.setData(h.curves.ff),this.series[h.id].push(l);var l=this.graphs[3].newSerie(h.id,j);l.setLineColor(k),l.autoAxis(),l.setData(h.curves.eff),this.series[h.id].push(l);for(var m=0;4>m;m++)this.graphs[m].redraw(),this.graphs[m].drawSeries();this.addLegend(h.id,h.name,h.description,k)},removeSerie:function(h){var j=c.getValueIfNeeded(h);this.removeLegend(j.id),this.onActionReceive.removeSerieByName.call(this,j.name)},removeSerieByName:function(h){if(this.series[h]){this.colors.unshift(this.series[h][0].getLineColor());for(var j=0;4>j;j++)this.series[h][j].kill();delete this.series[h]}if(this.ivseries[h]){for(var j in this.ivseries[h])this.ivseries[h][j].kill();delete this.ivseries[h]}}}}),f});