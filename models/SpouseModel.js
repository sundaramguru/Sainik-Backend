import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_spouse_details = db.define('u_spouse_details',{

    Service_No:{
        type: DataTypes.STRING(12)
    },
    Marital_Status:{
        type: DataTypes.STRING(10)
    },
    Marriage_Date:{
        type: DataTypes.DATE
    },
    Spouse_Name:{
        type: DataTypes.STRING(75)
    },
    Spouse_Relation:{
        type: DataTypes.STRING(7)
    },
    Spouse_DOB:{
      type: DataTypes.DATE
    },
    Spouse_Id_Mark:{
        type: DataTypes.STRING(60)
    },
    Spouse_Qualification:{
        type: DataTypes.STRING(30)
    },
    Spouse_Emp_Status:{
        type: DataTypes.STRING(15)
    },

    Spouse_Adhaar:{
        type: DataTypes.STRING(12)
    },
    Spouse_Voter_Id:{
        type: DataTypes.STRING(10)
    },
    Spouse_PAN:{
        type: DataTypes.STRING(10)
    },
    Spouse_CSD:{
        type: DataTypes.STRING(15)
    },
    Spouse_ECHS:{
        type: DataTypes.STRING(15)
    },
     Spouse_Sector:{
      type: DataTypes.STRING(25)
    },
    Spouse_Dept:{
      type: DataTypes.STRING(25)
    },
    Spouse_Pres_Desg:{
        type: DataTypes.STRING(20)
    },
    Spouse_Employer:{
        type: DataTypes.STRING(20)
    },
    Spouse_Month_Income:{
        type: DataTypes.STRING(8)
    },
    Spouse_Official_No:{
        type: DataTypes.STRING(14)
    },
    Spouse_Desg_Retire:{
        type: DataTypes.STRING(6)
    },
    Spouse_Retire_Date:{
        type: DataTypes.DATE
    },
    Spouse_Civil_PPO_No:{
        type: DataTypes.STRING(20)
    },

    Divorce_Date:{
        type: DataTypes.STRING(6)
    },
    Court_Order:{
        type: DataTypes.STRING(30)
    },
    Death_Date:{
        type: DataTypes.STRING(20)
    },

},{ createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default u_spouse_details;
