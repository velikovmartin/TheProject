class UserView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }
    showLoginPage(isLoggedIn){
        let _that = this;
        let templateUrl;

        if(isLoggedIn){
            templateUrl = "templates/form-user.html";
        }
        else {
            templateUrl = "templates/form-guest.html";
        }

        $.get(templateUrl, function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/login.html', function (template) {
                let rendered = Mustache.render(template,null);
                $(_that._mainContentSelector).html(rendered);

                let doStuff = function(ev) {
                    let username = $('#username').val();
                    let password = $('#password').val();

                    let data = {
                    username: username,
                    password: password
                    };
                    triggerEvent('login', data);
                };
                // to login with Enter button
                $("#password").on("keypress", function(ev) {
                    if(event.keyCode == 13)
                doStuff().submit()});

                $('#login-request-button').on('click', doStuff);
            });
        });
    }
    showRegisterPage(isLoggedIn){
        let _that = this;

        let templateUrl;

        if(isLoggedIn){
            templateUrl = "templates/form-user.html";
        }
        else {
            templateUrl = "templates/form-guest.html";
        }

        $.get(templateUrl, function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/register.html', function (template) {
                let rendered = Mustache.render(template,null);
                $(_that._mainContentSelector).html(rendered);
                $('#register-request-button').on('click', function (ev) {
                    let username = $('#username').val();
                    let password = $('#password').val();
                    let confirmPassword = $('#pass-confirm').val();
                    let fullname = $('#full-name').val();

                    let data = {
                        username: username,
                        password: password,
                        confirmPassword: confirmPassword,
                        fullname: fullname
                    };
                    triggerEvent('register', data);
                });
            });
        });
    }
    showAboutUsPage(){
        let _that = this;

        let templateUrl = "templates/about-us.html";
        

        $.get(templateUrl, function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/about-us.html', function (template) {
                let rendered = Mustache.render(template,null);
                $(_that._mainContentSelector).html(rendered);
                
                    triggerEvent('aboutUs');
            });
        });
    }
}