var CourseAudio = (function () {
    var CourseAudio = function CourseAudio(opts) {

        var node = opts.node;
        var isFlash = true;

        if (document.createElement('audio').canPlayType && document.createElement('audio').canPlayType('audio/mpeg')){
            isFlash = false;
        }


        Object.defineProperty(this, "node", {
            get: function () {
                return node;
            }
        });

        Object.defineProperty(this, "useFlash", {
            get: function () {
                return isFlash;
            }
        });


        var onPause;

        Object.defineProperty(this, "onPause", {
            get: function () {
                return onPause;
            },
            set: function (value) {
                onPause = value;
            }
        });


        var onPlay;

        Object.defineProperty(this, "onPlay", {
            get: function () {
                return onPlay;
            },
            set: function (value) {
                onPlay = value;
            }
        });



        var player;
        Object.defineProperty(this, "player", {
            get: function () {
                return player;
            },
            set: function (value) {
                player = value;
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
            if(this.useFlash){
                this.node.style.display = 'block';
                var swfVersionStr = "0";
                var xiSwfUrlStr = "";
                var params = {};
                params.quality = "high";
                params.bgcolor = "#ffffff";
                params.allowscriptaccess = "always";
                var attributes = {};
                attributes.id = this.node.id+'_player';
                attributes.name = this.node.id+'_player';
                swfobject.embedSWF(
                    opts.url, this.node.id,
                    opts.width, opts.height,
                    swfVersionStr, xiSwfUrlStr,
                    opts, params, attributes);
            }else{
                this.player = new Audio();

                this.onPause && (this.player.addEventListener('pause',this.onPause));
                this.onPause && (this.player.addEventListener('ended',this.onPause));
                this.onPlay && (this.player.addEventListener('play',this.onPlay));

            }
        };


        this.load = function (url) {
            if(this.player){
                if(this.useFlash)
                    this.player.loadAudio(url,true);
                else{
                    this.node.style.display = 'block';
                    this.player.setAttribute("src",url);
                    this.player.setAttribute("autoplay",true);
                  //  this.player.setAttribute("loop",true);
                    this.player.load();
                }
            }else
                this.buffer = url;
        };

        this.play = function (){
            if(!this.player) return;
            if(this.useFlash) this.player.call('play');
            else this.player.play();
        };

        this.pause = function (){
            if(!this.player) return;
            if(this.useFlash) this.player.call('pause');
            else this.player.pause();
        };

        this.stop = function (){
            if(!this.player) return;
            if(this.useFlash) this.player.call('stop');
            else{
                this.player.pause();
                this.player.currentTime = 0;
            }
        };

        this.hide = function(){
            if(!this.player) return;

            if(this.useFlash)
                this.player.hide();
            else
                this.node.style.display = 'none';
        };

        this.initialize = function(e){
            if(this.player) return;
            this.player = document.getElementById(this.node.id+'_player');
            if(this.buffer){
                this.load(buffer);
                this.buffer = false;
            }
        }



    };

    return CourseAudio;
}());