const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  id: String, // Ensure a unique ID
  EventName:String,
  start:String,
  end:String,

});

const Data = mongoose.model("Event", DataSchema);

const saveData = async (data) => {
  try {
    const newData = new Data(data);
    await newData.save();
    console.log(newData)
    return { success: true, message: "Data saved!" };
  } catch (error) {
    return { success: false, error };
  }
};

const getData = async () => {
  try {
    const data = await Data.find();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

const updateData = async (id, newData) => {
  try {
    await Data.findByIdAndUpdate(id, newData);
    return { success: true, message: "Data updated!" };
  } catch (error) {
    return { success: false, error };
  }
};

const deleteData = async (id) => {
  try {
    await Data.findByIdAndDelete(id);
    return { success: true, message: "Data deleted!" };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = { saveData, getData, updateData, deleteData };
