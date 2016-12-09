window.onload = function () {
  addPhotos();
};

function turn(element) {
    var className = element.className;

    if (/photo-front/.test(className)) {
        className = className.replace(/photo-front/, 'photo-back');
    } else {
        className = className.replace(/photo-back/, 'photo-front');
    }

    return element.className = className;
}

function g(selector) {
    if (selector == null) return 'function g() need a string as argument.';
    var method = selector.charAt(0) == '.' ?
        'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}

function addPhotos() {
    var template = g('#wrap').innerHTML;
    var html = [];
    for (var s in data) {
        var t = template.replace('{{index}}', s)
                        .replace('{{img}}', data[s].img)
                        .replace('{{caption}}', data[s].caption)
                        .replace('{{desc}}', data[s].desc);
        html.push(t);
    }
    g('#wrap').innerHTML = html.join('');

    r_sort(randomRange([0, data.length - 1]));
}

function r_sort(n) {
    var _photos = g('.photo');
    var photos = [];
    for (var i = 0; i < _photos.length; i++) {
        _photos[i].className = _photos[i].className.replace(/\s*photo-center\s*/, '');
        photos.push(_photos[i]);
    }

    //var photoCenter = g('#photo' + n);
    var photoCenter = photos.splice(n, 1)[0];
    photoCenter.className += ' photo-center';

    var photosLeft = photos.splice(0, Math.ceil(photos.length / 2));
    var photosRight = photos;

    for (i in photosLeft) {
        var pLeft = photosLeft[i];
        pLeft.style.top = randomRange(range().left.y) + 'px';
        pLeft.style.left = randomRange(range().left.x) + 'px';
        pLeft.style['-webkit-transform'] = 'rotate(' + randomRange([30, 330]) + 'deg)';
    }
    for (i in photosRight) {
        var pRight = photosRight[i];
        pRight.style.top = randomRange(range().right.y) + 'px';
        pRight.style.left = randomRange(range().right.x) + 'px';
        pRight.style['-webkit-transform'] = 'rotate(' + randomRange([30, 330]) + 'deg)';
    }

    //console.log(photosLeft.length, photosRight.length);
}

function randomRange(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);
    var diff = max - min;
    return Math.round(Math.random() * diff + min);
}

function range() {
    var range = {
        left: {
            x: [],
            y: []
        },
        right: {
            x: [],
            y: []
        }
    };

    var wrap = {
        w: g('#wrap').clientWidth,
        h: g('#wrap').clientHeight
    };
    var photo = {
        w: g('.photo')[0].clientWidth,
        h: g('.photo')[0].clientHeight
    };

    range.left.x = [0 - photo.w / 2, wrap.w / 2 - photo.w / 2 - photo.w];
    range.left.y = [0 - photo.h / 2, wrap.h - photo.h / 2];
    range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w - photo.w / 2];
    range.right.y = range.left.y;

    return range;
}











