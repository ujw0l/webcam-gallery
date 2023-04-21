/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var js_masonry_js_masonry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js-masonry/js-masonry.js */ "./node_modules/js-masonry/js-masonry.js");
/* harmony import */ var images_carousel_image_carousel_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! images-carousel/image-carousel.js */ "./node_modules/images-carousel/image-carousel.js");
/* harmony import */ var ctcl_image_gallery_ctcl_image_gallery_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ctcl-image-gallery/ctcl-image-gallery.js */ "./node_modules/ctcl-image-gallery/ctcl-image-gallery.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");







/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit(_ref) {
  let {
    clientId,
    attributes,
    setAttributes
  } = _ref;
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [modIsOpen, setModOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let galDiv = document.querySelector(`#webcam-main-gallery-${clientId}`);
    if (attributes.selectedGalImgs.length >= 3) {
      Array.from(galDiv.querySelectorAll('img')).map(x => x.style = '');
      galDiv.querySelectorAll('div') != null && Array.from(galDiv.querySelectorAll('div')).map(y => y.remove());
      if (attributes.galType == 'masonry') {
        new js_masonry_js_masonry_js__WEBPACK_IMPORTED_MODULE_3__.jsMasonry(`#webcam-main-gallery-${clientId}`, {
          elWidth: attributes.masImgWd,
          elMargin: attributes.masonryGutter
        });
      } else if (attributes.galType == 'product') {
        new ctcl_image_gallery_ctcl_image_gallery_js__WEBPACK_IMPORTED_MODULE_5__.ctclImgGal(`#webcam-main-gallery-${clientId}`, {
          imgGal: attributes.selectedGalImgs,
          mainImgWd: attributes.prodMainDivWd,
          mainImgHt: attributes.prodMainDivHt
        });
      } else if (attributes.galType == 'carousel') {
        galDiv.style.width = `${attributes.carouselWd}px`;
        galDiv.style.height = `${attributes.carouselHt}px`;
        galDiv.style.marginLeft = 'auto';
        galDiv.style.marginRight = 'auto';
        galDiv.style.display = 'block';
        new images_carousel_image_carousel_js__WEBPACK_IMPORTED_MODULE_4__.imageCarousel(`#webcam-main-gallery-${clientId}`, {});
        window.dispatchEvent(new Event('resize'));
      } else {
        return;
      }
    }
  }, [attributes.galType, attributes.selectedGalImgs, attributes.prodMainDivHt, attributes.prodMainDivWd, attributes.masImgWd, attributes.carouselWd, attributes.carouselHt, attributes.masonryGutter]);

  // for applying effects
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      filter: `${attributes.blur}${attributes.brightness}${attributes.contrast} ${attributes.grayScale}${attributes.hueRotate}${attributes.invert}${attributes.opacity}${attributes.saturate}${attributes.sepia}`
    });
  }, [attributes.blur, attributes.brightness, attributes.contrast, attributes.grayScale, attributes.hueRotate, attributes.invert, attributes.opacity, attributes.saturate, attributes.sepia]);

  // for video streaming and taking picture
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const constraints = {
      video: true
    };
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      video.srcObject = stream;
      video.play();
      video.addEventListener('play', () => setTimeout(() => window.dispatchEvent(new Event('resize')), 1000));
    }).catch(error => {
      console.error(error);
    });
  }, []);
  const takePicture = () => {
    const video = videoRef.current;
    video.style.opacity = '0.5';
    setTimeout(() => {
      video.style.opacity = '';
    }, 50);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.filter = attributes.filter;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL();
    setAttributes({
      webCamImages: [...attributes.webCamImages, imageDataUrl]
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      color: "rgba(rgba(11, 127, 171,1))"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("font", {
    className: "dashicons dashicons-camera-alt",
    style: {
      width: "200px",
      display: "block",
      margin: "auto",
      marginBottom: "20px"
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('WebCam Gallery', 'webcam-gallery')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      borderStyle: "solid",
      padding: "10px",
      borderColor: "rgba(11, 127, 171,1)"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'block'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    ref: videoRef,
    style: {
      'filter': `${attributes.filter}`
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("canvas", {
    ref: canvasRef,
    width: "640",
    height: "480",
    style: {
      display: 'none'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'block'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: 'primary',
    style: {
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block'
    },
    onClick: takePicture
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)("Take Picture", 'webcam-gallery')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Select effects to apply', 'webcam-gallery'), " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Blur (px)', 'webcam-gallery'),
    min: 0,
    max: 100,
    onChange: val => {
      setAttributes({
        blur: ` blur(${val}px)`
      });
      setAttributes({
        blurVal: val
      });
    },
    value: attributes.blurVal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Brightness (%)', 'webcam-gallery'),
    min: 1,
    max: 200,
    onChange: val => {
      setAttributes({
        brightness: ` brightness(${val}%)`
      });
      setAttributes({
        brightnessVal: val
      });
    },
    value: attributes.brightnessVal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Contrast (%)', 'webcam-gallery'),
    min: 1,
    max: 200,
    onChange: val => {
      setAttributes({
        contrast: ` contrast(${val}%)`
      });
      setAttributes({
        contrastVal: val
      });
    },
    value: attributes.contrastVal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('GrayScale (%)', 'webcam-gallery'),
    min: 1,
    max: 100,
    onChange: val => {
      setAttributes({
        grayScale: ` grayscale(${val}%)`
      });
      setAttributes({
        grayScaleVal: val
      });
    },
    value: attributes.grayScaleVal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Hue Rotate (deg)', 'webcam-gallery'),
    min: 1,
    max: 360,
    onChange: val => {
      setAttributes({
        hueRotate: ` hue-rotate(${val}deg)`
      });
      setAttributes({
        hueRotateVal: val
      });
    },
    value: attributes.hueRotateVal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Invert (%)', 'webcam-gallery'),
    min: 1,
    max: 100,
    onChange: val => {
      setAttributes({
        invert: ` invert(${val}%)`
      });
      setAttributes({
        invertVal: val
      });
    },
    value: attributes.invertVal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Opacity (%)', 'webcam-gallery'),
    min: 1,
    max: 100,
    onChange: val => {
      setAttributes({
        opacity: ` opacity(${val}%)`
      });
      setAttributes({
        opacityVal: val
      });
    },
    value: attributes.opacityVal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Saturate(%)', 'webcam-gallery'),
    min: 1,
    max: 1000,
    onChange: val => {
      setAttributes({
        saturate: ` saturate(${val}%)`
      });
      setAttributes({
        saturateVal: val
      });
    },
    value: attributes.saturateVal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Sepia(%)', 'webcam-gallery'),
    min: 1,
    max: 100,
    onChange: val => {
      setAttributes({
        sepia: ` sepia(${val}%)`
      });
      setAttributes({
        sepiaVal: val
      });
    },
    value: attributes.sepiaVal
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "block",
      marginTop: "10px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    style: {
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block'
    },
    disabled: attributes.webCamImages.length > 0 ? false : true,
    onClick: () => setModOpen(true)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Select Images', 'webcam-gallery')), modIsOpen && attributes.webCamImages && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    isFullScreen: true,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Select Images', "webcam-gallery"),
    onRequestClose: () => setModOpen(false)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "80%",
      marginLeft: "auto",
      marginRight: "auto",
      display: "block"
    }
  }, attributes.webCamImages.map((x, i) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "allGalImage",
      style: {
        display: "inline-block",
        "max-width": "30%",
        margin: '10px',
        width: "170px",
        height: '200px'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      class: 'single-gal-img',
      style: {
        width: "100%",
        height: '65%'
      },
      src: x
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        display: "inline-block",
        "float": "left"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
      style: {
        verticalAlign: "middle",
        "float": "right"
      },
      id: `check-box-gal-${i}`,
      className: "webcam-selected-gal",
      checked: attributes.selectedGalImgs.includes(x),
      onChange: () => {
        setAttributes({
          selectedGalImgs: Array.from(document.querySelectorAll('span.allGalImage')).map(y => {
            if (y.querySelector('.components-checkbox-control__input').checked === true) {
              return y.querySelector('img').src;
            }
          })
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        "display": "inline-block",
        "float": "right"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      key: i,
      variant: 'secondary',
      onClick: () => {
        setAttributes({
          webCamImages: attributes.webCamImages.filter((imgSc, a) => i != a)
        });
        setAttributes({
          selectedGalImgs: attributes.selectedGalImgs.filter(b => b != x)
        });
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Remove!', 'webcam-gallery'))));
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "50px",
      dispaly: "inline-block",
      marginTop: "80px",
      position: "fixed",
      marginBottom: "10px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    style: {
      display: "inline-block",
      "float": "right"
    },
    onClick: () => setModOpen(false)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Done', "webcam-galleryr"))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "webcam-gallery-div",
    className: 'webcam-gallery-container'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'webcam-gallery-select',
    style: {
      marginTop: "10px",
      marginBottom: "10px",
      borderStyle: "solid",
      padding: "10px",
      borderColor: "rgba(11, 127, 171,1)"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      width: "32%",
      display: "inline-block",
      margin: "3px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "60px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    style: {
      display: "inline-block",
      float: "left",
      width: "90%",
      fontSize: "50px"
    },
    className: "dashicons dashicons-cover-image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    style: {
      display: 'inline-block',
      float: "right",
      marginTop: "20px"
    },
    id: "product",
    type: "radio",
    value: "product",
    checked: attributes.galType === "product",
    onChange: e => setAttributes({
      galType: 'product'
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Main Image height', 'webcam-gallery'),
    min: 200,
    max: 700,
    step: 5,
    withInputField: true,
    onChange: val => setAttributes({
      prodMainDivHt: val
    }),
    value: attributes.prodMainDivHt
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Main Image Width', 'webcam-gallery'),
    min: 200,
    max: 800,
    step: 5,
    withInputField: true,
    onChange: val => setAttributes({
      prodMainDivWd: val
    }),
    value: attributes.prodMainDivWd
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      width: "32%",
      display: "inline-block",
      margin: "3px",
      marginBottom: "10px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "60px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    style: {
      display: "inline-block",
      float: "left",
      width: "90%",
      fontSize: "50px"
    },
    className: "dashicons dashicons-layout"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    style: {
      display: 'inline-block',
      float: "right",
      marginTop: "20px"
    },
    id: "masonry",
    type: "radio",
    value: "masonry",
    checked: attributes.galType === "masonry",
    onChange: e => setAttributes({
      galType: 'masonry'
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Image Width', 'webcam-gallery'),
    min: 100,
    max: 400,
    step: 5,
    withInputField: true,
    onChange: val => setAttributes({
      masImgWd: val
    }),
    value: attributes.masImgWd
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Gutter Width', 'webcam-gallery'),
    min: 1,
    max: 100,
    step: 1,
    withInputField: true,
    onChange: val => setAttributes({
      masonryGutter: val
    }),
    value: attributes.masonryGutter
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      width: "32%",
      display: "inline-block",
      margin: "3px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "60px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    style: {
      display: "inline-block",
      float: "left",
      width: "90%",
      fontSize: "80px",
      marginTop: "-15px"
    },
    className: "dashicons dashicons-slides"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    style: {
      display: 'inline-block',
      float: "right",
      marginTop: "30px"
    },
    id: "carousel",
    type: "radio",
    value: "carousel",
    checked: attributes.galType === "carousel",
    onChange: e => setAttributes({
      galType: 'carousel'
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Carousel height', 'webcam-gallery'),
    min: 100,
    max: 700,
    step: 1,
    withInputField: true,
    onChange: val => setAttributes({
      carouselHt: val
    }),
    value: attributes.carouselHt
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Carousel Width', 'webcam-gallery'),
    min: 100,
    max: 650,
    step: 1,
    withInputField: true,
    onChange: val => setAttributes({
      carouselWd: val
    }),
    value: attributes.carouselWd
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: `webcam-main-gallery-${clientId}`
  }, attributes.selectedGalImgs.map(x => x != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    style: {
      width: "33%"
    },
    src: x
  })))));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/block.json");

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Webcam', 'webcam-gallery'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('image gallery', 'webcam-gallery')],
  attributes: {
    carouselWd: {
      type: "Number",
      default: 600
    },
    carouselHt: {
      type: "Number",
      default: 500
    },
    masonryGutter: {
      type: "Number",
      default: 20
    },
    masImgWd: {
      type: 'Number',
      default: 140
    },
    prodMainDivWd: {
      type: 'Number',
      default: 500
    },
    prodMainDivHt: {
      type: 'Number',
      default: 500
    },
    galType: {
      type: 'String',
      default: 'masonry'
    },
    webCamImages: {
      type: 'Array',
      default: []
    },
    selectedGalImgs: {
      type: 'Array',
      default: []
    },
    masGalWidth: {
      type: 'Number',
      default: 30
    },
    ctcGalWidth: {
      type: 'Number',
      default: 148
    },
    carGalWidth: {
      type: 'Number',
      default: 50
    },
    filter: {
      type: 'String',
      default: ''
    },
    mediaUrl: {
      type: 'String',
      default: ''
    },
    blur: {
      type: 'String',
      default: ''
    },
    blurVal: {
      type: 'Number',
      default: 0
    },
    brightness: {
      type: 'String',
      default: ''
    },
    brightnessVal: {
      type: 'Number',
      default: 0
    },
    contrast: {
      type: 'String',
      default: ''
    },
    contrastVal: {
      type: 'Number',
      default: 0
    },
    grayScale: {
      type: 'String',
      default: ''
    },
    grayScaleVal: {
      type: 'Number',
      default: 0
    },
    hueRotate: {
      type: 'String',
      default: ''
    },
    hueRotateVal: {
      type: 'Number',
      default: 0
    },
    invert: {
      type: 'String',
      default: ''
    },
    invertVal: {
      type: 'Number',
      default: 0
    },
    opacity: {
      type: 'String',
      default: ''
    },
    opacityVal: {
      type: 'Number',
      default: 0
    },
    saturate: {
      type: 'String',
      default: ''
    },
    saturateVal: {
      type: 'Number',
      default: 0
    },
    sepia: {
      type: 'String',
      default: ''
    },
    sepiaVal: {
      type: 'Number',
      default: 0
    }
  },
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(), 'Webcam Gallery – hello from the saved content!');
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
        carouselDivCont.style.overflowY = "hidden";
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
                galImg.style.height = '53px';
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

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"create-block/webcam-gallery","version":"0.1.0","title":"Webcam Gallery","category":"media","icon":"camera-alt","description":"Block to take pictures with WebCam and create Galleries.","supports":{"color":{"text":true,"background":true,"link":true}},"textdomain":"webcam-gallery","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebcam_gallery"] = self["webpackChunkwebcam_gallery"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map