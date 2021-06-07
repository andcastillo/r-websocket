'use strict';define(['require','modules/default/defaultview','src/util/util','src/util/api','src/util/domdeferred','src/util/datatraversing','src/util/typerenderer','jqgrid'],function(require,Default,Util,API,DomDeferred,Traversing,Renderer,JQGrid){'use strict';function View(){}function getIDForCell(a,b){return(a+'_'+b).replace(/[^\w\d_]/g,'_')}return Util.loadCss('components/jqgrid_edit/css/ui.jqgrid.css'),$.extend(!0,View.prototype,Default,{init:function(){var lastTr,that=this,actionsOut=this.module.actions_out();if(actionsOut)for(var i=0;i<actionsOut.length;i++)('onToggleOn'===actionsOut[i].event||'onToggleOff'===actionsOut[i].event)&&(this.hasToggleAction=!0);this.uniqId=Util.getNextUniqueId()+'_',this.dom=$('<div class="ci-displaylist-list"></div>'),this.domTable=$('<table />').attr('id',this.uniqId).css({width:'100%'}),this.dataSize=0,this.currentPage=1,this.dom.on('mouseover','tr.jqgrow',function(a){that.module.getConfigurationCheckbox('highlightLine','Yes')&&$(this).addClass('ci-highlight'),this!==lastTr&&that.module.controller.lineHover(that.elements,$(this).attr('id').replace(that.uniqId,'')),lastTr=a.currentTarget}).on('mouseout','tr.jqgrow',function(){that.module.getConfigurationCheckbox('highlightLine','Yes')&&$(this).removeClass('ci-highlight'),this===lastTr&&(that.module.controller.lineOut(that.elements,$(this).attr('id').replace(that.uniqId,'')),lastTr=null)});var filter=this.module.getConfiguration('filterRow');eval('that.filter = function(jqGrid, source, rowId) { try { \n '+filter+'\n } catch(_) { console.log(_); } }'),this.module.getDomContent().html(this.dom)},exportToTabDelimited:function(){if(this.jpaths){for(var b=[],d=0,f=this.elements.length,g=[],h=0;h<this.jpaths.length;h++)g.push(this.jpaths[h].name);for(b.push(g.join('\t'));d<f;d++){for(var k=[],n=0;n<this.jpaths.length;n++)Traversing.getValueFromJPath(this.elements[d],this.jpaths[n].jpath).done(function(o){k.push(o)});b.push(k.join('\t'))}return b.join('\r\n')}},unload:function(){this.jqGrid('GridDestroy'),this.jqGrid=!1,this.module.getDomContent().empty()},inDom:function(){var g,k,b=this,c=[],d=[],f=0,h=this.module.getConfiguration('colsjPaths');if('object'==typeof h)for(k=h.length;f<k;f++)g='none'!==h[f].editable&&'false'!==h[f].editable&&''!==h[f].editable,c.push(h[f].name),d.push({name:h[f].name,index:h[f].name,title:!1,width:h[f].width||150,editable:g,editoptions:'select'==h[f].editable?{value:h[f].options}:{},edittype:!!g&&h[f].editable,_jpath:h[f].jpath,sortable:!0,sorttype:h[f].number[0]?'float':'text'});var n=this.module.getConfiguration('nbLines')||20;this.domTable=$('<table />').attr('id',this.uniqId).appendTo(this.dom),this.domPaging=$('<div />',{id:'pager'+this.uniqId}).appendTo(this.dom),$(this.domTable).jqGrid({colNames:c,colModel:d,editable:!0,sortable:!0,loadonce:!1,datatype:'local',gridview:!0,scrollerbar:!0,height:'100%',forceFit:!0,shrinkToFit:!0,cellsubmit:'clientArray',cellEdit:!0,rowNum:n,rowList:[2,10,20,30,100],pager:'#pager'+this.uniqId,formatCell:function(p,q,r){return $(r).text()},resizeStop:function(){b.domTable.children().children().eq(0).children().each(function(r){h[r].width=$(this).width()})},rowattr:function(){if(arguments[1]._backgroundColor)return{style:'background-color: '+arguments[1]._backgroundColor}},beforeSaveCell:function(p,q,r,t,u){return-1<b.jpaths[u].number.indexOf('number')&&(r=parseFloat(r)),b.module.model.dataSetChild(b.elements[p.replace(b.uniqId,'')],d[u]._jpath,r),b.applyFilterToRow(p.replace(b.uniqId,''),p),'<div id="'+getIDForCell(p,q)+'">'+r+'</div>'},loadComplete:function(){if(b.jqGrid)for(var t,p=b.jqGrid('getDataIDs'),q=0,r=p.length;q<r;q++)t=p[q].replace(b.uniqId,''),b.applyFilterToRow(t,p[q]),b.tableElements[t]._inDom.notify()},viewrecords:!0,onSelectRow:function(p,q){b.hasToggleAction&&(q?($('#'+p).addClass('bg-orange').removeClass('ui-widget-content ui-state-highlight'),b.module.controller.onToggleOn(b.elements,p.replace(b.uniqId,''))):($('#'+p).removeClass('bg-orange'),b.module.controller.onToggleOff(b.elements,p.replace(b.uniqId,'')))),b.module.controller.lineClick(b.elements,p.replace(b.uniqId,''))},onSortCol:function(){for(var p=b.jqGrid('getDataIDs'),q=0,r=p.length;q<r;q++)b.tableElements[q]._inDom.notify()}}),this.jqGrid=$(this.domTable).jqGrid.bind(this.domTable),this.resolveReady()},applyFilterToRow:function(b,c){this.filter&&this.filter(this.jqGrid,this.elements[b],c)},onResize:function(){this.jqGrid&&(this.jqGrid('setGridWidth',this.width),this.jqGrid('setGridHeight',this.height-26-27))},blank:{list:function(){this.currentPage=this.jqGrid('getGridParam','page'),API.killHighlight(this.module.getId()),this.jqGrid('clearGridData'),$(this.domTable).trigger('reloadGrid')}},update:{list:function(b){var a=b.get(),c=this.module.getConfiguration('colsjPaths'),d=[];if(this.jpaths=c,this.elements=a,this.module.data=b,!!c){this.buildElements(a,d,c),this.gridElements=d,this.tableElements=d;for(var f=[],g=0,h=d.length;g<h;g++)f.push(d[g]);this.dataSize!=h&&(this.currentPage=1,this.dataSize=h),this.jqGrid('setGridParam',{datatype:'local',data:f,page:this.currentPage}),$(this.domTable).trigger('reloadGrid'),this.module.model.getjPath('list',[0])}}},buildElements:function(b,c,d){for(var f=this,g=0,h=b.length;g<h;g++)c.push(this.buildElement(b.get(g),f.uniqId+g,d))},buildElement:function(b,c,d,f){var g={},h=0,k=d.length;for(f||this.listenFor(b,d,c),g.id=c+'',g.__source=b,API.listenHighlight(b,function(q){$('#'+c)[q?'addClass':'removeClass']('ci-highlight')},!1,this.module.getId()),g._inDom=$.Deferred();h<k;h++){var n=getIDForCell(g.id,d[h].name);(function(q,r){g._inDom.progress(function(){Renderer.render($('#'+r),b,d[q].jpath)})})(h,n),g[d[h].name]='<div id="'+n+'">'}var o=this.module.getConfiguration('colorjPath');if(o){var p=b.getChildSync(o);p&&(g._backgroundColor=p+'')}return g},listenFor:function(b,c,d){var f=this,g=$('body');this.module.model.dataListenChange(b,function(){f.jqGrid('setRowData',d,f.buildElement(this,d,c,!0));var h=g.scrollTop(),k=$('tr#'+d,f.domTable).get(0);k&&(k.scrollIntoView(),g.scrollTop(h))},'list')},onActionReceive:{addRow:function(b){this.elements=this.elements||[],this.elements.push(b),this.module.data=this.elements;var c=this.module.getConfiguration('colsjPaths'),d=this.elements.length-1,f=this.buildElement(b,this.uniqId+d,c);this.gridElements.push(f),this.jqGrid('addRowData',f.id,f)},removeRow:function(b){this.elements=this.elements||[];for(var c,d,f=0,g=this.gridElements.length;f<g;f++)if(this.gridElements[f].__source==b){c=this.gridElements[f].id,d=f;break}this.jqGrid('delRowData',c),this.elements.splice(d,0,1),this.gridElements.splice(d,0,1)},addColumn:function(b){var c=this.module,d=b.split('.');d=d.pop();for(var f=c.getConfiguration('colsjPaths'),g=0;g<f.length;g++)if(b===f[g].jpath)return;f.push({name:d,editable:!1,jpath:b,number:!1}),this.module.reload()},removeColumn:function(b){for(var c=this.module,d=c.getConfiguration('colsjPaths'),f=0,g=d.length;f<g;f++)if(d[f].jpath==b){d.splice(f,1),this.module.reload();break}}}}),View});