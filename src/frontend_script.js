import { ctclImgGal } from "ctcl-image-gallery/ctcl-image-gallery";
import { jsMasonry } from "js-masonry";
import { imageCarousel } from "images-carousel/image-carousel";
import {ctcOverlayViewer} from "ctc-gallery-viewer/ctc_overlay.js"



window.addEventListener("DOMContentLoaded", (event) => {

    let masGal = document.querySelectorAll('div.webcam-gal-masonry');

    let prodGal = document.querySelectorAll('.webcam-gal-product')
    
    let carGal = document.querySelectorAll('.webcam-gal-carousel');
    

    if(masGal.length !== 0 ){

        Array.from(masGal).map(x=>{

            new ctcOverlayViewer(`#${x.getAttribute('id')}`)
            x.style.display = 'block';
            new jsMasonry(`#${x.getAttribute('id')}`,{ elWidth:parseInt(x.getAttribute('data-mas-width')) ,elMargin:parseInt(x.getAttribute('data-mas-gutwd'))});
            console.log(parseInt(x.getAttribute('data-mas-gutwd')));
           
        });
    }else if(prodGal.length !== 0 ){
        Array.from(prodGal).map(x=>{
            new ctclImgGal(`#${x.getAttribute('id')}`,{imgGal:x.querySelectorAll('img'), mainImgWd : parseInt(x.getAttribute('data-prod-wd') ), mainImgHt:parseInt(x.getAttribute('data-prod-ht'))});
            x.style.display = 'block';
           Array.from(document.querySelectorAll(`#${x.getAttribute('id')} div`)).map((y,i)=> {
            if(i == 2) {
                y.classList.add(x.getAttribute('id'));
                new ctcOverlayViewer(`.${x.getAttribute('id')}`)
            }   });
            document.querySelector( `#${x.getAttribute('id')} .ctclig-main-image`).addEventListener('click', ()=>document.querySelector(`#${x.getAttribute('id')} img`).click())  
        });
       


    }else if(carGal.length !== 0){

        Array.from(carGal).map(x=>{

      
        x.style.width = `${x.getAttribute('data-carousel-width')}%`;
		x.style.height = `${x.getAttribute('data-carousel-height')}px`; 
		x.style.marginLeft = 'auto';
		x.style.marginRight = 'auto';
		new imageCarousel(`#${x.getAttribute('id')}`)
        x.style.display = 'block';
		window.dispatchEvent(new Event('resize'))

        })
        

    }else{ return;}
  
});



