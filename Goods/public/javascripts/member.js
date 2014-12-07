$(function () {
	var init = function(){

		userInfoBind()
		manageBind()

	}

	var userInfoBind = function(){
		var $body = $('.user-info')
		 ,$table = $body.find('table')
		 ,$form = $body.find('form')
		 ,$controllers = $body.find('section')
		 ,$edit = $controllers.find('.edit')
		 ,$save = $controllers.find('.save')
		 ,$cancle = $controllers.find('.cancle')
		 ,$ps = $table.find('p')
		 ,$inputs = $table.find('input[type="text"]')
		 //,$radio = $table.find('div')
		 ,$field = $table.find('.field')
		 ,$select = $table.find('select')

		var isChanged = false

		$controllers.on('click', '.edit', function(){
			var that = this;
			controllersToggleClass()
			$field.on('change', function(){
				isChanged = true
			})
		})

		$controllers.on('click', '.save', function(){
			var that = this;
			controllersToggleClass()
			if (isChanged) {
				$form.submit()
			}else{
				alert('您还没有修改内容')
				$edit.trigger('click')
			}
		})

		$controllers.on('click', '.cancle', function(){
			var that = this;
			controllersToggleClass()
		})

		var controllersToggleClass = function(){
			$save.toggleClass('hidden')
			$cancle.toggleClass('hidden')
			$edit.toggleClass('hidden')
			$ps.toggleClass('hidden')
			$inputs.toggleClass('hidden')
			$select.toggleClass('hidden')
			//$radio.toggleClass('hidden')
		}
	}

	var manageBind = function(){
		var product = {"onsale":true}
		, $up = $('.up')
		, $down = $('.down')


		$up.on('click', 'span', function(){
			var that = this
			, pid = $(that).parent().attr('data-id')

			product.onsale = false
			product.pid = pid


			 $.ajax({
	        url: '/goods/save' ,
	        cache: true ,
	        type: 'post' ,
	        data: {product: product},
	        success: function(data) {
	        		if (data.product) {
	        			var html = '<li data-id="'+data.product._id+'"><span><i class="fa fa-arrow-circle-left"></i>上架</span><a href="/goods/'+data.product._id+'">'+data.product.title+'</a></li>'
	        			$(html).appendTo('.down ul')
	        			$(that).parent().detach()
	        			
	        			// $down.append($(that).parent())
	        			//<li data-id="547f2802cbfc53ec0ed02713"><a href="/goods/547f2802cbfc53ec0ed02713">山地自行车</a><span>下架<i class="fa fa-arrow-circle-right"></i></span></li>
	        		}
	          
	        }
	      })

		})

		$down.on('click', 'span', function(){
			var that = this
			, pid = $(that).parent().attr('data-id')

			product.onsale = true
			product.pid = pid

			$.ajax({
	        url: '/goods/save' ,
	        cache: true ,
	        type: 'post' ,
	        data: {product: product},
	        success: function(data) {
	        		if (data) {
	        			var html = '<li data-id="'+data.product._id+'"><a href="/goods/'+data.product._id+'">'+data.product.title+'</a><span>下架<i class="fa fa-arrow-circle-right"></i></span></li>'
	        			$(html).appendTo('.up ul')
	        			$(that).parent().detach()
	        			//$(that).parent().appendTo('.up ul')
	        		}
	          
	        }
	      })

		})
	}

	init()
})