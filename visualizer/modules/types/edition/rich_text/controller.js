'use strict';define(['jquery','modules/default/defaultcontroller','ckeditor'],function(a,b,c){'use strict';function d(){}return a.extend(!0,d.prototype,b),d.prototype.moduleInformation={name:'Rich text editor',description:'Edit rich text in a wysiwyg interface.',author:'Micha\xEBl Zasso',date:'21.05.2014',license:'MIT',cssClass:'rich_text'},d.prototype.references={html:{label:'Content as HTML'}},d.prototype.events={onEditorChange:{label:'The value in the editor has changed',refVariable:['html']}},d.prototype.variablesIn=['html'],d.prototype.onRemove=function(){c.instances[this.module.view._id]&&c.instances[this.module.view._id].destroy()},d.prototype.valueChanged=function(e){this.module.definition.richtext=e,this.module.getConfigurationCheckbox('modifyInVariable','yes')&&this.module.data&&(this.module.data.setValue(e,!0),this.module.model.dataTriggerChange(this.module.data)),this.createDataFromEvent('onEditorChange','html',DataObject.check({type:'html',value:e},!0))},d.prototype.configurationStructure=function(){return{groups:{group:{options:{type:'list'},fields:{editable:{type:'checkbox',title:'Is Editable',options:{isEditable:'Yes'},default:['isEditable']},debouncing:{type:'float',title:'Debouncing (ms)',default:0},modifyInVariable:{type:'checkbox',title:'Modify Input Variable',options:{yes:'Yes'},default:[]},storeInView:{type:'checkbox',title:'Store content in view',options:{yes:'Yes'},default:['yes']},autoHeight:{type:'checkbox',title:'Automatic Height',options:{yes:'Yes'},default:[]},bgColor:{type:'spectrum',title:'Background color',default:[255,255,255,1]},postit:{type:'checkbox',title:'Looks like a postit',options:{yes:'Yes'},default:[]},html:{type:'checkbox',title:'Render plain html',options:{yes:'Yes'},default:['yes']}}}}}},d.prototype.actionsIn={insertHtml:'Insert html',insertText:'Insert text'},d.prototype.configAliases={editable:['groups','group',0,'editable',0],modifyInVariable:['groups','group',0,'modifyInVariable',0],storeInView:['groups','group',0,'storeInView',0],autoHeight:['groups','group',0,'autoHeight',0],bgColor:['groups','group',0,'bgColor',0],postit:['groups','group',0,'postit',0],plainHtml:['groups','group',0,'html',0],debouncing:['groups','group',0,'debouncing',0]},d});
