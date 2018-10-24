function Lango() { }


Lango.prototype.Language = {
    lang_zh_cn: "ZH_CN",
    lang_en_us: "EN_US"
};

Lango.prototype.init = function () {

    // Detect if the JQuery.cookie is exist
    function loadScript(loc) {
        var newScript = document.createElement("script");
        newScript.setAttribute("type", "text/javascript");
        newScript.setAttribute("src", loc);
        document.body.appendChild(newScript);
    }
    !window.jQuery && loadScript("jquery-3.3.1.min.js");
    !window.jQuery.cookie && loadScript("jquery.cookie.js");

}



Lango.prototype.strToLang = function (str) {
   // for (key in this.Language)if (str == key) return this.Language[key];
   // throw Error = Error("Input Language Type Error")
}


Lango.prototype.getLang = function () {

    var langFromCookie = $.cookie('lango_site_language');
    if (langFromCookie) return langFromCookie;

    

}


Lango.prototype.translate = function (lang) {

    var translating = []
    $("span").each(function () {
        if ($(this).attr("lang_id")) translating.push($(this))
    });

    translating.forEach(function (item) {

        alert(item.attr("lang_id"))

    })

}