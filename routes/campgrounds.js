var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleWare = require("../middleware");

//When a get request for "/campgrounds" is initiated, it trys to retreive imformation from the database.
router.get("/",function(req,res){
    //looks for all campgrounds inside of the database because of "{}".
    Campground.find({},function(err,campgrounds){   //{campgrounds:campgrounds} comes from here!
        //returns an error if something goes wrong.
        if(err){
            console.log("Error can't find YelpCampDB");
        }else{
            //runs the campgrounds.ejs and allows the data to assessiable from the campgrounds page.
            res.render("campgrounds/index",{campgrounds:campgrounds});  //comes from the campgrounds variable above
        }
    });
});

//Directs you to the page with all the campgrounds in the database. 
router.post("/",middleWare.isLoggedIn,function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampgrounds = {"name":name,"price":price,"image":image,"description":desc, author:author};
    Campground.create(newCampgrounds,function(err,newlyCreated){
        if(err){
            console.log("Error, cannot add object to database");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//Directs you to the page where you can add a new campsite.
router.get("/new",middleWare.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

// SHOW ROUTE
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if (err){
            console.log(err);
        }else{
            res.render("campgrounds/edit",{campground:foundCampground}); 
        }
    });
});
//UPDATE CAMPGROUND ROUTE

router.put("/:id",middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground ,function(err,updatedCampground){
        if (err){
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if (err){
            res.render("/campgrounds");
        }else{
            res.redirect("/campgrounds");
    }
    });
});

module.exports = router;