/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {


	return (
		<div { ...useBlockProps.save() }>



			<div style={{display:"none"}} id={`webcam-main-gallery-${attributes.clntId}`} data-mas-width={attributes.masImgWd} data-mas-gutwd={attributes.masonryGutter} data-carousel-height={attributes.carouselHt} data-carousel-width={attributes.carouselWd} data-prod-ht={attributes.prodMainDivHt}  data-prod-wd={attributes.prodMainDivWd} className = {`webcam-gal-${attributes.galType} webcam-gallery-cont`} >
		
			{
		     		attributes.selectedGalImgs.map(x=>	<img  style={{width: attributes.masImgWd}} src={x}/>)
			}

		</div>
			
		</div>
	);
}
