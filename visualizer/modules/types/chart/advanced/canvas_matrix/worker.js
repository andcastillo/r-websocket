'use strict';var count=0;function getColorFromValue(a){var b=min,c=max;highContrast||(b=0,c=1);var f=c-b,g=colors.length-1,h=f/g,k=Math.round(g*(a-b)/f);return k=Math.min(Math.max(0,k),colors.length-2),getColorBetween(a,colors[k],colors[k+1],k*h+b,(k+1)*h+b)}function getColorBetween(a,b,c,e,f){var g=(a-e)/(f-e);return[parseInt(g*(c[0]-b[0])+b[0]),parseInt(g*(c[1]-b[1])+b[1]),parseInt(g*(c[2]-b[2])+b[2]),parseInt(g*(c[3]-b[3])+b[3])]}function getRGB(a){if(!a)return!1;return 7==a.length?[parseInt('0x'+a.substring(1,3)),parseInt('0x'+a.substring(3,5)),parseInt('0x'+a.substring(5,7))]:4==a.length?[parseInt('0x'+a.substring(1,2)),parseInt('0x'+a.substring(2,3)),parseInt('0x'+a.substring(3,4))]:void 0}function generate(a,b,c,e){for(var f=a*squareLoading,g=b*squareLoading,h=f+squareLoading,k=g+squareLoading,l=f,m=g,n=c.data;l<h;l++)for(m=g;m<k;m++){if('undefined'==typeof data[m]||'undefined'==typeof data[m][l])continue;else{var o=data[m][l];o.value&&(o=o.value)}var p=getColorFromValue(o);drawCell(o,l-f,m-g,p,n,e)}return c}function drawCell(a,b,c,e,f,g){for(var m,h=g*pxPerCell,k=0,l=0;l<pxPerCell;){for(;k<pxPerCell;)count++,m=4*(b*pxPerCell+k+(c*pxPerCell+l)*h),f[m+0]=e[0],f[m+1]=e[1],f[m+2]=e[2],f[m+3]=255,k++;k=0,l++}l=0}var data,min,max,colors,pxPerCell,squareLoading,highContrast;self.onmessage=function(a){var b=a.data;'init'==b.title?(colors=b.message.colors,squareLoading=b.message.squareLoading,highContrast=b.message.highcontrast):'changeData'==b.title?(data=JSON.parse(b.message.data),min=b.message.min,max=b.message.max):'doPx'==b.title&&(pxPerCell=b.message.pxPerCell,postMessage({pxPerCell:pxPerCell,indexX:b.message.indexX,indexY:b.message.indexY,data:generate(b.message.indexX,b.message.indexY,b.message.buffer,b.message.nbValX)}))};
