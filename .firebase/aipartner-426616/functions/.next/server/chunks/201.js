"use strict";exports.id=201,exports.ids=[201],exports.modules={7543:(e,t)=>{function isInAmpMode(e){let{ampFirst:t=!1,hybrid:n=!1,hasQuery:r=!1}=void 0===e?{}:e;return t||n&&r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return isInAmpMode}})},9201:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{defaultHead:function(){return defaultHead},default:function(){return _default}});let r=n(167),a=n(8760),d=a._(n(6689)),l=r._(n(8955)),u=n(8039),o=n(1988),i=n(7543);function defaultHead(e){void 0===e&&(e=!1);let t=[d.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(d.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function onlyReactElement(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===d.default.Fragment?e.concat(d.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}n(1905);let f=["name","httpEquiv","charSet","itemProp"];function reduceComponents(e,t){let{inAmpMode:n}=t;return e.reduce(onlyReactElement,[]).reverse().concat(defaultHead(n).reverse()).filter(function(){let e=new Set,t=new Set,n=new Set,r={};return a=>{let d=!0,l=!1;if(a.key&&"number"!=typeof a.key&&a.key.indexOf("$")>0){l=!0;let t=a.key.slice(a.key.indexOf("$")+1);e.has(t)?d=!1:e.add(t)}switch(a.type){case"title":case"base":t.has(a.type)?d=!1:t.add(a.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(a.props.hasOwnProperty(t)){if("charSet"===t)n.has(t)?d=!1:n.add(t);else{let e=a.props[t],n=r[t]||new Set;("name"!==t||!l)&&n.has(e)?d=!1:(n.add(e),r[t]=n)}}}}return d}}()).reverse().map((e,t)=>{let n=e.key||t;return d.default.cloneElement(e,{key:n})})}let _default=function(e){let{children:t}=e,n=(0,d.useContext)(u.AmpStateContext),r=(0,d.useContext)(o.HeadManagerContext);return d.default.createElement(l.default,{reduceComponentsToState:reduceComponents,headManager:r,inAmpMode:(0,i.isInAmpMode)(n)},t)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8955:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return SideEffect}});let r=n(6689),useClientOnlyLayoutEffect=()=>{},useClientOnlyEffect=()=>{};function SideEffect(e){var t;let{headManager:n,reduceComponentsToState:a}=e;function emitChange(){if(n&&n.mountedInstances){let t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(a(t,e))}}return null==n||null==(t=n.mountedInstances)||t.add(e.children),emitChange(),useClientOnlyLayoutEffect(()=>{var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),()=>{var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),useClientOnlyLayoutEffect(()=>(n&&(n._pendingUpdate=emitChange),()=>{n&&(n._pendingUpdate=emitChange)})),useClientOnlyEffect(()=>(n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),()=>{n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)})),null}},1905:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return warnOnce}});let warnOnce=e=>{}},8039:(e,t,n)=>{e.exports=n(7093).vendored.contexts.AmpContext}};