
class DictionaryImages {
    #images = [];
    #canvas
    #allImages = []
    get images() {
        return this.#images;
    }
    set images(value) {
        this.#images = value;
    }
    get canvas() {
        return this.#canvas;
    }
    set canvas(value) {
        this.#canvas = value;
    }
    get allImages() {
        return this.#allImages;
    }
    set allImages(value) {
        this.#allImages = value;
    }
    s1_4_Id1() {
        return new Promise((resolve, reject) => {
            this.allImages['img1'] = {
                'height': (this.canvas.height / 2) ,
                'width': (this.canvas.width / 2) ,
                'positionX': (0) ,
                'positionY': (0) ,
                'imgUrl': this.images[0],
                'typeImg': 's1_4_Id1',
                'id' : 'img1'
            };
            resolve(this.allImages['img1'])
        })
    }
    s1_4_Id2() {
        return new Promise((resolve, reject) => {
            this.allImages['img2'] = {
                'positionX': (this.canvas.width / 2) ,
                'height': (this.canvas.height / 2) ,
                'width': (this.canvas.width / 2) ,
                'positionY': (0) ,
                'imgUrl': this.images[1],
                'typeImg': 's1_4_Id2',
                'id' : 'img2'
            };
            resolve(this.allImages['img2'] )
        })
    }
    s1_4_Id3() {
        return new Promise((resolve, reject) => {
            this.allImages['img3'] =
            {
                'positionY': (this.canvas.height / 2) ,
                'height': (this.canvas.height / 2) ,
                'width': (this.canvas.width / 2) ,
                'positionX': (0) ,
                'imgUrl': this.images[2],
                'typeImg': 's1_4_Id3',
                'id' : 'img3'
            };
            resolve(this.allImages['img3'])
        })
    }
    s1_4_Id4() {
        return new Promise((resolve, reject) => {
            this.allImages['img4'] =
            {
                'positionY': (this.canvas.height / 2) ,
                'positionX': (this.canvas.width / 2) ,
                'height': (this.canvas.height / 2) ,
                'width': (this.canvas.width / 2) ,
                'typeImg': 's1_4_Id4',
                'imgUrl': this.images[3],
                'id' : 'img4'
            };
            resolve(this.allImages['img4']);
        })
    }
    s1_4_All() {
        this.allImages = [];
        this.s1_4_Id1();
        this.s1_4_Id2();
        this.s1_4_Id3();
        this.s1_4_Id4();
        return this.allImages
    }
    s1_3_Id1() {
        return new Promise((resolve, reject) => {
            this.allImages['img1'] =
            {
                'height': (this.canvas.width / 2.5) ,
                'width': (this.canvas.width / 2.5) ,
                'positionY': (0) ,
                'positionX': (0) ,
                'imgUrl':this.images[0],
                'typeImg': 's1_3_Id1',
                'id' : 'img1'
            };
            resolve(this.allImages['img1'])

        })
    }
    s1_3_Id2() {
        return new Promise((resolve, reject) => {
            this.allImages['img2'] =
            {
                'height': (this.canvas.width / 2.5) ,
                'width': (this.canvas.width / 2.5) ,
                'positionY': (350) ,
                'positionX': (0) ,
                'imgUrl':this.images[1],
                'typeImg' : 's1_3_Id2',
                'id' : 'img2'
    
            };
            resolve(this.allImages['img2'])
        })
    }
    m1_3_Id3() {
        return new Promise((resolve, reject) => {            
            this.allImages['img3'] =
            {
                'positionX': (parseInt(((this.canvas.width - this.canvas.width / 1.1) / 2) + this.allImages['img1'].width / 2)),
                'positionY': (parseInt((this.canvas.height - this.canvas.width) / 2)), 
                'height': (this.canvas.width),
                'width': (this.canvas.width), 
                'imgUrl':this.images[2],
                'typeImg' : 'm1_3_Id3',
                'id' : 'img3'
    
            };
                resolve(this.allImages['img3'])

        })
    }
    s1_3_All() {
        this.allImages = [];
        this.s1_3_Id1();
        this.s1_3_Id2();
        this.m1_3_Id3();
        return this.allImages
    }
    getFunction(funcName){
        return this[funcName];
      }
    resizeImage(scale, img){
        return new Promise((resolve, reject) => {
            this.allImages[img].height = this.allImages[img].height / scale;
            this.allImages[img].width = this.allImages[img].width / scale;
            resolve()
        })
    }
    saveImage(nameImage, image){
        return new Promise((resolve, reject) => {
            resolve(
                this.allImages[nameImage] = image
            )
        })
    }
}
