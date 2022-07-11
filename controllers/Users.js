import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const Op = Sequelize.Op;

import u_user_reg from "../models/UserModel.js";
// import u_service_details from "../models/ServiceModel.js";
// import u_pension_details from "../models/PensionModel.js";
// import u_personal_details from "../models/PersonalModel.js";
// import u_contact_details from "../models/ContactModel.js";
// import u_employment_details from "../models/EmploymentModel.js";
import u_esm from "../models/ESM_No.js";

import u_spouse_details from "../models/SpouseModel.js";
import u_dependent_details from "../models/DependentModel.js";
import u_widow_details from "../models/WidowModel.js";
import single_values from "../models/Single.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import u_status_details from "../models/StatusModel.js";
import u_form_details from "../models/FormsModel.js";
import d_record_office_army from "../models/Record_Office_ArmyModel.js";
import d_state from "../models/StateModel.js";
import d_bank from "../models/BankModel.js";
// import d_branch from "../models/BranchModel.js";

import d_district from "../models/DistrictModel.js";
import d_rank from "../models/RankModel.js";
import d_reg_category from "../models/Reg_CategoryModel.js";
import d_reg_type from "../models/Reg_TypeModel.js";
import d_medical_category from "../models/Medical_CategoryModel.js";
import d_rsb from "../models/RsbModel.js";
import d_taluk from "../models/TalukModel.js";
import d_trade from "../models/TradeModel.js";
import d_zsb from "../models/ZsbModel.js";
import u_Dfile_details from "../models/DependentFileModel.js";
import u_employed_details from "../models/EmployedModel.js";
import u_file_details from "../models/FileModel.js";
import u_Sfile_details from "../models/SpouseFileModel.js";


export const getUsers = async(req, res) => { //dashboard
    try {
        const users = await u_user_reg.findAll({
            attributes:['id','Name','Service_No','Mail_Id']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% REGISTER %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Register = async(req, res) => {
    const { Name, Service_No, Mobile, Mail_Id, Password, ConfPassword, RT,Status} = req.body;

    if(Name === "" && Service_No === "" && Mail_Id === "" && Mobile === "" && Password === ""  )
    return res.status(400).json({msg: "Please fill All the fields"});

    if(Name === "" )
    return res.status(400).json({msg: "Please fill the Name field"});
    if(Service_No === "")
    return res.status(400).json({msg: "Please fill the Service Number"});
    if(Mail_Id === "")
    return res.status(400).json({msg: "Please fill the Mail_Id "});
    if(Mobile === "")
    return res.status(400).json({msg: "Please fill the Mobile field"});
    if(Password === "")
    return res.status(400).json({msg: "Please Enter the Password "});
    if(ConfPassword === "")
    return res.status(400).json({msg: "Please Enter the Confirm Password "});

    if(Password !== ConfPassword)
    return res.status(400).json({msg: "Password and Confirm Password do not match"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(Password, salt);
    try {

       const user = await u_user_reg.count({
          attributes:['Service_No','Mail_Id'],
          where:{
            [Op.or]:[{Service_No:Service_No},{Mail_Id:Mail_Id}]

        }
      });

  if(user == 0){
        await u_user_reg.create({
            Name: Name,
            Service_No:Service_No,
            Mobile:Mobile,
            Mail_Id: Mail_Id,
            Password: hashPassword,
            Reg_Type: RT,
            Status: Status,

        });
         res.json({msg: "Registration Successful"});
    }
    else{
      res.status(400).json({msg: "Record already exists"});

    }


}  catch (error) {
      console.log(error);
  }}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% REGISTER %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const capt = async(req, res) => {

try {
      var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];
    var a= alpha[Math.floor(Math.random()*62)];
    var b= alpha[Math.floor(Math.random()*62)];
    var c= alpha[Math.floor(Math.random()*62)];
    var d= alpha[Math.floor(Math.random()*62)];
    var e= alpha[Math.floor(Math.random()*62)];
    var f= alpha[Math.floor(Math.random()*62)];

    var sum = a+b+c+d+e+f;

      res.json(sum);
      console.log(sum)
  } catch (error) {
      console.log(error);
  }
}




export const ForgetPass = async(req, res) => {
  const { Service_No, Password, ConfPassword} = req.body;
  if(Password !== ConfPassword)
    return res.status(400).json({msg: "Password and Confirm Password do not match"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(Password, salt);
    try {
        await u_user_reg.update({

            Password: hashPassword},
            {
              where:{ Service_No:Service_No}
            }

        );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const getForgetMail= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_user_reg.findOne({
        attributes:['Mail_Id','Mobile'],
          where:{
              Service_No: param
          }

      });
      const n=u.toJSON()

            const mail= n.Mail_Id;
            const mobile= n.Mobile;
const users=[mail,mobile]
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% LOGIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const ULogin = async(req, res) => {
    try {
        const user = await u_user_reg.findAll({
            where:{
                Service_No: req.body.Service_No
            }
        });
        const match = await bcrypt.compare(req.body.Password, user[0].Password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const Name = user[0].Name;
        const Service_No = user[0].Service_No;
        const accessToken = jwt.sign({userId, Name, Service_No}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, Name, Service_No}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await u_user_reg.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Service Number not found"});
    }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% LOGIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% GET MAIL_ID FOR FORGOT PASSWORD %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// export const ForgotPage = async(req, res) => {
// let param=req.query.Service_No
//     try {
//         const UserEdit=await u_user_reg.findAll({
//  attributes:['Service_No','Mail_Id'],
//             where:{
//             Service_No:param
//           }
//         });
//         res.json(UserEdit);
//     } catch (error) {
//         console.log(error);
//     }
// }


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% GET MAIL_ID FOR FORGOT PASSWORD %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const Login = async(req, res) => {
    try {
        const user = await u_user_reg.findAll({
            where:{
                Service_No: req.body.Service_No
            }
        });
        // if(req.body.Password !==  user[0].Password)
        // return res.status(400).json({msg: "Password and Confirm Password do not match"});

        const match = await bcrypt.compare(req.body.Password, user[0].Password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].Name;
        const service_no = user[0].Service_no;
        const accessToken = jwt.sign({userId, name, service_no}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, service_no}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await u_user_reg.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Service Number not found"});
    }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% LOGOUT %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Admin.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Admin.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     LOGOUT      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Forms[1-8]         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


export const Forms = async(req, res) => {
    const { Service_No, Service_Name, Corps_Name,Record_Office_Name,Group_Name, Reg_Type, Trade_Name,Rank_Category, Rank_Name, Name, Gender, DOB, Enroll_Date, World_War2, Opt_Attend ,Deco } = req.body;
    const { Unit_Last_Served, Discharge_Date, Discharge_Reason,Discharge_Med_Cat,Discharge_Character, Discharge_Book_No, If_Pensioner, PPO_No,Pension_Sanctioned, Present_Pension, If_Sanctioned_Dis_Pension, Disability_Pension,Disability_Percentage, Pension_AC_No, Bank_Name, Branch,IFSC } = req.body;
    const { Father_Name, Mother_Name, Religion, Caste_Category, Birth_State, Birth_Dist_Surname, Birth_Place, Adhaar, Voter_Id,PAN, CSD, ECHS, Id_Mark1,Id_Mark2 } = req.body;
    const { House_No , House_Name, Street,Pincode,Police_Station, State, District, Taluk_Name,City_Village,Same,P_State, Locality, P_Locality, P_District,P_Taluk_Name, Tele_No, P_House_No,P_City_Village, P_House_Name,P_Street, P_Pincode, P_Police_Station } = req.body;
    const { Civil_Qualification, Addi_Course, Equi_Test,Civil_Emp_Status,Sector,Dept, Pres_Desg, Employer, Month_Income,Official_No, Desg_Retire, Retire_Date, Civil_PPO_No } = req.body;
    const { Marital_Status, Marriage_Date, Spouse_Name,Spouse_Relation,Spouse_DOB, Spouse_Pres_Desg, Spouse_Employer, Spouse_Month_Income,Spouse_Official_No,Spouse_Desg_Retire,Spouse_Retire_Date,Spouse_Civil_PPO_No,Spouse_Id_Mark, Spouse_Qualification, Spouse_Emp_Status,Spouse_Retirement_Date, Spouse_Adhaar, Spouse_Voter_Id,Spouse_PAN,Spouse_CSD,Spouse_ECHS, Spouse_Dept, Spouse_Sector, Divorce_Date, Court_Order, Death_Date } = req.body;
    const { Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

    try {
      const name =await single_values.findOne({
      attributes:['id'],
       where:{
           Value: Service_Name
       }
    });
    console.log(name);
    const n=name.toJSON()
    const service= n.id;


  // Discharge Reason

  const drname =await single_values.findOne({
  attributes:['id'],
   where:{
       Value: Discharge_Reason
   }
  });
  console.log(drname);
  const drn=drname.toJSON()
  const discharge_Reason_id= drn.id;

  // Discharge Character

  const dcname =await single_values.findOne({
  attributes:['id'],
   where:{
       Value: Discharge_Character
   }
  });
  // console.log(dcname);
  const dcn=dcname.toJSON()
  const discharge_Character_id= dcn.id;


  // Religion ***********************************************

  const ccname =await single_values.findOne({
  attributes:['id'],
   where:{
       Value: Religion
   }
  });
  // console.log(rgname);
  const ccn=ccname.toJSON()
  const religion_id= ccn.id;


  // Religion ***********************************************

  const rgname =await single_values.findOne({
  attributes:['id'],
   where:{
       Value: Caste_Category
   }
  });
  // console.log(rgname);
  const rgn=rgname.toJSON()
  const caste_id= rgn.id;



    // Civil_Qualification ***********************************************

    const cqname =await single_values.findOne({
    attributes:['id'],
     where:{
         Value: Civil_Qualification
     }
    });
    // console.log(rgname);
    const cqn=cqname.toJSON()
    const civil_id= cqn.id;

    // Spouse_Civil_Qualification ***********************************************

    // const scqname =await single_values.findOne({
    // attributes:['id'],
    //  where:{
    //      Value: Spouse_Qualification
    //  }
    // });
    // // console.log(rgname);
    // const scqn=scqname.toJSON()
    // const spouse_civil_id= scqn.id;




    // Reg_Type ***********************************************

    // const rtname =await single_values.findOne({
    // attributes:['id'],
    //  where:{
    //      Value: Reg_Type
    //  }
    // });
    // // console.log(rgname);
    // const rtn=rtname.toJSON()
    // const reg_type_id= rtn.id;

    // Rank  Category***********************************************

    const rcname =await single_values.findOne({
    attributes:['id'],
     where:{
         Value: Rank_Category
     }
    });
    // console.log(rcname);
    const rcn=rcname.toJSON()
    const rankc_id= rcn.id;


    // Rank ***********************************************

    const rkname =await d_rank.findOne({
    attributes:['id'],
     where:{
         Rank_Name: Rank_Name
     }
    });
    // console.log(rgname);
    const rkn=rkname.toJSON()
    const rank_id= rkn.id;

    // Medical Category Id ***********************************************

    const mcname =await d_medical_category.findOne({
    attributes:['id'],
     where:{
         Discharge_Med_Cat: Discharge_Med_Cat
     }
    });
    // console.log(rgname);
    const mcn=mcname.toJSON()
    const medical_id= mcn.id;

    // Trade Id ***********************************************

    const trname =await d_trade.findOne({
    attributes:['id'],
     where:{
         Trade_Name: Trade_Name
     }
    });
    // console.log(rgname);
    const trn=trname.toJSON()
    const trade_id= trn.id;

  // Permenant State Surname

const psname =await d_state.findOne({
    attributes:['State_Surname'],
     where:{
         State: P_State
     }
  });
  // console.log(sname);
  const pss=psname.toJSON()
  const p_State_Surname= pss.State_Surname;

  // Present State Surname

// const sname =await d_state.findOne({
//     attributes:['State_Surname'],
//      where:{
//          State: State
//      }
//   });
//   // console.log(sname);
//   const ss=sname.toJSON()
//   const state_Surname= ss.State_Surname;

  // Birth State Surname

const bsname =await d_state.findOne({
    attributes:['State_Surname'],
     where:{
         State: Birth_State
     }
  });
  // console.log(sname);
  const bss=bsname.toJSON()
  const b_State_Surname= bss.State_Surname;

  // Permenant District Surname

const pdname =await d_district.findOne({
    attributes:['Dist_Surname'],
     where:{
         District: P_District
     }
  });
  // console.log(sname);
  const pd=pdname.toJSON()
  const p_Dist_Surname= pd.Dist_Surname;


  // Present District Surname

// const dname =await d_district.findOne({
//     attributes:['Dist_Surname'],
//      where:{
//          District: District
//      }
//   });
//   // console.log(sname);
//   const d=dname.toJSON()
//   const dist_Surname= d.Dist_Surname;
//
//
  // Birth District Surname

const bdname =await d_district.findOne({
    attributes:['Dist_Surname'],
     where:{
         District: Birth_Dist_Surname
     }
  });
   console.log(bdname);
  const bd=bdname.toJSON()
  console.log(bd);

  const b_Dist_Surname= bd.Dist_Surname;
console.log(b_Dist_Surname);


  // Permanent Taluk Surname

const ptname =await d_taluk.findOne({
    attributes:['Taluk_Surname'],
     where:{
         Taluk_Name: P_Taluk_Name
     }
  });
  // console.log(sname);
  const pt=ptname.toJSON()
  const p_Taluk_Surname= pt.Taluk_Surname;

  //Present Taluk Surname

  // const tname =await d_taluk.findOne({
  //   attributes:['Taluk_Surname'],
  //    where:{
  //        Taluk_Name: Taluk_Name
  //    }
  // });
  // // console.log(sname);
  // const t=tname.toJSON()
  // const taluk_Surname= t.Taluk_Surname;


  // Bank Id ***********************************************

  const bkname =await d_bank.findOne({
  attributes:['id'],
   where:{
       IFSC: IFSC
   }
  });
  // console.log(rgname);
  const bkn=bkname.toJSON()
  const bank_id= bkn.id;


// Corps


// const cname =await single_values.findOne({
// attributes:['id'],
//  where:{
//      Value: Corps_Name
//  }
// });
// console.log(cname);
// const cn=cname.toJSON()
// const Corps= cn.id;
// Rank_Category

//


const user = await u_form_details.count({
         attributes:['Service_No'],
         where:{
           [Op.or]:[{Service_No:Service_No}]

       }
     });

  if(user == 0){


await u_form_details.create({


  //form1

  Service_No:Service_No,
  Service_Name: service,
  Corps_Name: Corps_Name,
  Record_Office_Name: Record_Office_Name,
  Rank_Category: rankc_id,
  Group_Name:Group_Name,
  Trade_Name: trade_id,
  Rank_Name:rank_id,
  Name: Name,
  Gender: Gender,
  DOB: DOB,
  Enroll_Date: Enroll_Date,
  World_War2: World_War2,
  Opt_Attend: Opt_Attend,
  Deco: Deco,

  //form2

              Unit_Last_Served:Unit_Last_Served,
              Discharge_Date: Discharge_Date,
              Discharge_Reason: discharge_Reason_id,
              Discharge_Med_Cat: medical_id,
              Discharge_Character:discharge_Character_id,
              Discharge_Book_No: Discharge_Book_No,
              If_Pensioner:If_Pensioner,
              PPO_No: PPO_No,
              Pension_Sanctioned: Pension_Sanctioned,
              Present_Pension: Present_Pension,
              If_Sanctioned_Dis_Pension: If_Sanctioned_Dis_Pension,
              Disability_Pension: Disability_Pension,
              Disability_Percentage: Disability_Percentage,
              Pension_AC_No: Pension_AC_No,

              IFSC:bank_id,

  //form3

              Father_Name:Father_Name,
              Mother_Name: Mother_Name,
              Religion: religion_id,
              Caste_Category: caste_id,
              Birth_State: b_State_Surname,
              Birth_District:b_Dist_Surname,
              Birth_Place: Birth_Place,
              Adhaar:Adhaar,
              Voter_Id: Voter_Id,
              PAN: PAN,
              CSD: CSD,
              ECHS: ECHS,
              Id_Mark1: Id_Mark1,
              Id_Mark2: Id_Mark2,


  //Form4

              House_No:House_No,
              House_Name: House_Name,
              Street: Street,
              State:State,
              District:District,
              Taluk_Name:Taluk_Name,
              City_Village:City_Village,
              Locality:Locality,
              Pincode: Pincode,
              Police_Station:Police_Station,
              Tele_No: Tele_No,
              Same:Same,
              P_House_No: P_House_No,
              P_House_Name: P_House_Name,
              P_Street: P_Street,
              P_City_Village:P_City_Village,
              P_Pincode: P_Pincode,
              P_State:p_State_Surname,
              P_District:p_Dist_Surname,
              P_Taluk_Name:p_Taluk_Surname,
              P_Locality:P_Locality,
              P_Police_Station: P_Police_Station,


  //Form5

              Civil_Qualification :civil_id,
              Addi_Course: Addi_Course,
              Equi_Test:Equi_Test,
              Civil_Emp_Status: Civil_Emp_Status,
              Sector:Sector,
              Dept:Dept,
              Pres_Desg: Pres_Desg,
              Employer:Employer,
              Month_Income: Month_Income,
              Official_No: Official_No,
              Desg_Retire: Desg_Retire,
              Retire_Date: Retire_Date,
              Civil_PPO_No: Civil_PPO_No,

  //form6


              Marital_Status :Marital_Status,
              Marriage_Date: Marriage_Date,
              Spouse_Name:Spouse_Name,
              Spouse_Relation: Spouse_Relation,
              Spouse_DOB:Spouse_DOB,
              Spouse_Sector: Spouse_Sector,
              Spouse_Dept: Spouse_Dept,
              Spouse_Pres_Desg: Spouse_Pres_Desg,
              Spouse_Employer: Spouse_Employer,
              Spouse_Month_Income: Spouse_Month_Income,
              Spouse_Official_No: Spouse_Official_No ,
              Spouse_Desg_Retire: Spouse_Desg_Retire,
              Spouse_Retire_Date: Spouse_Retire_Date,
              Spouse_Civil_PPO_No: Spouse_Civil_PPO_No,
              Spouse_Id_Mark: Spouse_Id_Mark,
              Spouse_Qualification:Spouse_Qualification,
              Spouse_Emp_Status: Spouse_Emp_Status,
              Spouse_Adhaar: Spouse_Adhaar,
              Spouse_Voter_Id: Spouse_Voter_Id,
              Spouse_PAN:Spouse_PAN,
              Spouse_CSD:Spouse_CSD,
              Spouse_ECHS:Spouse_ECHS,
              Divorce_Date:Divorce_Date,
              Court_Order:Court_Order,
              Death_Date:Death_Date


});
// if(Marital_Status!="Single"){
// await u_spouse_details.create({

// });
// }
const zsb_id =await d_district.findOne({
    attributes:['ZSB_Id'],
     where:{
         District: District
     }
  });
  const z=zsb_id.toJSON()
  const Zsb_id= z.ZSB_Id;


        const zsb_name = await d_zsb.findOne({
            attributes:['ZSB_Name'],
            where:{
              ZSB_Id:Zsb_id
            }
        });
        const z_n=zsb_name.toJSON()
        const Zsb_name= z_n.ZSB_Name;

 await u_status_details.create({
Service_No:Service_No,
Name:Name,
Board_Name:Zsb_name,
Reg_Type: req.body.Reg_Type
 });

  await u_user_reg.update({

      Status:'Submitted'},{
       where:{
         Service_No:Service_No,
       }
}
      );

      await u_dependent_details.update({

          User_Status:'Submitted'},{
           where:{
             Service_No:Service_No,
           }
    }
          );

          await u_Dfile_details.update({

              User_Status:'Submitted'},{
               where:{
                 Service_No:Service_No,
               }
        }
              );

              await u_file_details.update({

                  User_Status:'Submitted'},{
                   where:{
                     Service_No:Service_No,
                   }
            }
                  );
                  await u_Sfile_details.update({

                      User_Status:'Submitted'},{
                       where:{
                         Service_No:Service_No,
                       }
                }
                      );




//
//
//         await u_service_details.create({
//
//             Service_No:Service_No,
//             Service_Name: Service,
//             Corps_Name: Corps_Name,
//             Record_Office_Name: Record_Office_Name,
//             Rank_Category: Rank_Category,
//             Group_Name:Group_Name,
//             Trade_Name: Trade_Name,
//             Rank_Name:Rank_Name,
//             Name: Name,
//             Gender: Gender,
//             DOB: DOB,
//             Enroll_Date: Enroll_Date,
//             World_War2: World_War2,
//             Opt_Attend: Opt_Attend,
//             Deco: Deco
//         });
//
//
//  await u_pension_details.create({
//
//             Service_No:Service_No,
//             Unit_Last_Served:Unit_Last_Served,
//             Discharge_Date: Discharge_Date,
//             Discharge_Reason: Discharge_Reason,
//             Discharge_Med_Cat: Discharge_Med_Cat,
//             Discharge_Character:Discharge_Character,
//             Discharge_Book_No: Discharge_Book_No,
//             If_Pensioner:If_Pensioner,
//             PPO_No: PPO_No,
//             Pension_Sanctioned: Pension_Sanctioned,
//             Present_Pension: Present_Pension,
//             If_Sanctioned_Dis_Pension: If_Sanctioned_Dis_Pension,
//             Disability_Pension: Disability_Pension,
//             Disability_Percentage: Disability_Percentage,
//             Pension_AC_No: Pension_AC_No,
//             Bank_Name: Bank_Name,
//             Branch: Branch,
//             IFSC:IFSC
//         });
//
//
//   await u_personal_details.create({
//
//             Service_No:Service_No,
//             Father_Name:Father_Name,
//             Mother_Name: Mother_Name,
//             Religion: Religion,
//             Caste_Category: Caste_Category,
//             State: State,
//             Birth_Dist_Surname:Birth_Dist_Surname,
//             Birth_Place: Birth_Place,
//             Adhaar:Adhaar,
//             Voter_Id: Voter_Id,
//             PAN: PAN,
//             CSD: CSD,
//             ECHS: ECHS,
//             Id_Mark1: Id_Mark1,
//             Id_Mark2: Id_Mark2
//         });
//
//
//   await u_contact_details.create({
//
//             Service_No:Service_No,
//             House_No:House_No,
//             House_Name: House_Name,
//             Street: Street,
//             State:State,
//             District:District,
//             Taluk_Name:Taluk_Name,
//             City_Village:City_Village,
//             Locality:Locality,
//             Pincode: Pincode,
//             Police_Station:Police_Station,
//             Tele_No: Tele_No,
//             Same:Same,
//             P_House_No: P_House_No,
//             P_House_Name: P_House_Name,
//             P_Street: P_Street,
//             P_City_Village:P_City_Village,
//             P_Pincode: P_Pincode,
//             P_State:P_State,
//             P_District:P_District,
//             P_Taluk_Name:P_Taluk_Name,
//             P_Locality:P_Locality,
//
//             P_Police_Station: P_Police_Station
//
//         });
//
//
//  await u_employment_details.create({
//
//             Service_No:Service_No,
//             Civil_Qualification :Civil_Qualification,
//             Addi_Course: Addi_Course,
//             Equi_Test:Equi_Test,
//             Civil_Emp_Status: Civil_Emp_Status,
//             Sector:Sector,
//
//             Dept:Dept,
//             Pres_Desg: Pres_Desg,
//             Employer:Employer,
//             Month_Income: Month_Income,
//             Official_No: Official_No,
//             Desg_Retire: Desg_Retire,
//             Retire_Date: Retire_Date,
//             Civil_PPO_No: Civil_PPO_No
//         });
//
//
// await u_spouse_details.create({
//
//             Service_No:Service_No,
//             Marital_Status :Marital_Status,
//             Marriage_Date: Marriage_Date,
//             Spouse_Name:Spouse_Name,
//             Spouse_Relation: Spouse_Relation,
//             Spouse_DOB:Spouse_DOB,
//             Sector: Sector,
//             Dept: Dept,
//             Spouse_Pres_Desg: Spouse_Pres_Desg,
//             Spouse_Employer: Spouse_Employer,
//             Spouse_Month_Income: Spouse_Month_Income,
//             Spouse_Official_No: Spouse_Official_No ,
//             Spouse_Desg_Retire: Spouse_Desg_Retire,
//             Spouse_Retire_Date: Spouse_Retire_Date,
//             Spouse_Civil_PPO_No: Spouse_Civil_PPO_No,
//             Spouse_Id_Mark: Spouse_Id_Mark,
//             Spouse_Qualification:Spouse_Qualification,
//             Spouse_Emp_Status: Spouse_Emp_Status,
//             Spouse_Adhaar: Spouse_Adhaar,
//             Spouse_Voter_Id: Spouse_Voter_Id,
//             Spouse_PAN:Spouse_PAN,
//             Spouse_CSD:Spouse_CSD,
//             Spouse_ECHS:Spouse_ECHS
//         });

res.json({msg: "Registration Successful"});

}
      else{
        res.status(400).json({msg: "Record already exists"});

        }

// res.redirect('/DocForm');

       } catch (error) {
        console.log(error);
    }

}




//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Forms         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form8         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


export const Form8 = async(req, res) => {
     const { Service_No, Dep_Name, Registered_date, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

    try {
        await u_dependent_details.create({

            Service_No:Service_No,
            Dep_Name :Dep_Name,
            Registered_date:Registered_date,
            Relation: Relation,
            Dep_DOB:Dep_DOB,
            Dep_Adhaar: Dep_Adhaar,
            Dep_Qualification:Dep_Qualification,
            Dep_Academic_Yr: Dep_Academic_Yr,
            Dep_Employment_Status:Dep_Employment_Status,
            Dep_Marital_Status: Dep_Marital_Status
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form8   finding       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const form8dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_dependent_details.findAll({
            where:{
            Dep_Name:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}


// export const VForm7update = async(req, res) => {
//      const {  Service_No,checkDep_Name, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;
//
//     try {
//         await u_dependent_details.update({
//
//             where:{
//               // [Op.and] :[{Service_No:Service_No},{  Dep_Name :Dep_Name}]
//               Service_No:Service_No,
//               Dep_Name :checkDep_Name,
//               Relation:Relation
//             }
// });
// // await u_Dfile_details.destroy({
// //
// //     where:{
// //       // [Op.and] :[{Service_No:Service_No},{  Dep_Name :Dep_Name}]
// //       Service_No:Service_No,
// //       Dep_Name :checkDep_Name,
// //       Relation:Relation
// //     }
// // });
//          res.json({msg: "Registration Successful"});
//     } catch (error) {
//         console.log(error);
//     }
// }

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7Edit         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form7Edit = async(req, res) => {
     const { Service_No,checkDep_Name, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

    try {
        await u_dependent_details.update({
            Service_No:Service_No,
            Dep_Name :Dep_Name,
            Relation: Relation,
            Dep_DOB:Dep_DOB,
            Dep_Adhaar: Dep_Adhaar,
            Dep_Qualification:Dep_Qualification,
            Dep_Academic_Yr: Dep_Academic_Yr,
            Dep_Employment_Status:Dep_Employment_Status,
            Dep_Marital_Status: Dep_Marital_Status
          },{
            where:{
              // [Op.and] :[{Service_No:Service_No},{  Dep_Name :Dep_Name}]
              Service_No:Service_No,
              Dep_Name :checkDep_Name
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7Edit          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7Delete-Onclick Delete          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form7Delete = async(req, res) => {
     const { Service_No,checkDep_Name,Relation } = req.body;

    try {
        await u_dependent_details.destroy({

            where:{
              // [Op.and] :[{Service_No:Service_No},{  Dep_Name :Dep_Name}]
              Service_No:Service_No,
              Dep_Name :checkDep_Name,
              Relation:Relation
            }
});
await u_Dfile_details.destroy({

    where:{
      // [Op.and] :[{Service_No:Service_No},{  Dep_Name :Dep_Name}]
      Service_No:Service_No,
      Dep_Name :checkDep_Name,
      Relation:Relation
    }
});
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    Form7Delete-Onclick Delete         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7Delete          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const form7deletes = async(req, res) => {
     const { Service_No, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

    try {
        await u_dependent_details.destroy({

where:{
        Service_No: "445345354H"
    }
        });
    } catch (error) {
        console.log(error);
    }
}

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7Delete          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form1     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form1 = async(req, res) => {
    const { Service_No, Service_Name, Corps_Name,Record_Office_Name,Group_Name, Trade_Name, Rank_Name, Name, Gender, DOB, Enroll_Date, World_War2, Opt_Attend ,Deco } = req.body;

    try {
        await u_service_details.create({

            Service_No:Service_No,
            Service_Name: Service_Name,
            Corps_Name: Corps_Name,
            Record_Office_Name: Record_Office_Name,
            Group_Name:Group_Name,
            Trade_Name: Trade_Name,
            Rank_Name:Rank_Name,
            Name: Name,
            Gender: Gender,
            DOB: DOB,
            Enroll_Date: Enroll_Date,
            World_War2: World_War2,
            Opt_Attend: Opt_Attend,
            // Deco: Deco
        });

        const newpath = __dirname + "/files/";
  const file = req.files.deco;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });

        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form1            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form2            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form2 = async(req, res) => {
    const { Service_No, Unit_Last_Served, Discharge_Date, Discharge_Reason,Discharge_Med_Cat,Discharge_Character, Discharge_Book_No, If_Pensioner, PPO_No,Pension_Sanctioned, Present_Pension, Enroll_Date, If_Sanctioned_Dis_Pension, Disability_Pension,Disability_Percentage, Pension_AC_No, Bank_Name, Branch,IFSC } = req.body;

    try {
        await u_pension_details.create({

            Service_No:Service_No,
            Unit_Last_Served:Unit_Last_Served,
            Discharge_Date: Discharge_Date,
            Discharge_Reason: Discharge_Reason,
            Discharge_Med_Cat: Discharge_Med_Cat,
            Discharge_Character:Discharge_Character,
            Discharge_Book_No: Discharge_Book_No,
            If_Pensioner:If_Pensioner,
            PPO_No: PPO_No,
            Pension_Sanctioned: Pension_Sanctioned,
            Present_Pension: Present_Pension,
            Enroll_Date: Enroll_Date,
            If_Sanctioned_Dis_Pension: If_Sanctioned_Dis_Pension,
            Disability_Pension: Disability_Pension,
            Disability_Percentage: Disability_Percentage,
            Pension_AC_No: Pension_AC_No,
            Bank_Name: Bank_Name,
            Branch: Branch,
            IFSC:IFSC
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form2          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form3            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form3 = async(req, res) => {
    const { Service_No, Father_Name, Mother_Name, Religion, Caste_Category,Birth_Dist_Surname, Birth_Place, Adhaar, Voter_Id,PAN, CSD, ECHS, Id_Mark1,Id_Mark2 } = req.body;

    try {
        await u_personal_details.create({

            Service_No:Service_No,
            Father_Name:Father_Name,
            Mother_Name: Mother_Name,
            Religion: Religion,
            Caste_Category: Caste_Category,
            Birth_Dist_Surname:Birth_Dist_Surname,
            Birth_Place: Birth_Place,
            Adhaar:Adhaar,
            Voter_Id: Voter_Id,
            PAN: PAN,
            CSD: CSD,
            ECHS: ECHS,
            Id_Mark1: Id_Mark1,
            Id_Mark2: Id_Mark2
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form3          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form4            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form4 = async(req, res) => {
    const { Service_No, House_No , House_Name, Street,Pincode,Police_Station, Tele_No, P_House_No, P_House_Name,P_Street, P_Pincode, P_Police_Station } = req.body;

    try {
        await u_contact_details.create({

            Service_No:Service_No,
            House_No:House_No,
            House_No: House_No,
            House_Name: House_Name,
            Street: Street,
            Pincode:Pincode,
            Pincode: Pincode,
            Police_Station:Police_Station,
            Tele_No: Tele_No,
            P_House_No: P_House_No,
            P_House_Name: P_House_Name,
            P_Street: P_Street,
            P_Pincode: P_Pincode,
            P_Police_Station: P_Police_Station

        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form4          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form5            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form5 = async(req, res) => {
    const { Service_No, Civil_Qualification, Addi_Course, Equi_Test,Civil_Emp_Status,Dept, Pres_Desg, Employer, Month_Income,Official_No, Desg_Retire, Retire_Date, Civil_PPO_No } = req.body;

    try {
        await u_employment_details.create({

            Service_No:Service_No,
            Civil_Qualification :Civil_Qualification,
            Addi_Course: Addi_Course,
            Equi_Test:Equi_Test,
            Civil_Emp_Status: Civil_Emp_Status,
            Dept:Dept,
            Pres_Desg: Pres_Desg,
            Employer:Employer,
            Month_Income: Month_Income,
            Official_No: Official_No,
            Desg_Retire: Desg_Retire,
            Retire_Date: Retire_Date,
            Civil_PPO_No: Civil_PPO_No
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form5          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form6          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form6 = async(req, res) => {
    const { Service_No, Marital_Status, Marriage_Date, Spouse_Name,Spouse_Relation,Spouse_DOB, Spouse_Id_Mark, Spouse_Qualification, Spouse_Emp_Status,Spouse_Retirement_Date, Spouse_Adhaar, Spouse_Voter_Id,Spouse_PAN,Spouse_CSD,Spouse_ECHS } = req.body;

    try {
        await u_spouse_details.create({

            Service_No:Service_No,
            Marital_Status :Marital_Status,
            Marriage_Date: Marriage_Date,
            Spouse_Name:Spouse_Name,
            Spouse_Relation: Spouse_Relation,
            Spouse_DOB:Spouse_DOB,
            Spouse_Id_Mark: Spouse_Id_Mark,
            Spouse_Qualification:Spouse_Qualification,
            Spouse_Emp_Status: Spouse_Emp_Status,
            Spouse_Retirement_Date: Spouse_Retirement_Date,
            Spouse_Adhaar: Spouse_Adhaar,
            Spouse_Voter_Id: Spouse_Voter_Id,
            Spouse_PAN:Spouse_PAN,
            Spouse_CSD:Spouse_CSD,
            Spouse_ECHS:Spouse_ECHS
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form6          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form7 = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const users=await u_dependent_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const TableFilter = async(req, res) => {
    try {
        const users=await u_form_details.findAll({

        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Edit-Form8         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const EditForm8 = async(req, res) => {
let param=req.query.Dep_Name
    try {
        const UserEdit=await u_dependent_details.findAll({

            where:{
            Dep_Name:param
          }
        });
        res.json(UserEdit);
    } catch (error) {
        console.log(error);
    }
}




//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     Edit-Form8         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

















//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       WidowForm          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// export const DeleteForm8 = async(req, res) => {
//    const {  Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

//     try {


//  await u_dependent_details.delete({

//             Service_No:Service_No,
//             Dep_Name :Dep_Name,
//             Relation: Relation,
//             Dep_DOB:Dep_DOB,
//             Dep_Adhaar: Dep_Adhaar,
//             Dep_Qualification:Dep_Qualification,
//             Dep_Academic_Yr: Dep_Academic_Yr,
//             Dep_Employment_Status:Dep_Employment_Status,
//             Dep_Marital_Status: Dep_Marital_Status
//         });

//     } catch (error) {
//         console.log(error);
//     }
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       WidowForm          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       WidowForm          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const WidowForm = async(req, res) => {
    const { Service_No, Widow_Reg_No, Family_Pension, W_Nxt_Kin,Death_Date,Death_Nature, ESM_No,Registered_date} = req.body;

    try {

      const user = await u_widow_details.count({
              attributes:['Service_No'],
              where:{
                [Op.or]:[{Service_No:Service_No}]

            }
          });

      if(user == 0){


        await u_widow_details.create({

            Service_No:Service_No,
            Widow_Reg_No :Widow_Reg_No,
            Family_Pension: Family_Pension,
            W_Nxt_Kin:W_Nxt_Kin,
            Death_Date: Death_Date,
            Death_Nature:Death_Nature,
            ESM_No: ESM_No,
            Registered_date:Registered_date

        });


        // const zsb_id =await d_district.findOne({
        //     attributes:['ZSB_Id'],
        //      where:{
        //          District: District
        //      }
        //   });
        //   const z=zsb_id.toJSON()
        //   const Zsb_id= z.ZSB_Id;
        //
        //   const zsb_name = await d_zsb.findOne({
        //             attributes:['ZSB_Name'],
        //             where:{
        //               ZSB_Id:Zsb_id
        //             }
        //         });
        //   const z_n=zsb_name.toJSON()
        //   const Zsb_name= z_n.ZSB_Name;


        await u_status_details.create({
       Service_No:Service_No,
       Name:Name,
       Board_Name:Zsb_name,
       Reg_Type: req.body.Reg_Type
        });

        res.json({msg: "Registration Successful"});
                 }
         else{
            res.status(400).json({msg: "Record already exists"});


          }     } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       WidowForm          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       ClerkView         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


export const clerkUsers = async(req, res) => { //dashboard
    try {
        const users = await u_user_reg.findAll({
            attributes:['id','Name','Service_No','Mail_Id'],
            where:{
                Status: "Submitted"
                ////                   [Op.ne]: 'Not Submitted'

            }
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       getForm1         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getForm1 = async(req, res) => { //dashboard
    try {
        const users = await u_service_details.findAll({
            // attributes:['id','Name','Service_No','Mail_Id'],
            where:{

                Service_No: "a98h"
                ////                   [Op.ne]: 'Not Submitted'

            }
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}


// // %%%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getdep = async(req, res) => {
    try {
        const dep = await u_dependent_details.findAll();
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}


// %%%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%





export const Image = async(req, res) => {
const file = req.files.file

const filePath = path.join(__dirname,'..','public','image')

return file.mv(`${filePath}${file.name}`,(err)=>{
    if(err)console.log('file was not uploaded')
      return status(400).res.json({msg: "File Uploaded Successfully"});

// file.mv(`${filePath}${file.name}`, (err) => {
//     if (err) {
//       res.status(500).send({ message: "File upload failed", code: 200 });
//     }
//     res.status(200).send({ message: "File Uploaded", code: 200 });
//   });


})
}


// //%%%%%%%%%%%%%%%%%%%%%%%%%%%  %  Dependent Dashboard   % %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Dependents = async(req, res) => {
    try {
        const dep = await u_dependent_details.findAll({
            attributes:['Service_No','Dep_Name','Relation','Dep_DOB','Dep_Adhaar','Dep_Qualification','Dep_Academic_Yr','Dep_Employment_Status','Dep_Marital_Status','Dep_DOB']
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}
// //%%%%%%%%%%%%%%%%%%%%%%%%%%%  %  Dependent Dashboard   % %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const getimg= async (req, res) => {
  let param = req.query.A_Service_No
  try {
      const u =  await u_dependent_details.findOne({
        attributes:['Relation'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.Relation;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const getUserStatus= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_user_reg.findOne({
        attributes:['Status'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.Status;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}



export const getEmp_Status= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_employed_details.findOne({
        attributes:['User_Status'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.User_Status;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const getDOB= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_user_reg.findOne({
        attributes:['createdAt'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.createdAt;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


export const getEDOB= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_form_details.findOne({
        attributes:['DOB'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.DOB;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


export const getTrades= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_form_details.findOne({
        attributes:['Trade_Name'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.Trade_Name;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


export const getUS= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_status_details.findOne({
        attributes:['User_Status'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.User_Status;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
export const creatDRow = async(req, res) => {
  const  Service_No = req.body.Service_No;
  const  Dep_Name = req.body.Dep_Name;
  const  Relation = req.body.Relation;


  try {
      await u_Dfile_details.create({
              Service_No:Service_No,
              Dep_Name:Dep_Name,
              Relation:Relation
          });
          // res.redirect('/form7')
          res.json({msg: "Registration Successful"});

        }
         catch (error) {
            console.log(error);
        }
        // res.redirect('/form7')

}

//--------------------------------- VIEW FORMS -------------------------------------------

export const viewform1dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_form_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}


export const ViewForm1Edit = async(req, res) => {
     const { Service_No,Service_Name,
     Corps_Name, Record_Office_Name, Group_Name,Trade_Name,Rank_Category, Rank_Name, Gender, DOB,
     Enroll_Date, World_War2, Opt_Attend, Deco } = req.body;

    try {

      const name =await single_values.findOne({
      attributes:['id'],
       where:{
           Value: Service_Name
       }
    });
    console.log(name);
    const n=name.toJSON()
    const service= n.id;

    const rcname =await single_values.findOne({
    attributes:['id'],
     where:{
         Value: Rank_Category
     }
    });
    // console.log(rcname);
    const rcn=rcname.toJSON()
    const rankc_id= rcn.id;


    // Rank ***********************************************

    const rkname =await d_rank.findOne({
    attributes:['id'],
     where:{
         Rank_Name: Rank_Name
     }
    });
    // console.log(rgname);
    const rkn=rkname.toJSON()
    const rank_id= rkn.id;

    // Trade Id ***********************************************

    const trname =await d_trade.findOne({
    attributes:['id'],
     where:{
         Trade_Name: Trade_Name
     }
    });
    // console.log(rgname);
    const trn=trname.toJSON()
    const trade_id= trn.id;



        await u_form_details.update({
            Service_No:Service_No,
            Service_Name:service,
            Corps_Name :Corps_Name,
            Group_Name:Group_Name,
            Rank_Category:rankc_id,
            Record_Office_Name: Record_Office_Name,
            Trade_Name:trade_id,
            Rank_Name: rank_id,
            Gender:Gender,
            DOB:DOB,
            Enroll_Date:Enroll_Date,
            World_War2:World_War2,
            Opt_Attend:Opt_Attend,
            Deco:Deco

          },{
            where:{
              Service_No:Service_No
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}


// viewf2



export const viewform2dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_form_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}




export const ViewForm2Edit = async(req, res) => {
     const { Service_No,Unit_Last_Served, Discharge_Date, Discharge_Reason, Discharge_Med_Cat,Discharge_Character,Discharge_Book_No,If_Pensioner,
     PPO_No, Pension_Sanctioned,Present_Pension, If_Sanctioned_Dis_Pension,Disability_Percentage,Disability_Pension,Pension_AC_No,  Bank_Name, Branch, IFSC } = req.body;

    try {


      // Discharge Reason

      const drname =await single_values.findOne({
      attributes:['id'],
       where:{
           Value: Discharge_Reason
       }
      });
      console.log(drname);
      const drn=drname.toJSON()
      const discharge_Reason_id= drn.id;

      // Discharge Character

      const dcname =await single_values.findOne({
      attributes:['id'],
       where:{
           Value: Discharge_Character
       }
      });
      // console.log(dcname);
      const dcn=dcname.toJSON()
      const discharge_Character_id= dcn.id;


          // Medical Category Id ***********************************************

          const mcname =await d_medical_category.findOne({
          attributes:['id'],
           where:{
               Discharge_Med_Cat: Discharge_Med_Cat
           }
          });
          // console.log(rgname);
          const mcn=mcname.toJSON()
          const medical_id= mcn.id;

          // Bank Id ***********************************************

          const bkname =await d_bank.findOne({
          attributes:['id'],
           where:{
               IFSC: IFSC
           }
          });
          // console.log(rgname);
          const bkn=bkname.toJSON()
          const bank_id= bkn.id;



        await u_form_details.update({
            Service_No:Service_No,
            Unit_Last_Served:Unit_Last_Served,
            Discharge_Date :Discharge_Date,
            Discharge_Reason: discharge_Reason_id,
            Discharge_Med_Cat:medical_id,
            Discharge_Character: discharge_Character_id,
            Discharge_Book_No:Discharge_Book_No,
            If_Pensioner: If_Pensioner,
            PPO_No: PPO_No,
            Pension_Sanctioned: Pension_Sanctioned,
            Present_Pension:Present_Pension,
            If_Sanctioned_Dis_Pension: If_Sanctioned_Dis_Pension,
            Disability_Percentage: Disability_Percentage,
            Disability_Pension: Disability_Pension,
            Pension_AC_No : Pension_AC_No,
            Bank_Name : Bank_Name,
            Branch : Branch,
            IFSC : bank_id


          },{
            where:{
              Service_No:Service_No
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

//viewf3


export const viewform3dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_form_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}

export const ViewForm3Edit = async(req, res) => {
     const { Service_No,Father_Name, Mother_Name, Religion, Caste_Category,Birth_State, Birth_Dist_Surname,Birth_Place,
        Adhaar,Voter_Id,PAN,CSD,ECHS,Id_Mark1,Id_Mark2 } = req.body;

    try {


        // Religion ***********************************************

        const ccname =await single_values.findOne({
        attributes:['id'],
         where:{
             Value: Religion
         }
        });
        // console.log(rgname);
        const ccn=ccname.toJSON()
        const religion_id= ccn.id;


        // Religion ***********************************************

        const rgname =await single_values.findOne({
        attributes:['id'],
         where:{
             Value: Caste_Category
         }
        });
        // console.log(rgname);
        const rgn=rgname.toJSON()
        const caste_id= rgn.id;


          // Birth State Surname

        const bsname =await d_state.findOne({
            attributes:['State_Surname'],
             where:{
                 State: Birth_State
             }
          });
          // console.log(sname);
          const bss=bsname.toJSON()
          const b_State_Surname= bss.State_Surname;


          // Birth District Surname

        const bdname =await d_district.findOne({
            attributes:['Dist_Surname'],
             where:{
                 District: Birth_Dist_Surname
             }
          });
           console.log(bdname);
          const bd=bdname.toJSON()
          console.log(bd);

          const b_Dist_Surname= bd.Dist_Surname;
        console.log(b_Dist_Surname);




        await u_form_details.update({
            Service_No:Service_No,
            Father_Name:Father_Name,
            Mother_Name:Mother_Name,
            Religion:religion_id,
            Caste_Category:caste_id,
            Birth_State:b_State_Surname,
            Birth_Dist_Surname:b_Dist_Surname,
            Birth_Place:Birth_Place,
            Adhaar:Adhaar,
            Voter_Id:Voter_Id,
            PAN :PAN,
            CSD: CSD,
            ECHS:ECHS,
            Id_Mark1: Id_Mark1,
            Id_Mark2:Id_Mark2

          },{
            where:{
              Service_No:Service_No
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}


//viewform4

export const viewform4dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_form_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}

export const ViewForm4Edit = async(req, res) => {
     const { Service_No,P_Pincode, P_State, P_District, P_Taluk_Name,P_Locality,P_City_Village,
        P_Street,P_House_No,P_House_Name,P_Police_Station, Tele_No,Pincode, District,State,
         Taluk_Name,  City_Village,Locality ,Street,House_No,House_Name,Police_Station } = req.body;

    try {


        // Permenant State Surname

      const psname =await d_state.findOne({
          attributes:['State_Surname'],
           where:{
               State: P_State
           }
        });
        // console.log(sname);
        const pss=psname.toJSON()
        const p_State_Surname= pss.State_Surname;

        // Permenant District Surname

        const pdname =await d_district.findOne({
          attributes:['Dist_Surname'],
           where:{
               District: P_District
           }
        });
        // console.log(sname);
        const pd=pdname.toJSON()
        const p_Dist_Surname= pd.Dist_Surname;

        // Permanent Taluk Surname

        const ptname =await d_taluk.findOne({
          attributes:['Taluk_Surname'],
           where:{
               Taluk_Name: P_Taluk_Name
           }
        });
        // console.log(sname);
        const pt=ptname.toJSON()
        const p_Taluk_Surname= pt.Taluk_Surname;



        await u_form_details.update({

            P_Pincode:P_Pincode,
            P_State: p_State_Surname,
            P_District:p_Dist_Surname,
            P_Taluk_Name:p_Taluk_Surname,
            P_City_Village:P_City_Village,
            P_Locality:P_Locality,
            P_Street:P_Street,
            P_House_No:P_House_No,
            P_House_Name :P_House_Name,
            P_House_Name: P_House_Name,
            P_Police_Station:P_Police_Station,
            Tele_No:Tele_No,
            Pincode: Pincode,
            State:State,
            District: District,
            Taluk_Name:Taluk_Name,
            City_Village: City_Village,
            Locality: Locality,
            Street:Street,
            House_No: House_No,
            House_Name:  House_Name,
            Police_Station: Police_Station

          },{
            where:{
              Service_No:Service_No
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}



export const viewform5dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_form_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}

export const ViewForm5Edit = async(req, res) => {
     const { Service_No,Civil_Qualification, Addi_Course,Equi_Test, Civil_Emp_Status,Sector,Dept,Pres_Desg,
        Employer,Month_Income,Official_No,Desg_Retire,Retire_Date,Civil_PPO_No} = req.body;

    try {


          // Civil_Qualification ***********************************************

          const cqname =await single_values.findOne({
          attributes:['id'],
           where:{
               Value: Civil_Qualification
           }
          });
          // console.log(rgname);
          const cqn=cqname.toJSON()
          const civil_id= cqn.id;


        await u_form_details.update({
            Service_No:Service_No,
            Civil_Qualification:civil_id,
            Addi_Course:Addi_Course,
            Equi_Test:Equi_Test,
            Civil_Emp_Status:Civil_Emp_Status,
            Sector:Sector,
            Dept:Dept,
            Pres_Desg:Pres_Desg,
            Employer:Employer,
            Month_Income:Month_Income,
            Official_No :Official_No,
            Desg_Retire: Desg_Retire,
            Retire_Date:Retire_Date,
            Civil_PPO_No: Civil_PPO_No


          },{
            where:{
              Service_No:Service_No
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}





export const viewform6dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_form_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}

export const ViewForm6Edit = async(req, res) => {
     const { Service_No,Marital_Status, Marriage_Date,Spouse_Name,Spouse_Relation,Spouse_DOB, Spouse_Id_Mark,
        Spouse_Adhaar,Spouse_Voter_Id,Spouse_PAN,
        Spouse_CSD,Spouse_ECHS,Spouse_Qualification,Spouse_Emp_Status,Spouse_Sector,Spouse_Dept,
        Spouse_Pres_Desg ,Spouse_Employer ,Spouse_Month_Income , Spouse_Official_No,
        Spouse_Desg_Retire,Spouse_Retire_Date,Spouse_Civil_PPO_No,Court_Order ,Divorce_Date} = req.body;

    try {
        await u_form_details.update({
            Service_No:Service_No,
            Marital_Status:Marital_Status,
            Marriage_Date:Marriage_Date,
            Spouse_Name:Spouse_Name,
            Spouse_Relation:Spouse_Relation,
            Spouse_Id_Mark:Spouse_Id_Mark,
            Spouse_Adhaar:Spouse_Adhaar,
            Spouse_Voter_Id:Spouse_Voter_Id,
            Spouse_PAN:Spouse_PAN,
            Spouse_CSD:Spouse_CSD,
            Spouse_ECHS:Spouse_ECHS,
            Spouse_Qualification :Spouse_Qualification,
            Spouse_Emp_Status: Spouse_Emp_Status,
            Spouse_Sector:Spouse_Sector,
            Spouse_Dept: Spouse_Dept,
            Spouse_Pres_Desg: Spouse_Pres_Desg,
            Spouse_Employer: Spouse_Employer,
            Spouse_Month_Income: Spouse_Month_Income,
            Spouse_Official_No: Spouse_Official_No,
            Spouse_Desg_Retire: Spouse_Desg_Retire,
            Spouse_Retire_Date: Spouse_Retire_Date,
            Spouse_Civil_PPO_No: Spouse_Civil_PPO_No,
            Court_Order: Court_Order,
            Divorce_Date: Divorce_Date


          },{
            where:{
              Service_No:Service_No
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}


// viewform7

export const viewform7dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_dependent_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}

export const ViewForm7Edit = async(req, res) => {
     const { Service_No,checkDep_Name, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

    try {
        await u_dependent_details.update({
            Service_No:Service_No,
            Dep_Name :Dep_Name,
            Relation: Relation,
            Dep_DOB:Dep_DOB,
            Dep_Adhaar: Dep_Adhaar,
            Dep_Qualification:Dep_Qualification,
            Dep_Academic_Yr: Dep_Academic_Yr,
            Dep_Employment_Status:Dep_Employment_Status,
            Dep_Marital_Status: Dep_Marital_Status
          },{
            where:{
              // [Op.and] :[{Service_No:Service_No},{  Dep_Name :Dep_Name}]
              Service_No:Service_No,
              Dep_Name :checkDep_Name,
                Relation :Relation
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}


//viewform4

export const viewformuedep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_employed_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}

export const ViewFormUEbEdit = async(req, res) => {
     const { Service_No,ESM_No, Addi_Course1, Addi_Course2, Addi_Course3,Addi_Course4,Civil_Qualification,
        Age,Trade_Name,Trade_Code,Equi_Test} = req.body;

    try {

      const cqname =await single_values.findOne({
      attributes:['id'],
       where:{
           Value: Civil_Qualification
       }
      });
      // console.log(rgname);
      const cqn=cqname.toJSON()
      const civil_id= cqn.id;

      const trname =await d_trade.findOne({
      attributes:['id'],
       where:{
           Trade_Name: Trade_Name
       }
      });
      // console.log(rgname);
      const trn=trname.toJSON()
      const trade_id= trn.id;

        await u_employed_details.update({

          ESM_No:ESM_No,
          Addi_Course1:Addi_Course1,
          Addi_Course2:Addi_Course2,
          Addi_Course3:Addi_Course3,
          Addi_Course4:Addi_Course4,
          Civil_Qualification:civil_id,
          Age:Age,
          Trade_Name:trade_id,
          Trade_Code:Trade_Code,
          Equi_Test:Equi_Test
          },{
            where:{
              Service_No:Service_No
            }
}
 );

           // await u_form_details.update({
           //     Addi_Course1:Addi_Course1,
           //     Addi_Course2:Addi_Course2,
           //     Addi_Course3:Addi_Course3,
           //     Addi_Course4:Addi_Course4,
           //     Trade_Code:Trade_Code,
           //     },{
           //       where:{
           //         Service_No:Service_No
           //       }});


        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}



//viewformw

export const viewformwdep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_widow_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}

export const ViewFormWEdit = async(req, res) => {
     const { A_Service_No, Family_Pension,W_Nxt_Kin,Death_Date,Death_Nature, ESM_No} = req.body;

    try {
        await u_widow_details.update({
          Service_No:A_Service_No,
                Family_Pension: Family_Pension,
                W_Nxt_Kin:W_Nxt_Kin,
                Death_Date: Death_Date,
                Death_Nature: Death_Nature,
                // ESM_No: ESM_No,

          },{
            where:{
              Service_No:A_Service_No
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}


//////////////////////////
export const getName= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_user_reg.findOne({
        attributes:['Name'],
          where:{
              Service_No: param
          }

      });
      const n=u.toJSON()
      const users= n.Name;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const getCivilQualification= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_form_details.findOne({
        attributes:['Civil_Qualification'],
          where:{
              Service_No: param
          }

      });
      const n=u.toJSON()
      const user= n.Civil_Qualification;

//civil quqlification name
      const [users, metadata] = await db.query(" select * from u_form_details  left join forms_view on forms_view.id=u_form_details.id where Service_No =:sn limit 1",
      {
        replacements: { sn: param }

      }
    );
    const cq = [users.vCivil_Qualification,users.vTrade,users.Equi_Test]

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const getRegisterDate= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_user_reg.findOne({
        attributes:['createdAt'],
          where:{
              Service_No: param
          }

      });
      const n=u.toJSON()
      const users= n.createdAt;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


export const getQueryDate= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_status_details.findOne({
        attributes:['updatedAt'],
          where:{
              Service_No: param
          }

      });
      const n=u.toJSON()
      const users= n.updatedAt;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const getReg_Type= async (req, res) => {
  let param = req.query.Service_No
  console.log(param);
  try {
      const u =  await u_user_reg.findOne({
        attributes:['Reg_Type'],
          where:{
              Service_No: param
          }

      });
      console.log(u);

      const n=u.toJSON()
      const users= [n.Reg_Type];

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const getESMs= async (req, res) => {
  let param = req.query.Service_No
  console.log(param);
  try {
      const u =  await u_esm.findOne({
        attributes:['ESM_No'],
          where:{
              Service_No: param
          }

      });
      console.log(u);

      const n=u.toJSON()
      const users= [n.ESM_No];

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


export const FormUE = async (req, res) => {
  const { Service_No,Name, ESM_No, Addi_Course1,District, Addi_Course2,Addi_Course3,Addi_Course4, Civil_Qualification, Trade_Name, Age,Trade_Code, Equi_Test } = req.body;

  try {
    const cqname =await single_values.findOne({
    attributes:['id'],
     where:{
         Value: Civil_Qualification
     }
    });
    // console.log(rgname);
    const cqn=cqname.toJSON()
    const civil_id= cqn.id;

    const trname =await d_trade.findOne({
    attributes:['id'],
     where:{
         Trade_Name: Trade_Name
     }
    });
    // console.log(rgname);
    const trn=trname.toJSON()
    const trade_id= trn.id;



      await u_employed_details.create({
          Service_No:Service_No,
          ESM_No:ESM_No,
          Addi_Course1:Addi_Course1,
          Addi_Course2:Addi_Course2,
          Addi_Course3:Addi_Course3,
          Addi_Course4:Addi_Course4,
          Civil_Qualification:civil_id,
          Age:Age,
          Trade_Name:trade_id,
          Trade_Code:Trade_Code,
          Equi_Test:Equi_Test,
          // Emp_No:Emp_No,

          });
          const dist_id =await u_form_details.findOne({
              attributes:['District'],
               where:{
                   Service_No: Service_No
               }
            });
            const z_d=dist_id.toJSON()
            const District= z_d.District;

          const zsb_id =await d_district.findOne({
              attributes:['ZSB_Id'],
               where:{
                   District: District
               }
            });
            const z=zsb_id.toJSON()
            const Zsb_id= z.ZSB_Id;


                  const zsb_name = await d_zsb.findOne({
                      attributes:['ZSB_Name'],
                      where:{
                        ZSB_Id:Zsb_id
                      }
                  });
                  const z_n=zsb_name.toJSON()
                  const Zsb_name= z_n.ZSB_Name;

          await u_status_details.create({
         Service_No:Service_No,
         Name:Name,
         Board_Name:Zsb_name,
         Reg_Type: 'Emp'
          });


             res.json({msg: "Registration Successful"});

          }
    catch (error) {
          console.log(error);
      }

}



export const resubmit = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_user_reg.update({
            Status:"Submitted"},{
            where:{
                Service_No: Service_No
            }
        });

        res.json({msg: "Registration Successful"});
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}
