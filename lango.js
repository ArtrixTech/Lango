function Lango() { }

Lango.prototype.countryCode = undefined;
Lango.prototype.Languages = {
    lang_zh_cn: "ZH_CN",    // Chinese
    lang_en_us: "EN_US",    // English - United States
    lang_ja_jp: "JA_JP",     // Japanese - Japan
    lang_ko_kr: "KO_KR",     // Korean - Korea
    lang_es_us: "ES_US",     // Spanish - United States
    lang_es_es: "ES_ES"      // Spanish - Spanish
};

Lango.prototype.isLangExist = function (lang) {

    for (key in this.Languages) {
        console.log("L:" + this.Languages[key] + " In:" + lang)
        if (this.Languages[key] == lang) return true;
    }
    return false;

}


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

Lango.prototype.setCountryCode = function (code) {
    this.countryCode = code;
}

Lango.prototype.getGeoInfo = function () {

    // TODO: DEBUG
    $.getJSON("http://ip-api.com/json", function (result) {
        this.setCountryCode(result.countryCode);
    });

}

Lango.prototype.getLang = function () {

    var langFromCookie = $.cookie('lango_site_language');
    if (langFromCookie) return langFromCookie;

}


Lango.prototype.translate = function (lang) {

    if (this.isLangExist(lang)) {

        var translating = []
        $("span").each(function () {
            if ($(this).attr("lang_id")) translating.push($(this))
        });

        translating.forEach(function (item) {

            alert(item.attr("lang_id"))

        })

    }

    else throw Error = Error("Input language is not in support list.")

}