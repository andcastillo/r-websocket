'use strict';define(['modules/default/defaultview','src/util/util','openchemlib/openchemlib-full'],function(a,b,c){'use strict';function d(){this.id=b.getNextUniqueId()}return $.extend(!0,d.prototype,a,{init:function(){this.editor=null},inDom:function(){this.dom=$('<div>').attr('id',this.id).css({height:'99%',width:'100%'}),this.module.getDomContent().html(this.dom)},onResize:function(){this.dom.empty(),this.initEditor()},blank:{mol:function(){this.clearEditor()},smiles:function(){this.clearEditor()},actid:function(){this.clearEditor()}},update:{mol:function(f){this._currentValue=f,this._currentType='mol',this.editor.setMolFile(f.get()+''),this.setFragment()},smiles:function(f){this._currentValue=f,this._currentType='smiles',this.editor.setSmiles(f.get()+''),this.setFragment()},actid:function(f){this._currentValue=f,this._currentType='oclid';var g=f.get()+'';f.coordinates&&(g+=' '+f.coordinates),this.editor.setIDCode(g),this.setFragment()}},initEditor:function(){var f=this.module.controller,g=this.module.getConfigurationCheckbox('prefs','svg');this.editor=new c.StructureEditor(this.id,g,1),this.editor.setChangeListenerCallback(this.module.controller.onChange.bind(f)),this.editor.setIDCode(f.currentMol.idcode,f.currentMol.coordinates),this.setFragment(),this.resolveReady()},clearEditor:function(){this._currentValue=null,this._currentType=null,this.editor.setIDCode('')},setFragment:function(){this.module.getConfigurationCheckbox('prefs','queryFeatures')?this.editor.setFragment(!0):this.editor.setFragment(!1)}}),d});
