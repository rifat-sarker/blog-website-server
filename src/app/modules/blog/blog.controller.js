const createBlog = async(req,res) => {
    try {
        const newBlog = req.body;
        const result = await blogCollection.insertOne(newBlog);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ error: "Failed to create blog" });
    }
}