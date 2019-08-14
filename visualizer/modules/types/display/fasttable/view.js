'use strict';define(['modules/default/defaultview','src/util/util','src/util/api','src/util/domdeferred','src/util/datatraversing','src/util/context'],function(c,d,e,f,g,h){'use strict';function m(){}return $.extend(!0,m.prototype,c,{init:function(){var p,o=this,q=this.module.getConfiguration('toggle');this.domTable=$('<table />',{cellpadding:0,cellspacing:0}).css({width:'100%'}),this.domHead=$('<thead />').appendTo(this.domTable),this.domBody=$('<tbody />').appendTo(this.domTable),this.selected=[],this.domTable.on('mouseenter','tbody tr',function(){var x=$(this).index();isNaN(x)||o.module.controller.lineHover(o.module.data,x)}).on('mouseleave','tbody tr',function(){var x=$(this).index();isNaN(x)||o.module.controller.lineOut(o.module.data,x)}).on('click','tr',function(){var x=$(this);if(o.module.controller.lineClick(o.module.data,x.index()),q){'single'==q&&void 0!==o.selected[0]&&(o.module.controller.onToggleOff(o.module.data,o.selected[0]),x.parent().children().eq(o.selected[0]).toggleClass('toggled'),o.selected=[]);var y=x.index();x.hasClass('toggled')?o.module.controller.onToggleOff(o.module.data,y):o.module.controller.onToggleOn(o.module.data,y),x.toggleClass('toggled'),o.selected.push(y)}}).on('click','th',function(){var x=$(this).attr('data-jpath-number'),y=o.module.getDataFromRel('list');p&&p.col===x?p.col===x&&(p.asc=!p.asc,p.span.toggleClass('up')):(p&&o.domTable.find('th[data-jpath-number="'+p.col+'"] .sort').remove(),p={asc:!0,col:x,span:$('<div class="sort up"></div>')},o.domTable.find('th[data-jpath-number="'+p.col+'"]').append(p.span)),y.sort(function(z,A){return(p.asc?1:-1)*(o.jpaths[r[x].jpath](z)>o.jpaths[r[x].jpath](A)?1:-1)}),o.module.model.dataTriggerChange(y),o.blank.list.call(o),o.update.list.call(o,y)}),this.dom=this.domTable,this.module.getDomContent().html(this.dom),this.onResize();var r=this.module.getConfiguration('colsjPaths'),t=r.length,u=0;this.colsjPaths=r,this.jpaths={};for(var v='<tr>';u<t;u++)r[u].jpath&&(d.addjPathFunction(this.jpaths,r[u].jpath),v+='<th data-jpath-number="'+u+'">'+r[u].name+'</th>');v+='</tr>';var w=this.module.getConfiguration('colorjPath');w&&(this.colorjpath=d.makejPathFunction(w)),this.domHead.html(v),this.resolveReady()},unload:function(){this.module.getDomContent().empty()},applyFilterToRow:function(o,p){this.filter&&this.filter(this.jqGrid,this.elements[o],p)},blank:{list:function(){if(this.domBody&&this.domBody.empty(),!!this.module.data){var o,p=this.module.data.length;for(o=0;o<p;o++)this.module.data[o]&&this.module.data[o].unbindChange&&this.module.data[o].unbindChange(this.module.getId())}}},update:{list:function(o){if('string'!==o.type&&o){this.selected=[],this.elements=o;var p=this,q=this.module.getConfiguration('nbLines')||20,r='',t=0,u=o.get().length;for(this.module.data=o,t=0;t<u;t++)r+=this.buildElement(o.getChildSync([t]),t);this.domBody.html(r),this.timeout&&window.clearTimeout(this.timeout),this.timeout=window.setTimeout(function(){for(e.killHighlight(p.module.getId()),t=0;t<u;t++)(function(v){e.listenHighlight(p.module.data[v],function(x){p.doHighlight(v,x)},!1,p.module.getId());var w=p.domBody.find('#'+p.module.getId()+'_'+v);p.module.model.dataListenChange(p.module.data.get(v),function(){w.replaceWith(w=$(p.buildElement(this,v,!0)))},'list'),p.module.data.get(v).removable&&h.listen(w.get(0),[['<li><a><span class="ui-icon ui-icon-close"></span> Remove</a></li>',function(){p.onActionReceive.removeRowById.call(p,v)}]])})(t)},1e3),this.list=!0,this.showList=!1,this.updateVisibility()}},showList:function(o){Array.isArray(o)&&(this.showList=o,this.updateVisibility())}},updateVisibility:function(){if(this.showList&&this.list)for(var q,o=this.showList,p=o.length,r=this.module.getId()+'_',t=0;t<p;t++)q=document.getElementById(r+t),o[t]?q.removeAttribute('style'):q.setAttribute('style','display:none')},buildElement:function(o,p){var t,v,w,q=this.colsjPaths,r='',u=q.length;for(r+='<tr',this.colorjpath&&(w=this.colorjpath(o),Array.isArray(w)&&(3===w.length?w='rgb('+w.join(',')+')':w='rgba('+w.join(',')+')'),r+=' style="background-color: '+w+';"'),r+=' id="'+this.module.getId()+'_'+p+'" ',r+='>',t=0;t<u;t++)q[t].jpath&&(r+='<td>',v=g.get(this.getValue(g.get(o),q[t].jpath)),'undefined'==typeof v&&(v=''),r+=v,r+='</td>');return r+='</tr>',r},doHighlight:function(o,p){this.domBody.find('tr').eq(o)[p?'addClass':'removeClass']('ci-highlight')},getValue:function(o,p){return this.jpaths[p]?this.jpaths[p](o):''},getDom:function(){return this.dom},onActionReceive:{addRow:function(o){if(this.elements=this.elements||[],!(-1<this.module.getDataFromRel('list').indexOf(o))){this.module.getDataFromRel('list').push(o);var p=this.elements.length-1,q=this.buildElement(o,p);this.domBody.append(q)}},removeRow:function(o){this.onActionReceive.removeRowById.call(this,this.module.getDataFromRel('list').indexOf(o))},removeRowById:function(o){if(!(0>o)){var p=this.module.getDataFromRel('list').splice(o,1);p[0].unbindChange(this.module.getId());var q;-1<(q=this.selected.indexOf(o))&&this.selected.splice(q,1),this.domBody.children().eq(o).remove()}},toggleOff:function(o){var p=this.module.getDataFromRel('list').indexOf(o);-1==p||(this.module.controller.onToggleOff(this.module.data,p),this.domBody.children().eq(p).removeClass('toggled'))},toggleOn:function(o){var p=this.module.getDataFromRel('list').indexOf(o);if(-1!=p){var q=this.module.getConfiguration('toggle'),r=this;'single'==q&&void 0!==r.selected[0]&&(r.module.controller.onToggleOff(r.module.data,r.selected[0]),r.domBody.children().eq(r.selected[0]).toggleClass('toggled'),r.selected=[]),r.selected.push(p),this.module.controller.onToggleOn(this.module.data,p),this.domBody.children().eq(p).addClass('toggled')}},scrollTo:function(o){var p=this.module.getDataFromRel('list').indexOf(o);if(-1!=p){var q=this.domBody.children().eq(p).get();q.scrollIntoView()}}},exportToTabDelimited:function(){if(this.colsjPaths){for(var o=[],q=this.elements.length,r=this.colsjPaths,t=[],u=0;u<r.length;u++)t.push(r[u].name);o.push(t.join('\t'));for(var w,v=0;v<q;v++){w=[];for(var u=0;u<r.length;u++)g.getValueFromJPath(this.elements[v],r[u].jpath).done(function(x){w.push(x)});o.push(w.join('\t'))}return o.join('\r\n')}}}),m});
