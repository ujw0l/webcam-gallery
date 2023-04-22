import { __ } from '@wordpress/i18n';
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {


	keywords: [__('Webcam', 'webcam-gallery'), __('image gallery', 'webcam-gallery')],

	attributes:{
		clntId : {type:"String", default:""},
		activeCam : {type:'String',default:''},
		availCams:{type:"Array", default:[]},
		carouselWd :{type:"Number", default:600},
		carouselHt : {type:"Number",default:235},
		masonryGutter :{type:"Number",default:20},
		masImgWd : {type:'Number', default : 140}, 
		prodMainDivWd:{type:'Number', default:500},
		prodMainDivHt : {type:'Number',default:375},
		galType:{type:'String', default:'masonry'},
		webCamImages :{type:'Array', default:[]},
		selectedGalImgs:{type:'Array',default:[]},
		masGalWidth:{type:'Number',default:30},
		ctcGalWidth:{type:'Number', default:148},
		carGalWidth :{type:'Number', default:50},
		filter: { type: 'String', default: '' },
		mediaUrl: { type: 'String', default: '' },
		blur: { type: 'String', default: '' },
		blurVal: { type: 'Number', default: 0 },
		brightness: { type: 'String', default: '' },
		brightnessVal: { type: 'Number', default: 0 },
		contrast: { type: 'String', default: '' },
		contrastVal: { type: 'Number', default: 0 },
		grayScale: { type: 'String', default: '' },
		grayScaleVal: { type: 'Number', default: 0 },
		hueRotate: { type: 'String', default: '' },
		hueRotateVal: { type: 'Number', default: 0 },
		invert: { type: 'String', default: '' },
		invertVal: { type: 'Number', default: 0 },
		opacity: { type: 'String', default: '' },
		opacityVal: { type: 'Number', default: 0 },
		saturate: { type: 'String', default: '' },
		saturateVal: { type: 'Number', default: 0 },
		sepia: { type: 'String', default: '' },
		sepiaVal: { type: 'Number', default: 0 },

	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
