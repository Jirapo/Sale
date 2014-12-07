$(function () {
	var init = function(){

		userInfoBind()
		publishBind()

	}

	var userInfoBind = function(){
		var $body = $('.user-form')
		 ,$table = $body.find('table')
		 ,$form = $body.find('form')
		 ,$controllers = $body.find('section')
		 ,$edit = $controllers.find('.edit')
		 ,$save = $controllers.find('.save')
		 ,$cancle = $controllers.find('.cancle')
		 ,$ps = $table.find('p')
		 ,$inputs = $table.find('input[type="text"]')
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
		}
	}

	var publishBind = function(){
		var $body = $('.goods-form')
		 ,$table = $body.find('table')
		 ,$form = $body.find('form')
		 ,$controllers = $body.find('section')
		 ,$save = $controllers.find('.save')
		 ,$cancle = $controllers.find('.cancle')
		 ,$inputs = $table.find('input[type="text"]')
		 ,$field = $table.find('.field')
		 ,$addImg = $table.find('.add-img')
		 ,$redImg = $table.find('.red-img')

		var isChanged = false

		// $field.on('change', function(){
		// 	isChanged = true
		// })
		$controllers.on('click', '.save', function(){
			var that = this;
			if ( !$body.find('input').eq(0).val()) {
				alert('商品名字必填')
				return
			}else if ( !$body.find('input').eq(1).val()) {
				alert('价格必填')
				return
			}else{
				$form.submit()
				//alert('ok')
			}
			
			// if (isChanged) {
				
				
			// }else{
			// 	alert('您还没有修改内容')
			// }
		})

		$controllers.on('click', '.cancle', function(){
			var that = this;
			$form[0].reset()
		})

		$addImg.on('click', function(){
			var that = this
			, count = $table.find('input[type="file"]').length

			$('<input>').attr({
				type: 'file',
				name:'img'
			}).prependTo('.upload')

		})

		$redImg.on('click', function(){
			var that = this
			, files = $table.find('input[type="file"]')
			, count = files.length
			
			$table.find('input[type="file"]').eq(0).detach()
			
		})

	}

	init()
})