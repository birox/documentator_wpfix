jQuery(function($)
{
	
	var doc_url = $('#doc_path').val(),
	ajax_url = $('#doc_path').val() +'/includes/ajax.php',
	content_url = $('#doc_path').val() +'/includes/content.php';
	download_url = $('#doc_path').val() +'/includes/download.php';
	
	$(document).on('click', '#edit-bold', function() {
		$("#md-editor").surroundSelectedText("**", "**");
		change_content();
	});
	$(document).on('click', '#edit-italic', function() {
		$("#md-editor").surroundSelectedText("*", "*");
		change_content();
	});
	$(document).on('click', '#edit-quote', function() {
		$("#md-editor").surroundSelectedText(">", "");
		change_content();
	});
	$(document).on('click', '#edit-code', function() {
		$("#md-editor").surroundSelectedText("<code>", "</code>");
		change_content();
	});
	$(document).on('click', '#edit-h1, #edit-h1_1', function() {
		$("#md-editor").surroundSelectedText("#", "");
		change_content();
	});
	$(document).on('click', '#edit-h2', function() {
		$("#md-editor").surroundSelectedText("##", "");
		change_content();
	});
	$(document).on('click', '#edit-h3', function() {
		$("#md-editor").surroundSelectedText("###", "");
		change_content();
	});
	$(document).on('click', '#edit-h4', function() {
		$("#md-editor").surroundSelectedText("####", "");
		change_content();
	});
	$(document).on('click', '#edit-h5', function() {
		$("#md-editor").surroundSelectedText("#####", "");
		change_content();
	});
	$(document).on('click', '#edit-link', function() {
		$("#md-editor").focus();
		var sel = $("#md-editor").getSelection();
		$('#insertLink #selectedTitle').val(sel.start +'|'+ sel.end);
		$('#insertLink').modal('show');
	});
	$(document).on('click', '#insert-link', function() {
		
		var url = $('#insert-url').val(),
		sel = $('#selectedTitle').val(),
		sel = sel.split('|');
		
		$('#insertLink').modal('hide');
		$("#md-editor").setSelection(sel[0], sel[1]);
		$("#md-editor").surroundSelectedText("[", "]("+ url +")");
		change_content();
	});
	$(document).on('click', '#edit-image', function() {
		$("#md-editor").focus();
		var sel = $("#md-editor").getSelection();
		$('#insertImage #selectedImageTitle').val(sel.start +'|'+ sel.end);
		$('#insertImage').modal('show');
	});
	$(document).on('click', '#insert-image', function() {
		
		var url = $('#insert-image-url').val(),
		sel = $('#selectedImageTitle').val(),
		sel = sel.split('|');
		
		$('#insertImage').modal('hide');
		$("#md-editor").setSelection(sel[0], sel[1]);
		$("#md-editor").replaceSelectedText("![]("+ url +")");
		change_content();
	});
	$(document).on('click', '#edit-ulist', function() {
		var sel = $("#md-editor").getSelection(),
		list = sel.text.split('\n'),
		unlist = '';
		
		for (var i = 0; i < list.length; i++) {
          unlist += '* '+ list[i] +'\n';
        }
		
		$("#md-editor").replaceSelectedText(unlist);
		change_content();
	});
	$(document).on('click', '#edit-olist', function() {
		var sel = $("#md-editor").getSelection(),
		list = sel.text.split('\n'),
		orlist = '',
		no = 1;
		
		for (var i = 0; i < list.length; i++) {
          orlist += no +'. '+ list[i] +'\n';
		  no++;
        }
		
		$("#md-editor").replaceSelectedText(orlist);
		change_content();
	});
	$(document).on('click', '#edit-rule', function() {
		$("#md-editor").replaceSelectedText("***");
		change_content();
	});
	$(document).on('click', '#edit-date', function() {
		var date = new Date();
		$("#md-editor").replaceSelectedText((date.getMonth()+1)  + "/" + date.getDate() + "/"+ date.getFullYear() +" "+ date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds());
		change_content();
	});
	$(document).on('click', '#edit-info', function() {
		$('#MarkdownSheet').modal('show');
	});
	$(document).on('click', '#edit-reload', function() {
		change_content();
	});
	
	$(document).on('click', '#edit-save, #edit-save_1', function() {
		var $this = $(this),
		label = $(".editor-saving"),
		label_t = $(".editor-saving .output-text"),
		md = $("#md-editor").val()
		file = $("#md-file").val();
		
		label.attr('class', 'label label-default editor-saving');
		
		if(md === '') {
			label_t.text($('#no-text').val());
			label.attr('class', 'label label-danger editor-saving');
			label.show();
			setTimeout(function(){label.hide();}, 2000)
			return false;
		}
		
		label_t.text($('#saving-text').val());
		label.show();
		
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'savemd', file: file, source: encodeURI(md)},
		 dataType: "json"
		 }).done(function(response) {
			  if(response.status == 'error') {
				  	label.attr('class', 'label label-danger editor-saving');
					label_t.text($('#error-text').val());
					setTimeout(function(){label.hide();}, 2000);
			  }
			  else{
					label.attr('class', 'label label-success editor-saving');
					label_t.text($('#saved-text').val());
					setTimeout(function(){label.hide();}, 2000);
			  }
		 });
		
	});
	$(document).on('click', '#edit-saveas', function() {
		$('#saveAs').modal('show');
	});
	$(document).on('change', '#save-folder', function() {
		if($(this).val() != 'new')
			$('.folder-name').slideUp(100);
		else
			$('.folder-name').slideDown(100);
	});
	$(document).on('click', '#save-md', function() {
		var $this = $(this),
		label = $(".editor-saving2"),
		md = $("#md-editor").val()
		folder = $("#save-folder").val(),
		name =  $("#save-file-name").val();
		
		if(folder == 'new')
			folder = $('#save-fldr-name').val();
		
		label.attr('class', 'alert alert-info editor-saving2');
		
		if(md === '') {
			label.text($('#no-text').val());
			label.attr('class', 'alert alert-danger editor-saving2');
			label.slideDown(200);
			setTimeout(function(){label.slideUp(200);}, 2000)
			return false;
		}
		if(folder === '') {
			label.text($('#no-folder').val());
			label.attr('class', 'alert alert-danger editor-saving2');
			label.slideDown(200);
			setTimeout(function(){label.slideUp(200);}, 2000)
			return false;
		}
		if(name === '') {
			label.text($('#no-name').val());
			label.attr('class', 'alert alert-danger editor-saving2');
			label.slideDown(200);
			setTimeout(function(){label.slideUp(200);}, 2000)
			return false;
		}
		
		$this.button('loading');
		
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'savenewmd', folder: folder, name: name, source: encodeURI(md)},
		 dataType: "json"
		 }).done(function(response) {
			 $this.button('reset');
			  if(response.status == 'error') {
				  	label.attr('class', 'alert alert-danger editor-saving2');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){label.slideUp(200);}, 2000);
			  }
			  else{
					label.attr('class', 'alert alert-success editor-saving2');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){label.hide(); window.location.replace(response.url);}, 1500);
			  }
		 });
		
	});
	$(document).on('click', '#edit-name', function() {
		$('#fileName').modal('show');
	});
	$(document).on('click', '#save-new-name', function() {
		var $this = $(this),
		label = $(".editor-saving3"),
		file = $("#md-file").val(),
		name =  $("#new-file-name").val(),
		page = 'read';
				
		label.attr('class', 'alert alert-info editor-saving3');
		
		if($("#md-editor").length)
			page = 'create';
		
		if(name === '') {
			label.text($('#no-name').val());
			label.attr('class', 'alert alert-danger editor-saving3');
			label.slideDown(200);
			setTimeout(function(){label.slideUp(200);}, 2000)
			return false;
		}
		
		$this.button('loading');
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'savefilename', file: file, name: name, page: page},
		 dataType: "json"
		 }).done(function(response) {
			 $this.button('reset');
			  if(response.status == 'error') {
				  	label.attr('class', 'alert alert-danger editor-saving3');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){label.slideUp(200);}, 2000);
			  }
			  else{
					label.attr('class', 'alert alert-success editor-saving3');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){window.location.replace(response.url);}, 1500);
			  }
		 });
		
	});
	$(document).on('click', '#edit-delete', function() {
		$('#fileDelete').modal('show');
	});
	$(document).on('click', '#delete-file', function() {
		var $this = $(this),
		label = $(".editor-saving4"),
		file = $("#md-file").val(),
		page = 'read';
				
		label.attr('class', 'alert alert-info editor-saving4');
		
		if($("#md-editor").length)
			page = 'create';
		
		$this.button('loading');
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'deletefile', file: file, page: page},
		 dataType: "json"
		 }).done(function(response) {
			 $this.button('reset');
			  if(response.status == 'error') {
				  	label.attr('class', 'alert alert-danger editor-saving4');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){label.slideUp(200);}, 2000);
			  }
			  else{
					label.attr('class', 'alert alert-success editor-saving4');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){window.location.replace(response.url);}, 1500);
			  }
		 });
		
	});
	$(document).on('click', '#edit-html-download', function() {
		$('#fileDownload').modal('show');
	});
	$(document).on('click', '#download-html-file', function() {
		
		var $this = $(this),
		file = $("#md-file").val(),
		source = encodeURIComponent($("#md-editor").val()),
		template = $("#template").val(),
		path = '';
		
		if(file != '')
			path = '&path='+ file;
		
		$this.button('loading');
				
		MyTimestamp = new Date().getTime(); // Meant to be global var
		$.get(download_url,'timestamp='+MyTimestamp+'&action=html'+ path +'&template='+ template +'&source='+ source, function(){
			
			document.location.href = download_url +'?timestamp='+MyTimestamp+'&action=html'+ path +'&template='+ template +'&source='+ source;
			$this.button('reset');
			
		});
	});
	$(document).on('click', '#edit-md-download', function() {
		
		var $this = $(this),
		file = $("#md-file").val(),
		label = $(".editor-saving"),
		label_t = $(".editor-saving .output-text"),
		source = encodeURIComponent($("#md-editor").val()),
		template = $("#template").val(),
		path = '';
		
		if(file != '')
			path = '&path='+ file;
		
		label.attr('class', 'label label-default editor-saving');
		
		label_t.text($('#downloading-text').val());
		label.show();
				
		MyTimestamp = new Date().getTime(); // Meant to be global var
		$.get(download_url,'timestamp='+MyTimestamp+'&action=md'+ path +'&template='+ template +'&source='+ source, function(){
			
			document.location.href = download_url +'?timestamp='+MyTimestamp+'&action=md'+ path +'&template='+ template +'&source='+ source;
			label.attr('class', 'label label-success editor-saving');
			label_t.text($('#saved-text').val());
			setTimeout(function(){label.hide();}, 2000);
			
		});
	});

	
	var timer = null;
	$(document).on('keyup', '#md-editor', function() {
		clearTimeout(timer); 
		timer = setTimeout(function(){change_content();}, 500)
	});
	
	//trigger textarea submit
	function change_content() {
		getContent('string', $('#md-editor').val(), $('.output-content'));
	}
	//getContent (transform md to html)
	function getContent(type, source, box) {
		$('#edit-reload').button('loading');
		$.ajax({
		 type: "POST",
		 url : content_url,
		 data: {action: 'content', type: type, source: encodeURI(source)},
		 dataType: "json"
		 }).done(function(response) {
			  if(response.status == 'error') {
					
			  }
			  else{
					box.html(response.content);
					$('#edit-reload').button('reset');
			  }
		 });
		
	}
		
});