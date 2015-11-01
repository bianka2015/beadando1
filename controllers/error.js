
// controllers/error.js
var express = require('express');
var router = express.Router();

var decorateErrors = require('../viewmodels/error');
var id = 1;


// Hibalista oldal
router.get('/list', function (req, res) {
    // user.forename
    var neptun = req.user.neptun;
    console.log(neptun);
    var i = req.query.id;
    //console.log('URL param: id: ' + req.query.id);
    //console.log("i: ");
    //console.log(i);
    if (i != undefined) {
        //console.log("if i != undefined");
        req.app.models.error.destroy({id: i}).exec(function(err, errors) {
            if (err) {
                console.log("hiba");
            }
            //console.log(i);
            //console.log("nincs hiba");
        });
    }
    
    req.app.models.error.find().then(function (errors) {
        var er = decorateErrors(errors);
        //var neptun = req.query.user;
        var j = 0;
        for(var key in er)
        {
//            console.log(er[key]);
            //console.log(req.user);
            if(er[key].user==req.user) {
                //targyak. = targyak + er[key];
            }
            else {
//                console.log("elotte: ");
                //console.log(er)
                er.splice(j, 1);
//                console.log("utana: ");
                //console.log(er);
            }
            j++;
        }
        res.render('errors/list', {
            errors: er,
            messages: req.flash('info')
        });
    });
    
    /*
    
    
    var i = req.query.i;
    if (i != undefined) {
        req.app.models.error.destroy({i: i}).exec(function(err, errors) {
            if (err) {
                console.log("hiba");
            }
            console.log(i);
            console.log("nincs hiba");
        });
    }
    */
    /*
    var i = req.query.i;
    if (i != undefined) {
        req.app.models.error.destroy({i: i}).exec(function(err, errors) {
            if (err) {
                console.log("hiba");
            }
            console.log(i);
            console.log("nincs hiba");
        });
    }
    req.app.models.error.find().then(function (errors) {
        res.render('errors/list', {
            errors: decorateErrors(errors),
            messages: req.flash('info'),
        });
    });
    */
});

// Hiba felvitele
router.get('/new', function(req, res) {
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
    res.render('errors/new', {
        validationErrors: validationErrors,
        data: data,
    });
});

router.get('/edit', function(req, res) {
    /*console.log('hello cica');
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    console.log(errors.get(i));
    var i = req.params.i;
    res.render('errors/edit', {
        validationErrors: validationErrors,
        data: req.app.models.error[i],
    });
    */
    var i = req.query.id;
    //console.log('URL param: id: ' + req.query.id);
    //console.log("get i:");
    //console.log(i);
    req.app.models.error.find().then(function (errors) {
        var er = decorateErrors(errors);
        for(var key in er)
        {
            if(er[key].id==i)
            break;
        }
        //console.log(er[key]);
        res.render('errors/edit', {
            data: er[key],
            messages: req.flash('info')
        });
    });
});

// Hiba felvitele POST
router.post('/new', function(req, res) {
   // adatok ellenőrzése
    req.checkBody('nev', 'Hibás név').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('kod', 'Hibás kod').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('kredit', 'Hibás kredit').notEmpty().withMessage('Kötelező megadni!');
    //req.sanitizeBody('leiras').escape();
    //req.checkBody('leiras', 'Hibás leírás').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    //console.log(validationErrors);
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/errors/new');
    }
    else {
        //console.log(req.user);
        req.app.models.error.create({
            status: 'new',
            nev: req.body.nev,
            kod: req.body.kod,
            kredit: req.body.kredit,
            leiras: req.body.leiras,
            i: id++,
            user: req.user
        }).then(function (error) {
            //siker
            req.flash('info', 'Tantárgy sikeresen felvéve!');
            console.log("Tantárgy sikeresen felvéve!");
            //res.redirect('/errors/list');
            res.redirect('/errors/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err);
        });
        //req.app.models.error.find().then(function (errors) {
        //res.render('errors/list');
    //});
    
    }
});

router.post('/edit', function(req, res) {
   // adatok ellenőrzése
    req.checkBody('nev', 'Hibás név').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('kod', 'Hibás kod').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('kredit', 'Hibás kredit').notEmpty().withMessage('Kötelező megadni!');
    //req.sanitizeBody('leiras').escape();
    //req.checkBody('leiras', 'Hibás leírás').notEmpty().withMessage('Kötelező megadni!');
    var i = req.query.id;
    //console.log(i);
    var validationErrors = req.validationErrors(true);
    //console.log(validationErrors);
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/errors/new');
    }
    else {
        //var i = req.params.i;
        req.app.models.error.update({id: i}, {nev: req.body.nev, kod: req.body.kod, kredit: req.body.kredit, leiras: req.body.leiras}).exec(function(err, errors) {
            if (err) {
                console.log("hiba");
            }
            //console.log(i);
            //console.log("nincs hiba");
        });
        res.redirect('/errors/list');
        /*req.app.models.error.find().then(function (errors) {
        //var er = decorateErrors(errors);
        //var j = 0;
        for(var key in errors)
        {
            //j++;
            if(errors[key].i==i) {
             console.log(key);
             //req.app.models.error[key].nev = req.body.nev;
             errors[key].kod = req.body.kod;
             errors[key].kredit = req.body.kredit;
             errors[key].leiras = req.body.leiras;
             console.log("uj nev");
             console.log(req.app.models.error[key]);
             console.log(errors[key].kredit);
             break;
            }
        }
        req.flash('info', 'Tantárgy sikeresen módosítva!');
        console.log('Tantárgy sikeresen módosítva!');
        
            res.redirect('/errors/list');
        //delete errors[er[key]];
        //console.log("kitorolt elem: ");
        //console.log(er[key]);
        //console.log("maradek: ");
        //console.log(errors);
       // errors = errors.splice(j, 1);
        //req.app.models.error = errors;
        //console.log(er[key]);
        //res.render('errors/edit', {
        //    data: er[key],
        //    messages: req.flash('info')
        //});
    //});
        //console.log(er.has(key));
        //console.log(JSON.stringify(er[key]))
        /*req.app.models.error.create({
            status: 'new',
            nev: req.body.nev,
            kod: req.body.kod,
            kredit: req.body.kredit,
            leiras: req.body.leiras,
            i: key
        })
        .then(function (error) {
            //siker
            req.flash('info', 'Tantárgy sikeresen módosítva!');
            res.redirect('/errors/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err)
        });*/
        /*})/*.then(function (errors) {
            //siker
            req.flash('info', 'Tantárgy sikeresen módosítva!');
            res.redirect('/errors/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err)
        });*/
    }
});

module.exports = router;

