'use strict';define(['lodash','d3','src/util/util','chroma'],function(a,b,e,f){'use strict';function h(p){return'left'===p||'right'===p?['0%','0%','0%','100%']:['0%','0%','100%','0%']}function j(p){var q=0,t=l(p);return m(p)?(('bottom'===t||'top'===t)&&(q+=o/2),'left'===t&&(q+=o),q):q}function k(p){var q=0;if(!m(p))return q;var t=l(p);return('left'===t||'right'===t)&&(q+=o/2),'top'===t&&(q+=o),q}function l(p){return p.orientation||p.axis&&p.axis.orientation||'top'}function m(p){return!!p.axis}var n={},o=30;return e.loadCss('src/util/colorbar.css'),n.getColorScale=function(p){var q,t=b.min(p.domain),u=b.max(p.domain);q='values'===p.stopType?a.cloneDeep(p.stopPositions):p.stopPositions.map(function(y){return t+y*(u-t)});var w=p.stops.map(function(y){var z=f(y),A={color:z.hex(),opacity:z.alpha()};return A});return q.unshift(Number.MIN_VALUE),q.push(Number.MAX_VALUE),w.push(w[w.length-1]),w.unshift(w[0]),b.scale.linear().domain(q).range(w)},n.getSvg=function(p){var q=$('<div>')[0];return n.renderSvg(q,p)},n.renderSvg=function(p,q){var t,u=b.min(q.domain),w=b.max(q.domain);t='values'===q.stopType?q.stopPositions.map(function(J){return(J-u)/(w-u)}):q.stopPositions;var A,C,y=l(q),z=h(y),B=q.width,D=q.height;q.axis?(C=D-o,A=B-o):(A=B,C=D);var E=b.select(p).append('svg').attr('width',B).attr('height',D),F=e.getNextUniqueId();E.append('defs').append('linearGradient').attr({x1:z[0],y1:z[1],x2:z[2],y2:z[3],id:F}).selectAll('stop').data(q.stops).enter().append('stop').attr('offset',function(J,K){return''+100*t[K]+'%'}).style('stop-color',function(J){return J}).style('stop-opacity',1);var G=E.append('g').attr('class','key').attr('transform',function(){var J=j(q),K=k(q);return'translate('+J+','+K+')'});G.append('rect').style('fill','url(#'+F+')').attr('width',A).attr('height',C);var H=b.scale.linear().domain(q.domain);if(q.axis&&q.axis.tickValues||(H=H.nice()),H.range([0,'bottom'===y||'top'===y?A:C]),m(q)){var I=b.svg.axis().scale(H).orient(y).tickSize(6);q.axis.ticks?I.ticks(q.axis.ticks):q.axis.tickValues&&I.tickValues(q.axis.tickValues),G.append('g').attr('class','key').attr('transform',function(){var J=0,K=0;return'bottom'===y?K+=C:'right'===y&&(J+=A),'translate('+J+','+K+')'}).call(I)}return E.html()},n});