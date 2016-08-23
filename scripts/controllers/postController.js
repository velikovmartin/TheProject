class PostController{
    constructor (postView, requester, baseUrl, appKey){
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts/";
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
                showPopup('success', 'You have successfully created a new post.');
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', 'An error has occurred while attempting ' + 'to create a new post.');
            });
    }
}