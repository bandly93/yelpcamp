var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    flash         = require("connect-flash"),
    methodOverride= require("method-override"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");
    
var commentRoutes = require('./routes/comments'),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
  
  
var url = process.env.DATABASEURL || "mongodb://localhost/YelpCampDB"  


mongoose.connect(url)
//connect to the database  
//mongoose.connect("mongodb://localhost/YelpCampDB");
mongoose.connect("mongodb://bandly93:183592bb@ds155191.mlab.com:55191/yelpcamp");





app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride("_method"));
//seedDB();

//PASSPORT Configuration
app.use(require("express-session")({
    secret:"secret",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/",indexRoutes);


//The server that is this app is connected to.
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is running!");
}); 