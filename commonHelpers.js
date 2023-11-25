import{a as m,i as p}from"./assets/vendor-98a16590.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const y="https://the-one-api.dev/v2",b="CF9pReNG_Lb_8KBokb0w",v={character:"character"},w={headers:{Authorization:`Bearer ${b}`}};function L(t,o){return`${y}/${t}?${o}`}function R(t,o){const r={page:t,sort:o,limit:20};return new URLSearchParams(r)}async function E(t,o){const r=L(t,o);return console.log(r),await m.get(r,w)}function d(t=1,o=""){const r=R(t,o);return E(v.character,r)}const c={searchForm:document.querySelector(".search-form"),sortingButton:document.querySelector('button[type="submit"]'),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")},f=20;let l=0,a=1,i="";const B={root:null,rootMargin:"300px",treshhold:1},g=new IntersectionObserver(S,B);function S(t){t.forEach(o=>{o.isIntersecting&&(a+=1,d(a,i).then(s=>{h(s.data),f*a>=l&&g.unobserve(c.guard)}).catch(s=>O(s.message)))})}function C(t){return t.map(({name:o,race:r="Unknown race"})=>`            
                <div class="photo-card">                    
                    <div class="info">
                        <p class="info-item">
                            <b>Name</b>
                            <span>${o}</span> 
                        </p>
                        <p class="info-item">
                            <b>Race</b>
                            <span>${r}</span>
                        </p>                        
                    </div>
                </div>            
        `).join("")}function h(t){console.log(t.docs),c.gallery.insertAdjacentHTML("beforeend",C(t.docs));const{height:o}=c.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}function O(t){p.show({message:t,messageColor:"white",backgroundColor:"tomato",timeout:2500,position:"topRight"})}function M(){c.gallery.innerHTML="",l=0,a=1,i=""}function $(t){t.preventDefault(),M();const r=new FormData(c.searchForm).get("sorting").trim().toLowerCase();i=r==="asc"||r==="desc"?r:"",console.log(i),d(1,`name:${i}`).then(e=>{if(e.status>=400)throw new Error("Error");console.log(e.data),l=e.data.total,h(e.data),f*a<l&&g.observe(c.guard)}).catch(e=>console.log(e))}c.sortingButton.addEventListener("click",$);
//# sourceMappingURL=commonHelpers.js.map
