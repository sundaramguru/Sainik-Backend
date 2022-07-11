import express from "express";
import expressFileUpload from "express-fileupload";
// import path from "path";
import { getUsers, Register, ULogin, Logout , Form1, Form2, Form3, Form4,Image, Form5, Form6,Form7,Form8,Forms, WidowForm, clerkUsers,getForm1, EditForm8 , form7deletes,form8dep, Form7Edit, Form7Delete,capt, ForgetPass} from "../controllers/Users.js";
import { Dropdown , Fill} from "../controllers/User1.js";
// import { Service_D, Corp_D, State_D, Taluk_D, Record_D,  Rank_D, Trade_D, Civil_D, Char_D,Reason_D, Med_D, Bank_D, Branch_D, Ifscs_D ,Caste_D, Religions_D,  Dependents,getRsb,getZsb } from "../controllers/Dropdown1.js";

import { getAdmin, ARegister, ALogin, ALogout,Single , adminform2, adminform3, adminform4} from "../controllers/Admin.js";
import { Corp_D, State_D, Record_D,  Rank_D, Trade_D, Civil_D, Char_D,Reason_D, Med_D, Bank_D, Branch_D, Ifscs_D ,Caste_D, Religions_D,  Dependents,getFile, Prefix_D, Service_D,Rank_Category_D,District_Depend ,Imageupload, Taluk_Depend,Branch_Depend, IFSC_Depend, Rank_Depend} from "../controllers/Dropdown.js";
import { Rsb,Zsb,Bank,District,MedicalCategory,RecordOfficeArmy,State,Taluk,Trade } from "../controllers/Insert.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken, adminRefreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);  
router.post('/u_user_reg', Register);
router.post('/ULogin', ULogin);
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
router.post('/image', Image);
router.post('/form7deletes', form7deletes);
router.post('/Imageupload', Imageupload);


router.post('/u_dependent_details',Form8);
router.post('/u_widow_details', WidowForm);
router.get('/clerkUsers', clerkUsers);
router.get('/dropdown', Dropdown);
router.get('/dep',Dependents);
router.get('/EditForm8',EditForm8);

router.get('/getForm1',getForm1);
router.post('/single', Single);


//           GET Request
router.get('/District_Depend', District_Depend);
router.get('/Taluk_Depend', Taluk_Depend);
router.get('/Branch_Depend', Branch_Depend);
router.get('/Branch_Depend', Branch_Depend);
router.get('/IFSC_Depend', IFSC_Depend);
// router.get('/Corps_Depend', Corps_Depend);
 router.get('/Rank_Depend', Rank_Depend);

// router.get('/RankCategory_Depend', RankCategory_Depend);


//   UPDATE DELETE
router.post('/Form7Edit', Form7Edit);
router.post('/form8dep', form8dep);

router.post('/Form7Delete', Form7Delete);

//   UPDATE DELETE

router.get('/adminform2', adminform2);
router.get('/adminform3', adminform3);
router.get('/adminform4', adminform4);


router.get('/rank_cat_D', Rank_Category_D);
router.get('/Service_D', Service_D);
router.get('/prefix_D', Prefix_D);
router.get('/corp_D', Corp_D);
router.get('/record_D', Record_D);
router.get('/rank_D', Rank_D);
router.get('/trade_D', Trade_D);
router.get('/med_D', Med_D);
router.get('/reason_D', Reason_D);
router.get('/char_D', Char_D);
router.get('/bank_D', Bank_D);
router.get('/branch_D', Branch_D);
router.get('/ifsc_D', Ifscs_D);
router.get('/state_D', State_D);
router.get('/civil_D', Civil_D);
router.get('/caste_D', Caste_D);
router.get('/religions_D', Religions_D);
router.get('/admin', verifyToken, getAdmin);
router.post('/admin', ARegister);
router.post('/alogin', ALogin);
router.get('/atoken', adminRefreshToken);
router.delete('/alogout', ALogout);
router.post('/insert', getFile);

router.get('/capt', capt);
router.post('/forgetPass', ForgetPass);


export default router;
