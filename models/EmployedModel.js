import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_employed_details = db.define('u_employed_details',{


  Service_No:{
      type: DataTypes.STRING(12)
  },
    ESM_No:{
        type: DataTypes.STRING(20)
    },

    Age:{
        type: DataTypes.STRING(2),

    },
    Civil_Qualification:{
        type: DataTypes.STRING(12),

    },
    Addi_Course1:{
        type: DataTypes.STRING(20),

    },
    Addi_Course2:{
        type: DataTypes.STRING(20),

    },
    Addi_Course3:{
        type: DataTypes.STRING(20),

    },
    Addi_Course4:{
        type: DataTypes.STRING(20),

    },
     Trade_Name:{
        type: DataTypes.TINYINT
    },
    Equi_Test:{
        type: DataTypes.STRING(50)
    },
    Trade_Code:{
        type: DataTypes.STRING(30)
    },
    Emp_No:{
        type: DataTypes.STRING(30)
    },
    User_Status:{
        type: DataTypes.STRING(30),
          defaultValue: "Submitted"
    },

},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default u_employed_details;
