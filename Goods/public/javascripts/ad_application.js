/*!
*
*  
*  创建人：
* 	创建日期：2014-09-14
*
*/

require(['jquery',
	'module/util',
	'dialog',
	'requirejs/domready!'],
	function($,util){
	var WOQI = {
			base: "/WQB2B-purchase",
			locale: "zh_CN"
		};
	  var $inputForm = $("#inputForm");
	
	// 表单验证  
	var validateRules ={
		mobile: {
			required: true,
			pattern: /^1[3|5|7|8|][0-9]{9}$/,
		},
		name:{
			required: true,  
			pattern: /^[0-9a-z_A-Z\u4e00-\u9fa5]+$/,
		}
	}
	var validate_message ={
		mobile: {
			pattern: "请按规则填写",
		},
		name:{
			pattern: "请按规则填写",
		}
	}
	
	var init  = function(){
		overlay();
		tabTool();
		bindEvent();
	};
	 $inputForm.validate({
		rules : validateRules,
		messages : validate_message,
		errorElement: 'div'

	});
	var bindEvent = function(){
		// 表单验证
		var submit=$("#submit");
		//alert($inputForm.valid());
		submit.click(function(){
		if($inputForm.valid()){
			$.ajax({
				url: WOQI.base+"/ad/submit.jhtml",
				type: "POST",
				dataType: "json",
				data:{
					name:$("#name").val(),
					mobile:$("#mobile").val(),
					dealerName:$("#dealerName").val(),
					content:$("#content").val()
				      },
				
				cache: false,
				success: function(message) {
					if (message.type == "success") {
						alert("提交申请成功！");
					} else {
						alert(message.content);
					}
				}
			});
			}
		});
	};
	var overlay = function(){
		var images = $('.position').find('.s-img');
		var wnd = $(window);  
		var left = 0, top = 0;  
		images.click(function(){
			var self = $(this);
			var img = self.next();
			var imgWidth =  img.width();
			var imgHeight = img.height();

			$('body').append('<div class="overlay-bg"></div>');
			img.wrap('<div class="overlay"></div>').removeClass('hidden');
			var $overlay = $('.overlay');

			$overlay.prepend('<div class="overlay-close">X</div>')
			var $close = $overlay.find('.overlay-close');
			left = (wnd.width() - imgWidth)/2;  
			top = (wnd.height() - imgHeight)/2;  

			$overlay.css({
			'width':imgWidth,
			'height':imgHeight,
			'top':top-100 ,
			'left' :left 
			});
			$overlay.animate({
			//  'width':imgWidth,
			//   'height':imgHeight,
			'top':top,
			//  'left' :left
			},'linear');

			$close.click(function(){
				$('.overlay-bg').detach();
				$close.detach();
				img.unwrap().addClass('hidden');
			});
		});
	}

	var tabTool =  function(){
		var $nav = $('.ad-nav');
		var $adBody = $('.ad-body');
		$nav.on('click','li',function(){
			var self = $(this);
			var index = self.index();
			self.addClass('cur').siblings().removeClass('cur');
			$adBody.addClass('hidden').eq(index).removeClass('hidden');
		})
	}

	init();

});