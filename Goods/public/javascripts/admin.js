$(function () {
	var init = function(){

		categoryEdit()
		districtEdit()
		messageEdit()
		recencyEdit()

	}

	var inputRender = function(data,name){
		var inputHtml = '<input type="hidden" value="' 
		+ data + '" name="'
		+ name +'"/>'

		return inputHtml

	}
	var categoryEdit = function(){
		var $category = $('.category')
		var $lis = $category.find('li')
		var $form = $category.find('form')
		$lis.on('click', '.edit', function(){
			var that = this
			,id = that.parentElement.attributes['data-id'].value
			,name = "category[cid]"
			,value = that.previousElementSibling.innerText 

			$form.find('input').val(value)
			.end().prepend(inputRender(id, name))

		})

	}

	var districtEdit = function(){
		var $district = $('.district')
		var $lis = $district.find('li')
		var $form = $district.find('form')
		$lis.on('click', '.edit', function(){
			var that = this
			,id = $(that).parent().attr('data-id')
			,name = "district[did]"
			,value = $(that).siblings("b").text()

			$form.find('input').val(value)
			.end().prepend(inputRender(id, name))

		})
	}

	var recencyEdit = function(){
		var $recency = $('.recency')
		var $lis = $recency.find('li')
		var $form = $recency.find('form')
		$lis.on('click', '.edit', function(){
			var that = this
			,id = $(that).parent().attr('data-id')
			,name = "recency[rid]"
			,value = $(that).siblings("b").text()

			$form.find('input').val(value)
			.end().prepend(inputRender(id, name))

		})
	}

	var messageEdit = function(){
		var $message = $('.message')
		var $lis = $message.find('li')
		var $form = $message.find('form')
		$lis.on('click', '.edit', function(){
			var that = this
			,id = $(that).parent().parent().attr('data-id')
			,name = "message[mid]"
			,title = $(that).siblings("b").text()
			,content = $(that).parent().siblings("p").text()

			$form.find('input:eq(0)').val(title).end()
				.find('input:eq(1)').val(content).end()
				.prepend(inputRender(id, name))

		})
	}

	init()
})