
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

import single_values from "../models/Single.js";
import d_record_office_army from "../models/Record_Office_ArmyModel.js";
import d_state from "../models/StateModel.js";
import d_bank from "../models/BankModel.js";
import d_district from "../models/DistrictModel.js";
import d_rank from "../models/RankModel.js";
import d_reg_category from "../models/Reg_CategoryModel.js";
import d_reg_type from "../models/Reg_TypeModel.js";
import d_medical_category from "../models/Medical_CategoryModel.js";
import d_rsb from "../models/RsbModel.js";
import d_taluk from "../models/TalukModel.js";
import d_trade from "../models/TradeModel.js";
import d_zsb from "../models/ZsbModel.js";
import u_dependent_details from "../models/DependentModel.js";
import u_form_details from "../models/FormsModel.js";



// %%%%%%%%%%%%%%%%%%%%%%%     Service-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const Service_D = async(req, res) => {
  try {
      const services = await single_values.findAll({
                  order:[
                        ['Value','ASC'],
                        ],
          attributes:['Value'],
          where:{
            Item: 'Service'
          }

      });
      res.json(services);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Corp_D = async(req, res) => {
  try {
      const corp = await single_values.findAll({
        order:[
                        ['Value','ASC'],
                        ],

          attributes:['Value'],
          where:{
            Item: 'Corps'
          }

      });
      res.json(corp);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Record_D = async(req, res) => {
  try {
    let param=req.query.record

      const record = await d_record_office_army.findOne({
        order:[
                              ['Record_Office_Name','ASC'],
                              ],


          attributes:['Record_Office_Name'],
          where:{
          Corps_Name:param
        }

      });
      console.log(record.toJSON());
      const n=record.toJSON()
      const sendrecord= n.Record_Office_Name;
      res.json(sendrecord);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name -->Create  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Create  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Rank-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Rank_D = async(req, res) => {
  try {
    let s=req.query.Service_Name
    let r=req.query.Rank_Category

      const R_Id = await single_values.findOne({
          attributes:['id'],
          where:{
          Value:r
        }
            });
        console.log(R_Id.toJSON());
        const n=R_Id.toJSON()
        const RankC_Id= n.id;

      const S_Id = await single_values.findOne({
          attributes:['id'],
          where:{
          Value:s
        }
      });
      console.log(S_Id.toJSON());
      const n1=S_Id.toJSON()
      const Service_Id= n1.id;


      const rank = await d_rank.findAll({
        order:[
                                ['Rank_Name','ASC'],
                                ],

          attributes:['Rank_Name'],
          where:{
            Rank_Category_Id:RankC_Id,
            Service_Id:Service_Id
          }

      });
      res.json(rank);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Rank-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const Rank_Category_D = async(req, res) => {
  try {
      const cat = await single_values.findAll({
        order:[
                                ['Value','ASC'],
                                ],

            attributes:['Value'],
          where:{
            Item: 'Rank Category'
          }

      });
      res.json(cat);
  } catch (error) {
      console.log(error);
  }
}


// %%%%%%%%%%%%%%%%%%%%%%%%     Trade-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Trade_D = async(req, res) => {
  try {
      let s=req.query.Service_Name
      let r=req.query.Group

        const S_Id = await single_values.findOne({
            attributes:['id'],
            where:{
            Value:s
          }
        });
        console.log(S_Id.toJSON());
        const n1=S_Id.toJSON()
        const Service_Id= n1.id;


        const trade = await d_trade.findAll({
          order:[
                          ['Trade_Name','ASC'],
                          ],

            attributes:['Trade_Name'],
            where:{
              Group_Name:r,
              Service_Id:Service_Id
            }

        });
        res.json(trade);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Trade-->Drop_Down                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Discharge_Medical_Cat-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Med_D = async(req, res) => {
  let param=req.query.Service_Name
  try {
    const s = await single_values.findOne({
        attributes:['id'],
        where:{
        Value:param
      }

    });
    console.log(s.toJSON());
    const n=s.toJSON()
    const Service_Name= n.id;

      const medicals = await d_medical_category.findAll({
              order:[
                      ['Discharge_Med_Cat','ASC'],
                      ],


          attributes:['Discharge_Med_Cat'],
          where: {
            Service_Id:Service_Name
          }

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
            order:[
                       ['Value','ASC'],
                       ],


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
              order:[
                       ['Bank_Name','ASC'],
                       ],
          attributes:[
                        [Sequelize.fn('DISTINCT', Sequelize.col('Bank_Name')) ,'Bank_Name'],
               ],
      });
      res.json(banks);
  } catch (error) {
      console.log(error);
  }
}



// %%%%%%%%%%%%%%%%%%%%%%%%     Bank-->Drop_Down                   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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
              // order:[
              //          ['Branch','ASC'],
              //          ],

              attributes:[
                            [Sequelize.fn('DISTINCT', Sequelize.col('Branch')) ,'Branch'],
                   ],

                where:{
                Bank_Name:Bank_Name
              }
            });
            res.json(branchs);
        } catch (error) {
            console.log(error);
        }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank_Branch-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     IFSC-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const IFSC_Depend = async(req, res) => {

    let param=req.query.ifs
        try {
        //   const name =await d_bank.findOne({
        //   attributes:['Branch'],
        //    where:{
        //        Branch: param
        //    }
        // });
        // console.log(name.toJSON());
        // const n=name.toJSON()
        // const Branch= n.Branch;
            const ifscs=await d_bank.findAll({

		            order:[
                        ['IFSC','ASC'],
                        ],

                where:{
                Branch:param
              }
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
        order:[
                                ['Value','ASC'],
                                ],


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
      const reasons = await single_values.findAll({
        order:[
                                ['Value','ASC'],
                                ],


         attributes:['Value'],
          where:{
              Item: 'Discharge Reason'
          }

      });
      res.json(reasons);
  } catch (error) {
      console.log(error);
  }
}
// %%%%%%%%%%%%%%%%%%%%%%%%     Caste_Category-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Caste_D = async(req, res) => {
  try {
      const caste = await single_values.findAll({
        order:[
                                ['Value','ASC'],
                                ],


         attributes:['Value'],
          where:{
              Item: 'Caste'
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
        order:[
                                ['Value','ASC'],
                                ],


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



// %%%%%%%%%%%%%%%%%%%%%%%%     Birth_Place-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// export const Place_D = async(req, res) => {
//   try {
//       const places = await u_personal_details.findAll({
//           attributes:['Place']

//       });
//       res.json(places);
//   } catch (error) {
//       console.log(error);
//   }
// }

// %%%%%%%%%%%%%%%%%%%%%%%%     Birth_Place-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     State-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const State_D = async(req, res) => {
  try {
      const states = await d_state.findAll({
        order:[
                 ['State','ASC'],
                 ],
          attributes:['State']

      });
      res.json(states);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     State-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%    District-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const District_D = async(req, res) => {
  try {
      const dist = await d_district.findAll({
          attributes:['District']

      });
      res.json(dist);
  } catch (error) {
      console.log(error);
  }
}

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
        // console.log(name.toJSON());
        const n=name.toJSON()
        const State_Surname= n.State_Surname;
            const dist=await d_district.findAll({
              order:[
                                    ['District','ASC'],
                                    ],

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
              order:[
                        ['Taluk_Name','ASC'],
                        ],
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

export const Taluk_D = async(req, res) => {
  try {
      const taluks = await d_taluk.findAll({
          attributes:['Taluk_Name']

      });
      res.json(taluks);
  } catch (error) {
      console.log(error);
  }
}

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

// %%%%%%%%%%%%%%%%%%%%%%%%%%        rsb        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getRsb = async(req, res) => {
    try {
        const rsb_name = await d_rsb.findAll({
          order:[
                          ['RSB_Name','ASC'],
                          ],

            attributes:['RSB_Name']
        });
        res.json(rsb_name);
    } catch (error) {
        console.log(error);
    }
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%        zsb     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getZsb = async(req, res) => {
    try {
        const zsb_name = await d_zsb.findAll({

  order:[
              ['ZSB_Name','ASC'],
            ],
            attributes:['ZSB_Name']
        });
        res.json(zsb_name);
    } catch (error) {
        console.log(error);
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%        Insert a file     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


export const RSB_D = async(req, res) => {
  try {
      const rsb = await d_rsb.findAll({
        order:[
                        ['RSB_Name','ASC'],
                        ],
          attributes:['RSB_Name']

      });
      // order:[
      //   ['RSB_Name','ASC'],
      // ]


      res.json(rsb);
  } catch (error) {
      console.log(error);
  }
}

export const ZSB_D = async(req, res) => {

let param = req.query.rsb
  try {
    const name =await d_rsb.findOne({
    attributes:['RSB_Id'],
     where:{
         RSB_Name: param
     }
  });
  // console.log(name.toJSON());
  const n=name.toJSON()
  const RSB_Id= n.RSB_Id;
      const zsb = await d_zsb.findAll({
        order:[
                                ['ZSB_Name','ASC'],
                                ],

          attributes:['ZSB_Name'],
          where:{
            RSB_Id:RSB_Id
          }

      });
      // order:[
      //   ['RSB_Name','ASC'],
      // ]


      res.json(zsb);
  } catch (error) {
      console.log(error);
  }
}
