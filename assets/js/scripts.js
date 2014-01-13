jQuery(function($)
{
	/**INIT EVENTS**/
	$("#doc-logo").one('load', function() {
	  search_adjust();
	});
	//search adjust fix
	setTimeout(function(){search_adjust();}, 100);
	var doc_url = $('#doc_path').val(),
	ajax_url = $('#doc_path').val() +'/includes/ajax.php';
	download_url = $('#doc_path').val() +'/includes/download.php';
	reader_adjust();
	pages_adjust();
	create_adjust();
	$('*[data-toggle="tooltip"]').tooltip();
	$('*[data-toggle="tooltip-left"]').tooltip({placement: 'left'});
	$('*[data-toggle="tooltip-right"]').tooltip({placement: 'right'});
	$('*[data-toggle="tooltip-bottom"]').tooltip({placement: 'bottom'});
	
	/**TRIGGERED EVENTS**/
	//loading doc effects
	$(document).on('click', '.read-menu ul li a', function() {
		$(this).css({'background': '#fff'});
		$('.md-content').css({'opacity': 0.2});
		$('.read-loader').slideDown(200);
	});
	
	//install documentator
	$(document).on('click', '#run-installer', function() {
		var $this = $(this),
		label = $(".alert-installer"),
		label_msg = $(".alert-installer .msg"),
		form = $(".installation-form");
				
		label.attr('class', 'alert alert-installer');
		
		empty = form.find("input.required").filter(function() {
			return this.value === "";
		});
		if(empty.length) {
			label_msg.text($('#fields-missing').val());
			label.attr('class', 'alert alert-installer alert-danger');
			label.slideDown(200);
			return false;
		}
		
		$this.button('loading');
		
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: 'action=install&'+$('form.installation-form').serialize(),
		 dataType: "json"
		 }).done(function(response) {
			 $this.button('reset');
			  if(response.status == 'error') {
				  	label_msg.text(response.message);
					label.attr('class', 'alert alert-installer alert-danger');
					label.slideDown(200);
					setTimeout(function(){label.slideUp(200);}, 2000);
			  }
			  else{
					label_msg.text(response.message);
					label.attr('class', 'alert alert-installer alert-success');
					label.slideDown(200);
					setTimeout(function(){window.location.replace(response.url);}, 1500);
			  }
		 });
		
	});
	
	//submit login
	$(document).on('click', '#do-login', function() {
		$('.alert-msg').attr('class', 'alert-msg');
		var $this = $(this),
		empty = $this.parent().parent().find("input").filter(function() {
			return this.value === "";
		});
		if(empty.length) {
			$('.alert-msg .alert-output').text($('.msg-fields-required').val());
			$('.alert-msg').attr('class', 'alert alert-msg alert-danger');
			$('.alert-msg').slideDown(200);
			return false;
		}
		$this.button('loading');
		
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'login', username: $('#login-username').val(), password: $('#login-password').val()},
		 dataType: "json"
		 }).done(function(response) {
			  if(response.status == 'error') {
					$('.alert-msg .alert-output').text(response.message);
					$('.alert-msg').attr('class', 'alert alert-msg alert-danger');
					$('.alert-msg').slideDown(200);
					$this.button('reset');
			  }
			  else{
					$('.alert-msg .alert-output').text(response.message);
					$('.alert-msg').attr('class', 'alert alert-msg alert-success');
					$('.alert-msg').slideDown(200);
					$this.button('reset');
					
					window.location.replace(document.referrer);
			  }
		 });
		
	});
	
	//rename folder
	$(document).on('click', '#save-folder-name', function() {
		var $this = $(this),
		label = $(".editor-saving5"),
		file = $("#md-folder").val(),
		name =  $("#new-folder-name").val();
				
		label.attr('class', 'alert alert-info editor-saving5');
		
		if(name === '') {
			label.text($('#no-name').val());
			label.attr('class', 'alert alert-danger editor-saving5');
			label.slideDown(200);
			setTimeout(function(){label.slideUp(200);}, 2000)
			return false;
		}
		
		$this.button('loading');
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'savefoldername', file: file, name: name},
		 dataType: "json"
		 }).done(function(response) {
			 $this.button('reset');
			  if(response.status == 'error') {
				  	label.attr('class', 'alert alert-danger editor-saving5');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){label.slideUp(200);}, 2000);
			  }
			  else{
					label.attr('class', 'alert alert-success editor-saving5');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){window.location.replace(response.url);}, 2000);
			  }
		 });
		
	});
	
	//delete folder
	$(document).on('click', '#delete-folder', function() {
		var $this = $(this),
		label = $(".editor-saving6"),
		file = $("#md-folder").val();
				
		label.attr('class', 'alert alert-info editor-saving6');
		
		$this.button('loading');
		
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'deletefolder', file: file},
		 dataType: "json"
		 }).done(function(response) {
			 $this.button('reset');
			  if(response.status == 'error') {
				  	label.attr('class', 'alert alert-danger editor-saving6');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){label.slideUp(200);}, 2000);
			  }
			  else{
					label.attr('class', 'alert alert-success editor-saving6');
					label.text(response.message);
					label.slideDown(200);
					setTimeout(function(){window.location.replace(response.url);}, 1500);
			  }
		 });
		
	});
	
	//download html folder zipped
	$(document).on('click', '#download-html-folder', function() {
		
		var $this = $(this),
		file = $("#md-folder").val(),
		template = $("#folder-template").val(),
		path = '';
		
		if(file != '')
			path = '&path='+ file;
		
		$this.button('loading');
				
		MyTimestamp = new Date().getTime(); // Meant to be global var
		$.get(download_url,'timestamp='+MyTimestamp+'&action=folder_html'+ path +'&template='+ template, function(){
			
			document.location.href = download_url +'?timestamp='+MyTimestamp+'&action=folder_html'+ path +'&template='+ template;
			$this.button('reset');
			
		});
	});
	
	//download md folder zipped
	$(document).on('click', '#menu-md-download-folder', function() {
		
		var $this = $(this),
		file = $("#md-folder").val(),
		path = '';
		
		if(file != '')
			path = '&path='+ file;
		
		$this.button('loading');
				
		MyTimestamp = new Date().getTime(); // Meant to be global var
		$.get(download_url,'timestamp='+MyTimestamp+'&action=folder_md'+ path, function(){
			
			document.location.href = download_url +'?timestamp='+MyTimestamp+'&action=folder_md'+ path;
			$this.button('reset');
			
		});
	});
	
	//bookmark page
	$(document).on('click', '#bookmark-doc', function() {

		var $this = $(this),
		title = document.title,
		url = document.location.href,
		bookmarks = [];
		if($.cookie('doc_bookmarks') != undefined)
			bookmarks = JSON.parse($.cookie("doc_bookmarks"));
			
		console.log(bookmarks);
		bookmarks.push(
			{ 'title' : title, 'url' : url }
		);
		
		$.removeCookie('doc_bookmarks', { path: '/' });
		$.cookie("doc_bookmarks", JSON.stringify(bookmarks), { path: '/' });
		
		console.log(bookmarks);
		
		$this.addClass('btn-bookmarked');
		$this.tooltip('destroy');
		$this.attr('title', $this.attr('data-saved'));
		$this.tooltip({placement: 'bottom'});
	
	});
	
	//unbookmark page (!Function not working in IE8- due to .filter itineration)
	$(document).on('click', '#unbookmark-doc', function() {

		var $this = $(this),
		url = document.location.href,
		bookmarks = [];
		if($.cookie('doc_bookmarks') != undefined)
			bookmarks = JSON.parse($.cookie("doc_bookmarks"));
		
		bookmarks = bookmarks.filter(function( obj ) {
			return obj.url !== url;
		});
		
		$.removeCookie('doc_bookmarks', { path: '/' });
		$.cookie("doc_bookmarks", JSON.stringify(bookmarks), { path: '/' });
		
		$this.removeClass('btn-bookmarked');
		$this.tooltip('destroy');
		$this.attr('title', $this.attr('data-saved'));
		$this.tooltip({placement: 'bottom'});
	
	});
	
	//search action
	$( "#sitewide-search" ).keypress(function(e) {
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13'){
			window.location.href = doc_url +'/search/'+ $(this).val();
		  
		}
	});
	//search action on click
	$(document).on('click', '#sitewide-search-submit', function() {
		window.location.href = doc_url +'/search/'+ $( "#sitewide-search" ).val();
	});
	
	//execute search query
	if($('.found-results').length) {
		
		var $this = $('.found-results'),
		q = $this.attr('data-search');
		
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'search', q: q},
		 dataType: "html"
		 }).done(function(response) {

			$this.html(response);
			search_adjust();
			
		 });
		
	}
	
	/**PAGE EVENTS**/
	//on screen resize
	$(window).resize(function () { 
		search_adjust();
		reader_adjust(); 
		pages_adjust();
		create_adjust();
	});
	//on page ready
	$( document ).ready(function() {
		
	});
	
	/**FUNCTIONS**/
	//adjust reader height
	function reader_adjust() {
		if($( window ).width() > 768) {
			$( '.read-menu, .read-content' ).height($( window ).height() - 100).css({'overflow-y': 'scroll'});
		}
		else {
			$( '.read-menu, .read-content' ).css({'height': 'auto'}).css({'overflow-y': 'visible'});
			
		}
	}
	//adjust pages height
	function pages_adjust() {
		if($('body > .clearfix').length <= 2)
			$('body > .clearfix').first().css({'min-height': $( window ).height() - 100 +'px'});
			
			$('.login-screen').css({'min-height': $( window ).height() - 100 +'px'});
	}
	//adjust create screen
	function create_adjust() {
		if($( window ).width() > 768) {
			$( '.create-editor, .create-preview' ).height($( window ).height() - 100);
			$( '.md-editor' ).height($( '.create-editor' ).height() - 70);
			$('.create-preview').css({'overflow-y': 'scroll'});
		}
		else {
			$( '.create-editor, .create-preview' ).height($( window ).height() - 100);
			$( '.md-editor' ).height($( '.create-editor' ).height() - 70);
		}
	}
	//adjust search bar
	function search_adjust() {
		
		var logoWidth = $('.navbar-brand').outerWidth(),
		buttonWidth = $('.navbar-toolbox').outerWidth(),
		searchWidth = $( window ).width() - logoWidth - buttonWidth - 5;
		$('.search-docs').outerWidth(searchWidth);
		//alert(logoWidth);
	}
	//getContent (transform md to html)
	function getContent(type, source, box) {
		
		$.ajax({
		 type: "POST",
		 url : ajax_url,
		 data: {action: 'content', type: type, source: source},
		 dataType: "json"
		 }).done(function(response) {
			  if(response.status == 'error') {
					
			  }
			  else{
					box.html(response.content);
			  }
		 });
		
	}
});

function checkBrowser(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    return M;
}
