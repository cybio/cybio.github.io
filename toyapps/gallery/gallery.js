//The data is D at VCD model
var data = [];

window.onload = function () {
    document.onselectstart = function () {
        return false;
    };
    //生成模拟数据
    for (var i = 0; i < 11; i++) {
        data.push({
            img: i,
            caption: '大长腿 ' + i,
            desc: '这里是描述,大长腿 ' + i
        });
    }

    addPhotos();
};

function addPhotos() {
    var template = g('#wrap').innerHTML;
    var html = [];
    var nav = document.createElement('div');

    for (var i in data) {
        var photoHtml = template.replace('{{index}}', i)
                                .replace('__img__', data[i].img)
                                .replace('{{caption}}', data[i].caption)
                                .replace('{{desc}}', data[i].desc);
        html.push(photoHtml);

        //生成导航条
        var span = document.createElement('span');
        span.className = 'item';
        span.id = 'item_' + i;
        // span.onclick = (function (now) {
        //     turn(g('#photo_' + now));
        // })(i);

        // (function (now) {
        //     span.onclick = turn(g('#photo_' + now));
        // })(i);

        var photoElement = 'g(\'#photo_' + i + '\')';
        span.setAttribute('onclick', 'turn(' + photoElement + ')');
        nav.appendChild(span);
    }

    g('#wrap').innerHTML = html.join('');
    nav.className = 'nav';
    g('#wrap').appendChild(nav);

    rsort(randomRange([0, data.length - 1]));
}

//随机排序图片
function rsort(n) {
    var _photos = g('.photo');
    var photos = [];

    //每次重新排序前先把 photo-center 样式删除
    for (var i = 0; i < _photos.length; i++) {
        var p = _photos[i];
        p.onclick = function () { turn(this) };
        // p.className = p.className.replace(/\s*photo-center\s*/, ' ')
        //                             .replace(/\s*photo-back\s*/, ' ')
        //                             .replace(/\s*photo-front\s*/, ' ');
        //p.style = null;
        p.style.left = '0';
        p.style.top = '0';
        p.className = 'photo photo-front';
        p.style['transform'] = p.style['-webkit-transform'] = 'rotate(360deg) scale(1.3)';
        photos.push(p);
    }

    var photoCenter = photos.splice(n, 1)[0];   //根据随机得到的n, 抽取出新的中心区图片
    photoCenter.style.left = '50%';
    photoCenter.style.top = '50%';
    photoCenter.className += ' photo-center';   //增加中心区样式


    var photosLeft = photos.splice(0, Math.floor(photos.length / 2));   //抽取出左边的图片
    var photosRight = photos;   //剩下的就是右边的

    for (i in photosLeft) {
        p = photosLeft[i];
        p.style.left = randomRange(range().left.x) + 'px';
        p.style.top = randomRange(range().left.y) + 'px';
        p.style['transform'] = p.style['-webkit-transform'] = 'rotate(' + randomRange([-150, 150]) + 'deg) scale(1)';
    }
    for (i in photosRight) {
        p = photosRight[i];
        p.style.left = randomRange(range().right.x) + 'px';
        p.style.top = randomRange(range().right.y) + 'px';
        p.style['transform'] = p.style['-webkit-transform'] = 'rotate(' + randomRange([-150, 150]) + 'deg) scale(1)';
    }

    var items = g('.item');
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        item.className = item.className.replace(/\s*item-current\s*/, ' ')
                                                .replace(/\s*item-back\s*/, ' ');
    }
    g('#item_' + n).className += ' item-current';
}

function turn(element) {
    var className = element.className;
    var n = element.id.split('_')[1];

    if (!/photo-center/.test(className)) {
        return rsort(n);
    }

    var item = g('#item_' + n);
    if (/photo-front/.test(className)) {
        className = className.replace(/photo-front/, 'photo-back');
        item.className += ' item-back';
    } else {
        className = className.replace(/photo-back/, 'photo-front');
        item.className = item.className.replace(/\s*item-back\s*/, ' ');
    }
    element.className = className;
}

// common function
//接收一个选择器字符串, 返回DOM元素
function g(selector) {
    if (selector === null || (typeof selector) !== 'string') return null;
    var method = selector.charAt(0) === '#' ?
        'getElementById' : 'getElementsByClassName';
    return document[method](selector.substr(1));
}

//接收一个长度为 2 的整数数组, 返回一个包括这两个元素和它们之间的一个随机整数
function randomRange(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);
    var diff = max - min;
    return Math.round(Math.random() * diff + min);
}

//专用函数, 返回一个range对象,包含left, right分区的x, y范围, x, y是数组
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

    range.left.x = [0, (wrap.w - photo.w) / 2 - photo.w];
    range.left.y = [0, wrap.h - photo.h / 2];
    range.right.x = [(wrap.w + photo.w) / 2, wrap.w - photo.w / 2];
    range.right.y = range.left.y;

    return range;
}






















