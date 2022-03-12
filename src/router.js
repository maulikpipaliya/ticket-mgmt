const Router = {};

Router.path = function (path, cb){
    Router[path] = cb;
};