---
layout: post
title: "How to download and open a PDF on Phonegap/Cordova"
date: 2014-03-04
tags:
- Phonegap
- Javascript
author: Peppe Bergqvist
tldr: Apparently downloading and opening a PDF in Phonegap/Cordova seems to be one of the hardest things to, but not anymore.
---

Downloading and opening a PDF in Phonegap on an Android unit seems to be opone of the hardest things you can nowadays, that and maybe copy files to my Samsung Galaxy Tab 10.1, but not any more.

There exists several threads on [Stackoverflow](http://stackoverflow.com/questions/12003441/pdf-viewer-in-phonegap-android) regarding this issue. Pre-2.1 of Phonegap you could use [this solution](http://www.giovesoft.com/2011/08/download-and-open-pdf-with-phonegap.html), posted on a spanish blog with no ability for comments. But that is broken since atleast Phonegap 2.1, so I decided to fix it. So without further ado, here it is.

1. Clone [this repo](https://github.com/byBrick/Phonegap-PDF-downloader-viewer) which contains everything you'll need.

2. Fire up in Ecplise and deploy to device

3. Hit the big link that says "Such PDF!"

There you have working example. The solution was actually pretty easy, we just use the [FileTransfer API](http://docs.phonegap.com/en/3.3.0/cordova_file_file.md.html#FileTransfer) to download the PDF, and after that we use the PdfViewer-plugin provided by Phonegap/Cordova itself.

The code itself is very simple:

	function downloadAndOpenPDF(url, fileName, folder) {
	    var fileTransfer = new FileTransfer();
	    var filePath = folder + fileName;
	
	    console.log('################# filepath');
	    console.log(filePath);
	
	    fileTransfer.download(
	        url,
	        filePath,
	        function(entry) {
	            console.log('********OK!', filePath);
	            window.plugins.pdfViewer.showPdf(filePath);
	        },
	        function (error) {
	            console.log('Failed, do something');
	            console.log(error.code);
	            console.log(error.source);
	            console.log(error.target);
	            console.log(error.http_status);
	            alert('Oh no, something went wrong');
	        }
	    );
	}
	
And then use with something like:

	<a href="#" 
		onclick="
		downloadAndOpenPDF(
			'https://github.com/byBrick/Phonegap-PDF-downloader-viewer/raw/master/assets/www/suchpdf.pdf',
			'suchpdf.pdf',
			'/sdcard/dodge-this-doge/'
		);">
		Such PDF</a>
	
This example is built against Phonegap/Cordova 2.1.0 but should will no (or very little) modifications work on 3.0 as well.