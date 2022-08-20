//imzo.js start
var EIMZO_MAJOR = 3;
var EIMZO_MINOR = 37;


var errorCAPIWS = 'Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.';
var errorBrowserWS = 'Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.';
var errorUpdateApp = 'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
var errorWrongPassword = 'Пароль неверный.';


var AppLoad = function () {
    EIMZOClient.API_KEYS = [
        'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
        '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
        'null',      'E0A205EC4E7B78BBB56AFF83A733A1BB9FD39D562E67978CC5E7D73B0951DB1954595A20672A63332535E13CC6EC1E1FC8857BB09E0855D7E76E411B6FA16E9D',
        'bidding.uztelecom.uz', 'E7A1BA83E8691F5209F2523B4AF3659DB81621FF77EF0340C6BB45EDB92E08B4DFF4E9CE8029A15E1FB5A71E6F5B0A10DCA14231D6BFFA21B0253F6EAFF7CFDA'
    ];
    uiLoading();
    EIMZOClient.checkVersion(function(major, minor){
        var newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
        var installedVersion = parseInt(major) * 100 + parseInt(minor);
        if(installedVersion < newVersion) {
            uiUpdateApp();
        } else {
            EIMZOClient.installApiKeys(function(){
                uiLoadKeys();
            },function(e, r){
                if(r){
                    uiShowMessage(r);
                } else {
                    wsError(e);
                }
            });
        }
    }, function(e, r){
        if(r){
            uiShowMessage(r);
        } else {
            uiNotLoaded(e);
        }
    });
}


var uiShowMessage = function(message){
    alert(message);
}

var uiLoading = function(){
    // var l = document.getElementById('message');
    // l.innerHTML = 'Загрузка ...';
    // l.style.color = 'red';
}

var uiNotLoaded = function(e){
    // var l = document.getElementById('message');
    // l.innerHTML = '';
    // if (e) {
    //     wsError(e);
    // } else {
    //     uiShowMessage(errorBrowserWS);
    // }
}

var uiUpdateApp = function(){
    var l = document.getElementById('message');
    l.innerHTML = errorUpdateApp;
}

var uiLoadKeys = function(){
    uiClearCombo();
    EIMZOClient.listAllUserKeys(function(o, i){
        var itemId = "itm-" + o.serialNumber + "-" + i;
        return itemId;
    },function(itemId, v){
        return uiCreateItem(itemId, v);
    },function(items, firstId){
        uiFillCombo(items);
        uiLoaded();
        uiComboSelect(firstId);
    },function(e, r){
        uiShowMessage(errorCAPIWS);
    });
}

var uiComboSelect = function(itm){
    if(itm){
        var id = document.getElementById(itm);
        id.setAttribute('selected','true');
    }
}

var cbChanged = function(c){
    document.getElementById('keyId').innerHTML = '';
    document.getElementById('eri_fullname').value = "";
    document.getElementById('eri_inn').value = "";
    document.getElementById('eri_pinfl').value = "";
    document.getElementById('eri_hash').value = "";
    document.getElementById('eri_sn').value = "";
    document.getElementById('eri_sign').removeAttribute('disabled');
}

var uiClearCombo = function() {
    var combo = document.eri_form.key;
    combo.length = 0;
}

var uiFillCombo = function(items){
    var combo = document.eri_form.key;
    for (var itm in items) {
        combo.append(items[itm]);
    }
}

var uiLoaded = function(){
    // var l = document.getElementById('message');
    // l.innerHTML = '';
}

var uiCreateItem = function (itmkey, vo) {
    var now = new Date();
    vo.expired = dates.compare(now, vo.validTo) > 0;
    var itm = document.createElement("option");
    itm.value = itmkey;
    itm.text = vo.CN;
    if (!vo.expired) {

    } else {
        itm.style.color = 'gray';
        itm.text = itm.text + ' (срок истек)';
        itm.setAttribute('disabled', "disabled");
    }
    itm.setAttribute('vo',JSON.stringify(vo));
    itm.setAttribute('id',itmkey);
    return itm;
}

var wsError = function (e) {
    if (e) {
        uiShowMessage(errorCAPIWS + " : " + e);
    } else {
        uiShowMessage(errorBrowserWS);
    }
};

sign = function () {
    var itm = document.eri_form.key.value;
    if (itm) {
        var id = document.getElementById(itm);
        var vo = JSON.parse(id.getAttribute('vo'));
        var data = document.getElementById('eri_data').value;
        var keyId = document.getElementById('keyId').innerHTML;

        console.log(vo);

        document.getElementById('eri_fullname').value = vo.CN;
        document.getElementById('eri_inn').value = vo.TIN;
        document.getElementById('eri_pinfl').value = vo.PINFL;
        document.getElementById('eri_sn').value = vo.serialNumber;

        EIMZOClient.loadKey(vo, function(id){
            document.getElementById('keyId').innerHTML = id;
            EIMZOClient.createPkcs7(id, data, null, function(pkcs7) {
                document.getElementById('eri_hash').value = pkcs7;
                document.getElementById('eri_sign').setAttribute('disabled', '');
                document.getElementById('eri_sign').innerText = "Имзолаш (имзоланди)";
                document.getElementById('eri_form').submit();
            }, function(e, r){
                if(r){
                    if (r.indexOf("BadPaddingException") != -1) {
                        uiShowMessage(errorWrongPassword);
                    } else {
                        uiShowMessage(r);
                    }
                } else {
                    document.getElementById('keyId').innerHTML = '';
                    uiShowMessage(errorBrowserWS);
                }
                if(e) wsError(e);
            });
        }, function(e, r){
            if(r){
                if (r.indexOf("BadPaddingException") != -1) {
                    uiShowMessage(errorWrongPassword);
                } else {
                    uiShowMessage(r);
                }
            } else {
                uiShowMessage(errorBrowserWS);
            }
            if(e) wsError(e);
        });

    }
};
window.onload = AppLoad;