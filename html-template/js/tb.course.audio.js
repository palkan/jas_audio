var CourseAudio = (function () {
    var CourseAudio = function CourseAudio(opts) {

        var node = opts.node;

        Object.defineProperty(this, "node", {
            get: function () {
                return node;
            }
        });

        var swf;
        Object.defineProperty(this, "swf", {
            get: function () {
                return swf;
            },
            set: function (value) {
                swf = value;
            }
        });

        var buffer;
        Object.defineProperty(this, "buffer", {
            get: function () {
                return buffer;
            },
            set: function (value) {
                buffer = value;
            }
        });

        this.create = function(opts){
            var swfVersionStr = "0";
            var xiSwfUrlStr = "";
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "always";
            var attributes = {};
            attributes.id = opts.name;
            attributes.name = opts.name;
            swfobject.embedSWF(
                opts.url, this.node.id,
                opts.width, opts.height,
                swfVersionStr, xiSwfUrlStr,
                opts, params, attributes);
        };


        this.load = function (url) {
            if(this.swf)
                this.swf.loadAudio(url,true);
            else
                this.buffer = url;
        };


        this.call = function (method){
            this.swf && this.swf.call(method);
        };


        this.initialize = function(e){
            if(this.swf) return;
            this.swf = document.getElementById(this.node.id+'_audio');
            if(this.buffer){
                this.load(buffer);
                this.buffer = false;
            }
        }



    };

    return CourseAudio;
}());