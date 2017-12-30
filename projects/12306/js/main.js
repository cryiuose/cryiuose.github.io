function resizeObj(obj, resizeType, minPaddingTop, minPaddingBottom, heightFunction) {
    function reset(obj, resizeType, minPaddingTop, minPaddingBottom, heightFunction) {
        var deviceHeight = document.documentElement.clientHeight;
        var padding = deviceHeight
        padding -= obj.height();
        padding -= heightFunction();
        if (resizeType == 'both') {
            if (padding < minPaddingTop + minPaddingBottom)
                obj.css('padding-top', minPaddingTop).css('padding-bottom', minPaddingBottom);
            else {
                padding /= 2;
                obj.css('padding-top', padding).css('padding-bottom', padding);
            }

        } else if (resizeType == 'top') {
            if (padding < minPaddingTop)
                obj.css('padding-bottom', minPaddingBottom);
            else
                obj.css('padding-bottom', padding - minPaddingTop);
        } else if (resizeType == 'bottom') {
            if (padding < minPaddingBottom)
                obj.css('padding-top', minPaddingTop);
            else
                obj.css('padding-top', padding - minPaddingBottom);
        }
    }
    reset(obj, resizeType, minPaddingTop, minPaddingBottom, heightFunction);
    var inv = setInterval(function () {
        reset(obj, resizeType, minPaddingTop, minPaddingBottom, heightFunction);
    }, 100);
}
function loadnav(gohome, f) {
    setData('gohome',gohome)
    var user = getData('username');
    if (user == 'notFound')
        user = null;
    if (user) {
        user = '.' + user;
        $('#nav').load('page/nav' + user + '.html', f);
    } else {
        $('#nav').load('page/nav.html', f);
    }
}
function setData(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}
function getData(key) {
    var json = localStorage.getItem(key);
    if (json) {
        return JSON.parse(json);
    } else {
        return 'notFound';
    }
}
function removeData(key) {
    return localStorage.removeItem(key);
}
function login(str) {
    setData('username', 'anna');
    loadnav(true,null);
}
function logout() {
    removeData('username');
    if (getData('gohome')!=false) {
        location = 'index.html';
    } else {
        loadnav(false,null);
    }
}