/**
 * Application services
 * @author Martin Vach
 */
var myAppService = angular.module('myAppService', []);

/**
 * Device service
 */
myAppService.service('dataService', function ($filter, $log, $cookies, $window, cfg, _) {
    /// --- Public functions --- ///
    /**
     * Get language line by key
     */
    this.getLangLine = function (key, languages) {
        return getLangLine(key, languages);
    };

    /**
     * Show notifier
     */
    this.showNotifier = function (notifier) {
        var param = _.defaults(notifier, {position: 'top-right', message: false, type: 'success', wait: 5});
        if (notifier.message) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.notify(param.message, param.type, param.wait);
        }
    };


    /**
     * Log error
     */
    this.logError = function (error, message) {
        message = message || 'ERROR:';
        $log.error('---------- ' + message + ' ----------', error);
    };

    /**
     * Get OS (operating system)
     */
    this.getOs = function () {
        if (navigator && navigator.userAgent && navigator.userAgent != null)
        {
            var agents = ['android', 'iemobile', 'iphone', 'ipad', 'ipod', 'opera mini', 'blackberry'];
            var ua = navigator.userAgent.toLowerCase();
            for (var i in agents) {
                if (ua.match('/' + agents[i] + '/i')) {
                    return agents[i];
                }
            }
            return 'any';
        }
        return 'any';
    };


    /**
     * Mobile device detect
     */
    this.isMobile = function (a) {
         if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            return true;
        } else {
            return false;
        }
    };


    /**
     * Get user data
     */
    this.getUser = function () {
         var user = ($cookies.user !== 'undefined' ? angular.fromJson($cookies.user) : false);
        return user;
    };

    /**
     * Set user data
     */
    this.setUser = function (data) {
        if (!data) {
            delete $cookies['user'];
            return false;
        }
        $cookies.user = angular.toJson(data);
        return data;
    };

    /**
     * Unset user
     */
    this.unsetUser = function () {
         this.setUser(null);
         this.setZWAYSession(null);
    };

    /**
     * Get user SID (token)
     */
    this.getZWAYSession = function () {
         return $cookies.ZWAYSession;
    };
    /**
     * Set user SID (token)
     */
    this.setZWAYSession = function (sid) {
        if (!sid) {
            delete $cookies['ZWAYSession'];
            return false;
        }
        $cookies.ZWAYSession = sid;
    };
    /**
     * Get last login
     */
    this.getLastLogin = function () {
        return $cookies.lastLogin !== 'undefined' ? $cookies.lastLogin : false;
    };

    /*
     * Set last login
     */
    this.setLastLogin = function (val) {
        $cookies.lastLogin = val;
    };

    /**
     * Get remember me
     */
    this.getRememberMe = function () {
        var user = ($cookies.rememberme !== 'undefined' ? angular.fromJson($cookies.rememberme) : false);
        return user;
    };

    /**
     * Set remember me
     */
    this.setRememberMe = function (data) {
        if (!data) {
            delete $cookies['rememberme'];
            return false;
        }
        $cookies.rememberme = angular.toJson(data);
        return data;
    };

    /**
     * Logout
     */
    this.logOut = function () {
        this.setUser(null);
        this.setZWAYSession(null);
        $window.location.href = '#/?logout';
        $window.location.reload();

    };
    
    /**
     * Get device data
     */
    this.getDevicesData = function (data,showHidden) {
        var user = this.getUser();
        return _.chain(data)
                    .flatten()
                    .uniq(false, function (v) {
                        return v.id;
                    })
                    .reject(function (v) {
                        if(showHidden){
                            return (v.deviceType === 'battery') || (v.permanently_hidden === true);
                        }else{
                            return (v.deviceType === 'battery') || (v.permanently_hidden === true) || (v.visibility === false);
                        }
                         
                    })
                    .filter(function (v) {
                        var minMax;
                        var yesterday = (Math.round(new Date().getTime() / 1000)) - (24 * 3600);
                        var isNew = v.creationTime > yesterday ? true : false;
                        // Create min/max value
                        switch (v.probeType) {
                            case 'switchColor_red':
                                minMax = {min: 0, max: 255};
                                break;
                             case 'switchColor_green':
                                minMax = {min: 0, max: 255};
                                break;
                            case 'switchColor_blue':
                                minMax = {min: 0, max: 255};
                                break;
                            default:
                                minMax = {min: 0, max: 99};
                                break;
                        }
                        if (v.deviceType === 'thermostat') {
                            minMax = (v.metrics.scaleTitle === '°F' ? {min: 41, max: 104} : {min: 5, max: 40});
                        }
                        angular.extend(v,
                                {onDashboard: (user.dashboard.indexOf(v.id) !== -1 ? true : false)},
                                {minMax: minMax},
                                {hasHistory: (v.hasHistory === true ? true : false)},
                                {imgTrans: false},
                                {isNew: isNew},
                                {iconPath: $filter('getElementIcon')(v.metrics.icon, v, v.metrics.level)},
                                {updateCmd: (v.deviceType === 'switchControl' ? 'on' : 'update')}
                        );
                        if (v.metrics.color) {
                            angular.extend(v.metrics, {rgbColors: 'rgb(' + v.metrics.color.r + ',' + v.metrics.color.g + ',' + v.metrics.color.b + ')'});
                        }
                        if (v.metrics.level) {
                            angular.extend(v.metrics, {level: $filter('numberFixedLen')(v.metrics.level)});
                        }
                        return v;
                    });
    };
    
     /**
     * Get rooms
     */
    this.getRooms = function (data) {
        return  _.chain(data)
                    .flatten()
                    .filter(function (v) {
                    v.title = (v.id === 0 ?  getLangLine(v.title) : v.title);
                     v.img_src = 'storage/img/placeholder-img.png';
                    if(v.id === 0){
                        v.img_src = 'storage/img/rooms/unassigned.png';
                    }else if(v.img_type === 'default' && v.default_img){
                         v.img_src = 'storage/img/rooms/' + v.default_img;
                    }else if(v.img_type === 'user' && v.user_img){
                         v.img_src =  cfg.server_url + cfg.api_url + 'load/image/' + v.user_img;
                    }
                    return v;
                });

    };

    /**
     * Get chart data
     */
    this.getChartData = function (data, colors) {
       if (!angular.isObject(data, colors)) {
            return null;
        }
        var currTime = (Math.round(+new Date() / 1000) - 86400);
        var out = {
            labels: [],
            datasets: [{
                    fillColor: colors.fillColor,
                    strokeColor: colors.strokeColor,
                    pointColor: colors.pointColor,
                    pointStrokeColor: colors.pointStrokeColor,
                    data: []
                }]
        };
        var cnt = 0;
        angular.forEach(data, function (v, k) {
            cnt++;
            var time = $filter('date')(((v.id) * 1000), 'H:mm');
            //if (v.id > currTime && out.labels.indexOf(time) === -1) {
            //if (v.id > currTime && (cnt % 2)) {
            if (v.id > currTime && (cnt % 2) === 0) {
                out.labels.push(time);
                //out.labels.push($filter('date')(v.timestamp,'dd.MM.yyyy H:mm'));
                out.datasets[0].data.push(v.l);
            }

        });
        if (out.datasets[0].data.length > 0) {
            return out;
        }
        return null;
    };

    /**
     * Get module form data
     */
    this.getModuleFormData = function (module, data) {
        return getModuleFormData(module, data);
    };

    /**
     * Get module config input
     */
    this.getModuleConfigInputs = function (module, params, namespaces) {
        return getModuleConfigInputs(module, params, namespaces);
    };

    /**
     * Set array value
     */
    this.setArrayValue = function (data, key, add) {
        if (add) {
            return addArrayValue(data, key);
        } else {
            return removeArrayValue(data, key);
        }
    };

    /**
     * Get event level
     */
    this.getEventLevel = function (data, set) {
       var collection = (set ? set : []);
        angular.forEach(data, function (v, k) {
            collection.push({
                'key': v.level,
                'val': v.level
            });
        });

        return $filter('unique')(collection, 'key');
    };

    /**
     * Set EnOcean profile
     */
    this.setEnoProfile = function (data) {
        var profile = {};
        angular.forEach(data, function (v, k) {
            var profileId = parseInt(v._rorg, 16) + '_' + parseInt(v._func, 16) + '_' + parseInt(v._type, 16);
            profile[profileId] = v;
            profile[profileId]['id'] = profileId;
            profile[profileId]['rorgInt'] = parseInt(v._rorg, 16);
            profile[profileId]['funcInt'] = parseInt(v._func, 16);
            profile[profileId]['typeInt'] = parseInt(v._type, 16);
        });
        return profile;
    };

    /// --- Private functions --- ///
    
    /**
     * Get lang line
     */
    function getLangLine(key, languages) {
        if (angular.isObject(languages)) {
            if (angular.isDefined(languages[key])) {
                return languages[key] !== '' ? languages[key] : key;
            }
        }else{
            return cfg.route.t[key]||key; 
        }
    }
  
    /**
     * Get module form data
     */
    function getModuleFormData(module, data) {
        var collection = {
            'options': replaceModuleFormData(module.options, ['click', 'onFieldChange']),
            'schema': module.schema,
            'data': data,
            'postRender': postRenderAlpaca
        };
        return collection;
    }

    /**
     * Replace module object
     */
    function replaceModuleFormData(obj, keys) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i))
                continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(replaceModuleFormData(obj[i], keys));
            } else if (~keys.indexOf(i) &&
                    !angular.isArray(obj[i]) &&
                    typeof obj[i] === 'string' &&
                    obj[i].indexOf("function") === 0) {
                // overwrite old string with function                
                // we can only pass a function as string in JSON ==> doing a real function
                obj[i] = new Function('return ' + obj[i])();
            }
        }
        return obj;
    }

    /**
     * Add array value
     */
    function addArrayValue(data, key) {
        var collection = data;
        if (collection.indexOf(key) === -1) {
            collection.push(key);
        }
        return collection;
    }

    /**
     * Remove array value
     */
    function removeArrayValue(data, key) {
        var collection = [];
        angular.forEach(data, function (v, k) {
            if (v != key) {
                collection.push(v);
            }
        });
        return collection;
    }
});
