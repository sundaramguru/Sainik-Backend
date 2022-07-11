
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

import single_values from "../models/Single.js";
import d_record_office_army from "../models/Record_Office_ArmyModel.js";
import d_state from "../models/StateModel.js";
import d_bank from "../models/BankModel.js";
import d_district from "../models/DistrictModel.js";
import d_rank from "../models/RankModel.js";
import d_reg_category from "../models/Reg_CategoryModel.js";
import d_rank_category from "../models/Rank_CategoryModel.js";
import d_reg_type from "../models/Reg_TypeModel.js";
import d_medical_category from "../models/Medical_CategoryModel.js";
import d_rsb from "../models/RsbModel.js";
import d_service from "../models/Service_NameModel.js";
import d_taluk from "../models/TalukModel.js";
import d_trade from "../models/TradeModel.js";
import d_zsb from "../models/ZsbModel.js";
import u_pension_details from "../models/PensionModel.js";
import u_dependent_details from "../models/DependentModel.js";


// %%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Corp_D = async(req, res) => {
  try {
      const corp = await single_values.findAll({
          attributes:['Value'],
          where:{
            Item: 'Corps Name'
          }

      });
      res.json(corp);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%     Service-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Service_D = async(req, res) => {
  try {
      const services = await single_values.findAll({
          attributes:['Value'],
          where:{
            Item: 'Service Name'
          }

      });
      res.json(services);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     service-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Record_D = async(req, res) => {
  try {
      const record = await d_record_office_army.findAll({
          attributes:['Record_Office_Name']

      });
      res.json(record);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// export const Imageupload= async(req, res) => {

//     try {

//        const {  Imagee } = req.body;
//        const filePath = path.join(__dirname,'..','public','image')

//        const file = req.files.file


//  await u_dependent_details.create({

//            Imagee:Imagee

//         });

//     } catch (error) {
//         console.log(error);
//     }

// }



export const Imageupload = async(req, res) => {
const file = req.files.file
const {  Imagee } = req.body;

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


})}


// %%%%%%%%%%%%%%%%%%%%%%%%     Rank-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Rank_D = async(req, res) => {
  try {
      const rank = await d_rank.findAll({
          attributes:['Rank_Name']

      });
      res.json(rank);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Rank-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Rank_Caegory-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Rank_Category_D = async(req, res) => {
  try {
      const rankc = await d_rank_category.findAll({
          attributes:['Rank_Category']

      });
      res.json(rankc);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Birth_Place-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Trade-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Trade_D = async(req, res) => {
  try {
      const trade = await d_trade.findAll({
          attributes:['Trade_Name']

      });
      res.json(trade);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Trade-->Drop_Down                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Discharge_Medical_Cat-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Med_D = async(req, res) => {
  try {
      const medicals = await d_medical_category.findAll({
          attributes:['Discharge_Med_Cat']

      });
      res.json(medicals);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Discharge_Medical_Cat-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Discharge_Character-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Char_D = async(req, res) => {
  try {
      const characters = await single_values.findAll({
         attributes:['Value'],
          where:{
              Item: 'Discharge Character'
          }

      });
      res.json(characters);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%      Discharge_Character-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank-->Drop_Down                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Bank_D = async(req, res) => {
  try {
      const banks = await d_bank.findAll({
          attributes:['Bank_Name']

      });
      res.json(banks);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank-->Drop_Down                   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank_Branch-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Branch_D = async(req, res) => {
  try {
      const branchs = await d_bank.findAll({
          attributes:['Branch']

      });
      res.json(branchs);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank_Branch-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


export const Branch_Depend = async(req, res) => {

    let param=req.query.branches
        try {
          const name =await d_bank.findOne({
          attributes:['Bank_Name'],
           where:{
               Bank_Name: param
           }
        });
        console.log(name.toJSON());
        const n=name.toJSON()
        const Bank_Name= n.Bank_Name;
            const branchs=await d_bank.findAll({

                where:{
                Bank_Name:Bank_Name
              }
            });
            res.json(branchs);
        } catch (error) {
            console.log(error);
        }
}



export const IFSC_Depend = async(req, res) => {

    let param=req.query.ifs
        try {
          const name =await d_bank.findOne({
          attributes:['Branch'],
           where:{
               Branch: param
           }
        });
        console.log(name.toJSON());
        const n=name.toJSON()
        const Branch= n.Branch;
            const ifscs=await d_bank.findAll({

                where:{
                Branch:Branch
              }
            });
            res.json(ifscs);
        } catch (error) {
            console.log(error);
        }
}


export const Rank_Depend = async(req, res) => {

    let param=req.query.ranks
        try {
          const name =await d_rank_category.findOne({
          attributes:['Rank_Category_Id'],
           where:{
               Rank_Category: param
           }
        });
        //           console.log(name);

        // console.log(name.toJSON());
        const n=name.toJSON()
        const Rank_Category_Id= n.Rank_Category_Id;
            const rank=await d_rank.findAll({

                where:{
                Rank_Category_Id:Rank_Category_Id
              }
            });
            res.json(rank);
        } catch (error) {
            console.log(error);
        }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     IFSC-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Ifscs_D = async(req, res) => {
  try {
      const ifscs = await d_bank.findAll({
          attributes:['IFSC']

      });
      res.json(ifscs);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     IFSC-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Civil_Qualification-->Drop_Down    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Civil_D = async(req, res) => {
  try {
      const civil = await single_values.findAll({
          attributes:['Value'],
          where:{
              Item: 'Civil Qualification'
          }

      });
      res.json(civil);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Civil_Qualification-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 export const Reason_D = async(req, res) => {
  try {
      const reason = await single_values.findAll({
         attributes:['Value'],
          where:{
              Item: 'Discharge Reason'
          }

      });
      res.json(reason);
  } catch (error) {
      console.log(error);
  }
}


// %%%%%%%%%%%%%%%%%%%%%%%%     Prefix-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 export const Prefix_D = async(req, res) => {
  try {
      const prefix = await single_values.findAll({
         attributes:['Value'],
          where:{
              Item: 'Prefix'
          }

      });
      res.json(prefix);
  } catch (error) {
      console.log(error);
  }
}
// %%%%%%%%%%%%%%%%%%%%%%%%     Prefix-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Caste_Category-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Caste_D = async(req, res) => {
  try {
      const caste = await single_values.findAll({
         attributes:['Value'],
          where:{
              Item: 'Caste Category'
          }

      });
      res.json(caste);
  } catch (error) {
      console.log(error);
  }
}


// %%%%%%%%%%%%%%%%%%%%%%%%     Religion-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Religions_D = async(req, res) => {
  try {
      const religions = await single_values.findAll({
        attributes:['Value'],
          where:{
              Item: 'Religion'
          }

      });
      res.json(religions);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Religion-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




// %%%%%%%%%%%%%%%%%%%%%%%%     State-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const State_D = async(req, res) => {
  try {
      const states = await d_state.findAll({
          attributes:['State']

      });
      res.json(states);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     State-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%    District-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



// %%%%%%%%%%%%%%%%%%%%%%%%     District-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const District_Depend = async(req, res) => {

    let param=req.query.state
        try {
          const name =await d_state.findOne({
          attributes:['State_Surname'],
           where:{
               State: param
           }
        });
        console.log(name.toJSON());
        const n=name.toJSON()
        const State_Surname= n.State_Surname;
            const dist=await d_district.findAll({

                where:{
                State_Surname:State_Surname
              }
            });
            res.json(dist);
        } catch (error) {
            console.log(error);
        }
}



export const Taluk_Depend = async(req, res) => {

    let param=req.query.districts
        try {
          const names =await d_district.findOne({
          attributes:['Dist_Surname'],
           where:{
               District: param
           }
        });
        console.log(names.toJSON());
        const n=names.toJSON()
        const Dist_Surname= n.Dist_Surname;
            const taluks=await d_taluk.findAll({

                where:{
                Dist_Surname:Dist_Surname
              }
            });
            res.json(taluks);
        } catch (error) {
            console.log(error);
        }
}




// %%%%%%%%%%%%%%%%%%%%%%%%     Taluk-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// export const Taluk_D = async(req, res) => {
//   try {
//       const taluks = await d_taluk.findAll({
//           attributes:['Taluk_Name']

//       });
//       res.json(taluks);
//   } catch (error) {
//       console.log(error);
//   }
// }

// %%%%%%%%%%%%%%%%%%%%%%%%     Taluk-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  %  Dependent Dashboard   % %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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
//%%%%%%%%%%%%%%%%%%%%%%%%%%%  %  Dependent Dashboard   % %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%%%        Insert a file        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getFile = async(req, res) => {

  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });

}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%        Insert a file     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// // %%%%%%%%%%%%%%%%%%%%%%%%%%        Insert a file        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// export const getFile = async(req, res) => {

//   const newpath = __dirname + "/files/";
//   const file = req.files.file;
//   const filename = file.name;

//   file.mv(`${newpath}${filename}`, (err) => {
//     if (err) {
//       res.status(500).send({ message: "File upload failed", code: 200 });
//     }
//     res.status(200).send({ message: "File Uploaded", code: 200 });
//   });

// }

// // %%%%%%%%%%%%%%%%%%%%%%%%%%%        Insert a file     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
