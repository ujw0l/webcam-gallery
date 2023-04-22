/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
                window.addEventListener('resize', () => this.layBrks(el, opt, brkPer, event));
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



window.addEventListener("DOMContentLoaded", event => {
  let masGal = document.querySelectorAll('div.webcam-gal-masonry');
  let prodGal = document.querySelectorAll('.webcam-gal-product');
  let carGal = document.querySelectorAll('.webcam-gal-carousel');
  if (masGal.length !== 0) {
    Array.from(masGal).map(x => {
      x.style.display = 'block';
      new js_masonry__WEBPACK_IMPORTED_MODULE_1__.jsMasonry(`#${x.getAttribute('id')}`, {
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
    });
  } else if (carGal.length !== 0) {
    Array.from(carGal).map(x => {
      console.log(x.getAttribute('data-carousel-width'));
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