const service = require('../database/RW');
const uuid = require('uuid')
const getAll = async (req, res)=>{
    const limit = req.params.limit || 10;
    const page = req.params.page || 1;
    const skip = (page - 1)* limit;
    const data = await service.ReadData();
    const total = data.length;
    const totalPage = Math.ceil(total/limit);
    res.json({
        success:true,
        data:data.slice(skip,limit*page),
        limit,
        page,
        totalPage
    })

    
}

const getById = async (req, res)=>{
    const id = req.params.id;
    const data = await service.ReadData();
    console.log(data);
    console.log(id);
    
    const item = data.find(element=>element.id == id);
    res.json({
        success:true,
        data: item
    })
}

const create = async (req, res)=>{
    const {title, text, author} = req.body;
    const blog = {
        id: uuid.v4(),
        title,
        text,
        author
    }
   
    
    
    const data = await service.ReadData();
  
    
    data.push(blog);
    
    
    service.WriteData(JSON.stringify(data));
    res.json({
        success:true,
        data: blog
    })
}

const update = async(req, res)=>{
    const id = req.params.id;
    const {title, text, author} = req.body
    const blogs = await service.ReadData();
    blogs.forEach(element => {
        if(element.id==id){
            element.title = title || element.title;
            element.text = text || element.text;
            element.author = author || element.author;
        }
    });
    service.WriteData(JSON.stringify(blogs));
    res.json("Successfully updated")
    
}

const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        console.log("DELETE ID:", id);

        const blogs = await service.ReadData();

        console.log("BLOGS:", blogs);

        const removed = blogs.filter(item => item.id !== id);

        console.log("REMOVED:", removed);

        if (removed.length === blogs.length) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        await service.WriteData(removed);

        console.log("FILE UPDATED");

        return res.status(200).json({
            message: "Successfully deleted"
        });

    } catch (error) {
        console.error("DELETE ERROR:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
