(function () {

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_HklM8dfu"; // Place your appKey from Kinvey here...
    let appSecret = "c6ae7e8d061045d49b7cab7aa782b68d"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "a47037db-baa6-4ee1-a1cc-63f62797a638.KFJm/mTKl1+cKORdGLNJramrhhpcHrM3w6nABRrRSO0="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    let authService = new AuthorizationService(baseUrl,appKey,appSecret,_guestCredentials); // TODO appId or appKey
    authService.initAuthorizationType("Kinvey");

    let requester = new Requester(authService);

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView,requester,baseUrl,appKey);

    let userView = new UserView(selector,mainContentSelector);
    let userController = new UserController(userView,requester,baseUrl,appKey);

    let postView = new PostView(selector, mainContentSelector);
    let postController = new PostController(postView,requester,baseUrl,appKey);

    initEventServices();

    onRoute("#/", function () {
        if(!authService.isLoggedIn()){
            homeController.showGuestPage();
        }
        else {
            homeController.showUserPage({
                fullname: authService.getCurrentUserFullName()
            });
        }
    });

    onRoute("#/post-:id", function () {
        let top = $("#post-" + this.params['id']).position().top;
        $(window).scrollTop(top);
    });
    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });
    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn());
    });
    onRoute("#/logout", function () {
        userController.logout();
    });
    onRoute("#/about-us", function () {
        userController.showAboutUsPage();
    });
    onRoute('#/posts/create', function () {
        if(!authService.isLoggedIn()) {
            userController.showLoginPage(authService.isLoggedIn());
            return;
        }

        let data = {
            fullname: authService.getCurrentUserFullName()
        };

        postController.showCreatePostPage(data, authService.isLoggedIn());
    });
    onRoute('#/posts/edit-:id', function () {
        if(!authService.isLoggedIn()) {
            userController.showLoginPage(authService.isLoggedIn());
            return;
        }
        postController.showEditPostPage(this.params['id']);
    });
    onRoute('#/posts/delete-:id', function () {
        if(!authService.isLoggedIn()) {
            userController.showLoginPage(authService.isLoggedIn());
            return;
        }
         postController.showDeletePostPage(this.params['id']);
    });
    onRoute('#/posts/view-:id', function () {
        postController.showViewPostPage(this.params['id'], authService.isLoggedIn());
    });

    bindEventHandler('login', function (ev, data) {
        userController.login(data);
    });
    bindEventHandler('register', function (ev, data) {
        userController.register(data);
    });
    bindEventHandler('createPost', function (ev, data) {
        postController.createPost(data);
    });
    bindEventHandler('editPost', function (ev, data) {
        postController.editPost(data);
    });
    bindEventHandler('deletePost', function (ev, data) {
        postController.deletePost(data);
    });
    bindEventHandler('createComment', function (ev, data) {
        postController.createComment(data);
    });

run('#/');
})();
