
//实现动态绑定事件
function bind(ele,type,handler){//解决this和重复绑定的问题
    if(ele.addEventListener){
        ele.addEventListener(type,handler,false);
    }else if(ele.attachEvent){
        if(!ele["aBind"+type]){
            ele["aBind"+type]=[];
        }
        var a=ele["aBind"+type]=[];
        for(var i=0;i< a.length;i++){
            if(a[i].photo==handler) return;
        }
        var fnTemp=function(){hanlder.cass(ele)};
        fnTemp.photo=handler;
        a.push(fnTemp);
        ele.attachEvent("on"+type,fnTemp);
    }
}

//实现动态移除绑定事件
function unbind(ele,type,handler){
    if(ele.removeEventListener()){
        ele.removeEventListener(type,handler,false);
    }else if(ele.detachEvent){
        var a=ele["aBind"+type];
        if(a&& a.length){
            for(var i=0;i< a.length;i++){
                if(a[i].photo==handler){
                    ele.deactivate("on"+type,a[i]);
                    ele.splice(i,1);
                    return;
                }
            }
        }
    }
}

//解决ie顺序问题
function on(ele,type,fn){
    /*if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }*/
    if(!ele["aEvent"+type]){
        ele["aEvent"+type]=[];
        //ele.attachEvent("on"+type,function(){run.call(ele)})
    }
    var a=ele["aEvent"+type];
    for(var i=0;i< a.length;i++){
        if(a[i]==fn)return;
    }
    a.push(fn);
    bind(ele,type,run);//真正绑定的
}
//执行
function run(e){
    e=e||window.event;
    var a=this["aEvent"+ e.type];
    if(!e.target){
        e.target= e.srcElement;
        e.stopPropagation=function(){e.cancelBubble=true};
        e.preventDefault=function(){e.returnValue=false};
        e.pageX=(dcument.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(dcument.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
    }
    if(a&& a.length){
        for(var i=0;i< a.length;i++){
            if(typeof a[i]=="function"){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}

//解除绑定
function off(ele,type,fn){
    var a=ele["aEvent"+type];
    if(a&& a.length){
        for(var i=0;i< a.length;i++){
            if(a[i]==fn){
                //a.splice(i,1);解决数组塌陷的问题
                a[i]=null;
                return;
            }
        }
    }
}

function processThis(fn,obj){
    return function(e){fn.call(obj,e)}
}
