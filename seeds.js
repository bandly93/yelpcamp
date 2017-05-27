var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
    {
        name : "Cloud's Rest",
        image : "http://www.americansouthwest.net/california/photographs700/clouds-yosemite2.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        name : "Yosemite",
        image : "http://farm4.static.flickr.com/3026/2705616460_690dda66d7.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        name : "Half Dome",
        image : "https://static1.squarespace.com/static/555c964fe4b07d15252a8927/t/569ba5565827c35cee2044bd/1453040984579/clouds-rest-yosemite-national-park-view-half-dome-el-capitan?format=750w",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
] 
    
    
function seedDB(){
    Campground.remove({},function(err){
        if (err){
            console.log(err);
        }
        console.log("All campgrounds removed!"); 
        
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("You created a campground!");
        //             Comment.create(
        //                 {
        //                     text: " This place is great but I wish there was internet.",
        //                     author : "Homer"
        //                 },function(err,comment){
        //                     if (err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //                 }
        //             );
        //         }
        //     });
        // });
     });
}    
    
module.exports = seedDB;