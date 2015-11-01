
var Browser = require('zombie');

Browser.localhost(process.env.IP, process.env.PORT);

describe('User visits index page', function() {
    var browser = new Browser();
    
    before(function() {
        return browser.visit('/');
    });
    
    it('should be successful', function() {
    browser.assert.success();
    });
    
    it('should see welcome page', function() {
        browser.assert.text('div.page-header > h1', 'Tantárgyak felvétele');
    });
});

describe('User visits new error page', function (argument) {

    var browser = new Browser();
    before(function() {
        return browser.visit('/errors/new');
    });
    
    it('should go to the authentication page', function () {
        browser.assert.redirected();
        browser.assert.success();
        browser.assert.url({ pathname: '/login' });
    });
    
    it('should be able to login with correct credentials', function (done) {
        browser
            .fill('neptun', 'aaaa')
            .fill('password', 'aaaa')
            .pressButton('button[type=submit]')
            .then(function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/errors/list' });
                done();
            });
    });
    
    it('should go to the new subject page', function () {
        return browser.visit('/errors/new');
    });
    
    it('should create a new subject', function (done) {
        browser
            .fill('nev', 'targy1')
            .fill('kod', 'abcd01')
            .fill('kredit', '2')
            .fill('leiras', 'valami')
            .pressButton('button[type=submit]')
            .then(function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/errors/list' });
                done();
            });
    });
});