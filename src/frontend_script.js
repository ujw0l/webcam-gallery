import { ctclImgGal } from "ctcl-image-gallery/ctcl-image-gallery";
import { jsMasonry } from "js-masonry";
import { imageCarousel } from "images-carousel/image-carousel";



window.addEventListener("DOMContentLoaded", (event) => {

    let masGal = document.querySelectorAll('div.webcam-gal-masonry');

    let prodGal = document.querySelectorAll('.webcam-gal-product')
    
    let carGal = document.querySelectorAll('.webcam-gal-carousel');
    

    if(masGal.length !== 0 ){

        Array.from(masGal).map(x=>{

            x.style.display = 'block';
            new jsMasonry(`#${x.getAttribute('id')}`,{elMargin:parseInt(x.getAttribute('data-mas-gutwd'))});
            console.log(parseInt(x.getAttribute('data-mas-gutwd')));
           
        });
    }else if(prodGal.length !== 0 ){
        Array.from(prodGal).map(x=>{

            new ctclImgGal(`#${x.getAttribute('id')}`,{imgGal:x.querySelectorAll('img'), mainImgWd : parseInt(x.getAttribute('data-prod-wd') ), mainImgHt:parseInt(x.getAttribute('data-prod-ht'))});
            x.style.display = 'block';
        });
       


    }else if(carGal.length !== 0){

        Array.from(carGal).map(x=>{


            console.log(x.getAttribute('data-carousel-width'));
        x.style.width = `${x.getAttribute('data-carousel-width')}px`;
		x.style.height = `${x.getAttribute('data-carousel-height')}px`; 
		x.style.marginLeft = 'auto';
		x.style.marginRight = 'auto';
		new imageCarousel(`#${x.getAttribute('id')}`)
        x.style.display = 'block';
		window.dispatchEvent(new Event('resize'))

        })
        

    }else{ return;}
  
});



