import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const single_values = db.define('single_values',{
  Id:{
      type: DataTypes.TINYINT,
      autoIncrement : true,
        primaryKey : true
  },
    Item:{
        type: DataTypes.STRING(30)
    },

    Value:{
        type: DataTypes.STRING(50)
    },

},{ createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default single_values;
