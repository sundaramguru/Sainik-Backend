import db from '../config/Database.js';
import { Sequelize } from "sequelize";
const Op= Sequelize.Op


import Admin from "../models/AdminModel.js";
import u_user_reg from "../models/UserModel.js";
import u_status_details from "../models/StatusModel.js";
import single_values from "../models/Single.js";
 import u_emp from "../models/Emp_No.js";
// import u_service_details from "../models/ServiceModel.js";
// import u_contact_details from "../models/ContactModel.js";
// import u_employment_details from "../models/EmploymentModel.js";
import u_spouse_details from "../models/SpouseModel.js";
import u_dependent_details from "../models/DependentModel.js";
import u_widow_details from "../models/WidowModel.js";
import u_employed_details from "../models/EmployedModel.js";
import u_file_details from "../models/FileModel.js";
import u_Sfile_details from "../models/SpouseFileModel.js";
import u_Dfile_details from "../models/DependentFileModel.js";
import u_esm from "../models/ESM_No.js";
import d_zsb from "../models/ZsbModel.js";
import d_rsb from "../models/RsbModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import u_form_details from "../models/FormsModel.js";

export const getAdmin = async(req, res) => { //dashboard
    try {
        const admin = await Admin.findAll({
            attributes:['id','name','designation','service_no','email']
        });
        res.json(admin);
    } catch (error) {
        console.log(error);
    }
}

export const ARegister = async(req, res) => {
    const { name, email, service_no,board, board_name,designation, mobile, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {

      const user = await Admin.count({
         attributes:['service_no','email'],
         where:{
           [Op.or]:[{service_no:service_no},{email:email}]

       }
     });

 if(user == 0){
        await Admin.create({
            name: name,
            service_no:service_no,
            board:board,
            board_name:board_name,
            designation:designation,
            email: email,
            mobile:mobile,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    }

  else{
    res.status(400).json({msg: "Record already exists"});

  }


}
    catch (error) {
        console.log(error);
    }
}

export const ALogin = async(req, res) => {
    try {
        const user = await Admin.findAll({
            where:{
                service_no: req.body.service_no
            }
        });
        // const dmatch = await compare(req.body.designation, user[0].designation);
        // if(!dmatch) return res.status(400).json({msg: "Wrong designation"});

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const service_no = user[0].service_no;
        const designation = user[0].designation;
        const accessToken = jwt.sign({userId, name, service_no,designation}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, service_no,designation}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Admin.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // if(req.body.service_no== 'pa98765vi'){
        //   res.redirect("/insert");
        // }else{
        // res.redirect("/superDash");
        // }
        res.json({ accessToken });
        // res.json({designation: designation});

    } catch (error) {
        res.status(404).json({msg:"Service Number not found"});
    }
}

// export const clerkUsers = async(req, res) => { //dashboard
//   let param = req.query.ALogin_S
//
//     try {
//       const A_Board = await Admin.findAll({
//           attributes:[board_name],
//           where:{
//               Service_No: param
//           }
//           // where:{
//           //     Status: {
//           //       [Op.ne]: 'Not Submitted'
//           //     }
//           // }
//       });
//         const users = await u_status_details.findAll({
//             attributes:['id','Service_No','Name','Clerk','Superindendent','Director'],
//             where:{
//                 Board_Name: A_Board
//             }
//             // where:{
//             //     Status: {
//             //       [Op.ne]: 'Not Submitted'
//             //     }
//             // }
//         });
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const clerkUsers = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            // attributes:['id','Service_No','Name','Clerk','Superindendent','Director'],
            where:{
                Board_Name: A_Board
            }
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const Users_C = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            // attributes:['id','Service_No','Name','Clerk','Superindendent','Director'],
            where:{
                Board_Name: A_Board,
                Clerk: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:'ESM'
            }
            // where:{
            //     Status: {
            //       [Op.ne]: 'Not Submitted'
            //     }
            // }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
//wc
export const W_C = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Clerk: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:'Widow'
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
//end wc
//wc
export const E_C = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Clerk: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:'Emp'
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
//end wc

export const Users_S = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Superintendent: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:'ESM'
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const W_S = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Superintendent: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:'Widow'
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const E_S = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Superintendent: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:'Emp'
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const Users_D = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Director: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:'ESM'
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const W_D = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Director: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:"Widow"
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const E_D = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Director: {
                      [Op.or]: ['Pending','Observation']
                    },
                    Reg_Type:"Emp"
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

// to get admins designation
export const Designation = async(req, res) => {
  let param = req.query.ALogin_S
  try {
      const u = await Admin.findOne({
          attributes:['Name','Designation'],
          where:{
              Service_No: param
          }
      });
      const n=u.toJSON()
            const name= n.Name;
const des=n.Designation
const users=[name,des]
console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
export const ALogout = async(req, res) => {
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
export const Status = async(req, res) => { //status
  const { Service_No, Name } = req.body;

  try {
      await u_status_details.create({

          Service_No:Service_No,
          Name:Name
      });
      res.json({msg: "Successful"});
  } catch (error) {
      console.log(error);
  }
}
// single
export const Single = async(req, res) => {
    const {Item, Value } = req.body;
    try {
        await single_values.create({
            Item: Item,
            Value:Value

        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//ClerkQ
export const ClerkQ = async(req, res) => {
    const { ClerkQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            C_Remark:ClerkQ,
            Clerk:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        // await u_dependent_details.update({
        //
        //     User_Status:"Observation"},{
        //     where:{
        //         Service_No: Service_No
        //     }
        // });

        await u_user_reg.update({

            Status:"Observation"},{
            where:{
                Service_No: Service_No
            }
        });

        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const SuperintendentQ = async(req, res) => {
    const { SuperintendentQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            S_Remark:SuperintendentQ,
            Superintendent:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        await u_user_reg.update({

            Status:"Observation"},{
            where:{
                Service_No: Service_No
            }
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const DirectorQ = async(req, res) => {
    const { DirectorQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            D_Remark:DirectorQ,
            Director:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        await u_user_reg.update({

            Status:"Observation"},{
            where:{
                Service_No: Service_No
            }
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//Emp
export const EClerkQ = async(req, res) => {
    const { ClerkQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            C_Remark:ClerkQ,
            Clerk:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        await u_employed_details.update({

            User_Status:"Observation"},{
            where:{
                Service_No: Service_No
            }
        });

        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const ESuperintendentQ = async(req, res) => {
    const { SuperintendentQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            S_Remark:SuperintendentQ,
            Superintendent:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        await u_employed_details.update({

            User_Status:"Observation"},{
            where:{
                Service_No: Service_No
            }
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const EDirectorQ = async(req, res) => {
    const { DirectorQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            D_Remark:DirectorQ,
            Director:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        await u_employed_details.update({

            User_Status:"Observation"},{
            where:{
                Service_No: Service_No
            }
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const EVerify = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_status_details.update({

            Clerk:"Verified",
          Superintendent:'Pending'},{
            where:{
                Service_No: Service_No
            }


        });

        await u_employed_details.update({

            User_Status:"Submitted"},{
            where:{
                Service_No: Service_No
            }
        });
        res.json({msg: "verified"});
    } catch (error) {
        console.log(error);
    }
}
export const ERecommend = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_status_details.update({

            Superintendent:"Recommended",
          Director:'Pending'},{
            where:{
                Service_No: Service_No
            }


        });

        await u_employed_details.update({

            User_Status:"Submitted"},{
            where:{
                Service_No: Service_No
            }
        });

        res.json({msg: "Recommended "});
    } catch (error) {
        console.log(error);
    }
}


//end of Emp

export const Verify = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_status_details.update({

            Clerk:"Verified",
          Superintendent:'Pending'},{
            where:{
                Service_No: Service_No
            }


        });
        res.json({msg: "verified"});
    } catch (error) {
        console.log(error);
    }
}
export const Recommend = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_status_details.update({

            Superintendent:"Recommended",
          Director:'Pending'},{
            where:{
                Service_No: Service_No
            }


        });
        res.json({msg: "Recommended "});
    } catch (error) {
        console.log(error);
    }
}

export const Approve = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_status_details.update({

            Director:"Approved"},{
            where:{
                Service_No: Service_No
            }

        });
        await u_user_reg.update({
            Status:"Approved"},{
            where:{
                Service_No: Service_No
            }
        });
        await u_form_details.update({
            User_Status:"Approved"},{
            where:{
                Service_No: Service_No
            }
        });
        await u_dependent_details.update({
            User_Status:"Approved"},{
            where:{
                Service_No: Service_No
            }
        });
        await u_file_details.update({
            User_Status:"Approved"},{
            where:{
                Service_No: Service_No
            }
        });
        await u_Sfile_details.update({
            User_Status:"Approved"},{
            where:{
                Service_No: Service_No
            }
        });
        await u_Dfile_details.update({
            User_Status:"Approved"},{
            where:{
                Service_No: Service_No
            }
        });
        await u_widow_details.update({
            User_Status:"Approved"},{
            where:{
                Service_No: Service_No
            }
        });
        res.json({msg: "Approve"});
    } catch (error) {
        console.log(error);
    }
}
export const getClerkQ = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_status_details.findAll({
          attributes:['C_Remark','S_Remark','D_Remark'],
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
//get reg

export const getReg = async(req, res) => {
  let param = req.query.getReg
  try {
      const users = await u_user_reg.findAll({
          where:{
              Service_No: param
          }

  } );
  res.json(users);
console.log(users);
}catch (error) {
      console.log(error);

}
}


// to get adminform1

export const adminform1a = async(req, res) => {
  let param = req.query.V_Service_No
  try {
      // const users = await u_form_details.findAll({
      //     where:{
      //         Service_No: param
      //     }
      // });
  const [users, metadata] = await db.query(" select * from u_form_details  left join forms_view on forms_view.id=u_form_details.id where Service_No =:sn limit 1",
  {
    replacements: { sn: param }

  }
);

  //    console.log(users);
      // const Service_Name = await single_values.findOne({
      //     where:{
      //         Value: users[0].Service_Name
      //     }
      // });
      // console.log(Service_Name);
      res.json(users);
       // res.status(200).json(Service_Name);

  } catch (error) {
      console.log(error);
  }

  // try {
  //         const Service_Name = await single_values.findOne({
  //         where:{
  //             Value: users[0].Service_Name
  //         }
  //     });
  //     console.log(Service_Name);
  //      res.json(Service_Name);
  //
  // } catch (error) {
  //     console.log(error);
  // }
}



export const getService_Name = async(req, res) => {
  let param = req.query.getService_Name
  try {
          const name = await single_values.findOne({
            attributes:['Value'],
          where:{
              id: param
          }
      });
      const n=name.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const Service_Name= n.Value;

      console.log(Service_Name);
       res.json(Service_Name);

  } catch (error) {
      console.log(error);
  }
}


export const adminformue = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      // const users = await u_employed_details.findAll({
      //     where:{
      //         Service_No: param
      //     }
      // });
      const [users, metadata] = await db.query(" select * from u_employed_details  left join forms_view on forms_view.vService_No=u_employed_details.Service_No where Service_No =:sn limit 1",
      {
        replacements: { sn: param }

      }
    );
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const adminformuee = async(req, res) => {
  // let param = req.query.A_Service_No
  try {
      // const users = await u_employed_details.findAll({
      //     where:{
      //         Service_No: param
      //     }
      // });
      const [users, metadata] = await db.query(" select * from u_employed_details  left join forms_view on forms_view.vService_No=u_employed_details.Service_No ",
      {
        // replacements: { sn: param }

      }
    );
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}



// to get adminform2

export const adminform2 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_form_details.findAll({
          where:{
              Service_No: param
          }
      });
      // console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}



// to get adminform3

export const adminform3 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_form_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


// to get adminform4

export const adminform4 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_form_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


// to get adminform5

export const adminform5 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_form_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

// to get adminform6

export const adminform6 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_spouse_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

// to get adminform7

export const adminform7 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_dependent_details.findAll({
          // attributes:['Service_No','Name','Dep_Name','Relation','Dep_DOB','Dep_Adhaar', 'Dep_Qualification', 'Dep_Academic_Yr', 'Dep_Employment_Status', 'Dep_Marital_Status'],
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const getForgetMail1= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await u_user_reg.findOne({
        attributes:['Mail_Id'],
          where:{
              Service_No: param
          }

      });
      const n=u.toJSON()
      const users= n.Mail_Id;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

// to get widowform

export const awidowform = async(req, res) => {
   let param = req.query.A_Service_No
  try {
      const users = await u_widow_details.findAll({
          attributes:['Service_No','Family_Pension','Death_Date','Death_Nature', 'ESM_No'],
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


export const awidowforma = async(req, res) => {
  // let param = req.query.A_Service_No
  try {
      const users = await u_widow_details.findAll({
          attributes:['Service_No','Family_Pension','Death_Date','Death_Nature', 'ESM_No'],
          // where:{
          //     Service_No: param
          // }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
export const superESM = async(req, res) => {
  let param = req.query.ESM
  try {
      const u = await u_esm.findOne({
          attributes:['Service_No'],
          where:{
              ESM_No: param
          }
      });
      const n=u.toJSON()
      const users= n.Service_No;
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


export const TFService = async(req, res) => {
  let param = 'Approved'

  try {
    //      const [services, metadata] = await db.query("select * from u_form_details  left join forms_view on forms_view.vService_No=u_form_details.Service_No left join u_esm on u_esm.Service_No=u_form_details.Service_No where User_Status =:status",

      const [services, metadata] = await db.query("select * from u_form_details left join forms_view on forms_view.vService_No=u_form_details.Service_No  left join u_esm on u_form_details.Service_No = u_esm.Service_No where User_Status =:status",
      {
        replacements: { status: param }

      }
      );
      res.json(services);

      console.log(services);
      console.log('rendering');
  } catch (error) {
      console.log(error);
  }
}
  // const services = await single_values.findAll({
  //
  //     where:{
  //       Item: 'Service'
  //     }
  //
  // });
//       SELECT a.id,a.Service_No,s.Value AS Service, rc.Value AS Rank_Category,t.Trade_Name AS Trade,r.Rank_Name AS Rank,dr.Value AS Discharge_Reason,mc.Discharge_Med_Cat AS Discharge_Med_Cat, dc.Value AS Discharge_Character,i.Bank_Name ,i.Branch ,i.IFSC AS vIFSC,re.Value AS vReligion ,cc.Value AS vCaste,bs.State AS vBirth_State,bd.District AS vBirth_District,st.State AS vState,d.District AS vDistrict,ta.Taluk_Name AS vTaluk_Name,ps.State AS vP_State,pd.District AS vP_District, pta.Taluk_Name AS vP_Taluk_Name, cq.Value AS vCivil_Qualification
//
// FROM u_form_details AS a
// LEFT JOIN single_values AS s
// ON a.Service_Name=s.Id
// LEFT JOIN single_values AS rc
// ON a.Rank_Category=rc.Id
// LEFT JOIN d_trade AS t
// ON a.Trade_Name = t.id
// LEFT JOIN d_rank AS r
// ON a.Rank_Name = r.id
// LEFT JOIN single_values AS dr
// ON a.Discharge_Reason = dr.Id
// LEFT JOIN d_medical_category AS mc
// ON a.Discharge_Med_Cat = mc.id
// LEFT JOIN single_values AS dc
// ON a.Discharge_Character = dc.Id
// LEFT JOIN d_bank AS i
// ON a.IFSC = i.id
// LEFT JOIN single_values AS re
// ON a.Religion = re.Id
// LEFT JOIN single_values AS cc
// ON a.Caste_Category = cc.Id
// LEFT JOIN d_state AS bs
// ON a.Birth_State = bs.State_Surname
// LEFT JOIN d_district AS bd
// ON a.Birth_District = bd.Dist_Surname
// LEFT JOIN d_state AS st
// ON a.State = st.State_Surname
// LEFT JOIN d_district AS d
// ON a.District = d.Dist_Surname
// LEFT JOIN d_taluk AS ta
// ON a.Taluk_Name = ta.Taluk_Surname
//
// LEFT JOIN d_state AS ps
// ON a.P_State = ps.State_Surname
// LEFT JOIN d_district AS pd
// ON a.P_District = pd.Dist_Surname
// LEFT JOIN d_taluk AS pta
// ON a.P_Taluk_Name = pta.Taluk_Surname
// LEFT JOIN single_values AS cq
// ON a.Civil_Qualification = cq.Id

export const AdminFormDoc = async(req, res) => {
  let param = req.query.A_Service_No
    try {
        const name=await u_file_details.findOne({
where:{
    Service_No: param
}
        });
        const n=name.toJSON()
        const users= [n.Service_No,n.Adhar,n.Voter,n.PAN,n.PPO,n.ECHS,n.Discharge_Book,n.Img];

        res.json(users);
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}


export const UserViewFormDoc = async(req, res) => {
  let param = req.query.V_Service_No
    try {
        const name=await u_file_details.findOne({
where:{
    Service_No: param
}
        });
        const n=name.toJSON()
        const users= [n.Service_No,n.Adhar,n.Voter,n.PAN,n.PPO,n.ECHS,n.Discharge_Book,n.Img];

        res.json(users);
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}



export const UserSpoViewFormDoc = async(req, res) => {
  let param = req.query.V_Service_No
    try {
        const name=await u_Sfile_details.findOne({
where:{
    Service_No: param
}
        });
        const n=name.toJSON()
        const users= [n.Service_No,n.Adhar,n.Voter,n.PAN,n.PPO,n.ECHS,n.Img];

        res.json(users);
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}




export const AS_DocForm = async(req, res) => {
  let param = req.query.A_Service_No
    try {
        const name=await u_Sfile_details.findOne({
where:{
    Service_No: param
}
        });
        const n=name.toJSON()
        const users= [n.Service_No,n.Adhar,n.Voter,n.PAN,n.PPO,n.ECHS,n.Img];

        res.json(users);
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}



export const UserDepViewFormDoc = async(req, res) => {
  let param = req.query.V_Service_No
  let pname=req.query.V_Dep_Name
  let rname=req.query.V_Relation

    try {
        const name=await u_Dfile_details.findOne({
where:{
    Service_No: param,
    Dep_Name:pname,
    Relation:rname
}
        });
        const n=name.toJSON()
        const users= [n.Service_No,n.Adhar,n.Voter,n.PAN,n.ECHS,n.Img,n.Dep_Name,n.Relation];

        res.json(users);
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}


export const AD_DocForm = async(req, res) => {
  let param = req.query.A_Service_No
  let pname=req.query.A_Name
  let rname=req.query.A_Relation

    try {
        const name=await u_Dfile_details.findOne({
where:{
    Service_No: param,
    Dep_Name:pname,
    Relation:rname
}
        });
        const n=name.toJSON()
        const users= [n.Service_No,n.Adhar,n.Voter,n.PAN,n.ECHS,n.Img,n.Dep_Name];

        res.json(users);
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}
export const Prev_ESM = async(req, res) => {
    try {
        const name=await u_esm.findOne({
          attributes: [[Sequelize.fn('max', Sequelize.col('id')),'maxID']]
        });
        console.log(name);
        const n=name.toJSON()
        const id= n.maxID;
        const name1=await u_esm.findOne({
          where:{
            id:id
          }
        });
        const n1=name1.toJSON()
        const sn= n1.ESM_No;
        res.json(sn);
        console.log(sn);
    } catch (error) {
        console.log(error);
    }
}

export const ESM_No = async(req, res) => {
  // let param = req.query.Service_No
  // let param1 = req.query.ESM_No
  const { Service_No, ESM_No} = req.body;

      try {
        await u_esm.create({

            Service_No:Service_No,
            ESM_No:ESM_No,

        });
        // console.log(param);
        await u_user_reg.update({

            Status:'Approved'},{
             where:{
               Service_No:Service_No,
             }
      }
            );

            await u_form_details.update({

                User_Status:'Approved'},{
                 where:{
                   Service_No:Service_No,
                 }
          }
                );
            await u_dependent_details.update({

                User_Status:'Approved'},{
                 where:{
                   Service_No:Service_No,
                 }
          }
                );

                await u_Dfile_details.update({

                    User_Status:'Approved'},{
                     where:{
                       Service_No:Service_No,
                     }
              }
                    );

                    await u_file_details.update({

                        User_Status:'Approved'},{
                         where:{
                           Service_No:Service_No,
                         }
                  }
                        );
                        await u_Sfile_details.update({

                            User_Status:'Approved'},{
                             where:{
                               Service_No:Service_No,
                             }
                      }
                            );
                            await u_widow_details.update({

                                User_Status:'Approved'},{
                                 where:{
                                   Service_No:Service_No,
                                 }
                          }
                                );

        res.json({msg: "Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const ZR = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await d_zsb.findOne({
            where:{
                ZSB_Name: A_Board,
            }

        });
        const u=users.toJSON()
        const id= u.ZSB_RSB_ID;
        const RSB_Id= u.RSB_Id;
        const users1 = await d_rsb.findOne({
            where:{
                RSB_Id: RSB_Id,
            }
      });
      const u1=users1.toJSON()
      const RSB_Surname= u1.RSB_Surname;
      const ids=[RSB_Surname,id]
      console.log(ids);
      res.json(ids);

    } catch (error) {
        console.log(error);
    }
}



export const Prev_Emp = async(req, res) => {
    try {
        const name=await u_emp.findOne({
          attributes: [[Sequelize.fn('max', Sequelize.col('id')),'maxID']]
        });
        console.log(name);
        const n=name.toJSON()
        const id= n.maxID;
        const name1=await u_emp.findOne({
          where:{
            id:id
          }
        });
        const n1=name1.toJSON()
        const sn= n1.Emp_No;
        res.json(sn);
        console.log(sn);
    } catch (error) {
        console.log(error);
    }
}

export const Emp_No = async(req, res) => {

  const { Service_No, Emp_No} = req.body;

      try {
        await u_emp.create({

            Service_No:Service_No,
            Emp_No:Emp_No,

        });
        await u_employed_details.update({
            Emp_No:Emp_No,

          },{
            where:{
              Service_No:Service_No
            }
});

        // console.log(param);
        res.json({msg: "Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const AForgetPass = async(req, res) => {
  const { service_no, password, confPassword} = req.body;
  if(password !== confPassword)
    return res.status(400).json({msg: "Password and Confirm Password do not match"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Admin.update({

            password: hashPassword},
            {
              where:{ service_no:service_no}
            }

        );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const getAForgetMail= async (req, res) => {
  let param = req.query.service_no
  try {
      const u =  await Admin.findOne({
        attributes:['email'],
          where:{
              service_no: param
          }

      });
      const n=u.toJSON()

            const users= n.email;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}



export const Autodelete = async(req, res) => {

 try {

   const dep1= await u_user_reg.destroy({
       // attributes:['Service_No'],
          where: {
            createdAt: {
               [Op.lte] : (new Date() -  31 * 24 * 60 * 60 * 1000   )
            },
            Status: "Not Submitted"
            }
        });

        console.log(dep1);



        const dep2= await u_dependent_details.destroy({
               where: {
                 Registered_date: {
                    [Op.lte] : (new Date() -  31 * 24 * 60 * 60 * 1000   )
                 },
                 User_Status: "Not Submitted"
                 }

             });

             const dep3= await u_Dfile_details.destroy({
                    where: {
                      Registered_date: {
                         [Op.lte] : (new Date() -  31 * 24 * 60 * 60 * 1000   )
                      },
                      User_Status: "Not Submitted"
                      }

                  });

                  const dep4= await u_file_details.destroy({
                         where: {
                           Registered_date: {
                              [Op.lte] : (new Date() -  31 * 24 * 60 * 60 * 1000   )
                           },
                           User_Status: "Not Submitted"
                           }

                       });

                       const dep5= await u_Sfile_details.destroy({
                              where: {
                                Registered_date: {
                                   [Op.lte] : (new Date() -  31 * 24 * 60 * 60 * 1000   )
                                },
                                User_Status: "Not Submitted"
                                }

                            });
                            const dep6= await u_widow_details.destroy({
                                   where: {
                                     Registered_date: {
                                        [Op.lte] : (new Date() -  31 * 24 * 60 * 60 * 1000   )
                                     },
                                     User_Status: "Not Submitted"
                                     }

                                 });

}
                                 catch (error) {
                                        console.log(error);
                                    }
                                }






    // export const AutoQuerydelete = async(req, res) => {
    //
    //  try {
    //
    //         const dep2= await u_dependent_details.destroy({
    //                where: {
    //                  Query_date: {
    //                     [Op.lte] : (new Date() -  31 * 24 * 60 * 60 * 1000   )
    //                  },
    //                  User_Status: "Observation"
    //
    //                  }
    //
    //              });
    //
    //     }
    //
    //      catch (error) {
    //             console.log(error);
    //         }
    //     }


        export const adminform1 = async(req, res) => {
        //   let param = req.query.V_Service_No
        //   try {
        //
        //   const [users, metadata] = await db.query(" select * from u_form_details  left join forms_view on forms_view.id=u_form_details.id where Service_No limit 1",
        //   {
        //     replacements: { status: param }
        //
        //   }
        // );
        //
        //       res.json(users);
        //
        //   } catch (error) {
        //       console.log(error);
        //   }



        let param = req.query.A_Service_No
        try {
            // const users = await u_form_details.findAll({
            //     where:{
            //         Service_No: param
            //     }
            // });
        const [users, metadata] = await db.query(" select * from u_form_details  left join forms_view on forms_view.id=u_form_details.id where Service_No =:sn limit 1",
        {
          replacements: { sn: param }

        }
      );

        //    console.log(users);
            // const Service_Name = await single_values.findOne({
            //     where:{
            //         Value: users[0].Service_Name
            //     }
            // });
            // console.log(Service_Name);
            res.json(users);
             // res.status(200).json(Service_Name);

        } catch (error) {
            console.log(error);
        }

        }


      //   export const ESMDash= async (req, res) => {
      //     let param = req.query.ESM_No
      //
      //     try {
      //         const name=await u_esm.findOne({
      // where:{
      //     ESM_No: param
      // }
      //         });
      //         const n=name.toJSON()
      //         const users= [n.Service_No];
      //
      //         res.json(users);
      //         console.log(users);
      //     }
      //      catch (error) {
      //         console.log(error);
      //     }
      //   }
