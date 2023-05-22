const express = require("express");
const router = express.Router();
//post Model
const Posts = require("../../models/Posts");
//routes for get api
router.get("/", async (req, res) => {
  try {
    const post = await Posts.find();
    if (!post) throw Error("no items");
    res.status(200).json(post);
    // res.send(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//routes for Posts api
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const post = await newPost.save();
    if (!post) throw Error("something went wrong while saving the post");
    res.status(200).json(post);
    // res.send(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//routes for delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) throw Error("something went wrong while deleting the post");
    res.status(200).json({ success: true });
    // res.send(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//routes for update
router.patch("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error("something went wrong while updating the post");
    res.status(200).json({ success: true });
    // res.send(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
//get by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw Error("no items");
    res.status(200).json(post);
    // res.send(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
