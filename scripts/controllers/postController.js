class PostController{
    constructor (postView, requester, baseUrl, appKey){
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts/";
        this._baseCommentServiceUrl = baseUrl + "/appdata/" + appKey + "/comments/";
    }

    showCreatePostPage(params, isLoggedIn){
        this._postView.showCreatePostPage(params, isLoggedIn);
    }
    showEditPostPage(id){
        let _that = this;
        let requestUrl = this._baseServiceUrl + id;

        this._requester.get(requestUrl,
            function success(data) {
                _that._postView.showEditPostPage(data);
            },
            function error(data) {
                showPopup('error', 'Error loading posts!');
                console.log(data)
            }
        );
    }
    showViewPostPage(params, isLoggedIn){
        let id = params._id;
        let _that = this;
        let requestUrl = this._baseServiceUrl + id;

        this._requester.get(requestUrl,
            function success(postData) {
                _that._requester.get(_that._baseCommentServiceUrl + "?query=" + JSON.stringify({postId: id}) + "&sort={\"_kmd.ect\": -1}",
                    function(commentsData) {
                        let viewParams = {
                            post: postData,
                            comments: commentsData,
                            user: params.user
                        }
                        _that._postView.showViewPostPage(viewParams, isLoggedIn);
                    }, function() {
                        showPopup('error', 'Error loading posts!');
                        console.log(data)
                    }
                )
            },
            function error(data) {
                showPopup('error', 'Error loading posts!');
                console.log(data)
            }
        );
    }
    showDeletePostPage(id){
        let _that = this;
        let requestUrl = this._baseServiceUrl + id;

        this._requester.get(requestUrl,
            function success(data) {
                _that._postView.showDeletePostPage(data);
            },
            function error(data) {
                showPopup('error', 'Error loading posts!');
                console.log(data)
            }
        );
    }
    showCreateCommentPage(specialid){
        let _that = this;
        let requestUrl = this._baseCommentServiceUrl + specialid;

        this._requester.get(requestUrl,
            function success(data) {
                _that._postView.showCreateCommentPage(data);
            },
            function error(data) {
                showPopup('error', 'Error loading comments!');
                console.log(data)
            }
        );
    }
    showDeleteCommentPage(postId){
        let _that = this;
        let requestUrl = this._baseCommentServiceUrl + postId;

        this._requester.get(requestUrl,
            function success(data) {
                _that._postView.showDeleteCommentPage(data);
            },
            function error(data) {
                showPopup('error', 'Error loading posts!');
                console.log(data)
            }
        );
    }

    createPost(requestData){
        if (requestData.title.length < 10){
            showPopup('error', 'Post title must consist of atleast 10 symbols.');
            return;
        }

        if (requestData.content.length < 50){
            showPopup('error', 'Post content must consist of atleast 50 symbols.');
            return;
        }

        let requestUrl = this._baseServiceUrl;

        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success', 'You have successfully created a new post.');
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', 'An error has occurred while attempting ' + 'to create a new post.');
            });
    }
    editPost(requestData){
        if (requestData.title.length < 10){
            showPopup('error', 'Post title must consist of atleast 10 symbols.');
            return;
        }

        if (requestData.content.length < 50){
            showPopup('error', 'Post content must consist of atleast 50 symbols.');
            return;
        }

        let requestUrl = this._baseServiceUrl + requestData._id;

        this._requester.put(requestUrl, requestData,
            function success(data) {
                showPopup('success', 'You have successfully edited a post.');
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', 'An error has occurred while attempting ' + 'to create a new post.');
            });
    }
    deletePost(requestData){

        let requestUrl = this._baseServiceUrl + requestData._id;
        this._requester.delete(requestUrl, requestData,
            function success(data) {
                showPopup('success', 'You have successfully deleted the post.');
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', 'An error has occurred while attempting ' + 'to delete a post.');
            });

    }
    createComment(requestData){
        if (requestData.title.length < 0){
            showPopup('error', 'Comment title must consist of atleast 5 symbols.');
            return;
        }

        if (requestData.comment.length < 1){
            showPopup('error', 'Comment content must consist of atleast 1 symbols.');
            return;
        }

        let requestUrl = this._baseCommentServiceUrl;

        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success', 'You have successfully created a comment.');
                redirectUrl("#/posts/view-" + requestData.postId);
            },
            function error(data) {
                showPopup('error', 'An error has occurred while attempting ' + 'to create a new comment.');
                redirectUrl("#/login");
                // redirectUrl(location.hash);
            });
    }
    deleteComment(requestData){
        let requestUrl = this._baseCommentServiceUrl + requestData.postId;
        this._requester.delete(requestUrl, requestData,
            function success(data) {
                showPopup('success', 'You have successfully deleted the comment.');
                // redirectUrl("#/");
                history.go(-1);
            },
            function error(data) {
                showPopup('error', 'An error has occurred while attempting ' + 'to delete a comment.');
            });
    }
}