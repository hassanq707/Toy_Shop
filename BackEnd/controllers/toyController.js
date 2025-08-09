const TOY_MODEL = require("../models/toyModel");
const { cloudinary } = require("../config/cloudinary");

const addToy = async (req, res) => {
    const { name, description, price, category} = req.body;
    try {
        const toy = await TOY_MODEL.create({
            name,
            description,
            price,
            category,
            image: {
                url: req.file.path,          
                public_id: req.file.filename 
            },
        });
        res.json({ success: true, message: "Toy has been added" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error Adding Toy" });
    }
};

const listToy = async (req, res) => {
    try {
        const toy = await TOY_MODEL.find({});
        res.json({ success: true, data: toy });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error getting all items" });
    }
};

const removeToy = async (req, res) => {
    const { id, public_id } = req.body;
    try {
        await TOY_MODEL.findByIdAndDelete(id);
        if (public_id) {
            await cloudinary.uploader.destroy(public_id);
        }
        res.json({ success: true, message: "Toy Item has been Deleted" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error deleting Toy" });
    }
};

const updateToy = async (req, res) => {
    const { name, description, price, category, _id, oldimage } = req.body;
    try {
        const toy = await TOY_MODEL.findById(_id);
        toy.name = name;
        toy.description = description;
        toy.price = price;
        toy.category = category;

        if (req.file) {
            if (oldimage) {
                await cloudinary.uploader.destroy(oldimage);
            }
            toy.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }
        await toy.save();
     res.json({ success: true, message: "Toy has been updated", updatedItem: toy });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error updating Toy" });
    }
};

module.exports = {
    addToy,
    listToy,
    removeToy,
    updateToy,
};
