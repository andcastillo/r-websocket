'use strict';define(['modules/default/defaultmodel','src/util/datatraversing'],function(a,b){'use strict';function c(){}return $.extend(!0,c.prototype,a,{getValue:function(){return this.dataValue},getjPath:function(){var h,g=[];return h=this.module.data,h&&b.getJPathsFromElement(h,g),g}}),c});
