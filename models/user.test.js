
var expect = require("chai").expect;
var bcrypt = require('bcryptjs');

var Waterline = require('waterline');
var waterlineConfig = require('../config/waterline');
var userCollection = require('./user');
var errorCollection = require('./error');

var User;

before(function (done) {
    // ORM indítása
    var orm = new Waterline();

    orm.loadCollection(Waterline.Collection.extend(userCollection));
    orm.loadCollection(Waterline.Collection.extend(errorCollection));
    waterlineConfig.connections.default.adapter = 'memory';

    orm.initialize(waterlineConfig, function(err, models) {
        if(err) throw err;
        User = models.collections.user;
        done();
    });
});

describe('UserModel', function () {

    function getUserData() {
        return {
            neptun: 'abc123',
            password: 'abcdefgh',
            surname: 'Proba',
            forename: 'Felhasznalo',
        };
    }

    beforeEach(function (done) {
        User.destroy({}, function (err) {
            done();
        });
    });
    
    it('should be able to create a user', function () {
        return User.create({
            neptun: 'abc123',
            password: 'abcdefgh',
            surname: 'Proba',
            forename: 'Felhasznalo',
        })
        .then(function (user) {
            expect(user.neptun).to.equal('abc123');
            expect(bcrypt.compareSync('abcdefgh', user.password)).to.be.true;
            expect(user.surname).to.equal('Proba');
            expect(user.forename).to.equal('Felhasznalo');
        });
    });

    it('should be able to find a user', function() {
        return User.create(getUserData())
        .then(function(user) {
            return User.findOneByNeptun(user.neptun);
        })
        .then(function (user) {
            expect(user.neptun).to.equal('abc123');
            expect(bcrypt.compareSync('abcdefgh', user.password)).to.be.true;
            expect(user.surname).to.equal('Proba');
            expect(user.forename).to.equal('Felhasznalo');
        });
    });

    describe('#validPassword', function() {
        it('should return true with right password', function() {
             return User.create(getUserData()).then(function(user) {
                 expect(user.validPassword('abcdefgh')).to.be.true;
             })
        });
        it('should return false with wrong password', function() {
             return User.create(getUserData()).then(function(user) {
                 expect(user.validPassword('titkos')).to.be.false;
             })
        });
    });

});
