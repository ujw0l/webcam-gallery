import {useEffect, useRef,useState} from 'react';
import { CheckboxControl, PanelBody, Button, RangeControl,SelectControl, Spinner,Modal,RadioControl } from '@wordpress/components';
import {jsMasonry} from 'js-masonry/js-masonry.js'
import {imageCarousel} from 'images-carousel/image-carousel.js'
import {ctclImgGal} from 'ctcl-image-gallery/ctcl-image-gallery.js'




/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps,InspectorControls,MediaUpload,MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({clientId,attributes,setAttributes}) {
	const videoRef = useRef(null);
    const canvasRef = useRef(null);
	const [modIsOpen, setModOpen] = useState(false);


	//get all ebcams list
	useEffect(()=>{

		navigator.mediaDevices.enumerateDevices()
  .then(devices => {

	let cam = []; 
    devices.filter(device => device.kind === 'videoinput').forEach((device,i) => {
		cam.push({label:device.label, value:device.deviceId})
	 	setAttributes({activeCam:devices[0].deviceI});
       setAttributes({availCams:cam});
	  
    });
  })
  .catch(err => {
    console.log(err.name + ": " + err.message);
  });

	},[])



	// for applying effects
	useEffect(() => {

		setAttributes({ filter: `${attributes.blur}${attributes.brightness}${attributes.contrast} ${attributes.grayScale}${attributes.hueRotate}${attributes.invert}${attributes.opacity}${attributes.saturate}${attributes.sepia}` });
	}, [attributes.blur, attributes.brightness, attributes.contrast, attributes.grayScale, attributes.hueRotate, attributes.invert, attributes.opacity, attributes.saturate, attributes.sepia])

// for video streaming and taking picture
    useEffect(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      navigator.mediaDevices.getUserMedia({video:{deviceId: { exact: attributes.activeCam }}})
        .then(stream => {
          video.srcObject = stream;
          video.play();
		  video.addEventListener('play', ()=> setTimeout( ()=> window.dispatchEvent(new Event('resize')),1000))
		
        })
        .catch(error => {
          console.error(error);
        });



    }, [attributes.activeCam]);


	//apply gallery layout
useEffect(()=>{
	let galDiv = document.querySelector(`#webcam-${attributes.galType}-gallery-${clientId}`);
	setAttributes({clntId:clientId})

	if(null != galDiv){
	
	galDiv.style = '';
	
	
	if(attributes.selectedGalImgs.length >= 3 && Array.from(galDiv.querySelectorAll('img')).length >= 3 ){




		Array.from(galDiv.querySelectorAll('img')).map(x=>x.style='');
		galDiv.querySelectorAll('div') != null && Array.from(galDiv.querySelectorAll('div')).map(y=>y.remove());
	
		if(attributes.galType == 'masonry'){
			
			galDiv.classList.remove('webcam-carousel-gallery');
			galDiv.classList.remove('ctclig-image-list');
			new jsMasonry(`#webcam-masonry-gallery-${clientId} `,{elWidth:attributes.masImgWd , elMargin:attributes.masonryGutter})

		}else if(attributes.galType == 'product'){
			new ctclImgGal(`#webcam-product-gallery-${clientId}`,{imgGal:attributes.selectedGalImgs, mainImgWd : attributes.prodMainDivWd , mainImgHt:attributes.prodMainDivHt,});
		}else if(attributes.galType == 'carousel'){
			let carWid =  attributes.carouselWd;
			galDiv.classList.add('webcam-carousel-gallery');
			galDiv.style.width = `${carWid}%`;
			galDiv.style.height = `${attributes.carouselHt}px`; 
			galDiv.style.marginLeft = 'auto';
			galDiv.style.marginRight = 'auto';
			galDiv.style.display = 'block';
			new imageCarousel(`#webcam-carousel-gallery-${clientId}`,{})
			window.dispatchEvent(new Event('resize'))
		}else{
			return;
		}
	
	}
}
	  
	},[attributes.galType,attributes.selectedGalImgs, attributes.prodMainDivHt,attributes.prodMainDivWd,attributes.masImgWd,attributes.carouselWd,attributes.carouselHt,attributes.masonryGutter, attributes.activeCam])
	
	



    const takePicture =  () => {
	
	  	
      const video = videoRef.current;
	  video.style.opacity = '0.5';
	  setTimeout(()=>{video.style.opacity=''},50);

      const canvas = canvasRef.current;

      const context = canvas.getContext('2d');
	  context.filter= attributes.filter;
	
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setAttributes({webCamImages:[...attributes.webCamImages,imageDataUrl]});
    }


    return (
		<div {...useBlockProps()}  >
      <div style={{color:"rgba(rgba(11, 127, 171,1))"}} >
        <div style={{ padding:"10px" }}>
		<div style={{marginLeft:'auto', marginRight:'auto', display:'block'}}>
          <video ref={videoRef} style={{marginLeft:'auto', marginRight:'auto', display:'block','filter':`${attributes.filter}`,  }} />
		  </div>
          <canvas  ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
		  <InspectorControls>
			<PanelBody>
          <div style={{display:'block'}}>
			

		  <span>
<PanelBody>
		  <SelectControl

    label={ __( 'Select Camera:','webcam-gallery' ) }
    value={ attributes.activeCam } 
    onChange={ ( camId ) => setAttributes({activeCam : camId})}
    options={ attributes.availCams }
    __nextHasNoMarginBottom
/>

</PanelBody>
		  </span>
		  
		  
		  </div>
		  </PanelBody>
		  <PanelBody>
					<h3> {__('Select effects to apply', 'webcam-gallery')} </h3>
					<RangeControl
						label={__('Blur (px)', 'webcam-gallery')}
						min={0}
						max={100}
						onChange={val => {
							setAttributes({ blur: ` blur(${val}px)` })
							setAttributes({ blurVal: val })
						}
						}
						value={attributes.blurVal}

					/>
					<RangeControl
						label={__('Brightness (%)', 'webcam-gallery')}
						min={1}
						max={200}
						onChange={val => {
							setAttributes({ brightness: ` brightness(${val}%)` })
							setAttributes({ brightnessVal: val })
						}}
						value={attributes.brightnessVal}
					/>
					<RangeControl
						label={__('Contrast (%)', 'webcam-gallery')}
						min={1}
						max={200}
						onChange={val => {
							setAttributes({ contrast: ` contrast(${val}%)` })
							setAttributes({ contrastVal: val })
						}}
						value={attributes.contrastVal}
					/>

					<RangeControl
						label={__('GrayScale (%)', 'webcam-gallery')}
						min={1}
						max={100}
						onChange={val => {
							setAttributes({ grayScale: ` grayscale(${val}%)` })
							setAttributes({ grayScaleVal: val })
						}}
						value={attributes.grayScaleVal}
					/>
					<RangeControl
						label={__('Hue Rotate (deg)', 'webcam-gallery')}
						min={1}
						max={360}
						onChange={val => {
							setAttributes({ hueRotate: ` hue-rotate(${val}deg)` })
							setAttributes({ hueRotateVal: val })

						}}
						value={attributes.hueRotateVal}
					/>

					<RangeControl
						label={__('Invert (%)', 'webcam-gallery')}
						min={1}
						max={100}
						onChange={val => {
							setAttributes({ invert: ` invert(${val}%)` })
							setAttributes({ invertVal: val })
						}}
						value={attributes.invertVal}
					/>

					<RangeControl
						label={__('Opacity (%)', 'webcam-gallery')}
						min={1}
						max={100}
						onChange={val => {
							setAttributes({ opacity: ` opacity(${val}%)` })
							setAttributes({ opacityVal: val })
						}}
						value={attributes.opacityVal}
					/>

					<RangeControl
						label={__('Saturate(%)', 'webcam-gallery')}
						min={1}
						max={1000}
						onChange={val => {
							setAttributes({ saturate: ` saturate(${val}%)` })
							setAttributes({ saturateVal: val })
						}}
						value={attributes.saturateVal}
					/>
					<RangeControl
						label={__('Sepia(%)', 'webcam-gallery')}
						min={1}
						max={100}
						onChange={val => {
							setAttributes({ sepia: ` sepia(${val}%)` })
							setAttributes({ sepiaVal: val })
						}}
						value={attributes.sepiaVal}
					/>
					
				</PanelBody>
		  </InspectorControls>
		  </div>

		  
<div style={{display:'block',width:'500px',marginLeft:'auto',marginRight:'auto'}}>
				<PanelBody header={__('Capture Picture', 'webcam-gallery')}>
            <span style={{display:'inline-block', float:'left',marginLeft:'70px'}}><Button variant={'primary'} style={{}} onClick={takePicture}>{__("Take Picture",'webcam-gallery')}</Button></span>
			
			<span  style={{display:'inline-block',marginLeft:'100px' }} ><Button variant={"primary"} style={{}} disabled={attributes.webCamImages.length > 0?false:true} onClick={()=>setModOpen(true)}>{__('Select Gallery Images','webcam-gallery')}</Button></span>
			</PanelBody>
		
			</div>
<div style={{display:"block", marginTop:"10px"}}>



	{ modIsOpen && attributes.webCamImages &&
				
				<Modal isFullScreen={true} title={__('Select Images (Atleast 3 images)',"webcam-gallery")} onRequestClose={()=>setModOpen(false)}>
					
	<div id={`modal-img-cont-${clientId}`} style={{width:'95%', height:"80%", marginLeft:"auto", marginRight:"auto",display:"block" }}>
					{
				attributes.webCamImages.map((x,i)=>{
				return (
						<span className="allGalImage" style={{display:"inline-block", "max-width":"30%" ,margin:'10px',width:"160px",height:'200px'}}>
						  <img class={'single-gal-img'} style={{width:"100%",height:'65%'}} src={x}/>
						  <div style={{display:"inline-block","float":"left"}}>
						  <CheckboxControl style={{verticalAlign:"middle","float":"right"}} id={`check-box-gal-${i}`} className= {"webcam-selected-gal"} 

						  checked={attributes.selectedGalImgs.includes(x)}
						  
						   onChange={
							()=> {


								let selImg = 	Array.from(document.querySelectorAll('span.allGalImage')).map(y=>{
									if(y.querySelector('.components-checkbox-control__input').checked === true){
									return y.querySelector('img').src
								  
							 }})
						
							
								setAttributes({selectedGalImgs:selImg.filter(a=> a != undefined )})
								
							}
							
							} 
							/>
							</div>
							
							<div style={{"display":"inline-block", "float":"right"}}>

								<Button key={i} variant={'secondary'} onClick={()=>{
									
									setAttributes({webCamImages: attributes.webCamImages.filter((imgSc,a)=> i !=a)});
									setAttributes({selectedGalImgs :  attributes.selectedGalImgs.filter(b=> b != x)});
								}} >{__('Remove!','webcam-gallery')}</Button>

							</div>
						  </span>
				)
						  }
			
				)
				
						
}
</div>
<div style={{ height:"50px", dispaly:"inline-block", marginTop:"80px", position:"fixed", marginBottom:"10px" }} >
	<Button variant={"primary"} style={{display:"inline-block","float":"right"}} onClick={()=>setModOpen(false)
	}>{__('Done',"webcam-galleryr")}</Button>
</div>
</Modal>
					
					}
			
</div> 
				
        

		<div id={"webcam-gallery-div"} className={'webcam-gallery-container'}>
 
<div className={'webcam-gallery-select'} style={{marginTop:"10px",marginBottom:"10px", borderStyle:"solid", padding:"10px", borderColor:"rgba(11, 127, 171,1)"}} >

<p>{__('Select Gallery Layout',"webcam-galleryr")}</p>
	
<span style={{width:"32%" , display:"inline-block", margin:"3px"}}>
	<div style={{height: "60px"}}>
	<label style={{display:"inline-block", float:"left",width:"90%", fontSize:"50px"}} className={"dashicons dashicons-cover-image"}> 
	<input style={{display:'inline-block',float:"right",     marginTop: "20px"}}
                        id="product"
						type="radio"
                        value='product'
                        checked={attributes.galType === "product"}
                        onChange={e => setAttributes({galType:'product'})}
                    />
	</label>
	</div>
<PanelBody >
					<RangeControl
						label={__('Main Image height (px)', 'webcam-gallery')}
						min={200}
						max={700}
						step={5}
						withInputField = {true}
						onChange={val => setAttributes({prodMainDivHt:val}) }
						value={attributes.prodMainDivHt}
					/>		
	
	<RangeControl
						label={__('Main Image Width (px)', 'webcam-gallery')}
						min={200}
						max={900}
						step= {5}
						withInputField = {true}
						onChange={val => setAttributes({prodMainDivWd:val}) }
						value={attributes.prodMainDivWd}
					/>	
		
		</PanelBody>				
</span>
<span style={{width:"32%", display:"inline-block",margin:"3px" ,marginBottom:"10px"}}>
<div style={{height: "60px"}}>
	<label style={{display:"inline-block", float:"left",width:"90%", fontSize:"50px"}} className={"dashicons dashicons-layout"}>
<input  style={{display:'inline-block',float:"right",  marginTop: "20px"}}
						id="masonry"
                        type="radio"
                        value='masonry'
                        checked={attributes.galType === "masonry"}
                        onChange={e => setAttributes({galType:'masonry'})}
                    />

</label>
</div>
<PanelBody>
<RangeControl
						label={__('Image  Width (px)', 'webcam-gallery')}
						min={32}
						max={600}
						step={5}
						withInputField = {true}
						onChange={val => setAttributes({masImgWd:val}) }
						value={attributes.masImgWd}
					/>	

<RangeControl
						label={__('Gutter Width (px)', 'webcam-gallery')}
						min={1}
						max={50}
						step={1}
						withInputField = {true}
						onChange={val => setAttributes({masonryGutter:val}) }
						value={attributes.masonryGutter}
					/>	


					
	</PanelBody>
	
					
					</span>
	
					<span style={{width:"32%", display:"inline-block", margin:"3px"}}>
					<div style={{height: "60px"}}>
	<label style={{display:"inline-block", float:"left",width:"90%", fontSize:"80px", marginTop:"-15px"}} className={"dashicons dashicons-slides"}>

<input  style={{display:'inline-block',float:"right",  marginTop: "30px"}}
						id='carousel'
                        type="radio"
                        value='carousel'
                        checked={attributes.galType === "carousel"}
                        onChange={e => setAttributes({galType:'carousel'})}
                    />

</label>
</div>

<PanelBody>
					<RangeControl
						label={__('Carousel height (px)', 'webcam-gallery')}
						min={100}
						max={700}
						step={1}
						withInputField = {true}
						onChange={val => setAttributes({carouselHt:val}) }
						value={attributes.carouselHt}
					/>		
	
	<RangeControl
						label={__('Carousel Width (%)', 'webcam-gallery')}
						min={10}
						max={100}
						step= {1}
						withInputField = {true}
						onChange={val => setAttributes({carouselWd:val}) }
						value={attributes.carouselWd}
					/>	
		
		</PanelBody>	

	</span>


</div>

		</div>
<div id={`webcam-gal-${attributes.clntId}`} >
	
	 {attributes.selectedGalImgs.length >=3 && <div> <h4>{__("Demo", 'webcam-gallery')} </h4>
		<div style={{marginLeft:'auto', marginRight:'auto', display:'block',overflow:"auto"}} id={`webcam-${attributes.galType}-gallery-${clientId}`} className = {'webcam-gallery-cont'} >
		
			
			{
				attributes.selectedGalImgs.map(x=>	x != undefined && <img style={{width:"33%"}} src={x}/>)
			}
		</div>
		</div>
}


	</div>		
      </div>

	  </div>
    );
  

}
