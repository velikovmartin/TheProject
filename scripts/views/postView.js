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
                    let specialid = $('#specialid').val();
                    //let date = (new Date()).toISOString()
                    let date = moment().format("MMMM Do YYYY");
                    //TODO: format na data

                    let data = {
                        title: title,
                        author: author,
                        content: content,
                        specialid: specialid,
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
                    let specialid = $('#specialid').val();
                    let date = new Date() //moment().format("MMMM Do YYYY");

                    let data = {
                        title: title,
                        author: author,
                        content: content,
                        specialid: specialid,
                        date: params.date,
                        modified: moment().format("MMMM Do YYYY"),
                        _id: params._id
                    };

                    triggerEvent('editPost', data);
                });
            });
        });
    }
    showDeletePostPage(params){
        let _that = this;
    
        $.get("templates/form-user.html",function (template) {
            let renderedWrapper = Mustache.render(template, params);
            $(_that._wrapperSelector).html(renderedWrapper);
    
            $.get('templates/delete-post.html', function (template) {
                var renderedContent = Mustache.render(template, params);
                $(_that._mainContentSelector).html(renderedContent);
    
                $('#create-delete-post-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let author = $('#author').val();
                    let content = $('#content').val();
                    let date = new Date() //moment().format("MMMM Do YYYY");

                    let data = {
                        title: title,
                        author: author,
                        content: content,
                        date: params.date,
                        modified: moment().format("MMMM Do YYYY"),
                        _id: params._id
                    };
                    triggerEvent('deletePost', data);
                });
            });
        });
    }
    showCreateCommentPage(params){
        let _that = this;

        $.get("templates/form-user.html",function (template) {
            let renderedWrapper = Mustache.render(template, params);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/comment-post.html', function (template) {
                var renderedContent = Mustache.render(template, params);
                $(_that._mainContentSelector).html(renderedContent);

                $('#create-new-comment-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let author = $('#author').val();
                    let comments = $('#comments').val();
                    let content = $('#content').val();
                    let specialid = $('#specialid').val();
                    let date = new Date() //moment().format("MMMM Do YYYY");

                    let data = {
                        title: title,
                        author: author,
                        comments: comments,
                        content: content,
                        specialid: specialid,
                        date: params.date,
                        modified: moment().format("MMMM Do YYYY"),
                        _specialid: params._specialid
                    };

                    triggerEvent('createComment', data);
                });
            });
        });
    }
}
