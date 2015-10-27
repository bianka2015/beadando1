var Browser = require('zombie');

Browser.localhost(process.env.IP, process.env.PORT);

describe('User visits index page', function() {
    var browser = new Browser();
    
    before(function() {
        return browser.visit('/');
    });
    
});



describe('User visits new error page', function (argument) {

    var browser = new Browser();
    
    before(function() {
        return browser.visit('/errors/list');
    });
    
    it('should go to the authentication page', function () {
        browser.assert.redirected();
        browser.assert.success();
        browser.assert.url({ pathname: '/login' });
    });
    /*
    it('should be able to sign up', function (done) {
        browser
            .fill('neptun', 'abcdef')
            .fill('password', 'jelszo')
            .fill('surname', 'gipsz')
            .fill('forename', 'jakab')
            .pressButton('button[type=submit]')
            .then(function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/login' });
                done();
            });
    });*/
});