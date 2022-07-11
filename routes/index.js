import express from "express";
//for img Upload
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import u_dependent_details from "../models/DependentModel.js";
import u_file_details from "../models/FileModel.js";
import u_Sfile_details from "../models/SpouseFileModel.js";
import u_Dfile_details from "../models/DependentFileModel.js";

import { Sequelize } from "sequelize";

// end for img
import { getUsers, Register, ULogin, Logout , Form1, Form2, Form3, Form4, Form5, Form6,Form7,Form8,Forms, WidowForm,getForm1, EditForm8 , form7deletes,form8dep, Form7Edit, Form7Delete,capt, ForgetPass,Login, getForgetMail,getUserStatus,getEmp_Status, TableFilter, getDOB, viewform2dep, ViewForm2Edit, viewform1dep, ViewForm1Edit, viewform5dep,ViewForm5Edit, ViewForm3Edit , viewform3dep,ViewForm4Edit , viewform4dep, ViewFormUEbEdit, viewformuedep,  ViewForm6Edit , viewform6dep, ViewForm7Edit, viewform7dep, ViewFormWEdit , viewformwdep,getEDOB,getTrades,getUS , getName, getCivilQualification, FormUE, getRegisterDate, getQueryDate, creatDRow, resubmit,getReg_Type,getESMs} from "../controllers/Users.js";
// import { Religion_D, Corp_D,  Record_D,  Rank_D, Trade_D, Civil_D, Char_D, Med_D, Bank_D, Branch_D,Caste_D,BirthDist_D, BirthPlace_D, Dependents } from "../controllers/Dropdown.js";
import { Service_D,District_D,District_Depend, Corp_D, State_D, Taluk_D, Record_D,RSB_D, ZSB_D, Rank_D,Rank_Category_D, Trade_D, Civil_D, Char_D,Reason_D, Med_D, Bank_D, Branch_Depend, IFSC_Depend ,Caste_D, Religions_D,  Dependents,getRsb,getZsb, Taluk_Depend } from "../controllers/Dropdown1.js";

import { getAdmin, ARegister, ALogin,clerkUsers,Designation, ALogout, Status,Single,ClerkQ,SuperintendentQ,DirectorQ,EClerkQ,ESuperintendentQ,EDirectorQ, getClerkQ,adminform1, adminform2,adminform3, adminform4, adminform5, adminform6, adminform7, awidowform, awidowforma,Recommend,Approve,Verify,ERecommend,EVerify,getReg,getService_Name,TFService,getForgetMail1,AdminFormDoc,AS_DocForm,AD_DocForm,Users_C,W_C,W_S,W_D,E_C,E_S,E_D,Users_S,Users_D,Prev_ESM,ESM_No,ZR,Prev_Emp,Emp_No, AForgetPass,getAForgetMail,Autodelete, adminform1a, adminformue, UserViewFormDoc, UserSpoViewFormDoc, UserDepViewFormDoc} from "../controllers/Admin.js";
import { Rsb,Zsb,Bank,Rank,District,MedicalCategory,RecordOfficeArmy,State,Taluk,Trade,F_rsb,F_zsb,F_bank,F_MedicalCat,F_Rank,F_Prefix,F_RecordOfficeArmy,F_RegCategory,F_State,F_District,F_Taluk,F_Trade, Filter,ReactFilter, F_fZsbRsb, F_Single,I_prefix} from "../controllers/Insert.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken, adminRefreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
// const path= require('path')
// import path from "path";

router.get('/capt',capt);

router.get('/admin', verifyToken, getAdmin);
router.post('/admin', ARegister);
router.post('/alogin', ALogin);
router.get('/atoken', adminRefreshToken);
router.delete('/alogout', ALogout);

router.get('/users', verifyToken, getUsers);
router.post('/u_user_reg', Register);
router.post('/Login', Login);
router.post('/ForgetPass', ForgetPass);
router.get('/getForgetMail', getForgetMail);
router.get('/getForgetMail1', getForgetMail1);

router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/u_service_details', Form1);
router.post('/u_personal_details', Form3);
router.post('/u_pension_details', Form2);
router.post('/u_contact_details', Form4);
router.post('/u_employment_details', Form5);
router.post('/u_spouse_details', Form6);
router.get('/Form7', Form7);
router.post('/forms', Forms);
router.post('/form7deletes', form7deletes);
router.post('/u_dependent_details',Form8);
router.post('/u_widow_details', WidowForm);
router.get('/clerkUsers', clerkUsers);
router.get('/dep',Dependents);
router.get('/EditForm8',EditForm8);
router.get('/adminform1a',adminform1a);
router.get('/getReg_Type',getReg_Type);


router.get('/getName',getName);

router.get('/getCivilQualification',getCivilQualification);
router.get('/getESMs',getESMs);


router.post('/u_status_details', Status);

router.post('/Form7Edit', Form7Edit);
router.post('/Form7Delete', Form7Delete);
router.post('/ULogin', ULogin);

// VIEW Forms

router.post('/ViewForm2Edit', ViewForm2Edit);
router.get('/viewform2dep',viewform2dep);
router.post('/ViewForm1Edit', ViewForm1Edit);
router.post('/ViewForm3Edit', ViewForm3Edit);
router.get('/viewform3dep',viewform3dep);
router.get('/viewform1dep',viewform1dep);
router.post('/ViewForm5Edit', ViewForm5Edit);
router.get('/viewform5dep',viewform5dep);
router.post('/ViewForm4Edit', ViewForm4Edit);
router.get('/viewform4dep',viewform4dep);
router.post('/ViewForm6Edit', ViewForm6Edit);
router.get('/viewform6dep',viewform6dep);
router.post('/ViewFormWEdit', ViewFormWEdit);
router.get('/viewformwdep',viewformwdep);
router.post('/ViewForm7Edit', ViewForm7Edit);
router.get('/viewform7dep',viewform7dep);
router.get('/viewformuedep',viewformuedep);
router.post('/ViewFormUEbEdit', ViewFormUEbEdit);


router.get('/TableFilter', TableFilter);
router.get('/TFService', TFService);
router.get('/getDOB', getDOB);


router.get('/getRegisterDate', getRegisterDate);
router.get('/getQueryDate', getQueryDate);

router.get('/Users_C', Users_C);
router.get('/W_C', W_C);
router.get('/W_S', W_S);
router.get('/W_D', W_D);
router.get('/E_C', E_C);
router.get('/E_S', E_S);
router.get('/E_D', E_D);

router.get('/Users_S', Users_S);
router.get('/Users_D', Users_D);
router.get('/adminform1', adminform1);
router.get('/adminformue', adminformue);

router.get('/adminform2', adminform2);
router.get('/adminform3', adminform3);
router.get('/adminform4', adminform4);
router.get('/adminform5', adminform5);
router.get('/adminform6', adminform6);
router.get('/adminform7', adminform7);
router.get('/awidowform', awidowform);
router.get('/awidowforma', awidowforma);


router.get('/getEDOB', getEDOB);
router.get('/getTrades', getTrades);
router.get('/F_fZsbRsb', F_fZsbRsb);
router.get('/adminformdoc', AdminFormDoc);
router.get('/UserViewFormDoc', UserViewFormDoc);


router.get('/UserDepViewFormDoc', UserDepViewFormDoc);

router.get('/UserSpoViewFormDoc', UserSpoViewFormDoc);
router.get('/as_docform', AS_DocForm);

router.get('/ad_docform', AD_DocForm);
router.post('/Autodelete', Autodelete);
router.post('/FormUE', FormUE);




router.post('/AForgetPass', AForgetPass);

router.get('/getAForgetMail', getAForgetMail);

router.post('/ClerkQ', ClerkQ);
router.post('/SuperintendentQ', SuperintendentQ);
router.post('/DirectorQ', DirectorQ);

router.post('/EClerkQ', EClerkQ);
router.post('/ESuperintendentQ', ESuperintendentQ);
router.post('/EDirectorQ', EDirectorQ);

router.get('/getClerkQ', getClerkQ);
// router.route('/superForm3', superForm3).get() .post();
router.get('/designation', Designation);
router.post('/recommend', Recommend);
router.post('/Erecommend', ERecommend);

router.post('/approve', Approve);
router.post('/verify', Verify)
router.post('/Everify', EVerify)

router.post('/ESM_No', ESM_No);
router.get('/Prev_ESM', Prev_ESM);
router.get('/ZR', ZR)
router.post('/Emp_No', Emp_No);
router.get('/Prev_Emp', Prev_Emp);

router.post('/resubmit', resubmit);

//Insert to db(Insert)
router.post('/Single', Single);
router.post('/I_rsb', Rsb);
router.post('/I_zsb', Zsb);
router.post('/I_bank', Bank);
router.post('/I_medicalCategory', MedicalCategory);
router.post('/I_recordoffice', RecordOfficeArmy);
router.post('/I_state', State);
router.post('/I_district', District);
router.post('/I_prefix', I_prefix);

router.post('/I_rank', Rank);

router.post('/I_trade', Trade);
router.post('/I_taluk', Taluk);
//fetch from db(Insert)

router.post('/creatDRow', creatDRow);

router.get('/F_rsb', F_rsb);
router.get('/F_zsb', F_zsb);
router.get('/F_bank', F_bank);
router.get('/F_State', F_State);
router.get('/F_Taluk', F_Taluk);
router.get('/F_Trade', F_Trade);
router.get('/F_District', F_District);
router.get('/F_MedicalCat', F_MedicalCat);
router.get('/F_Rank', F_Rank);
router.get('/F_Prefix', F_Prefix);


router.get('/F_RecordOfficeArmy', F_RecordOfficeArmy);
router.get('/filter', Filter);
router.get('/reactfilter', ReactFilter);

router.get('/F_Single', F_Single);

//dropdown
router.get('/corp_D', Corp_D);
router.get('/record_D', Record_D);
router.get('/rank_D', Rank_D);
router.get('/Rank_Category_D', Rank_Category_D);

router.get('/trade_D', Trade_D);
router.get('/med_D', Med_D);
router.get('/reason_D', Reason_D);
router.get('/char_D', Char_D);
router.get('/bank_D', Bank_D);
router.get('/Branch_Depend', Branch_Depend);
router.get('/IFSC_Depend', IFSC_Depend);
router.get('/dist_D', District_D);
router.get('/District_Depend', District_Depend);
router.get('/state_D', State_D);
router.get('/RSB_D', RSB_D);

router.get('/ZSB_D', ZSB_D);

router.get('/Taluk_Depend', Taluk_Depend);
router.get('/civil_D', Civil_D);
router.get('/caste_D', Caste_D);
router.get('/religions_D', Religions_D);
router.get('/Service_D', Service_D);
router.get('/getRsb', getRsb);
router.get('/getZsb', getZsb);

router.get('/getUS', getUS);

router.get('/getUserStatus', getUserStatus);
router.get('/getEmp_Status', getEmp_Status);


router.get('/getReg', getReg);

router.get('/getService_Name', getService_Name);

//ImgUpload
// router.post('/Imageupload', Imageupload);
// router.get('/getimg', getimg);

//for image
router.use(express.static("./public"))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});


// ESM create row for image update

router.post("/creatRow", upload.single('Img'), (req, res) => {
  const  Service_No = req.body.Service_No;
  const  Name = req.body.Name;
  console.log(Service_No);

    // if (!req.file)
    //  {
    //   console.log("No file upload");
    //  }
     // else {
          // console.log(req.file.filename)
          // var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename

           u_file_details.create({
              Service_No:Service_No,
              Name:Name

          });
       // }
       console.log(Service_No);  console.log(Name);
});
// ESM create row for image update



//ESM Image upload

router.post("/uploadImg", upload.single('Img'), (req, res) => {
  const  Service_No = req.body.Service_No;
  const  Registered_date = req.body.Registered_date;


  console.log(Service_No);

    if (!req.file) {
        console.log("No file upload");
    } else {
       console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename

      u_file_details.update({
            Img:imgsrc,
            Registered_date:Registered_date
           },{
              where:{
                Service_No:Service_No
              }


     });
        console.log("file uploaded")
        console.log(Service_No);
    }
    res.json({msg: "Registration Successful"});

});


//ESM Image upload


// Spouse create row for image update

router.post("/creatSRow", upload.single('Img'), (req, res) => {
  const  Service_No = req.body.Service_No;
  const  Spouse_Name = req.body.Spouse_Name;
  console.log(Service_No);


           u_Sfile_details.create({
              Service_No:Service_No,
              Spouse_Name:Spouse_Name

          });

       console.log(Service_No);  console.log(Spouse_Name);
});
// Spouse create row for image update


// router.post("/creatDRow", upload.single('Img'), (req, res) => {
//   const  Service_No = req.body.Service_No;
//   const  Dep_Name = req.body.Dep_Name;
//   const  Relation = req.body.Relation;
//
//   console.log(Service_No);
//
//
//            u_Dfile_details.create({
//               Service_No:Service_No,
//               Dep_Name:Dep_Name,
//               Relation:Relation
//
//           });
//
//        console.log(Service_No);  console.log(Dep_Name);
// });

//Spouse img
router.post("/upload_SImg", upload.single('Img'), (req, res) => {
  const  Service_No = req.body.Service_No;
  const  Spouse_Name = req.body.Spouse_Name;
  const  Registered_date = req.body.Registered_date;


  console.log(Service_No);

    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename
        //var imgsrc = req.file.filename

        // var insertData = "INSERT INTO u_dependent_details (Relation) VALUES (?)"

         u_Sfile_details.update({
             Spouse_Name:Spouse_Name,
             Img:imgsrc,
             Registered_date:Registered_date
             },{
                 where:{
                   Service_No:Service_No
                       }
              });


        console.log("file uploaded")
        console.log(Service_No);
        console.log(Spouse_Name);
    }

    res.json({msg: "Registration Successful"});

});


// ESM create row for image update

// ESM create row for image update


//Dependent Img

router.post("/upload_DImg", upload.single('Img'), (req, res) => {
  const  Service_No = req.body.Service_No;
const  Dep_Name = req.body.Dep_Name;
const  Relation = req.body.Relation;
const  Registered_date = req.body.Registered_date;


  console.log(Service_No);
console.log(Dep_Name);
console.log(Relation);


    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename

     u_Dfile_details.update({
         Img:imgsrc,
         Registered_date:Registered_date

         },{
             where:{
               Service_No:Service_No,
               Dep_Name:Dep_Name,
               Relation:Relation
                   }
          });



        console.log("file uploaded")
        console.log(Service_No);console.log(Dep_Name);
        console.log(Relation);

    }
    res.json({msg: "Registration Successful"});

});




router.post("/uploadDischarge_Book", upload.single('Discharge_Book'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       console.log(req.file.filename)
        var iDischarge_Book = 'http://127.0.0.1:5000/images/' + req.file.filename
        //var iPPO = 'http://127.0.0.1:5000/public/images/' + req.file.PPOName
        // var iAdhar = 'http://127.0.0.1:5000/public/images/' + req.file.AdharName
        // var iPAN = 'http://127.0.0.1:5000/public/images/' + req.file.PANName
        // var iECHS = 'http://127.0.0.1:5000/public/images/' + req.file.ECHSName
        // var iVoter = 'http://127.0.0.1:5000/public/images/' + req.file.VoterName

         // u_file_details.create({
         //      Service_No:Service_No,
         //      Discharge_Book:iDischarge_Book
              //PPO:iPPO
              // Adhar:iAdhar,
              // PAN:iPAN,
              // ECHS:iECHS,
              // Voter:iVoter
      u_file_details.update({
            Discharge_Book:iDischarge_Book
           },{
              where:{
                Service_No:Service_No
              }


     });
        console.log("file uploaded")
        console.log(Service_No);
    }
    res.json({msg: "Registration Successful"});

});
router.post("/uploadPPO", upload.single('PPO'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
        // console.log(req.file.filename)
      //  var iDischarge_Book = 'http://127.0.0.1:5000/public/images/' + req.file.Discharge_BookName
        var iPPO = 'http://127.0.0.1:5000/images/' + req.file.filename
        // var iAdhar = 'http://127.0.0.1:5000/public/images/' + req.file.AdharName
        // var iPAN = 'http://127.0.0.1:5000/public/images/' + req.file.PANName
        // var iECHS = 'http://127.0.0.1:5000/public/images/' + req.file.ECHSName
        // var iVoter = 'http://127.0.0.1:5000/public/images/' + req.file.VoterName

         u_file_details.update({
       PPO:iPPO
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadAdhar", upload.single('Adhar'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iAdhar = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_file_details.update({
       Adhar:iAdhar
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadPAN", upload.single('PAN'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iPAN = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_file_details.update({
       PAN:iPAN
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
    res.json({msg: "Registration Successful"});

});
router.post("/uploadECHS", upload.single('ECHS'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iECHS = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_file_details.update({
       ECHS:iECHS
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadVoter", upload.single('Voter'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iVoter = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_file_details.update({
       Voter:iVoter
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
    res.json({msg: "Registration Successful"});

});
//spouse upload

router.post("/uploadS_PPO", upload.single('S_PPO'), (req, res) => {
  const  Service_No = req.body.Service_No;
    const  Spouse_Name = req.body.Spouse_Name;
  console.log(Service_No);
    console.log(Spouse_Name);
    if (!req.file) {
        console.log("No file upload");
    } else {
        var iPPO = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_Sfile_details.update({
              PPO:iPPO
 },{
         where:{
           Service_No:Service_No,
           Spouse_Name:Spouse_Name
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);console.log(Spouse_Name);
    }
    res.json({msg: "Registration Successful"});

});

router.post("/uploadS_Adhar", upload.single('S_Adhar'), (req, res) => {
  const  Service_No = req.body.Service_No;
    const  Spouse_Name = req.body.Spouse_Name;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iAdhar = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_Sfile_details.update({
       Adhar:iAdhar
 },{
         where:{
           Service_No:Service_No,
           Spouse_Name:Spouse_Name
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);console.log(Spouse_Name);
    }
    res.json({msg: "Registration Successful"});

    });

router.post("/uploadS_PAN", upload.single('S_PAN'), (req, res) => {
  const  Service_No = req.body.Service_No;
  const  Spouse_Name = req.body.Spouse_Name;

  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iPAN = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Sfile_details.update({
       PAN:iPAN
 },{
         where:{
           Service_No:Service_No,
           Spouse_Name:Spouse_Name
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);console.log(Spouse_Name);
    }
    res.json({msg: "Registration Successful"});

    });


router.post("/uploadS_ECHS", upload.single('S_ECHS'), (req, res) => {
  const  Service_No = req.body.Service_No;
    const  Spouse_Name = req.body.Spouse_Name;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iECHS = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Sfile_details.update({
       ECHS:iECHS
 },{
         where:{
           Service_No:Service_No,
           Spouse_Name:Spouse_Name
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);console.log(Spouse_Name);
    }
    res.json({msg: "Registration Successful"});

    });

router.post("/uploadS_Voter", upload.single('S_Voter'), (req, res) => {
  const  Service_No = req.body.Service_No;
    const  Spouse_Name = req.body.Spouse_Name;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iVoter = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Sfile_details.update({
       Voter:iVoter
 },{
         where:{
           Service_No:Service_No,
           Spouse_Name:Spouse_Name
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);console.log(Spouse_Name);
    }
    res.json({msg: "Registration Successful"});

    });
//Dependents upload

// router.post("/uploadD_PPO", upload.single('D_PPO'), (req, res) => {
//   const  Service_No = req.body.Service_No;
//       const  Dep_Name = req.body.Dep_Name;
//
//   console.log(Service_No);
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//         var iPPO = 'http://127.0.0.1:5000/images/' + req.file.filename
//          u_Dfile_details.update({
//        PPO:iPPO
//  },{
//          where:{
//            Service_No:Service_No,
//            Dep_Name:Dep_Name,
//            Relation:Relation
//
//          }
// }
// );
//         console.log("file uploaded")
//         console.log(Service_No);
//     }
// });

router.post("/uploadD_Adhar", upload.single('D_Adhar'), (req, res) => {
  const  Service_No = req.body.Service_No;
   const  Dep_Name = req.body.Dep_Name;
   const  Relation = req.body.Relation;

  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iAdhar = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_Dfile_details.update({
       Adhar:iAdhar
 },{
         where:{
           Service_No:Service_No,
           Dep_Name:Dep_Name,
           Relation:Relation

         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
        console.log(Dep_Name);        console.log(Relation);

    }
    res.json({msg: "Registration Successful"});

});
router.post("/uploadD_PAN", upload.single('D_PAN'), (req, res) => {
  const  Service_No = req.body.Service_No;
    const  Dep_Name = req.body.Dep_Name;
    const  Relation = req.body.Relation;

  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iPAN = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Dfile_details.update({
       PAN:iPAN
 },{
         where:{
           Service_No:Service_No,
            Dep_Name:Dep_Name,
            Relation:Relation

         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
 console.log(Dep_Name);
              console.log(Relation);

    }
    res.json({msg: "Registration Successful"});

});
router.post("/uploadD_ECHS", upload.single('D_ECHS'), (req, res) => {
  const  Service_No = req.body.Service_No;
     const  Dep_Name = req.body.Dep_Name;
     const  Relation = req.body.Relation;

  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iECHS = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Dfile_details.update({
       ECHS:iECHS
 },{
         where:{
           Service_No:Service_No,
          Dep_Name:Dep_Name,
          Relation:Relation

         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
           console.log(Dep_Name); console.log(Relation);

    }
    res.json({msg: "Registration Successful"});

});
router.post("/uploadD_Voter", upload.single('D_Voter'), (req, res) => {
  const  Service_No = req.body.Service_No;
  const  Dep_Name = req.body.Dep_Name;
  const  Relation = req.body.Relation;

  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iVoter = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Dfile_details.update({
       Voter:iVoter
 },{
         where:{
           Service_No:Service_No,
            Dep_Name:Dep_Name,
            Relation:Relation

         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
        console.log(Dep_Name);
      console.log(Relation);

    }
    res.json({msg: "Registration Successful"});

});



// router.post("/uploadD_PPO", upload.single('D_PPO'), (req, res) => {
//   const  Service_No = req.body.Service_No;
//   console.log(Service_No);
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//         var iPPO = 'http://127.0.0.1:5000/images/' + req.file.filename
//          u_Dfile_details.update({
//        PPO:iPPO
//  },{
//          where:{
//            Service_No:Service_No
//          }
// }
// );
//         console.log("file uploaded")
//         console.log(Service_No);
//     }
// });
// router.post("/uploadD_Adhar", upload.single('D_Adhar'), (req, res) => {
//   const  Service_No = req.body.Service_No;
//   console.log(Service_No);
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//          var iAdhar = 'http://127.0.0.1:5000/images/' + req.file.filename
//          u_Dfile_details.update({
//        Adhar:iAdhar
//  },{
//          where:{
//            Service_No:Service_No
//          }
// }
// );
//         console.log("file uploaded")
//         console.log(Service_No);
//     }
// });
// router.post("/uploadD_PAN", upload.single('D_PAN'), (req, res) => {
//   const  Service_No = req.body.Service_No;
//   console.log(Service_No);
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//          var iPAN = 'http://127.0.0.1:5000/images/' + req.file.filename
//
//          u_Dfile_details.update({
//        PAN:iPAN
//  },{
//          where:{
//            Service_No:Service_No
//          }
// }
// );
//         console.log("file uploaded")
//         console.log(Service_No);
//     }
// });
// router.post("/uploadD_ECHS", upload.single('D_ECHS'), (req, res) => {
//   const  Service_No = req.body.Service_No;
//   console.log(Service_No);
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//        var iECHS = 'http://127.0.0.1:5000/images/' + req.file.filename
//
//          u_Dfile_details.update({
//        ECHS:iECHS
//  },{
//          where:{
//            Service_No:Service_No
//          }
// }
// );
//         console.log("file uploaded")
//         console.log(Service_No);
//     }
// });
// router.post("/uploadD_Voter", upload.single('D_Voter'), (req, res) => {
//   const  Service_No = req.body.Service_No;
//   console.log(Service_No);
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//        var iVoter = 'http://127.0.0.1:5000/images/' + req.file.filename
//
//          u_Dfile_details.update({
//        Voter:iVoter
//  },{
//          where:{
//            Service_No:Service_No
//          }
// }
// );
//         console.log("file uploaded")
//         console.log(Service_No);
//     }
// });



//for img
// //for get img
// router.get("/getimg", (req, res) => {
//   let param = req.query.A_Service_No
//   try {
//       const users =  u_image.findAll({
//           where:{
//               Service_No: param
//           }
//       });
//       console.log(users);
//       res.json(users);
//   } catch (error) {
//       console.log(error);
//   }
// });

// router.get('/fetchImage/:file(*)', (req, res) => {
//     let file = req.params.file;
//     let fileLocation = path.join('./public/images/', file);
//     //res.send({image: fileLocation});
//     res.sendFile(`${fileLocation}`)
// })
router.use('/images', express.static('images'));
// //end of get img


export default router;
