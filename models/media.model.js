"use strict";
class Media {
    constructor(photos) {
        this.photos = photos;
    }
    /**
     * Returns collection of urls for a given image size
     * @param size of the required image
     */
    getImages(size) {
        return this.photos.filter(val => {
            return val['@size'] === ImageSize[size];
        })
            .map(item => item.$t);
    }
    getFirstImage(size, defaultUrl) {
        const images = this.getImages(size);
        return (images.length > 0) ? images[0] : defaultUrl;
    }
    getSecondImage(size, defaultUrl) {
        const images = this.getImages(size);
        return (images.length > 0) ? images[1] : defaultUrl;
    }
}
exports.Media = Media;
var ImageSize;
(function (ImageSize) {
    /** thumbnail (max 50 pixels high) */
    ImageSize[ImageSize["t"] = 0] = "t";
    /** petnote thumbnail (max 60 pixels wide) */
    ImageSize[ImageSize["pnt"] = 1] = "pnt";
    /** featured pet module (max 95 pixels wide) */
    ImageSize[ImageSize["fpm"] = 2] = "fpm";
    /** petnote (max 300x250) */
    ImageSize[ImageSize["pn"] = 3] = "pn";
    /** large (max 500x500) */
    ImageSize[ImageSize["x"] = 4] = "x";
})(ImageSize = exports.ImageSize || (exports.ImageSize = {}));
//# sourceMappingURL=media.model.js.map