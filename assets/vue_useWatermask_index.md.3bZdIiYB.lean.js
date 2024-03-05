import{_ as V}from"./chunks/DemoContainer.vue_vue_type_script_setup_true_lang.CMKZxkzd.js";import{_ as U}from"./chunks/FunctionInfo.vue_vue_type_script_setup_true_lang.BCn4CEsY.js";import{ag as I,h as t,ah as T,y as P,ai as N,d as q,o as $,c as C,m as s,a4 as u,aa as y,p as m,a6 as v,J as b,w as z,a as S,a2 as H}from"./chunks/framework.TvTER_e8.js";import"./chunks/theme.DQ64ccB0.js";const e=I?window.document:void 0;function L(){const n=t(e==null?void 0:e.body),p=t(21186),k=t("232px"),l=t("232px"),h=t("-15"),r=t("middle"),o=t("middle"),d=t("rgba(0, 0, 0, 0.1)"),D=t("normal"),i=t("14px"),a=t("'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif"),_=t(.3),A=t("请设置水印文案"),f=t("watermarkDom");let g=null;T(()=>{x(),P([n,p,k,l,h,r,o,d,D,i,a,_,A,f],x)}),N(()=>{E()});function x(){const W=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${k.value}" height="${l.value}" style="transform: rotate(${h.value}deg); opacity:${_.value}">
        <text xmlns="http://www.w3.org/2000/svg" x="50%" y="50%"
          text-anchor="${r.value}"
          alignment-baseline="${o.value}"
          fill="${d.value}"
          font-weight="${D.value}"
          font-family="${a.value}"
          style="font-size: ${i.value};"
        >
          ${A.value}
        </text>
      </svg>
    `,F=`data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(W)))}`,w=e==null?void 0:e.querySelector(`.${f.value}`),c=w||(e==null?void 0:e.createElement("div")),R=`
      z-index:${p.value};
      position:fixed;
      pointer-events:none;
      height:100%;
      width:100%;
      top:0;
      left:0;
      background-image:url('${F}'),url('${F}');
      background-position: 0px 0px,116px 116px;
      transform: translate3d(0,0,0);
    `;c==null||c.classList.add(f.value),c==null||c.setAttribute("style",R),w||(n.value&&(n.value.style.position="relative"),n.value&&n.value.insertBefore(c,n.value.lastChild)),g&&g.disconnect(),g=new MutationObserver(()=>{x()}),g.observe(n.value,{attributes:!0,subtree:!0,childList:!0})}function E(){const B=e==null?void 0:e.querySelector(`.${f.value}`);B&&B.remove(),g&&(g.disconnect(),g=null)}return{container:n,zIndex:p,width:k,height:l,rotate:h,textAnchor:r,alignmentBaseline:o,fill:d,fontWidth:D,fontSize:i,fontFamily:a,opacity:_,content:A,domClassName:f,clearWatermark:E}}const O={class:"flex items-center"},M=s("span",{class:"mr-5px text-18px w-30"}," 宽度 : ",-1),Z={class:"flex items-center"},J=s("span",{class:"mr-5px text-18px w-30"}," 高度 : ",-1),j={class:"flex items-center"},Y=s("span",{class:"mr-5px text-18px w-30"}," 旋转 : ",-1),G={class:"flex items-center"},K=s("span",{class:"mr-5px text-18px w-30"}," 填充 : ",-1),Q={class:"flex items-center"},X=s("span",{class:"mr-5px text-18px w-30"}," 字体大小 : ",-1),ss={class:"flex items-center"},is=s("span",{class:"mr-5px text-18px w-30"}," 透明度 : ",-1),as={class:"flex items-center"},ts=s("span",{class:"mr-5px text-18px w-30"}," 内容 : ",-1),es=q({__name:"demo",setup(n){const{width:p,height:k,rotate:l,fill:h,fontSize:r,opacity:o,content:d}=L();return(D,i)=>($(),C("div",null,[s("div",O,[M,u(s("input",{"onUpdate:modelValue":i[0]||(i[0]=a=>v(p)?p.value=a:null),type:"text"},null,512),[[y,m(p)]])]),s("div",Z,[J,u(s("input",{"onUpdate:modelValue":i[1]||(i[1]=a=>v(k)?k.value=a:null),type:"text"},null,512),[[y,m(k)]])]),s("div",j,[Y,u(s("input",{"onUpdate:modelValue":i[2]||(i[2]=a=>v(l)?l.value=a:null),type:"number"},null,512),[[y,m(l)]])]),s("div",G,[K,u(s("input",{"onUpdate:modelValue":i[3]||(i[3]=a=>v(h)?h.value=a:null),type:"text"},null,512),[[y,m(h)]])]),s("div",Q,[X,u(s("input",{"onUpdate:modelValue":i[4]||(i[4]=a=>v(r)?r.value=a:null),type:"text"},null,512),[[y,m(r)]])]),s("div",ss,[is,u(s("input",{"onUpdate:modelValue":i[5]||(i[5]=a=>v(o)?o.value=a:null),type:"text"},null,512),[[y,m(o)]])]),s("div",as,[ts,u(s("input",{"onUpdate:modelValue":i[6]||(i[6]=a=>v(d)?d.value=a:null),type:"text"},null,512),[[y,m(d)]])])]))}}),ns=s("h1",{id:"usewatermask",tabindex:"-1"},[S("useWatermask "),s("a",{class:"header-anchor",href:"#usewatermask","aria-label":'Permalink to "useWatermask"'},"​")],-1),ls=s("p",null,"Basic counter with utility functions.",-1),hs=s("h2",{id:"demo",tabindex:"-1"},[S("Demo "),s("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1),ps=s("p",{class:"demo-source-link"},[s("a",{href:"https://github.com/ArthurDarkstone/vueuse-template/blob/main/packages/vue/useWatermask/demo.vue",target:"_blank"},"source")],-1),ks=H("",6),ys=JSON.parse('{"title":"useWatermask","description":"","frontmatter":{"category":"Browser"},"headers":[],"relativePath":"vue/useWatermask/index.md","filePath":"vue/useWatermask/index.md"}'),rs={name:"vue/useWatermask/index.md"},ms=Object.assign(rs,{setup(n){return(p,k)=>{const l=U,h=V;return $(),C("div",null,[ns,b(l,{fn:"useWatermask"}),ls,hs,b(h,null,{default:z(()=>[ps,b(es)]),_:1}),ks])}}});export{ys as __pageData,ms as default};
