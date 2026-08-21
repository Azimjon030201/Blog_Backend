const service = require('../database/RW');
const uuid = require('uuid')
const getAll = (req, res)=>{
    const limit = req.params.limit || 10;
    const page = req.params.page || 1;
    const skip = (page - 1)* limit;
    const data = service.ReadData();
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

const getById = (req, res)=>{
    const id = req.params.id;
    const data = service.ReadData();
    const item = data.find(element=>element.id === id);
    res.json({
        success:true,
        data: item
    })
}

const create = (req, res)=>{
    const {title, text, author} = req.body;
    const blog = {
        id: uuid.v4(),
        title,
        text,
        author
    }
    const response = JSON.stringify(blog)
    service.WriteData(response);
    res.json({
        success:true,
        data: response
    })
}

