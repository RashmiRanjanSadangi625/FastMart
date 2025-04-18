const Rating= require("../models/rating.model");

const productService=require("../services/product.service")

async function createRating(req,user)
{
    const product = await productService.findProductById(req.productId)

    const rating = new Rating({
        product:product._id,
        user:user._id,
        rating:req.rating,
        createdAt:new Date()
    })
    await rating.save();
    return await review.save();
}

async function getProductRating(productId)
{
    return await Rating.find({product:productId});
}

module.exports={
    createRating,
    getProductRating
}