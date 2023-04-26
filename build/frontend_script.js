/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ctc-gallery-viewer/ctc_overlay.js":
/*!********************************************************!*\
  !*** ./node_modules/ctc-gallery-viewer/ctc_overlay.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ctcOverlayViewer": function() { return /* binding */ ctcOverlayViewer; }
/* harmony export */ });
/*
 * 
 * 
 * 
 * CTC Gallery Viewer
 *  images in overlay carousel and gallery written in vanilla js
 * https://ujwolbastakoti.wordpress.com/
 * MIT license
 * 
 * 
 * 
 */



class ctcOverlayViewer {

	constructor(sel, param2) {
		Array.from(document.querySelectorAll(sel)).forEach((el, i) => this.prepareGal(el, i, param2));
		window.addEventListener('resize', e => this.adjustApp(e));
		window.addEventListener('keydown', e => this.onKeyStroke(e));
		this.ssIntervalId = 0;
	}
	/*
	*Prepare gallery for viewing
	* 
	*@param gal  All of the images of agllery
	*@param param2 for future extension
	*
	*/
	prepareGal(gal, param2) {
		let imgs = Array.from(gal.querySelectorAll('img'));
		imgs.forEach((img, imgNum) => img.addEventListener('click', e => this.createOverlay(event.target, imgNum, imgs, param2)));
	}

	/*
	*Create overlay for viewing
	* 
	*@param img Iamges clicked
	*@param imgNum Number of image in gallery
	*@param gal Array of images in gallery
	*@param param2 For future extension
	*
	*/

	createOverlay(img, imgNum, gal, param2) {

		let overlayWidth = window.innerWidth + 1;
		let overlayHeight = window.innerHeight + 1;
		let alltImgWidth = 1 < gal.length ? 0.94 : 1;
		let sideBarWid = 1 < gal.length ? 0.04 : 0;

		let scrollCss = document.createElement('style');
		scrollCss.id = 'ctc-scroll-css';
		scrollCss.innerHTML = `::-webkit-scrollbar-track {background: rgba(255, 255, 255, 1);} ::-moz-scrollbar-track { background: rgba(255, 255, 255, 1);} #gal-sidebar::-webkit-scrollbar {display: none;} #gal-sidebar::-moz-scrollbar {display: none;}`;
		document.querySelector('head').appendChild(scrollCss);
		document.body.style.overflow = 'hidden';

		let overlayDivEl = document.createElement("div");
		overlayDivEl.id = "gallery-overlay";
		overlayDivEl.style = `position:fixed;height:${overlayHeight}px;width:${overlayWidth}px;background-color:rgba(0,0,0,.6);z-index:100000;top:0%;left:0%;right:0%;bottom:0%;`;
		document.body.insertBefore(overlayDivEl, document.body.firstChild);

		let closeBtn = document.createElement('span');
		closeBtn.id = "overlay-close-btn";
		closeBtn.title = "Close";
		closeBtn.innerHTML = "&#10539;";
		closeBtn.style = `cursor:pointer;position:absolute;float:right;right:3px;font-size:${0.016 * overlayWidth}px;color:rgba(255,255,255,1);text-shadow:-1px -1px 1px rgba(0,0,0,1);z-index:200000;`;
		overlayDivEl.appendChild(closeBtn);
		closeBtn.addEventListener('click', () => this.closeOverlay(overlayDivEl));

		let imgLoading = document.createElement('span');
		imgLoading.id = 'image-loading-main';
		imgLoading.style = `left:${0.992 * overlayWidth / 2};top:${overlayHeight / 2};font-size:${0.016 * overlayWidth}px;display:inline-block;position:fixed;color:rgba(255,255,255,1);`;
		imgLoading.innerHTML = 'Loading';
		overlayDivEl.appendChild(imgLoading);
		let loadingInt = setInterval(() => {
			switch (imgLoading.innerHTML) {
				case 'Loading':
					imgLoading.innerHTML = 'Loading<b>.</b>'
					break;
				case 'Loading<b>.</b>':
					imgLoading.innerHTML = 'Loading.<b>.</b>'
					break;
				case 'Loading.<b>.</b>':
					imgLoading.innerHTML = 'Loading..<b>.</b>'
					break;
				case 'Loading..<b>.</b>':
					imgLoading.innerHTML = 'Loading...<b>.</b>'
					break;
				case 'Loading...<b>.</b>':
					imgLoading.innerHTML = 'Loading<b>.</b>'
					break;
			}
		}, 350);

		let imgEl = document.createElement('img');
		let loadedImg = new Image();
		loadedImg.src = img.src;
		imgEl.id = 'loaded-img';
		imgEl.src = img.src;
		imgEl.style.display = 'none';
		let opImgDim = this.getOptimizedImageSize(overlayWidth, overlayHeight, loadedImg.width, loadedImg.height, gal.length);

		loadedImg.addEventListener('load', (event) => {
			clearInterval(loadingInt);
			imgLoading.style.display = 'none';
			imgEl.style = `z-index:180000;height:${opImgDim.height}px;width:${opImgDim.width}px;display:inline-block;margin:${((overlayHeight - opImgDim.height) / 2)}px ${(((alltImgWidth * overlayWidth) - opImgDim.width) / 2)}px;`;
			imgEl.title = undefined != img.getAttribute('title') || null != img.getAttribute('title') ? img.getAttribute('title') : '';
		});
		overlayDivEl.appendChild(imgEl);

		let imgTitleDiv = document.createElement("div");
		imgTitleDiv.id = "img-title-info";
		imgTitleDiv.style = `z-index:195000;position:fixed;text-align:center;height:${0.02 * overlayHeight}px;width:${opImgDim.width}px;bottom:1px;color:rgba(255,255,255,1);font-size:${0.015 * overlayHeight};left:${(sideBarWid * overlayWidth) + (((alltImgWidth * overlayWidth) - opImgDim.width) / 2)}px;`;
		imgTitleDiv.innerHTML = undefined != img.getAttribute('title') || null != img.getAttribute('title') ? img.getAttribute('title') : '';
		overlayDivEl.appendChild(imgTitleDiv);

		if (1 < gal.length) {
			this.createToolbar(overlayDivEl, gal, imgEl, imgNum, param2);
			this.createSidebar(overlayDivEl, gal, imgEl, imgNum, param2);
			imgEl.addEventListener('click', e => {
				if (e.offsetX > (e.target.offsetWidth / 2)) {
					document.querySelector('#gal-next-img').click();
				} else {
					document.querySelector('#gal-prev-img').click();
				}
			});
		}
	}

	/*
	*Create toolbar 
	* 
	*@param overlayDivEl Overlay div element
	*@param gal Array of images in gallery
	*@param imgEl Image element in overlay
	*@param imgNum Number of image in gallery
	*@param param2 For future extension
	*
	*/
	createToolbar(overlayDivEl, gal, imgEl, imgNum, param2) {
		let toolbarDiv = overlayDivEl.querySelector('#toolbar-div');
		let ovWidth = overlayDivEl.offsetWidth;
		let ovHeight = overlayDivEl.offsetHeight;
		let nxtImg = gal.length - 1 >= imgNum + 1 ? imgNum + 1 : 0;
		let prevImg = 0 <= imgNum - 1 ? imgNum - 1 : gal.length - 1;
		let btnStyle = `font-family:serif;height:${0.02 * ovWidth}px;width:${0.02 * ovWidth}px;text-align:center;font-size:${0.016 * ovWidth}px;cursor:pointer;color:rgba(255,255,255,1);border-radius:${0.02 * ovWidth}px;margin-top:${0.002 * ovWidth}px;background-color:rgba(0,0,0,0.8);`;

		if (undefined == toolbarDiv) {
			let toolbarDiv = document.createElement('div');
			toolbarDiv.id = 'toolbar-div';
			toolbarDiv.style = `top:${(ovHeight / 1.6) - (0.077 * ovWidth)}px;float:right; transform: translateY(-50%); right: 0px;display: inline-block;position: fixed;`;

			let prevBtn = document.createElement('div');
			prevBtn.id = 'gal-prev-img';
			prevBtn.style = btnStyle;
			prevBtn.innerHTML = '&#60;';
			prevBtn.title = 'Previous image';
			prevBtn.addEventListener('click', e => this.loadImg(parseInt(e.target.getAttribute('data-img-num')), gal, overlayDivEl, imgEl));
			prevBtn.setAttribute('data-img-num', prevImg);
			prevBtn.addEventListener('mouseenter', e => e.target.style.fontWeight = 'bolder');
			prevBtn.addEventListener('mouseleave', e => e.target.style.fontWeight = '');
			toolbarDiv.insertBefore(prevBtn, toolbarDiv.firstChild);

	

			let zoomInBtn = document.createElement('div');
			zoomInBtn.id = 'img-zoom-in';
			zoomInBtn.style = btnStyle;
			zoomInBtn.innerHTML = '&#43;';
			zoomInBtn.title = 'Zoom in';
			zoomInBtn.addEventListener('click', () => imgEl.style.transform = 0 === imgEl.style.transform.length ? `scale(1.2)` : `scale(${parseFloat(imgEl.style.transform.replace('scale(', '').replace(')', '')) + 0.2})`);
			zoomInBtn.addEventListener('mouseenter', e => e.target.style.fontWeight = 'bolder');
			zoomInBtn.addEventListener('mouseleave', e => e.target.style.fontWeight = '');
			toolbarDiv.appendChild(zoomInBtn);

		

			let zoomOutBtn = document.createElement('div');
			zoomOutBtn.id = 'img-zoom-out';
			zoomOutBtn.style = btnStyle;
			zoomOutBtn.innerHTML = '&#8722;';
			zoomOutBtn.title = 'Zoom out';
			zoomOutBtn.addEventListener('click', () => {
				let zoom = parseFloat(imgEl.style.transform.replace('scale(', '').replace(')', '')) - 0.2;
				let scale = 0 > zoom ? 0.1 : zoom;
				imgEl.style.transform = 0 === imgEl.style.transform.length ? `scale(0.8)` : `scale(${scale})`
			});
			zoomOutBtn.addEventListener('mouseenter', e => e.target.style.fontWeight = 'bolder')
			zoomOutBtn.addEventListener('mouseleave', e => e.target.style.fontWeight = '');
			toolbarDiv.appendChild(zoomOutBtn);

			let nextBtn = document.createElement('div');
			nextBtn.id = 'gal-next-img';
			nextBtn.style = btnStyle;
			nextBtn.innerHTML = '&#62;';
			nextBtn.title = 'Next image';
			nextBtn.addEventListener('click', e => this.loadImg(parseInt(e.target.getAttribute('data-img-num')), gal, overlayDivEl, imgEl));
			nextBtn.setAttribute('data-img-num', nxtImg)
			nextBtn.addEventListener('mouseenter', e => e.target.style.fontWeight = 'bolder');
			nextBtn.addEventListener('mouseleave', e => e.target.style.fontWeight = '');
			toolbarDiv.appendChild(nextBtn);
			overlayDivEl.appendChild(toolbarDiv);

		} else {

			let imgLoading = overlayDivEl.querySelector('#image-loading-main');
			if (undefined != imgLoading) {
				overlayDivEl.removeChild(imgLoading);
			}
			toolbarDiv.querySelector('#gal-prev-img').setAttribute('data-img-num', prevImg);
			toolbarDiv.querySelector('#gal-next-img').setAttribute('data-img-num', nxtImg)
		}
	}


	/*
	*Create sidebar of images
	* 
	*@param overlayDivEl Overlay div element
	*@param gal Array of images in gallery
	*@param imgEl Image element in overlay
	*@param imgClicked Image cliecked to trigger overlay
	*@param param2 For future extension
	*
	*/

	createSidebar(overlayDiv, gal, imgEl, imgClicked, param2) {
		let sidebar = document.createElement('div');
		sidebar.id = `gal-sidebar`;
		sidebar.style = `overflow-y:auto;tex-align:center;display:inline-block;width:${0.04 * overlayDiv.offsetWidth}px;height:${overlayDiv.offsetHeight}px;float:left;left:0;background-color:rgba(0,0,0,0.1);z-index:105000;`;
		overlayDiv.appendChild(sidebar);

		let sidebarImgStyle = `overflow-x: hidden;transition: width 0.5s, height 0.5s;cursor:pointer;background-color:rgba(255,255,255,1);width:93%;height:${0.93 * sidebar.offsetWidth}px;border:1px dotted rgba(0,0,0,0.8);background-repeat: no-repeat;background-size:contain;background-position: center;text-align:center;color:rgba(0,0,0,1);font-size:${0.6 * sidebar.offsetWidth}px;`;
		gal.map((img, i) => {

			let imgPrev = new Image();
			imgPrev.src = img.src;

			let sidebarImg = document.createElement('div');
			sidebarImg.classList.add('img-preview');
			sidebarImg.title = undefined != img.getAttribute('title') || null != img.getAttribute('title') ? img.getAttribute('title') : '';
			sidebarImg.style = sidebarImgStyle;
			sidebarImg.addEventListener('mouseenter', event => event.target.style.borderRadius = '12%');
			sidebarImg.addEventListener('mouseleave', event => event.target.style.borderRadius = '5%');
			sidebarImg.innerHTML = `<b>.</b>`;
			sidebar.appendChild(sidebarImg);
			let rotateInterval = setInterval(() => {
				switch (sidebarImg.innerHTML) {
					case '<b>.</b>':
						sidebarImg.innerHTML = '<b>.</b>.'
						break;
					case '<b>.</b>.':
						sidebarImg.innerHTML = '.<b>.</b>.'
						break;
					case '.<b>.</b>.':
						sidebarImg.innerHTML = '...<b>.</b>'
						break;
					case '...<b>.</b>':
						sidebarImg.innerHTML = '<b>.</b>'
						break;
					default:
				}
			}, 250);

			imgPrev.addEventListener('load', e => {
				clearInterval(rotateInterval);
				sidebarImg.innerHTML = '';
				sidebarImg.style.backgroundImage = `url('${e.target.src}')`;
			});

			sidebarImg.addEventListener('click', () => this.loadImg(i, gal, overlayDiv, imgEl));
		});

		this.scrollToPrev(imgClicked);
		sidebar.style.paddingTop = 0 < (overlayDiv.offsetHeight - (gal.length * ((0.93 * sidebar.offsetWidth) + 2))) / 2 ? `${(overlayDiv.offsetHeight - (gal.length * ((0.93 * sidebar.offsetWidth) + 2))) / 2}px` : `0px`;
	}

	/*
	*Load image clicked on sidebar
	* 
	*@param imgNum Number of image on gallery
	*@param gal Array of images in gallery
	*@param overlayDiv Overlay div element
	*@param imgEl Image element in overlay
	*
	*/
	loadImg(imgNum, gal, overlayDiv, imgEl) {

		var clickedImg = new Image();
		clickedImg.src = gal[imgNum].src;
		imgEl.src = gal[imgNum].src;
		imgEl.style.display = 'none';

		let imgLoading = document.createElement('span');
		imgLoading.id = 'image-loading-main';
		imgLoading.style = `left:${0.992 * overlayDiv.offsetWidth / 2};top:${overlayDiv.offsetHeight / 2};font-size:${0.016 * overlayDiv.offsetWidth}px;display:inline-block;position:fixed;color:rgba(255,255,255,1);`;
		imgLoading.innerHTML = 'Loading';
		overlayDiv.appendChild(imgLoading);

		let loadingInt = setInterval(() => {
			switch (imgLoading.innerHTML) {
				case 'Loading':
					imgLoading.innerHTML = 'Loading<b>.</b>'
					break;
				case 'Loading<b>.</b>':
					imgLoading.innerHTML = 'Loading.<b>.</b>'
					break;
				case 'Loading.<b>.</b>':
					imgLoading.innerHTML = 'Loading..<b>.</b>'
					break;
				case 'Loading..<b>.</b>':
					imgLoading.innerHTML = 'Loading...<b>.</b>'
					break;
				case 'Loading...<b>.</b>':
					imgLoading.innerHTML = 'Loading<b>.</b>'
					break;
				default:
			}
		}, 350);

		let opImgDim = this.getOptimizedImageSize(overlayDiv.offsetWidth, overlayDiv.offsetHeight, clickedImg.width, clickedImg.height, gal.length);
		clickedImg.addEventListener('load', () => {
			clearInterval(loadingInt);
			imgLoading.style.display = 'none';
			imgEl.style = `z-index:180000;height:${opImgDim.height}px;width:${opImgDim.width}px;display:inline-block;margin:${((overlayDiv.offsetHeight - opImgDim.height) / 2)}px ${(((0.94 * overlayDiv.offsetWidth) - opImgDim.width) / 2)}px;`;
			imgEl.title = undefined != gal[imgNum].getAttribute('title') || null != gal[imgNum].getAttribute('title') ? gal[imgNum].getAttribute('title') : '';
		});
		let titleEl = document.querySelector('#img-title-info');
		titleEl.style.overflow == 'hidden';
		titleEl.innerHTML = undefined != gal[imgNum].getAttribute('title') || null != gal[imgNum].getAttribute('title') ? gal[imgNum].getAttribute('title') : '';
		titleEl.style.width = opImgDim.width + 'px';
		titleEl.style.left = (0.04 * overlayDiv.offsetWidth) + (((0.94 * overlayDiv.offsetWidth) - opImgDim.width) / 2) + 'px';
		this.createToolbar(overlayDiv, gal, imgEl, imgNum);
		this.scrollToPrev(imgNum);
	}

	/*
	*Scroll loaded image on side bar
	* 
	*@param imgNum Number of image on gallery
	*
	*/
	scrollToPrev(imgNum) {
		Array.from(document.querySelectorAll('.img-preview')).forEach((prev, i) => {

			if (i === imgNum) {
				prev.scrollIntoView({ block: "center" });
				prev.style.border = `1px solid rgba(255, 0, 0, 0.8)`;

			} else {
				prev.style.border = `1px solid rgba(0,0,0,0.8)`;
			}
		});
	}

	/*
	*Adjust element dimension on resize
	* 
	*@param e Resize event
	*
	*/

	adjustApp(e) {
		let overlayWidth = window.innerWidth;
		let overlayHeight = window.innerHeight;
		let overlayDiv = document.querySelector('#gallery-overlay');

		if (undefined != overlayDiv) {
			let closeBtn = overlayDiv.querySelector('#overlay-close-btn');
			overlayDiv.style.height = `${overlayHeight}px`;
			overlayDiv.style.width = `${overlayWidth}px`;
			closeBtn.style.fontSize = `${0.016 * overlayWidth}`;
			let loadedImg = document.querySelector('#loaded-img');
			let sidebarDiv = document.querySelector('#gal-sidebar');
			let imgCount = undefined != sidebarDiv ? 2 : 1;
			let alltImgWidth = undefined != sidebarDiv ? 0.94 : 1;
			let sideBarWid = undefined != sidebarDiv ? 0.04 : 0;

			let imgLoading = overlayDiv.querySelector('#image-loading-main');
			imgLoading.style.left = `${0.992 * overlayWidth / 2}`;
			imgLoading.style.top = `${overlayHeight / 2}`;
			imgLoading.style.fontSize = `${0.016 * overlayWidth}px`

			let bufferImg = new Image();
			bufferImg.src = loadedImg.src;
			let opImgDim = this.getOptimizedImageSize(overlayWidth, overlayHeight, bufferImg.width, bufferImg.height, imgCount);
			let imgDisplay = loadedImg.style.display;
			loadedImg.style = `height:${opImgDim.height}px;width:${opImgDim.width}px;display:${imgDisplay};margin:${((overlayHeight - opImgDim.height) / 2)}px ${(((alltImgWidth * overlayWidth) - opImgDim.width) / 2)}px;`;

			let titleEl = document.querySelector('#img-title-info');
			titleEl.style.overflow = 'hidden';
			titleEl.style.width = opImgDim.width + 'px';
			titleEl.style.height = (0.02 * overlayHeight) + 'px';
			titleEl.style.left = (sideBarWid * overlayWidth) + (((alltImgWidth * overlayWidth) - opImgDim.width) / 2) + 'px';
			titleEl.style.fontSize = 0.015 * overlayHeight + 'px';

			if (undefined != sidebarDiv) {
				let sidebarImgs = Array.from(sidebarDiv.querySelectorAll('div'));
				sidebarDiv.style.height = overlayHeight + 'px';
				sidebarDiv.style.width = (0.04 * overlayWidth) + 'px';
				sidebarDiv.style.paddingTop = 0 < (overlayHeight - (sidebarImgs.length * ((0.93 * sidebarDiv.offsetWidth) + 2))) / 2 ? `${(overlayHeight - (sidebarImgs.length * ((0.93 * sidebarDiv.offsetWidth) + 2))) / 2}px` : '0px';
				sidebarImgs.map(y => {
					y.style.height = (0.93 * sidebarDiv.offsetWidth) + 'px';
					y.style.fontSize = `${0.6 * sidebarDiv.offsetWidth}px`;
				});

				let toolbarDiv = overlayDiv.querySelector('#toolbar-div');
				toolbarDiv.style = `top:${(overlayHeight / 1.8) - (0.077 * overlayWidth)}px;float:right;right: 0px;display: inline-block;position: fixed;`;
				Array.from(toolbarDiv.querySelectorAll('div')).map(x => {
					x.style.height = `${0.02 * overlayWidth}px`;
					x.style.width = `${0.02 * overlayWidth}px`;
					x.style.borderRadius = `${0.02 * overlayWidth}px`;
					x.style.marginTop = `${0.002 * overlayWidth}px`;
					x.style.fontSize = 'gal-slide-show' != x.id ? `${0.016 * overlayWidth}px` : `${0.011 * overlayWidth}px`;
				});

			}


		}
	}

	/*
	*Destroy overlay viewer
	* 
	*Static no parameter
	*
	*/

	closeOverlay(overlayEl) {
		let slideShowEl = overlayEl.querySelector('#gal-slide-show');

		if (null != slideShowEl && 0 < parseInt(slideShowEl.getAttribute('data-interval-id'))) {
			clearInterval(parseInt(slideShowEl.getAttribute('data-interval-id')));
		}
		document.body.removeChild(overlayEl);
		document.body.style.overflow = '';
		document.body.style.margin = ''
		document.querySelector('head').removeChild(document.querySelector('#ctc-scroll-css'));
	}

	/*
	*Optimize image dimension for viewing 
	* 
	*@param scrnWd Window's inner width
	*@param scrnHt Window's inner height
	*@param imgActWd Original width of image
	*@param imgActHt Original height of image
	*@param imgCount Toal count of images in gallery
	*
	*/

	getOptimizedImageSize(scrnWd, scrnHt, imgActWd, imgActHt, imgCount) {

		let imgScrnHtRatio = 0, imgScrnWdRatio = 0, optImgHt = 0, optImgWd = 0;
		let imgPercent = undefined != imgCount && 1 < imgCount ? 0.93 : 0.955;
		let marginPercent = 1 - imgPercent;
		if ((imgActWd >= scrnWd) && (imgActHt >= scrnHt)) {
			if (imgActWd >= imgActHt) {
				if (imgActWd > imgActHt) {
					imgScrnWdRatio = imgActWd / scrnWd;
					optImgWd = (imgActWd / imgScrnWdRatio) - (marginPercent * scrnWd);
					optImgHt = imgActHt * (optImgWd / imgActWd);
					if (optImgHt >= (imgPercent * scrnHt)) {
						imgScrnHtRatio = scrnHt / imgActHt;
						optImgHt = imgActHt * imgScrnHtRatio - (marginPercent * scrnHt);
						optImgWd = imgActWd * (optImgHt / imgActHt);
					}
				} else {
					if (scrnWd > scrnHt) {
						optImgHt = (imgPercent * scrnHt);
						optImgWd = optImgHt;
					} else if (scrnHt > scrnWd) {
						optImgWd = (imgPercent * scrnWd);
						optImgHt = optImgWd;
					} else {
						imgScrnHtRatio = scrnHt / imgActHt;
						optImgHt = imgActHt * imgScrnHtRatio - (marginPercent * scrnHt);
						optImgWd = imgActWd * (optImgHt / imgActHt);
					}
				}
			} else {
				imgScrnHtRatio = imgActHt / scrnHt;
				optImgHt = (imgActHt / imgScrnHtRatio) - (marginPercent * scrnHt);
				optImgWd = imgActWd * (optImgHt / imgActHt);
			}

		} else if (imgActWd >= scrnWd && imgActHt < scrnHt) {
			imgScrnWdRatio = scrnWd / imgActWd;
			optImgWd = imgActWd * imgScrnWdRatio - (marginPercent * scrnWd);
			optImgHt = imgActHt * (optImgWd / imgActWd);
		} else if (imgActHt >= scrnHt && imgActWd < scrnWd) {
			imgScrnHtRatio = scrnHt / imgActHt;
			optImgHt = imgActHt * imgScrnHtRatio - (marginPercent * scrnHt);
			optImgWd = imgActWd * (optImgHt / imgActHt);
			optImgHt = imgActHt * (optImgWd / imgActWd);
		} else {
			let avlImgWd = imgPercent * scrnWd;
			let avlImgHt = imgPercent * scrnHt;
			if (imgActWd >= avlImgWd && imgActHt >= avlImgHt) {
				let imgAvlWdRatio = avlImgWd / imgActWd;
				imgAvlHtRatio = avlImgHt / imgActHt;
				optImgWd = avlImgWd * imgAvlWdRatio;
				optImgHt = scrnHt * imgScrnHtRatio;
			} else if (imgActWd >= avlImgWd && imgActHt < avlImgHt) {
				let imgAvlWdRatio = avlImgWd / imgActWd;
				optImgWd = imgActWd * imgAvlWdRatio;
				optImgHt = imgActHt * (optImgWd / imgActWd);
			} else if (imgActHt >= avlImgHt && imgActWd < avlImgWd) {
				let imgAvlHtRatio = avlImgHt / imgActHt;
				optImgHt = imgActHt * imgAvlHtRatio;
				optImgWd = imgActWd * (optImgHt / imgActHt);
			} else {
				optImgWd = imgActWd;
				optImgHt = imgActHt;
			}
			optImgHt = imgActHt * (optImgWd / imgActWd);
		}


		//at last check it optimized width is still large			
		if (optImgWd > (imgPercent * scrnWd)) {
			optImgWd = imgPercent * scrnWd;
			optImgHt = imgActHt * (optImgWd / imgActWd);
		}
		return {
			width: optImgWd,
			height: optImgHt
		};
	}

	/*
	*Handle keystroke event
	* 
	*@param e Key stroke event
	*
	*/

	onKeyStroke(event) {
		let overlayDiv = document.querySelector('#gallery-overlay');
		if (undefined != overlayDiv) {
			switch (event.code) {

				case 'ArrowUp':
					document.querySelector('#img-zoom-in').click();
					break;
				case 'ArrowDown':
					document.querySelector('#img-zoom-out').click();
					break;
				case 'ArrowLeft':
					document.querySelector('#gal-prev-img').click();
					break;
				case 'ArrowRight':
					document.querySelector('#gal-next-img').click()
					break;
				case 'Escape':
					overlayDiv.querySelector('#overlay-close-btn').click();
					break;
			}
		}
	}


}

/***/ }),

/***/ "./node_modules/ctcl-image-gallery/ctcl-image-gallery.js":
/*!***************************************************************!*\
  !*** ./node_modules/ctcl-image-gallery/ctcl-image-gallery.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ctclImgGal": function() { return /* binding */ ctclImgGal; }
/* harmony export */ });
class ctclImgGal{


    constructor(elems,opt){

        Array.from(document.querySelectorAll(elems)).map(x=>this.createGal(x, opt));

    }


    createGal(el,opt){

        el.classList.add('ctclig-image-list');

      
        let mainImgDiv =  document.createElement('div');
        mainImgDiv.classList.add('ctclig-main-image');
        mainImgDiv.style.height = `${opt.mainImgHt}px`;
        mainImgDiv.style.width =`${opt.mainImgWd}px`;
        mainImgDiv.style.backgroundImage = `url("${el.querySelector('img').src}")`;
        el.insertBefore(mainImgDiv,el.querySelector('img'));

      
        let carouselDiv =  document.createElement('div');
        carouselDiv.style.width = `${opt.imgGal.length * 76}px`;
        carouselDiv.style.marginLeft = 'auto';
        carouselDiv.style.marginRight = 'auto';
        carouselDiv.style.display = 'block';
        
        let carouselDivCont = document.createElement('div')
        carouselDivCont.style.width = `${opt.mainImgWd}px`,
        carouselDivCont.style.overflowX = 'scroll';
        carouselDivCont.style.overflowY = "hidden"
        carouselDivCont.style.marginLeft = 'auto';
        carouselDivCont.style.marginRight = 'auto';
        carouselDivCont.style.display = 'block';

        carouselDivCont.appendChild(carouselDiv);

        el.insertBefore(carouselDivCont,el.querySelector('img'));

            Array.from(el.querySelectorAll('img')).map(y => {
                let galImg =  document.createElement('img');
                galImg.src =  y.src;
                galImg.style.border =  '1px solid rgba(0,0,0,1)';
                galImg.style.width = '70px';
                galImg.style.height = '70px';
                galImg.style.margin = '2px';
                
                galImg.addEventListener('mouseover', e => {
                    el.querySelector('.ctclig-main-image').style.backgroundImage = `url("${e.target.src}")`;
                })

                y.style.display = 'none';
                carouselDiv.appendChild(galImg)

            
            });
    }

}


/***/ }),

/***/ "./node_modules/images-carousel/image-carousel.js":
/*!********************************************************!*\
  !*** ./node_modules/images-carousel/image-carousel.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "imageCarousel": function() { return /* binding */ imageCarousel; }
/* harmony export */ });
/*
 * 
 * 
 * 
 * Image carousel
 *  Images  carousel library written in vanilla js
 * https://ujwolbastakoti.wordpress.com/
 * MIT license
 * 
 * 
 * 
 */

class imageCarousel{
    constructor(sel,param1){
        Array.from(document.querySelectorAll(sel)).map((x,i)=>this.prepCarousel(x , i, param1))
    }

    /*
    * Prepare carousel 
    *
    *@param gal Image gallery object
    *@param galNum gallery number
    *@param param1 Additional settings for carousel
    *
    */
    prepCarousel(gal,galNum,param1){ 

      
        let maxWidth = gal.offsetWidth;
        let maxHeight = gal.offsetHeight;
        let carDivsObj = {};


        let imgs = Array.from(gal.querySelectorAll('img'));
        imgs.map((x,i)=>x.style.display ='none')
         
        let prevThreeDiv =  document.createElement('div');
             prevThreeDiv.style = `width:${(0.42)*maxWidth}px;height:${0.7*maxHeight}px;z-index:400;display:inline-block;position:absolute;margin-top:${0.15*maxHeight}px;margin-left:0px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 5px 10px 2px black;`;
             carDivsObj.prevThree = prevThreeDiv,
             gal.appendChild( prevThreeDiv);

        let prevTwoDiv =  document.createElement('div');
             prevTwoDiv.style = `width:${(0.49)*maxWidth}px;height:${0.8*maxHeight}px;z-index:500;display:inline-block;position:absolute;margin-top:${0.1*maxHeight}px;margin-left:${0.06*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 10px 15px 2px black;`;
             carDivsObj.prevTwo = prevTwoDiv,
             gal.appendChild( prevTwoDiv);

        let prevOneDiv =  document.createElement('div');
             prevOneDiv.style = `width:${(0.63)*maxWidth}px;height:${0.9*maxHeight}px;z-index:700;display:inline-block;position:absolute;margin-top:${0.05*maxHeight}px;margin-left:${0.14*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 15px 20px 2px black;`;
             carDivsObj.prevOne = prevOneDiv;  
             gal.appendChild( prevOneDiv);
         
        let mainDiv =  document.createElement('div');
             mainDiv.style = `width:${0.52*maxWidth}px;height:${maxHeight}px;z-index:1000;display:inline-block;position:absolute;margin-top:0px;margin-left:${0.24*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:contain;box-shadow:0px 20px 25px 2px black;`;
             carDivsObj.mainDiv=mainDiv;
             gal.appendChild( mainDiv);

        let nextOneDiv =  document.createElement('div');
            nextOneDiv.style = `width:${(0.63)*maxWidth}px;height:${0.9*maxHeight}px;z-index:700;display:inline-block;position:absolute;margin-top:${0.05*maxHeight}px;margin-left:${0.24*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 15px 20px 2px black;`;
            carDivsObj.nextOne = nextOneDiv;
            gal.appendChild( nextOneDiv);

        let nextTwoDiv =  document.createElement('div');
            nextTwoDiv.style = `width:${(0.49)*maxWidth}px;height:${0.8*maxHeight}px;z-index:500;display:inline-block;position:absolute;margin-top:${0.1*maxHeight}px;margin-left:${0.45*maxWidth}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 10px 15px 2px black;`;
            carDivsObj.nextTwo=nextTwoDiv;
            gal.appendChild( nextTwoDiv);


        let nextThreeDiv =  document.createElement('div');
            nextThreeDiv.style = `width:${(0.42)*maxWidth}px;height:${0.7*maxHeight}px;z-index:400;display:inline-block;position:absolute;margin-top:${0.15*maxHeight}px;margin-left:${0.58*maxWidth};background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 5px 10px 2px black;`;
            carDivsObj.nextThree = nextThreeDiv,
            gal.appendChild( nextThreeDiv);    


            this.createCarousel(0,imgs,carDivsObj,galNum,param1);

            for (let i in carDivsObj){
                if ('mainDiv' != i){
                    carDivsObj[i].addEventListener('click', event=>this.createCarousel(parseInt(event.target.getAttribute('data-num')), imgs, carDivsObj,galNum, param1 ));
                    carDivsObj[i].addEventListener('mouseenter', event=>event.target.style.border ='1px dotted rgba(0,0,0,0)')
                    carDivsObj[i].addEventListener('mouseleave', event=>event.target.style.border ='')
                    
                }
            }

            if(undefined != param1  && 'function' == typeof(param1.callBack)){
           
                param1.callBack(gal);
    
        } 

            window.addEventListener('resize', ()=>this.adjustOnResize(gal, carDivsObj,galNum)) 
    }
    /*
    * Create carousel 
    *
    *@param i Image number
    *@param gal Image gallery object
    *@param carDivs Carousel divs object
    *@param galNum Gallery number
    *@param param1 Additional settings for carousel
    *
    */
    createCarousel(i,gal,carDivs, galNum, param1){

        let prevThreeNum ; 
            if(i == 0){prevThreeNum  =  gal.length-3}
            else if(i == 1){prevThreeNum  = gal.length-2}
            else if(i == 2){prevThreeNum  = gal.length-1}
            else{prevThreeNum  = i-3}


        let prevTwoNum ;
            if(i == 0){prevTwoNum =  gal.length-2}
            else if(i == 1){prevTwoNum = gal.length-1}
            else{prevTwoNum = i-2}


        let prevOneNum ;
            if(i == 0){prevOneNum =  gal.length-1}
            else{prevOneNum  = i-1} 

        let nextOneNum ;
            if(i == gal.length-1){nextOneNum = 0}
            else{nextOneNum = i+1} 


        let nextTwoNum;
            if(i == gal.length-1){nextTwoNum= 1}
            else if(i == gal.length-2){nextTwoNum= 0}
            else{nextTwoNum = i+2}

        let nextThreeNum;
            if(i == gal.length-1){nextThreeNum= 2}
            else if(i == gal.length-2){nextThreeNum= 1}
            else if(i == gal.length-3){nextThreeNum= 0}
            else{nextThreeNum = i+3}   
       

        carDivs.prevThree.style.backgroundImage = `url('${gal[prevThreeNum ].src}')`; 
        carDivs.prevThree.title = undefined != gal[prevThreeNum].title ? gal[prevThreeNum].title:'';
        carDivs.prevThree.setAttribute('data-num',prevThreeNum)    

        carDivs.prevTwo.style.backgroundImage = `url('${gal[prevTwoNum ].src}')`; 
        carDivs.prevTwo.title = undefined != gal[prevTwoNum].title ? gal[prevTwoNum].title:'';
        carDivs.prevTwo.setAttribute('data-num',prevTwoNum)

        carDivs.prevOne.style.backgroundImage = `url('${gal[prevOneNum].src}')`; 
        carDivs.prevOne.title = undefined != gal[prevOneNum].title ? gal[prevOneNum].title:'';
        carDivs.prevOne.setAttribute('data-num',prevOneNum)  

        let mainImg = new Image();
            mainImg.src  = gal[i].src;
            mainImg.title =  undefined != gal[i].title ? gal[i].title:''; 

            carDivs.mainDiv.style.backgroundImage = `url('')`;

        let loadingDivCir=   carDivs.mainDiv.querySelector('#img-loading-'+galNum); 

         if(null == loadingDivCir){
                    
                loadingDivCir =  document.createElement('div');
                loadingDivCir.id = `img-loading-${galNum}`;
                loadingDivCir.style = `margin-left:${(carDivs.mainDiv.offsetWidth-40)/2}px;margin-top:${(carDivs.mainDiv.offsetHeight-40)/2}px;height:40px;width:40px;border-radius:50%;border-color:rgba(255,255,255,1);border-style: solid; border-width: 3px;z-index:1100; `;
                loadingDivCir.setAttribute('data-wait','left');
                carDivs.mainDiv.appendChild(loadingDivCir);

            var loadingInt = setInterval(()=>{
                switch( loadingDivCir.getAttribute('data-wait')){
                    case 'left': 
                        loadingDivCir.setAttribute('data-wait','top');
                        loadingDivCir.style.borderColor = 'rgba(255,255,255,0.5)';
                        loadingDivCir.style.borderTop = '3px solid  rgba(255,255,255,0.8)';
                    break;
                    case 'top':
                            loadingDivCir.setAttribute('data-wait','right');
                            loadingDivCir.style.borderColor = 'rgba(255,255,255,0.5)';
                            loadingDivCir.style.borderRight = '3px solid  rgba(255,255,255,0.8)';
                    break;
                    case 'right':
                            loadingDivCir.setAttribute('data-wait','bottom');
                            loadingDivCir.style.borderColor = 'rgba(255,255,255,0.5)';
                            loadingDivCir.style.borderBottom = '3px solid  rgba(255,255,255,0.8)';

                    break;
                    case 'bottom':
                            loadingDivCir.setAttribute('data-wait','left');
                            loadingDivCir.style.borderColor = 'rgba(255,255,255,0.5)';
                            loadingDivCir.style.borderLeft = '3px solid  rgba(255,255,255,0.8)';
                    break;
                }
                
            }, 400);
        }

        
        mainImg.addEventListener('load',(event)=>{
            clearInterval(loadingInt);
            carDivs.mainDiv.removeChild(loadingDivCir)
            carDivs.mainDiv.style.backgroundImage = `url('${event.target.src}')`;
            carDivs.mainDiv.title = undefined != event.target.title ? event.target.title:'';
         })   
       


        carDivs.nextOne.style.backgroundImage = `url('${gal[nextOneNum].src}')`; 
        carDivs.nextOne.title = undefined != gal[nextOneNum].title ? gal[nextOneNum].title:'';
        carDivs.nextOne.setAttribute('data-num',nextOneNum);

        carDivs.nextTwo.style.backgroundImage = `url('${gal[nextTwoNum].src}')`; 
        carDivs.nextTwo.title =  undefined != gal[nextTwoNum].title ? gal[nextTwoNum].title:'';
        carDivs.nextTwo.setAttribute('data-num',nextTwoNum); 

        carDivs.nextThree.style.backgroundImage = `url('${gal[nextThreeNum].src}')`; 
        carDivs.nextThree.title =  undefined != gal[nextThreeNum].title ? gal[nextThreeNum].title:'';
        carDivs.nextThree.setAttribute('data-num',nextThreeNum);



        
       
        
    }


    /*
    * Adjust carousel on resize
    *
    *@param gal Image gallery object
    *@param carDivs Carousel divs object
    *@param param1 Additional settings for carousel
    *
    */

    adjustOnResize(gal, carDivObj,galNum){

        let maxWidth = gal.offsetWidth;
        let maxHeight = gal.offsetHeight;



        let prevThreeDiv =  carDivObj.prevThree;
        prevThreeDiv.style.width = `${(0.42)*maxWidth}px`;
        prevThreeDiv.style.height = `${0.7*maxHeight}px` ;
        prevThreeDiv.style.marginTop =  `${0.15*maxHeight}px`;
        prevThreeDiv.style.marginLeft =  `0px`;

            let prevTwoDiv =  carDivObj.prevTwo;
                prevTwoDiv.style.width = `${(0.49)*maxWidth}px`;
                prevTwoDiv.style.height = `${0.8*maxHeight}px` ;
                prevTwoDiv.style.marginTop =  `${0.1*maxHeight}px`;
                prevTwoDiv.style.marginLeft =  `${0.06*maxWidth}px`;
            
            let prevOneDiv =   carDivObj.prevOne;
                prevOneDiv.style.width = `${(0.63)*maxWidth}px`;
                prevOneDiv.style.height = `${0.9*maxHeight}px` ;
                prevOneDiv.style.marginTop =  `${0.05*maxHeight}px`;
                prevOneDiv.style.marginLeft =  `${0.14*maxWidth}px`;
            
            
            let mainDiv =   carDivObj.mainDiv;
                mainDiv.style.width = `${0.52*maxWidth}px`;
                mainDiv.style.height = `${maxHeight}px`; 
                mainDiv.style.marginTop =  `0px`;
                mainDiv.style.marginLeft =  `${0.24*maxWidth}px`;

            let loadingDiv =   mainDiv.querySelector('#img-loading-'+galNum); 
                if(undefined != loadingDiv){
                    loadingDiv.style.marginLeft = `${(mainDiv.offsetWidth-40)/2}px`;
                    loadingDiv.style.marginTop = `${(mainDiv.offsetHeight-40)/2}px`;
                }  

        
            let nextOneDiv =   carDivObj.nextOne;
                nextOneDiv.style.width = `${(0.63)*maxWidth}px`;
                nextOneDiv.style.height = `${0.9*maxHeight}px`; 
                nextOneDiv.style.marginTop =  `${0.05*maxHeight}px`;
                nextOneDiv.style.marginLeft =  `${0.24*maxWidth}px`;
            
            let nextTwoDiv =  carDivObj.nextTwo;
                nextTwoDiv.style.width = `${(0.49)*maxWidth}px`;
                nextTwoDiv.style.height = `${0.8*maxHeight}px`; 
                nextTwoDiv.style.marginTop =  `${0.1*maxHeight}px`;
                nextTwoDiv.style.marginLeft =  `${0.45*maxWidth}px`;

            let nextThreeDiv =  carDivObj.nextThree;
                nextThreeDiv.style.width = `${(0.42)*maxWidth}px`;
                nextThreeDiv.style.height = `${0.7*maxHeight}px`; 
                nextThreeDiv.style.marginTop =  `${0.15*maxHeight}px`;
                nextThreeDiv.style.marginLeft =  `${0.58*maxWidth}px`;     
            


    }

}



/***/ }),

/***/ "./node_modules/js-masonry/js-masonry.js":
/*!***********************************************!*\
  !*** ./node_modules/js-masonry/js-masonry.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jsMasonry": function() { return /* binding */ jsMasonry; }
/* harmony export */ });
/*
 * Js Masonry
 * javascript library to create masnory layout of elements 
 * https://ujw0l.github.io/
 * MIT license
 *  
 */


  class jsMasonry {
    constructor(elems, opt) {
        this.prepMas(elems, opt);
    }
    /**
     * Prepare masonry
     * 
     * @param {*} elems Elements to apply masonry
     * @param {*} opt Masonry options
     */
    prepMas(elems, opt) {
        let masArr = Array.from(document.querySelectorAll(elems));
        let massApplied = 0;
        masArr.map(el => {
            let elFirstChild = undefined != opt && undefined != opt.elSelector ? el.querySelector(opt.elSelector) : el.children[0];
            if (undefined != elFirstChild) {
                let brkPer = undefined != opt && undefined == opt.elWidth && true === opt.percentWidth ? elFirstChild.offsetWidth / el.offsetWidth : null;
                this.layBrks(el, opt, brkPer);
                massApplied++
                window.addEventListener('resize', (event) => { 

                    if(!el.classList.contains('ctclig-image-list') && !el.classList.contains('webcam-carousel-gallery') )
                    {
                        this.layBrks(el, opt, brkPer, event)
                    } 
                 } )
            }
        });
        if (1 < massApplied) {
            window.dispatchEvent(new Event('resize'));
        }
    }
    /**
     * 
     * Lay bricks
     * 
     * @param {*} el  Element to apply masonry to
     * @param {*} opt Masonry options
     * @param {*} brkPer Percent Width
     * @param {*} resizeEvnt Resize event
     */
    layBrks(el, opt, brkPer, resizeEvnt) {
        let allRawBrks = undefined != opt && undefined != opt.elSelector ? Array.from(el.querySelectorAll(opt.elSelector)) : Array.from(el.children);
        let contWidth = el.offsetWidth;
        let brkWidth = undefined != opt && undefined != opt.elWidth ? opt.elWidth : undefined != brkPer || null != brkPer ? contWidth * brkPer : allRawBrks[0].offsetWidth;
        let rawBrkMargin = undefined != opt && undefined != opt.elMargin ? opt.elMargin : 0;
        let rawBrkPerRow = (contWidth - rawBrkMargin) / (brkWidth + rawBrkMargin);
        let brkPerRow = Math.floor(rawBrkPerRow);
        let brkMargin = (((rawBrkPerRow - brkPerRow) * brkWidth) + ((rawBrkPerRow + 1) * (rawBrkMargin))) / (brkPerRow + 1);
        let availSpots = Array();
        let availTop = Array();
        let brkHt = Array();
        let allBrks = Array();
        for (let z = 0; z <= brkPerRow - 1; z++) {
            availTop.push(el.offsetTop + rawBrkMargin);
            availSpots.push([el.offsetTop + rawBrkMargin, el.offsetLeft + (z * brkWidth) + ((z + 1) * brkMargin)]);
        }


        if (undefined != opt && undefined != opt.heightSort) {
            for (let i in allRawBrks) {
                brkHt.push(allRawBrks[i].offsetHeight);
            }

            if ('DESC' == opt.heightSort.toUpperCase()) {
                brkHt.sort((a, b) => b - a);
            } else if ('ASC' == opt.heightSort.toUpperCase()) {
                brkHt.sort((a, b) => a - b);
            }
            for (let a in brkHt) {
                for (let b in allRawBrks) {
                    if (allRawBrks[b].offsetHeight == brkHt[a]) {
                        allBrks.push(allRawBrks.splice(b, 1)[0]);
                    }
                }

            }

        } else {
            allBrks = allRawBrks;
        }


        allBrks.map((x, i) => {
            let placeCount = 1;
            availSpots.map((n, l) => {
                if (availTop[0] === n[0] && 1 === placeCount) {
                    x.style.width = `${brkWidth}px`;
                    x.style.position = 'absolute';
                    x.style.left = `${n[1]}px`;
                    x.style.top = `${n[0]}px`;
                    placeCount++;
                    if ('img' === x.nodeName.toLowerCase()) {
                        x.style.height = '';
                        let brkHt = brkWidth / x.offsetWidth * x.offsetHeight;
                        x.style.height = `${brkHt}px`;
                        availTop[0] = n[0] + brkHt + brkMargin;
                        availSpots[l] = [n[0] + brkHt + brkMargin, n[1]]
                        availTop.sort((a, b) => a - b);
                    } else {
                        availTop[0] = n[0] + x.offsetHeight + brkMargin;
                        availSpots[l] = [n[0] + x.offsetHeight + brkMargin, n[1]]
                        availTop.sort((a, b) => a - b);
                    }
                }
            });
            if (i === allBrks.length - 1) {
                availTop.sort((a, b) => b - a);
                el.style.height = (availTop[0] - el.offsetTop + rawBrkMargin) + 'px';
                if (undefined == resizeEvnt) {
                    if (undefined != opt) {
                        if ('function' == typeof (opt.callback)) {
                            opt.callback(el);
                        }
                    } else {
                        window.dispatchEvent(new Event('resize'));
                    }
                }
            }
        });
    }

}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************!*\
  !*** ./src/frontend_script.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ctcl_image_gallery_ctcl_image_gallery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ctcl-image-gallery/ctcl-image-gallery */ "./node_modules/ctcl-image-gallery/ctcl-image-gallery.js");
/* harmony import */ var js_masonry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-masonry */ "./node_modules/js-masonry/js-masonry.js");
/* harmony import */ var images_carousel_image_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! images-carousel/image-carousel */ "./node_modules/images-carousel/image-carousel.js");
/* harmony import */ var ctc_gallery_viewer_ctc_overlay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ctc-gallery-viewer/ctc_overlay.js */ "./node_modules/ctc-gallery-viewer/ctc_overlay.js");




window.addEventListener("DOMContentLoaded", event => {
  let masGal = document.querySelectorAll('div.webcam-gal-masonry');
  let prodGal = document.querySelectorAll('.webcam-gal-product');
  let carGal = document.querySelectorAll('.webcam-gal-carousel');
  if (masGal.length !== 0) {
    Array.from(masGal).map(x => {
      new ctc_gallery_viewer_ctc_overlay_js__WEBPACK_IMPORTED_MODULE_3__.ctcOverlayViewer(`#${x.getAttribute('id')}`);
      x.style.display = 'block';
      new js_masonry__WEBPACK_IMPORTED_MODULE_1__.jsMasonry(`#${x.getAttribute('id')}`, {
        elWidth: parseInt(x.getAttribute('data-mas-width')),
        elMargin: parseInt(x.getAttribute('data-mas-gutwd'))
      });
      console.log(parseInt(x.getAttribute('data-mas-gutwd')));
    });
  } else if (prodGal.length !== 0) {
    Array.from(prodGal).map(x => {
      new ctcl_image_gallery_ctcl_image_gallery__WEBPACK_IMPORTED_MODULE_0__.ctclImgGal(`#${x.getAttribute('id')}`, {
        imgGal: x.querySelectorAll('img'),
        mainImgWd: parseInt(x.getAttribute('data-prod-wd')),
        mainImgHt: parseInt(x.getAttribute('data-prod-ht'))
      });
      x.style.display = 'block';
      Array.from(document.querySelectorAll(`#${x.getAttribute('id')} div`)).map((y, i) => {
        if (i == 2) {
          y.classList.add(x.getAttribute('id'));
          new ctc_gallery_viewer_ctc_overlay_js__WEBPACK_IMPORTED_MODULE_3__.ctcOverlayViewer(`.${x.getAttribute('id')}`);
        }
      });
      document.querySelector(`#${x.getAttribute('id')} .ctclig-main-image`).addEventListener('click', () => document.querySelector(`#${x.getAttribute('id')} img`).click());
    });
  } else if (carGal.length !== 0) {
    Array.from(carGal).map(x => {
      x.style.width = `${x.getAttribute('data-carousel-width')}px`;
      x.style.height = `${x.getAttribute('data-carousel-height')}px`;
      x.style.marginLeft = 'auto';
      x.style.marginRight = 'auto';
      new images_carousel_image_carousel__WEBPACK_IMPORTED_MODULE_2__.imageCarousel(`#${x.getAttribute('id')}`);
      x.style.display = 'block';
      window.dispatchEvent(new Event('resize'));
    });
  } else {
    return;
  }
});
}();
/******/ })()
;
//# sourceMappingURL=frontend_script.js.map