//解决类数组转化为数组的方法---->解决兼容问题
var DOM = {};
DOM.listToArray = function (eles) {
    try {
        var a = [].slice.call(eles, 0);//在ie中会抛出异常，eles不是一个
    } catch (e) {
        var a = [];
        for (var i = 0; i < eles.length; i++) {
            a.push(eles[i])
        }
    }
    return a;
};

//解决选型卡参数问题
DOM.getIndex = function (ele) {
    var index = 0;
    var prev = ele.previousSibling;
    while (prev) {
        if (prev.nodeType === 1) {
            index++;
        }
        prev = prev.previousSibling;
    }
    return index;
};

//解决选型卡添加class重复的问题-->1
DOM.siblings = function (ele) {
    var a = [];
    var prev = ele.previousSibling;
    while (prev) {
        if (prev.nodeType == 1) {
            a.unshift(prev);
        }
        prev = prev.previousSibling;
    }
    var next = ele.nextSibling;
    while (next) {
        if (next.nodeType == 1) {
            a.push(next);
        }
        next = next.nextSibling;
    }
    return a
};

//解决选型卡添加class重复的问题-->2
DOM.parentSiblings = function (ele) {
    var a = [];
    var child = ele.parentNode.firstChild;
    while (child) {
        if (child !== ele) {//确保当前被判断的元素不能是自己
            //child=child.nextSibling;
            //continue
            //}else{
            if (child.nodeType === 1) {
                a.push(child)
            }
        }
        child = child.previousSibling;
    }
    return a
};

//找到所有的哥哥
DOM.prevSibling = function (ele) {
    var a = [];
    var child = ele.parentNode.firstChild;
    while (child) {
        if (child == ele)break;
        if (child.nodeType == 1) {
            a.push(child);
        }
        child = child.nextSibling;
    }
    return child;
};

//找到所有的弟弟
DOM.nextSibling = function (ele) {
    var a = [];
    var child = ele.parentNode.lastChildC;
    while (child) {
        if (child == ele)break;
        if (child.nodeType == 1) {
            a.unshift(child);
        }
        child = child.previousSibling;
    }
    return child;

};

//把相邻的哥哥和弟弟找到
DOM.closest = function (ele) {
    if (ele.previousElementSibling) {
        return ele.previousElementSibling;
    }
    var p = ele.previousSibling;
    var a = [];
    while (p) {
        if (p.nodeType === 1) {
            a.push(p);
            break;//一旦找到就退出循环
        }
        p = p.previousSibling;
    }
    var n = ele.nextSibling;
    while (n) {
        if (n.nodeType === 1) {
            a.push(n);
            break;
        }
        n = n.previousSibling;
    }
    return a;
};

//找到相邻的和弟弟
DOM.next = function (ele) {
    var n = ele.nextSibling;
    while (n) {
        if (n.nodeType === 1) {
            a.push(n);
            return p;
        }
        n = n.previousSibling;
    }
    return null;
};

//找到相邻的哥哥
DOM.prev = function (ele) {
    var p = ele.previousSibling;
    while (p) {
        if (p.nodeType === 1) {
            a.push(p);
            return p;//一旦找到就退出循环
        }
        p = p.previousSibling;
    }
    return null;
};

//获得parent这个父节点的所有元素子节点
//获得某个元素下的所有元素子节点   第二个参数可以获取，全部元素子节点中的某个元素集合 ---》div
DOM.children = function (parent, tag) {//第二个参数可选，表示指定的标记名
    parent.children;//得到的是所有的元素节点，有兼容问题，在ie中包含注视节点
    if (typeof tag == "undefined") {
        var childNodes = parent.childNodes;
        var a = [];
        for (var i = 0; i < childNodes.length; i++) {
            var child = childNodes[i];
            if (child.nodeType === 1) {
                a.push(child)
            }
        }
    } else if (typeof tag == "string") {
        tag = tag.toUpperCase();
        var childNodes = parent.childNodes;
        var a = [];
        for (var i = 0; i < childNodes.length; i++) {
            var child = childNodes[i];
            if (child.tagName === tag) {//只有元素才有tagName属性，不是元素节点没有    tagName不是DOM属性，是DHTML（DOM0）专有的
                a.push(child)
            }
        }
    } else {
        throw new Error("第二个参数类型错误")
    }
    return a;
};


//使用类名获取元素
DOM.getElesByClass = function (str, context) {//方法  getElesByClass  传入参数  str，context
    context = context || document;//context＝context 或者 document
    if (context.getElementsByClassName)//
        return context.getElementsByClassName(str);
    var regTrim = /^ +| +$/g;//定义一个可以匹配到所有css名称的正则
    str = str.replace(regTrim, " ");//str=当前str 去除首尾空格
    var aClass = str.split(/ +/);//将字符串按照空格拆分成数组并赋值给aclass
    var eles = context.getElementsByTagName("*");//定义变量 else 赋值为 context下的所有元素
    for (var i = 0; i < aClass.length; i++) {//循环获取aClass里的所有元素
        var strClass = aClass[i];//定义strClass＝当前循环的元素
        var regClass = new RegExp("(?:^| )" + strClass + "(?: |$)");//定义regClass＝匹配一个正则
        var a = [];//定义一个空数组
        for (var j = 0; j < eles.length; j++) {//循环获取所有eles下的元素
            var ele = eles[j];//定义变量ele＝当前循环的eles元素
            if (regClass.test(ele.className)) {//判断当前的元素的className是否匹配上面定义的正则，
                a.push(ele);//将当前的元素传入空数组
            }

        }
        eles = a;//将数组a的值赋值给eles
    }
    return eles;
};




//添加class
DOM.addClass = function (ele, strClass) {
    var reg = new RegExp("(?:^| )" + strClass + "(?: |$)");
    if (!reg.test(ele.className))ele.className += " " + strClass;
};

//删除class
DOM.removeClass = function (ele, strClass) {
    var reg = new RegExp("(?:^| )" + strClass + "(?: |$)", "g");
    ele.className = ele.className.replace(reg, "");
};


//获取页面上任意元素通过浏览器渲染后计算出来的样式
/*
 var ele=document.getElementById("div1");
 window.getComputedStyle(ele,null).width;//标准浏览器获取div的style
 ele.currentStyle//ie中的属性--输出的值都是字符串
 document.document.clientHeight||documeng.body.clientHeight//获取值标准浏览器和移动端用前者
 */

DOM.getClass=function(ele,attr){
    try{
        return window.getComputedStyle(ele,null)[attr];
    }catch(e){
        return ele.currentStyle[attr];
    }
};

//用js实现盒子固定在页面的中间位置

DOM.offentLeftTop=function(ele){

};


//获取任意元素到浏览器顶端和左边的距离
DOM.offst=function(ele){
    var l=ele.offsetLeft;
    var t=ele.offsetTop;
    var p=ele.offsetParent;
    while(p){
        if(window.navigator.userAgent.indexOf("MSIE 8")>-1){
            l+= p.offsetLeft;
            l+= p.offsetTop;
        }else{
            l+= p.offsetLeft+ p.clientLeft;
            t+= p.offsetTop+ p.clientTop;
        }
        p= p.offsetParent;
    }
    return {left:l,top:t}
};

DOM.setCss=function(ele,attr,target){
    switch (attr){
        case "width":
        case "height":
        case "top":
        case "left":
        case "right":
        case "bottom":
        case "border":
            ele.style[attr]=val+"px";
            break;
        case "float":
            ele.style.stylefloat=val;
            ele.style.cssfloat=val;
            break;
        case "opacity":
            ele.style.opacity=val;
            ele.style.filter="alpha(opacity="+val*100+")";
            break;
        default :
            ele.style[attr]=val;
    }
};








