
module.exports = {
    notify:function(error, options){
        this.notified = true
    },
    startSession:function(){
        this.sessionStarted = true
    },
    notified: false,
    sessionStarted: false
}
