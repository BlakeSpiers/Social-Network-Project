exports.getPosts = (req, res) => {
    //res.send("Hello world from node js");
    res.json({
        posts: [
            {title: 'First Post'},
            {title: 'Second Post'}
        ]
    });
};