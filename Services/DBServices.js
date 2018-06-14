import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';

let DB;

export const Service = {
    
    initDB() {
        db = SQLite.openDatabase("AutismDB.db", "1.0", "Autism Database", 200000, () => {
            console.log('Database Created / Opened');
        }, (err) => {
            alert('Error : ' + err);
        });

        DB = db;

        db.transaction((tx) => {

            // tx.executeSql('DROP TABLE PROFILE');
            
            tx.executeSql('CREATE TABLE IF NOT EXISTS PROFILE ('+
            'UserID INTEGER NOT NULL, Username VARCHAR(50) NOT NULL, loginStatus BOOLEAN NOT NULL, '+
            'email VARCHAR(50) NOT NULL, profileImagePath VARCHAR(200) NOT NULL, localProfilePath VARCHAR(200), '+
            'PRIMARY KEY(UserID))', (err) => {
                console.log(err);
            });

            tx.executeSql('CREATE TABLE IF NOT EXISTS CURRICULUM ('+
            'CurriculumID INTEGER NOT NULL, CurriculumName varchar(50) NOT NULL, UserID INTEGER NOT NULL,'+
            'PRIMARY KEY (CurriculumID), FOREIGN KEY (UserID) REFERENCES PROFILE(UserID))' );
            
            tx.executeSql('CREATE TABLE IF NOT EXISTS TUTOR ('+
            'TutorID INTEGER NOT NULL, TutorName varchar(50) NOT NULL, UserID INTEGER NOT NULL,'+
            'PRIMARY KEY (TutorID), FOREIGN KEY (UserID) REFERENCES PROFILE(UserID))' );

            tx.executeSql('CREATE TABLE IF NOT EXISTS LOCATION ('+
            'LocationID INTEGER NOT NULL, LocationName varchar(50) NOT NULL, UserID INTEGER NOT NULL,'+
            'PRIMARY KEY (LocationID), FOREIGN KEY (UserID) REFERENCES PROFILE(UserID))' );

            tx.executeSql('CREATE TABLE IF NOT EXISTS IMAGETABLE('+
            'ImageID INTEGER NOT NULL, ImageName varchar(50) NOT NULL, CurriculumID INTEGER NOT NULL, '+
            'ImageURL VARCHAR(200), ImagePath VARCHAR(200))');

            tx.executeSql('CREATE TABLE IF NOT EXISTS INI_TABLE( '+
            'UserID INTEGER NOT NULL, TutorID INTEGER, LocationID INTEGER, '+
            'FOREIGN KEY(UserID) REFERENCES PROFILE(UserID), '+
            'FOREIGN KEY(TutorID) REFERENCES TUTOR(TutorID), '+
            'FOREIGN KEY(LocationID) REFERENCES LOCATION(LocationID))');

            tx.executeSql('CREATE TABLE IF NOT EXISTS ASSESSMENTTABLE ('+
            'AssessmentID INTEGER NOT NULL, TutorID INTEGER NOT NULL, LocationID INTEGER NOT NULL, '+
            'CurriculumID INTEGER NOT NULL, TestType VARCHAR(20) NOT NULL, StartTime DATE NOT NULL, '+
            'StatusProgress VARCHAR(20) NOT NULL, EndTime DATE, '+
            'PRIMARY KEY (AssessmentID), '+
            'FOREIGN KEY(CurriculumID) REFERENCES CURRICULUM(CurriculumID), '+
            'FOREIGN KEY(TutorID) REFERENCES TUTOR(TutorID), '+
            'FOREIGN KEY(LocationID) REFERENCES LOCATION(LocationID))');

            tx.executeSql('CREATE TABLE IF NOT EXISTS RESULTVALIDATION (' + 
            'OptionID INTEGER NOT NULL, OptionName VARCHAR(50) NOT NULL, IconPath VARCHAR(200) NOT NULL, '+
            'PRIMARY KEY(OptionID))');

            tx.executeSql('CREATE TABLE IF NOT EXISTS ASSESSMENTREVIEW (' + 
            'ReviewID INTEGER NOT NULL, AssessmentID INTEGER NOT NULL, ImageID INTEGER NOT NULL, '+
            'Response INTEGER NOT NULL, Comments VARCHAR(200), '+
            'PRIMARY KEY (ReviewID), '+
            'FOREIGN KEY(AssessmentID) REFERENCES ASSESSMENT(AssessmentID), '+
            'FOREIGN KEY(ImageID) REFERENCES IMAGETABLE(ImageID), '+
            'FOREIGN KEY(Response) REFERENCES ASSESSMENTREVIEW(OptionID))');

            console.log('Tables Created !!!');

        }, (err) => {
            console.log(err);
        });
    },

    checkLogin(callback) {
        console.log('Checking Log in status'); 

        DB.transaction((tx) => {
            tx.executeSql('SELECT * FROM PROFILE WHERE loginStatus = 1', [], (tx, res) => {
                console.log('No. of profile records logged in : ', res.rows.length);

                if(res.rows.length == 1) {
                    let row = res.rows.item(0);
                    console.log('Returning one');
                    callback(1);
                }
                else {
                    callback(0);
                }
            });
        });
    },

    logout(callback) {
        DB.transaction((tx) => {
            tx.executeSql('UPDATE PROFILE SET loginStatus = 0');
            console.log('Logged out in DB');
            callback('Success');
        });
    },

    fetchProfileDetails(callback) {
        DB.transaction((tx) => {
            tx.executeSql('SELECT * FROM PROFILE WHERE loginStatus = 1', [], (tx, res) => {
                console.log(res.rows.item(0));
                let details = {
                    userName: res.rows.item(0).Username,
                    email: res.rows.item(0).email,
                    profilePath: res.rows.item(0).localProfilePath,
                }

                console.log(details);

                callback(details);
            });
        });
    },

    test(){
        console.log("helo");
    },

    login(data) {
        let UserID = data.profile.userId;
        console.log('UserID : '+UserID);
        let Username = data.profile.userName;
        let email = data.profile.email;
        let profileImagePath = data.profile.imageUrl;
        console.log('Updating now');
        DB.transaction((tx) => {
            console.log("In transcation");
            tx.executeSql('SELECT * FROM PROFILE WHERE UserID = (:UserID)', [UserID], (tx, res) => {

                if(res.rows.length == 1) {
                    console.log("In if part");
                    tx.executeSql('UPDATE PROFILE SET loginStatus = 1 WHERE UserID = (:UserID)',[UserID]);
                }
                else {
                    tx.executeSql('INSERT INTO Profile (UserID, Username, loginStatus, email, profileImagePath) VALUES (:UserID, :Username, :loginStatus, :email, :profileImagePath)', [UserID, Username, 1, email, profileImagePath]);
                    console.log('Login Updated');
                }
                
                RNFS.mkdir(RNFS.ExternalDirectoryPath+'/'+Username);
                let path = RNFS.ExternalDirectoryPath+'/'+Username+'/'+profileImagePath;
                console.log("path"+path);
                let imgUrl = 'http://192.168.99.11:3000/imgUrl/profile/'+profileImagePath;
                console.log("imgUrl"+imgUrl);
                RNFetchBlob.fetch('GET',imgUrl).then((data)=>{
                    console.log(data.data.length);
                    let image = "data:image/jpg;base64, "+data.base64();

                    RNFS.writeFile(path, data.data, 'base64').then((success) => {
                        DB.transaction((tx1) => {
                            tx1.executeSql('UPDATE PROFILE SET localProfilePath = (:path) WHERE UserID = (:UserID)', [path, UserID]);
                        });
                        console.log('Image Saved at ', path);
                    }).catch((err)=>{
                        console.log("Error " +err.message);
                      });
                });
            });

            tx.executeSql('DELETE FROM LOCATION');
            tx.executeSql('DELETE FROM TUTOR');
            tx.executeSql('DELETE FROM CURRICULUM');

            for(i=1; i<=data.location.length; i++) {
                console.log(data.location[i-1]);
                tx.executeSql('INSERT INTO LOCATION (locationID, locationName, UserID) VALUES (:i, :loc, :UserID)', [i, data.location[i-1], UserID]);
            }

            for(i=1; i<=data.tutor.length; i++) {
                console.log(data.tutor[i-1]);
                tx.executeSql('INSERT INTO TUTOR (tutorID, tutorName, UserID) VALUES (:i, :tut, :UserID)', [i, data.tutor[i-1], UserID]);
            }

            for(i=1; i<=data.curriculum.length; i++) {
                console.log(data.curriculum[i-1]);
                tx.executeSql('INSERT INTO CURRICULUM (curriculumID, curriculumName, UserID) VALUES (:i, :curr, :UserID)', [data.curriculum[i-1].curri_id, data.curriculum[i-1].curri_name, UserID]);
            }

            console.log('Tables Deleted');
        });
    },

    insertSampleProfile() {
        console.log('Inserting Sample Profile');
        
        DB.transaction((tx) => {
            //tx.executeSql('DELETE FROM PROFILE');
            tx.executeSql('INSERT INTO Profile (UserID, Username, loginStatus, email, profileImagePath) VALUES (:UserID, :Username, :loginStatus, :email, :profileImagePath)',["261", "SidG", 1, "sid@sid", "sid/sid"]);
        });
    }
}