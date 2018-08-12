(function() {
	var nav_obj = document.getElementsByTagName('nav')[0];
	var nav_a = nav_obj.getElementsByTagName('a');
	
	for (var i=0;i<nav_a.length;i++) {
		for (var i=0; i<nav_a.length; i++) {
			var linkurl = nav_a[i].getAttribute("href");
			if (window.location.href.indexOf(linkurl) != -1) {
				var linktext = nav_a[i].lastChild.nodeValue.toLowerCase();
				switch (linktext){
					case 'home':home();break;
					case 'about':about();break;
					case 'photos':photos();break;
					case 'live':live();break;
					case 'contact':contact();break;
					// default :contact();break;
				}
				nav_a[i].className = "here";
				var linktext = nav_a[i].lastChild.nodeValue.toLowerCase();
				document.body.setAttribute("id",linktext);
			}
		}
	}
} () );


//home
	function home() {
		if(!document.getElementById) {return false;}
		if(!document.getElementsByTagName) {return false;}
		if(!document.getElementsByClassName) {return false;}		
		if(!document.createElement) {return false;}	
		var home = document.getElementsByClassName('home')[0];
		var h_a = home.getElementsByTagName('a');

		//创建动态HTML，平稳退化	
		var c_div = document.createElement('div');
		c_div.setAttribute('class', 'img');	
		var oBox_img = document.createElement('img');
		oBox_img.setAttribute('src', 'images/slideshow.gif');
		oBox_img.setAttribute('class', 'home_box');
		c_div.appendChild(oBox_img);
		home.appendChild(c_div);
		oBox_img.style.left = 0;
		oBox_img.style.top = 0;
		for(var i=0;i<h_a.length;i++) {
			var wid = 150;
			h_a[i].index = i;
			h_a[i].onmouseenter = function() {
				move(oBox_img,-(this.index+1)*wid,0,5);
			}
		}
	};

	function move(obj,final_l,final_t,move_t) {
		//清除定时器
		if(obj.pro){
			clearTimeout(obj.pro);
		}
		if(!obj.style.left || !obj.style.top) { return false;}
		var init_l = parseInt(obj.style.left);
		var init_t = parseInt(obj.style.top);
		if(init_l==final_l && init_t==final_t){return true;}
		if(init_l < final_l){
			init_l += Math.ceil( (final_l-init_l)/5 );
		}
		if(init_l > final_l){
			init_l -= Math.ceil( (init_l-final_l)/5 );
		}
		if(init_t < final_t){
			init_t += Math.ceil( (final_t-init_t)/5 );
		}
		if(init_t > final_t){
			init_t -= Math.ceil( (init_t-final_t)/5 );
		}
		obj.style.left = init_l + 'px';
		obj.style.top = init_t + 'px';
		var move_f = function () {move(obj,final_l,final_t,move_t);}
		obj.pro = setTimeout(move_f,move_t );
	}

//about
	function about() {
		if(!document.getElementsByTagName) {return false;}
		if(!document.getElementsByClassName) {return false;}
		if(!document.createElement) {return false;}		
		var about = document.getElementsByClassName('about')[0];
		var oCon = about.getElementsByClassName('div_con');
		var a_a = about.getElementsByTagName('a');
		for(var i=0;i<a_a.length;i++) {
			oCon[i].style.display = 'none';
			a_a[i].onclick = function () {
				var oA_href = this.getAttribute("href").split('#')[1];		
				for(var j=0;j<oCon.length;j++) {
					if(oCon[j].id != oA_href ){
						oCon[j].style.display = 'none';
					}else{
						oCon[j].style.display = 'block';
					}
				}
				return false;	
			}
		}
	};

//photos
	function photos() {
		preparePlaceholder();
		prepareGallery();
	}
	function preparePlaceholder() {
		if(!document.createElement) {return false;}
		if(!document.createTextNode) {return false;}
		if(!document.getElementById) {return false;}
		if(!document.getElementsByTagName) {return false;}
		if(!document.getElementsByClassName('photos')) {return false;}
		var photos = document.getElementsByClassName('photos')[0];
		var galleryDiv = document.createElement('div');
		galleryDiv.id = 'imagegallery';
		galleryDiv.setAttribute('classname', 'div_img');
		var placeholder = document.createElement('img');
		placeholder.id = 'placeholder';
		placeholder.src = 'images/placeholder.gif';
		placeholder.alt = 'my image gallery';
		galleryDiv.appendChild(placeholder);
		var description = document.createElement('p');
		description.id = 'description';
		var desctext = document.createTextNode('Choose an image');
		description.appendChild(desctext);
		photos.appendChild(description);
		photos.appendChild(galleryDiv);	
	}

	function prepareGallery() {
		if (!document.getElementsByTagName) return false;
		if (!document.getElementById) return false;
		if (! document.getElementsByClassName('photos')) return false;
		var photos = document.getElementsByClassName('photos')[0];
		var links = photos.getElementsByTagName("a");
		for ( var i=0; i < links.length; i++) {
			links[i].onclick = function() {
				return showPic(this);
			}
		}
	}

	function showPic(whichpic) {
		if (!document.getElementById("placeholder")) return true;
		var source = whichpic.getAttribute("href").split('#')[1];
		var placeholder = document.getElementById("placeholder");
		var s_src = "images/photos/" + source + ".jpg";
		placeholder.setAttribute("src",s_src);
		if (!document.getElementById("description")) return false;
		if (whichpic.getAttribute("title")) {
			var text = whichpic.getAttribute("title");
		} else {
			var text = "";
		}
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text;
		}
		return false;
	}

//live
	function live() {
	    if(!document.getElementsByTagName) {return false;}
	    if(!document.getElementsByClassName) {return false;}
	    var live = document.getElementsByClassName('live')[0];
		var table = live.getElementsByTagName('table')[0];
	    var onoff = false;
        var table_body = table.getElementsByTagName('tbody')[0];
        var tbody_tr = table_body.getElementsByTagName('tr');
        for(var j=0;j<tbody_tr.length;j++) {
            var t_th = tbody_tr[j];
            if(onoff) {
                addClass(tbody_tr[j],'odd');
                onoff = false;
            }else{
                addClass(tbody_tr[j],'even');
                onoff = true;
            }
        }

        for (var j=0;j<tbody_tr.length;j++) {
            tbody_tr[j].oldClass = tbody_tr[j].className;
            tbody_tr[j].onmouseenter = function () {
                addClass(this,'highlight');
            }
            tbody_tr[j].onmouseout = function () {
                this.className = this.oldClass;
            }
        }
	};

	function addClass(element,value) {
	    if(!element.className) {
	        element.className = value;
	    }else{
	        element.className += ' ';
	        element.className += value;
	    }
	}

//contact
	function contact() {
		var thisForm = document.forms[0];
		var name = thisForm.getElementsByTagName('input')[0];
		var email = thisForm.getElementsByTagName('input')[1];
		var message = thisForm.getElementsByTagName('textarea')[0];

        var sub = document.getElementsByClassName('btn')[0];
			
		addEventHandler( name,'blur',isEmpty );
		addEventHandler( name,'blur',isFilled );

		addEventHandler( email,'blur',isEmpty );
		addEventHandler( email,'blur',emailFilled );

		addEventHandler( message,'blur',isEmpty );
			   
        //占位符值
        resetFields(thisForm);
        
        //提交按钮
        sub.onclick = function() {
            if (submitFormWithAjax(thisForm)) {
            	console.log('数据响应成功');
                return false;      
            }
            console.log('数据响应失败');
            return true;
        }
	};

	//占位符值
	function resetFields(whichform) {
	    if (Modernizr.input.placeholder) return;
	    for (var i=0; i<whichform.elements.length; i++) {
	        var element = whichform.elements[i];
	        if (element.type == "submit") continue;
	        if (!element.getAttribute('placeholder')) continue;
	        element.onfocus = function() {
	            if (this.value == this.getAttribute('placeholder')) {
	                this.value = "";
	            }
	        }
	        element.onblur = function() {
	            if (this.value == "") {
	                this.value = this.getAttribute('placeholder');
	            }
	        }
	        element.onblur();
	    }
	}

	//是否为空
	function isEmpty (e) {
		var obj_this = getActivatedObject (e);
		if (obj_this.value=='') {
			warn(obj_this,'empty');
		}else{
			noWarn(obj_this,'empty');
		}
	}

	//是否填写正确内容
	function isFilled (e) {
		var obj_this = getActivatedObject (e); 
		if ( /[^a-zA-Z]/.test(obj_this.value) ) {
			//输入的非空内容不符合要求
			warn(obj_this,'yesFormat');
		}else {
			//输入的非空内容符合要求
			noWarn(obj_this,'yesFormat');
		}
	}

	//邮箱格式是否正确
	function emailFilled (e) {
		var obj_this = getActivatedObject (e);
		if( !/[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(obj_this.value)&&obj_this.value!='' ){
			//输入的非空内容不符合要求
			warn(obj_this,'yesFormat');
		}else{
			//输入的非空内容符合要求		
			noWarn(obj_this,'yesFormat');
		}
	}

	//有内容
	function filled(e) {
		var obj_this = getActivatedObject (e);
		if (obj_this.value!='') {
			noWarn(obj_this,'empty');
		}
	}
	var warnings = {
		'name':{
			'empty' :'请填写内容',
			'yesFormat' :'请填写正确格式'
		},
		'email':{
			'empty' :'请填写内容',
			'yesFormat' :'请填写正确格式'
		},
		'message':{
			'empty' :'请填写内容'
		}
	};

	function warn(field,warnType) {
		var filed_parent = field.parentNode;
		var warns = eval( 'warnings.' + field.id + '.' + warnType );

		if( filed_parent.getElementsByTagName('p').length==0 ) {
			var p = document.createElement('p');
			p.appendChild( document.createTextNode(warns) );
			filed_parent.appendChild( p );
		}else{
			var p = filed_parent.getElementsByTagName('p')[0];
			p.childNodes[0].nodeValue = warns ;
		}
		document.getElementsByClassName('btn')[0].disabled = true;
	}

	function noWarn(field,warnType) {
		var btn = document.getElementsByClassName('btn')[0];
		var filed_parent = field.parentNode;
		var warns = eval( 'warnings.' + field.id + '.' + warnType );
		if(filed_parent.getElementsByTagName('p').length>0){
			var p = filed_parent.getElementsByTagName('p')[0];
			if(p.childNodes[0].nodeValue==warns) {
				filed_parent.removeChild( p );
			}
		}
		
		//当所有的输入框下面没有警告框的时候，按钮才有效
		var fieldset = document.getElementsByTagName('fieldset');
		for(var i=0;i<fieldset.length;i++) {
			var p_length = fieldset[i].getElementsByTagName('p').length;
			if(p_length>0) {
				btn.disabled = true;
				return;
			}
		}
		var name = document.getElementsByTagName('input')[0];
		var email = document.getElementsByTagName('input')[1];
		var message = document.getElementsByTagName('textarea')[0];
		
		//当必填的三项都是合法数据时,提交按钮才生效
		if(name.value&&email.value&&message.value) {
			btn.removeAttribute('disabled');
		}else{
			btn.disabled = true;
		}
	}


	//清空页面内容,显示加载图片
	function displayAjaxLoading(element) {
	    // Remove the existing content.
	    while (element.hasChildNodes()) {
	      element.removeChild(element.lastChild);
	    }
	    //  Create a loading image.
	    var content = document.createElement("img");
	    content.setAttribute("src","images/loading.gif");
	    content.setAttribute("alt","加载中...");
	    // Append the loading element.
	    element.appendChild(content);

	}
	//请求对象
	function requestObject() {
	    var xml;
	    if(window.XMLHttpRequest) {
	    	//浏览器都支持,除了ie浏览器
	        xml = new XMLHttpRequest();
	    }else{
	    	//兼容ie低版本
	        try{xml = new ActiveXObject('Msxml2.XMLHTTP.6.0');}
	        catch(e) {
	        	//兼容ie更低版本
	            try{xml = new ActiveXObject('Msxml2.XMLHTTP.3.0');}
	            catch(failed) {
	                xml=null;
	            }   
	        }
	    }
	    return xml;
	}

	//异步POST请求
	function submitFormWithAjax( whichform) {  
	    var xml = requestObject();
	    if (xml == null) { 
	    	alert("Unable to create request");
			return;
	    }
	    var data = 'name=' + whichform.getElementsByTagName('input')[0].value
					+ '&email=' + whichform.getElementsByTagName('input')[1].value
					+ '&message=' + whichform.getElementsByTagName('textarea')[0].value;
		console.log(data);

		xml.open('POST', 'submit.html', true);
		//请求头
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = function () {
			if (xml.readyState == 4) {
				if (xml.status == 200 || xml.status == 0) {
					var obj_content = whichform.parentNode;
				    while (obj_content.hasChildNodes()) {
						obj_content.removeChild(obj_content.lastChild);
				    }
					var matches = xml.responseText.match(/<div class='submit'>([\s\S]+)<\/div>/);
					if (matches.length > 0) {
						obj_content.innerHTML = matches[1];
					} else {
						obj_content.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
					}
				} else {
					obj_content.innerHTML = '<p>' + request.statusText + '</p>';
				}
			}
		};
		xml.send(data);
		return true;
	};

	function addEventHandler(obj,eventName,handler) {
	    if(document.attachEvent) {//jianrongie8及以下版本
	        obj.attachEvent('on' + eventName,handler);
	    }else{
	        obj.addEventListener(eventName,handler,false);
	    }
	}

	function getActivatedObject (e) {
	    var obj;
	    if(!e) {//ie5以下
	        obj = window.event.srcElement;
	    }else if(e.srcElement) {//ie7以下
	        obj = e.srcElement;
	    }else{//DOM level 2 浏览器
	        obj = e.target;
	    }
	    return obj;
	}








