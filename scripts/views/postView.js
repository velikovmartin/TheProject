class PostView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }
    showCreatePostPage(params, isLoggedIn){
        let _that = this;
        let templateUrl;

        if(isLoggedIn){
            templateUrl = "templates/form-user.html";
        }
        else {
            templateUrl = "templates/form-guest.html";
        }

        $.get(templateUrl,function (template) {
            let renderedWrapper = Mustache.render(template, params);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/create-post.html', function (template) {
                var renderedContent = Mustache.render(template, params);
                $(_that._mainContentSelector).html(renderedContent);

                $('#create-new-post-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let author = $('#author').val();
                    let content = $('#content').val();
                    //let date = (new Date()).toISOString()
                    let date = moment().format("MMMM Do YYYY");
                    //TODO: format na data

                    let data = {
                        title: title,
                        author: author,
                        content: content,
                        date: date
                    };

                    triggerEvent('createPost', data);
                });
            });
        });
    }

    showEditPostPage(params){
        let _that = this;

        $.get("templates/form-user.html",function (template) {
            let renderedWrapper = Mustache.render(template, params);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/create-post.html', function (template) {
                var renderedContent = Mustache.render(template, params);
                $(_that._mainContentSelector).html(renderedContent);

                $('#create-new-post-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let author = $('#author').val();
                    let content = $('#content').val();
                    let date = moment().format("MMMM Do YYYY");

                    let data = {
                        title: title,
                        author: author,
                        content: content,
                        date: params.date,
                        modified: new Date(),
                        _id: params._id
                    };

                    triggerEvent('editPost', data);
                });
            });
        });
    }
}