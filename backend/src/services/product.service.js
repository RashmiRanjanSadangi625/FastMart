const Category = require("../models/category.model"); 
const Product = require("../models/product.model");
const mongoose=require("mongoose");

async function createProduct(reqData)
{
    let topLevel=await Category.findOne({name:reqData.topLavelCategory});

    if(!topLevel)
    {
        topLevel = new Category({
            name:reqData.topLavelCategory,
            level:1
        })

        await topLevel.save();
    }

    let secondLevel=await Category.findOne({name:reqData.secondLavelCategory,parentCategory:topLevel._id})

    if(!secondLevel)
    {
        secondLevel = new Category({
            name:reqData.secondLavelCategory,
            parentCategory:topLevel._id,
            level:2
        })
        await secondLevel.save();
    }
    let thirdLevel=await Category.findOne({name:reqData.thirdLavelCategory,parentCategory:secondLevel._id})

    if(!thirdLevel)
    {
        thirdLevel = new Category({
            name:reqData.thirdLavelCategory,
            parentCategory:secondLevel._id,
            level:3
        })
        await thirdLevel.save();
    }

    const product =new Product({
        title:reqData.title,
        color:reqData.color,
        description :reqData.description,
        discountedPrice:reqData.discountedPrice,
        discountPersent:reqData.discountPersent,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        sizes:reqData.size,
        quantity:reqData.quantity,
        category:thirdLevel._id
    })

    return await product.save();

}

async function deleteProduct(productId) {

 
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product ID");
    }

    const product = await findProductById(productId);
    
    if (!product) {
        throw new Error("Product not found");
    }

    await Product.findByIdAndDelete(productId);

    return "Product deleted successfully!";
}


async function updateProduct(productId,reqData)
{
    return await Product.findByIdAndUpdate(productId,reqData);

}


async function findProductById(id)
{
    const product = await Product.findById(id)
     .populate("category")
            .populate({
                path: "ratings", // Assuming the Product model has a "ratings" field referencing RatingReview
                populate: {
                    path: "user", // Populate the user who gave the rating
                    select: "firstName", // Only get the user's name
                },
            })
            .populate({
                path: "reviews",
                populate: {
                    path: "user",
                    select: "firstName",
                },
            })
            .exec();

    if(!product)
    {
        throw new Error("product not find:",id);
    }
    return product;
}

async function getAllProducts(reqQuery)
{
    // console.log(reqQuery);
    let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}=reqQuery;

    pageSize =   30;

    let query = Product.find().populate("category");

    if(category)
    {
        const existCategory= await Category.findOne({name:category});

        if(existCategory)
        {
            query=query.where("category").equals(existCategory._id);
        }
        else
        {
            return {content:[],currentPage:1,totalPages:0}
        }
    }

    if(color)
    {
        const colorSet=new Set(color.split(",").map((color=>color.trim().toLowerCase())));

        const colorRegex = colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null

        query=query.where("color").regex(colorRegex);
    }

    if(sizes)
    {
        const sizeesSet = new Set(sizes);
        query =query.where("sizes.name").in([...sizesSet]);
    }
    if(minPrice && maxPrice)
    {
        query =  query.where("discountedPrice").gte(minPrice).lte(maxPrice)
    }
    if(minDiscount)
    {
        query =  query.where("discountPersent").gt(minDiscount)
    }
    if(stock)
    {
        if(stock == "in_stock")
        {
            query=query.where("quantity").gt(0);
        }
        else if(stock == "out_of_stock")
        {
            query=query.where("quantity").gt(1);
        }
    }
    if(sort)
    {
        const sortDirection=sort==="price_high"?-1:1
        query=query.sort({discountedPrice:sortDirection})
    }

    const totalProducts = await Product.find(query.getFilter()).countDocuments();

    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);


    const products= await query.exec();

    const totalPages= Math.ceil(totalProducts/pageSize);

    return {content:products,currentPage:pageNumber,totalPages}
}

// async function createMultipleProducts(products)
// {
//     // console.log(products)
//     for(let product of products)
//     {
//         await createProduct(product);
//     }
// }
async function createMultipleProducts(products) {
    try {
        const bulkProducts = [];

        for (let reqData of products) {
            // Find or create top-level category
            let topLevel = await Category.findOneAndUpdate(
                { name: reqData.topLavelCategory },
                { name: reqData.topLavelCategory, level: 1 },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            // Find or create second-level category
            let secondLevel = await Category.findOneAndUpdate(
                { name: reqData.secondLavelCategory, parentCategory: topLevel._id },
                { name: reqData.secondLavelCategory, parentCategory: topLevel._id, level: 2 },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            // Find or create third-level category
            let thirdLevel = await Category.findOneAndUpdate(
                { name: reqData.thirdLavelCategory, parentCategory: secondLevel._id },
                { name: reqData.thirdLavelCategory, parentCategory: secondLevel._id, level: 3 },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            // Prepare product data for bulk insert
            bulkProducts.push({
                title: reqData.title,
                color: reqData.color,
                description: reqData.description,
                discountedPrice: reqData.discountedPrice,
                discountPersent: reqData.discountPersent,
                imageUrl: reqData.imageUrl,
                brand: reqData.brand,
                price: reqData.price,
                sizes: reqData.size,
                quantity: reqData.quantity,
                category: thirdLevel._id
            });
        }

        // Insert all products in bulk
       await Product.insertMany(bulkProducts, { ordered: false });


        return { message: "Products created successfully!" };
    } catch (error) {
        throw new Error("Error creating products: " + error.message); 
    }
}


module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProducts
}