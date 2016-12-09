window.onload = getMyLocation;

var shenyangCoords = {
    longitude:  123.409742,
    latitude:   41.913641
};

var map = null;
var watchId = null;
var opts = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 0
};

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError, opts);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("你的浏览器不支持地理定位");
    }
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError, opts);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

var prevCoords = null;
function displayLocation(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;

    var div = document.getElementById("location");
    div.innerHTML = "你所在位置的经度: " + longitude
        + ", 纬度: " + latitude;
    div.innerHTML += " (精度误差约 " + position.coords.accuracy + " 米,";
    div.innerHTML += " 在 " + opts.timeout + " 毫秒内定位成功)";

    var km = computeDistance(position.coords, shenyangCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "你距离 沈阳 " + km.toFixed(3) + " 公里";

    if (map == null) {
        showMap(position.coords);
        prevCoords = position.coords;
    } else {
        var meters = computeDistance(position.coords, prevCoords) * 1000;
        if (meters > 20) {
            scrollMapToPosition(position.coords);
            prevCoords = position.coords;
        }
    }
}

function displayError(error) {
    var errorTypes = {
        0: "未知错误",
        1: "用户拒绝共享位置",
        2: "位置信息不可用",
        3: "请求超时"
    };

    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " : " + error.message;
    } else if (error.code == 3) {
        opts.timeout += 100;
        errorMessage += " : 时间自动增加 " + opts.timeout + " 毫秒再次获取";
        navigator.geolocation.getCurrentPosition(displayLocation, displayError, opts);
    }

    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    var startLongRads = degreesToRadians(startCoords.longitude);
    var startLatRads = degreesToRadians(startCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);

    var Radius = 6371;  //地球半径公里数
    return Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;
}

//经纬度 转 弧度
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

//map
function showMap(coords) {
    map = new BMap.Map("map");    // 创建Map实例
    var point = new BMap.Point(coords.longitude, coords.latitude);
    map.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);    //开启鼠标滚轮缩放

    addMarker(point, new Date().toLocaleString(), "我在 " + coords.longitude + "(经), " + coords.latitude + "(纬)", "来找我啊");
}

function addMarker(point, title, content, message) {
    var options = {
        width: 260,
        height: 100,
        title: title,
        enableMessage: true,
        message: message
    };
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    var infoWindow = new BMap.InfoWindow(content, options);
    marker.addEventListener("click", function () {
        map.openInfoWindow(infoWindow, point);
    });
}

function scrollMapToPosition(coords) {
    var point = new BMap.Point(coords.longitude, coords.latitude);
    map.panTo(point);
    addMarker(point, new Date().toLocaleString(), "我在 " + coords.longitude + "(经), " + coords.latitude + "(纬)", "来找我啊");
}














