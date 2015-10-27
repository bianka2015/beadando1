# Dokumentáció

## 1. Követelményanalízis

### 1.1. Követelmények összegyűjtése
#### 1.1.1. Funkcionális elvárások
Egy kis webes alkalmazás elkészítése a cél szerveroldali technológiák segítségével.
- Az alkalmazással a regisztrált felhasználók tudjanak felvenni, szerkeszteni, törölni tantárgyakat.
- Legyen lehetőség regisztrációra.
- Bizonyos funkciók csak regisztrációt követően legyenek elérhetőek: 
    - új tantárgy felvétele
    - tantárgy módosítása
    - tantárgy törlése
    - felvett tantárgyak listázása

#### 1.1.2. Nem funkcionális követelmények
- Használhatóság: a látogatók által elért felület legyen jól átlátható, önmagyarázó (egy átlagos látogató felhasználói dokumentáció nélkül is tudja használni).
- Biztonság: a felhasználók jelszavai ne legyenek visszafejthetőek. 
- Karbantarthatóság: a weboldal legyen könnyen bővíthető. Egy új oldallal, menüvel, vagy használati esettel való bővítés legyen egyértelmű, és gyorsan végrehajtható.

### 1.2. Szakterületi fogalomjegyzék

### 1.3. Használatieset-modell
#### 1.3.1. Szerepkörök
Vendég: Az a felhasználó, aki azonosítatlanul használja az alkalmazást. A vendég felhasználó csak a publikus oldalakat és funkciókat érheti el. Ilyenek a bejelentkezés és regisztráció.
Bejelentkezett felhasználó: Felvehet új tantárgyat, a listázási és szerkesztési oldalakat is használhatja.

#### 1.3.2. Használati eset diagramok
![Használati diagram](docs/images/hasznalati_diagram.png)

#### 1.3.3. Folyamatok pontos menete
![Új tárgy felvétele](docs/images/ujtargyfolyamat.png)

Cím: Új tárgy felvétele
Cél: Új tantárgy felvétele.
Előfeltétel: Csak belépett felhasználó tud új tantrágyat fölvenni.
Utófeltétel: A tárgy mentése sikeres.

Folyamat leírása:
Az alábbi lépések végrehajtása szükséges:
- Az alábbi adatokat kell a felhasználónak kötelezően megadnia egy új bemutató készítésekor: név, kód, kredit.
- Opcionális adatok: leírás
- Tantárgy mentése

## 2. Tervezés

### 2.1. Architektúra terv
#### 2.1.1. Komponensdiagram

#### 2.1.2. Oldaltérkép
Publikus:
- Főoldal
- Login
- Registráció

Csak bejelentkezettek látják:
- Tárgyak listája
    - új tárgy
    - tárgy szerkesztése
    - tárgy törlése

#### 2.1.3. Végpontok
GET /: főoldal
GET /login: bejelentkező oldal
GET /signup: regisztráló oldal
POST /login: bejelentkezési adatok elküldése
POST /signup: regisztrációs adatok elküldése
GET /errors/list: saját tárgylista oldal
GET /errors/new: új tárgy felvitele
POST /errors/new: új tárgy felvitele, adatok küldése
GET /errors/edit: tárgy szerkesztése
POST /errors/edit: tárgy szerkesztése, adatok küldése

### 2.2. Felhasználóifelület-modell
Főoldal
![Használati diagram](docs/images/fooldal.png)

Login
![Használati diagram](docs/images/login.png)

Regisztráció
![Használati diagram](docs/images/regisztració.png)

Lista 
![Használati diagram](docs/images/lista.png)

Új tárgy felvétele, tárgy szerkesztese
![Használati diagram](docs/images/ujtargy.png)

### 2.3. Osztálymodell
#### 2.3.1. Adatmodell
![Adatmodell](docs/images/adatmodell.png)

#### 2.3.2. Adatbázisterv
![Adatbázisterv](docs/images/adatbazisterv.png)

#####Táblák
Felhasznalo
Leírás: A felhasználó adatai ebben a táblában kerülnek tárolásra.
Attribútumok:
    - id (egész): felhasználó azonosítója az adatbázisban
    - vezeteknev (szöveg(30)): felhasználó vezetékneve
    - keresztnev (szöveg(30)): felhasználó keresztneve
    - neptunkod (szöveg(6)): felhasználó neptunkódja
    - jelszo (szöveg(20)): a felhasználó jelszava (kódolt)
    
Tantargy
Leírás: A tantárgy adatai ebben a táblában kerülnek tárolásra.
Attribútumok:
    - id (egész): tantárgy azonosítója az adatbázisban
    - felhasznalo: melyik felhasználó vette fel a tárgyat
    - nev (szöveg(30)): tantárgy neve
    - kod (szöveg(30)): tantárgy kódja
    - kredit (egész): tantárgy kreditértéke
    - leiras (szöveg(60)): a tantárgy részletesebb leírása
Kapcsolatok: TantargyToFelhasznalo

#### 2.3.3. Állapotdiagram
![Állapotdiagram](docs/images/allapotdiagram.png)

### 2.4. Dinamikus működés
#### 2.4.1. Szekvenciadiagram
![Szekvenciadiagram](docs/images/szekvenciadiagram.png)

## 3. Implementáció

## 4. Tesztelés

## 5. Felhasználói dokumentáció

