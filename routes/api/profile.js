const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { route } = require('./users');

//@route    GET api/profile/me
//@desc     get current user profile
//@access   private
router.get('/me', async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',
        ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST api/profile
//@desc     Create or Update user profile
//@access   private

router.post('/',[ auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty(),
    
]] ,async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});

    }

    const {company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram,linkedin} = req.body;
    // Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio =  bio;
    if (status) profileFields.status =  status;
    if (githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill=> skill.trim());
    
    }
    
    //Build social object

    profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({user: req.user.id });

            if(profile){
                //Update
                profile = await Profile.findOneAndUpdate({user: req.user.id},{ $set:
                profileFields },{new:true});

                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.messege);
            res.status(500).send('Server Error');
        }

    console.log(profileFields.social.twitter);
    res.send('hello');
});

//@route    GET api/profile
//@desc     get all profile
//@access   public

router.get('/', async (req,res) =>{
    try {
        profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.messege);
        res.status(500).send("Server Error");
    }
});

//@route    GET api/profile/user/:user_id
//@desc     get profile by user ID
//@access   public

router.get('/user/:user_id', async (req,res) =>{
    try {
        profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile) return res.status(400).json({ msg: "Profile not found"});
        res.json(profile);
    } catch (err) {
        console.error(err.messege);
        if(err.kind=='ObjectId'){
            return res.status(400).json({ msg: "Profile not found"});
        }
        res.status(500).send("Server Error");
    }
});

//@route    DELETE api/profile
//@desc     Delete profile, user, posts
//@access   Private
router.delete('/',auth, async (req,res) =>{
    try {
        //@todo - remove users posts

        //remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        //remove user
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg:"User deleted"});
    } catch (err) {
        console.error(err.messege);
        res.status(500).send("Server Error");
    }
});


//@route    Put api/profile/education
//@desc     Add profile education
//@access   Private
router.put('/education',[auth, [
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','Fieldofstudy is required').not().isEmpty(),
    check('from','From Date is required').not().isEmpty()
]],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { 
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description } = req.body;

    const newEdu = {
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description
         };

    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.messege);
        res.status(500).send('Server Error');
    }
});

//@route    DELETE api/profile/education/:edu_id
//@desc     Delete education from profile
//@access   Private
router.delete('/education/:edu_id',auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id});

        //Get remove index
        const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.messege);
        res.status(500).send('Server Error');
    }
});



module.exports = router;
