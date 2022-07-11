import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_dependent_details = db.define('u_dependent_details',{

    Service_No:{
        type: DataTypes.STRING(12)
    },
    Dep_Name:{
        type: DataTypes.STRING(100)
    },
    Relation:{
        type: DataTypes.STRING(25)
    },
    Dep_DOB:{
        type: DataTypes.STRING
    },
    Dep_Adhaar:{
        type: DataTypes.STRING(12)
    },
    Dep_Qualification:{
        type: DataTypes.STRING(20)
    },
    Dep_Academic_Yr:{
      type: DataTypes.STRING(9)
    },
    Dep_Employment_Status:{
        type: DataTypes.STRING(12)
    },
    Dep_Marital_Status:{
        type: DataTypes.STRING(25)
    },
    User_Status:{
        type: DataTypes.STRING,
        defaultValue: "Not Submitted"
    },
      Registered_date:{
      type :DataTypes.DATEONLY,
      allowNull:false,
      defaultValue:Sequelize.NOW
    },

    Query_date:{
    type :DataTypes.DATEONLY,
    allowNull:false,
    defaultValue:Sequelize.NOW
  },


},{  createdAt:false,
    updatedAt : false,
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_dependent_details;
